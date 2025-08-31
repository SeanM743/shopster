package com.shopster.user.service;

import com.shopster.user.dto.*;
import com.shopster.user.entity.Role;
import com.shopster.user.entity.User;
import com.shopster.user.entity.UserSession;
import com.shopster.user.exception.EmailAlreadyExistsException;
import com.shopster.user.exception.InvalidCredentialsException;
import com.shopster.user.exception.UserNotFoundException;
import com.shopster.user.repository.RoleRepository;
import com.shopster.user.repository.UserRepository;
import com.shopster.user.repository.UserSessionRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

/**
 * Service class for user management operations
 */
@Service
@Transactional
public class UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserSessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMappingService mappingService;
    
    @Autowired
    public UserService(UserRepository userRepository,
                      RoleRepository roleRepository,
                      UserSessionRepository sessionRepository,
                      PasswordEncoder passwordEncoder,
                      JwtService jwtService,
                      UserMappingService mappingService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.mappingService = mappingService;
    }
    
    /**
     * Register a new user
     */
    public AuthResponse register(RegisterRequest request) {
        logger.info("Attempting to register user with email: {}", request.getEmail());
        
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("User with email " + request.getEmail() + " already exists");
        }
        
        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setMarketingConsent(request.getMarketingConsent());
        user.setAccountStatus(User.AccountStatus.ACTIVE);
        user.setEmailVerified(false);
        
        // Assign default customer role
        Role customerRole = roleRepository.findByName(Role.CUSTOMER)
                .orElseThrow(() -> new RuntimeException("Customer role not found"));
        user.addRole(customerRole);
        
        // Save user
        user = userRepository.save(user);
        logger.info("User registered successfully with ID: {}", user.getId());
        
        // Generate tokens
        String rolesString = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.joining(","));
        
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), rolesString);
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());
        
        // Create user session
        createUserSession(user, refreshToken, null);
        
        // Convert to DTO and return
        UserDto userDto = mappingService.toUserDto(user);
        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(jwtService.getAccessTokenExpiration());
        
        return new AuthResponse(accessToken, refreshToken, expiresAt, userDto);
    }
    
    /**
     * Authenticate user login
     */
    public AuthResponse login(LoginRequest request, String deviceInfo) {
        logger.info("Attempting login for email: {}", request.getEmail());
        
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));
        
        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            logger.warn("Invalid password attempt for email: {}", request.getEmail());
            throw new InvalidCredentialsException("Invalid email or password");
        }
        
        // Check account status
        if (user.getAccountStatus() != User.AccountStatus.ACTIVE) {
            throw new InvalidCredentialsException("Account is not active");
        }
        
        // Generate tokens
        String rolesString = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.joining(","));
        
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), rolesString);
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());
        
        // Create or update user session
        createUserSession(user, refreshToken, deviceInfo);
        
        logger.info("User logged in successfully with ID: {}", user.getId());
        
        // Convert to DTO and return
        UserDto userDto = mappingService.toUserDto(user);
        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(jwtService.getAccessTokenExpiration());
        
        return new AuthResponse(accessToken, refreshToken, expiresAt, userDto);
    }
    
    /**
     * Refresh access token using refresh token
     */
    public AuthResponse refreshToken(String refreshToken) {
        logger.info("Attempting to refresh token");
        
        // Validate refresh token
        if (!jwtService.isTokenValid(refreshToken) || 
            !"refresh".equals(jwtService.extractTokenType(refreshToken))) {
            throw new InvalidCredentialsException("Invalid refresh token");
        }
        
        // Find user session
        UserSession session = sessionRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new InvalidCredentialsException("Refresh token not found"));
        
        if (session.getExpiresAt().isBefore(LocalDateTime.now())) {
            sessionRepository.delete(session);
            throw new InvalidCredentialsException("Refresh token expired");
        }
        
        User user = session.getUser();
        
        // Generate new tokens
        String rolesString = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.joining(","));
        
        String newAccessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), rolesString);
        String newRefreshToken = jwtService.generateRefreshToken(user.getId(), user.getEmail());
        
        // Update session with new refresh token
        session.setRefreshToken(newRefreshToken);
        session.setExpiresAt(LocalDateTime.now().plusSeconds(jwtService.getRefreshTokenExpiration()));
        sessionRepository.save(session);
        
        logger.info("Token refreshed successfully for user ID: {}", user.getId());
        
        // Convert to DTO and return
        UserDto userDto = mappingService.toUserDto(user);
        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(jwtService.getAccessTokenExpiration());
        
        return new AuthResponse(newAccessToken, newRefreshToken, expiresAt, userDto);
    }
    
    /**
     * Logout user (invalidate refresh token)
     */
    public void logout(String refreshToken) {
        logger.info("Attempting to logout user");
        
        sessionRepository.findByRefreshToken(refreshToken).ifPresent(session -> {
            sessionRepository.delete(session);
            logger.info("User logged out successfully, session deleted for user ID: {}", session.getUser().getId());
        });
    }
    
    /**
     * Logout user from all devices
     */
    public void logoutAllDevices(Long userId) {
        logger.info("Logging out user from all devices, user ID: {}", userId);
        sessionRepository.deleteAllUserSessions(userId);
    }
    
    /**
     * Get user profile by ID
     */
    public UserDto getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        
        return mappingService.toUserDto(user);
    }
    
    /**
     * Get user profile by email
     */
    public UserDto getUserProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        
        return mappingService.toUserDto(user);
    }
    
    /**
     * Update user profile
     */
    public UserDto updateUserProfile(Long userId, UserDto userDto) {
        logger.info("Updating user profile for user ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        
        // Update allowed fields
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setPreferredLanguage(userDto.getPreferredLanguage());
        user.setMarketingConsent(userDto.getMarketingConsent());
        
        user = userRepository.save(user);
        logger.info("User profile updated successfully for user ID: {}", userId);
        
        return mappingService.toUserDto(user);
    }
    
    /**
     * Change user password
     */
    public void changePassword(Long userId, String currentPassword, String newPassword) {
        logger.info("Attempting to change password for user ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        
        // Verify current password
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new InvalidCredentialsException("Current password is incorrect");
        }
        
        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        // Invalidate all sessions to force re-login
        logoutAllDevices(userId);
        
        logger.info("Password changed successfully for user ID: {}", userId);
    }
    
    /**
     * Deactivate user account
     */
    public void deactivateAccount(Long userId) {
        logger.info("Deactivating account for user ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        
        user.setAccountStatus(User.AccountStatus.INACTIVE);
        userRepository.save(user);
        
        // Logout from all devices
        logoutAllDevices(userId);
        
        logger.info("Account deactivated successfully for user ID: {}", userId);
    }
    
    /**
     * Get all users (admin only)
     */
    public Page<UserDto> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(mappingService::toUserDto);
    }
    
    /**
     * Search users by name
     */
    public Page<UserDto> searchUsers(String searchTerm, Pageable pageable) {
        return userRepository.searchByName(searchTerm, pageable)
                .map(mappingService::toUserDto);
    }
    
    /**
     * Clean up expired sessions
     */
    public void cleanupExpiredSessions() {
        logger.info("Cleaning up expired sessions");
        sessionRepository.deleteExpiredSessions(LocalDateTime.now());
    }
    
    /**
     * Create user session
     */
    private void createUserSession(User user, String refreshToken, String deviceInfo) {
        // Remove existing session for the same device if it exists
        if (deviceInfo != null) {
            sessionRepository.findByUserIdAndDeviceType(user.getId(), deviceInfo)
                    .ifPresent(sessionRepository::delete);
        }
        
        // Create new session
        UserSession session = new UserSession();
        session.setUser(user);
        session.setRefreshToken(refreshToken);
        session.setDeviceType(deviceInfo);
        session.setExpiresAt(LocalDateTime.now().plusSeconds(jwtService.getRefreshTokenExpiration()));
        session.setCreatedAt(LocalDateTime.now());
        
        sessionRepository.save(session);
    }
}