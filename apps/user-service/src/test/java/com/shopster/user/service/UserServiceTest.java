package com.shopster.user.service;

import com.shopster.user.dto.LoginRequest;
import com.shopster.user.dto.RegisterRequest;
import com.shopster.user.entity.Role;
import com.shopster.user.entity.User;
import com.shopster.user.exception.EmailAlreadyExistsException;
import com.shopster.user.exception.InvalidCredentialsException;
import com.shopster.user.repository.RoleRepository;
import com.shopster.user.repository.UserRepository;
import com.shopster.user.repository.UserSessionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private UserSessionRepository sessionRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserMappingService mappingService;

    @InjectMocks
    private UserService userService;

    private User user;
    private Role customerRole;

    @BeforeEach
    void setUp() {
        user = new User("test@test.com", "password", "Test", "User");
        customerRole = new Role(Role.CUSTOMER, "Customer role");
    }

    @Test
    void register_success() {
        RegisterRequest request = new RegisterRequest("test@test.com", "password", "Test", "User");

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(roleRepository.findByName(Role.CUSTOMER)).thenReturn(Optional.of(customerRole));
        when(userRepository.save(any(User.class))).thenReturn(user);

        assertDoesNotThrow(() -> userService.register(request));
    }

    @Test
    void register_emailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("test@test.com", "password", "Test", "User");

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> userService.register(request));
    }

    @Test
    void login_success() {
        LoginRequest request = new LoginRequest("test@test.com", "password");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPassword())).thenReturn(true);

        assertDoesNotThrow(() -> userService.login(request, "deviceInfo"));
    }

    @Test
    void login_invalidCredentials() {
        LoginRequest request = new LoginRequest("test@test.com", "password");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPassword())).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> userService.login(request, "deviceInfo"));
    }

    @Test
    void login_userNotFound() {
        LoginRequest request = new LoginRequest("test@test.com", "password");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, () -> userService.login(request, "deviceInfo"));
    }
}