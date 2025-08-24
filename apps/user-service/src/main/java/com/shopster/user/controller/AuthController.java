package com.shopster.user.controller;

import com.shopster.user.dto.AuthResponse;
import com.shopster.user.dto.LoginRequest;
import com.shopster.user.dto.RegisterRequest;
import com.shopster.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication operations
 */
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    
    private final UserService userService;
    
    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse authResponse = userService.register(request);
        
        return ResponseEntity.ok(new ApiResponse<>(
                authResponse,
                "User registered successfully",
                200
        ));
    }
    
    /**
     * User login
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {
        
        String deviceInfo = extractDeviceInfo(httpRequest);
        AuthResponse authResponse = userService.login(request, deviceInfo);
        
        return ResponseEntity.ok(new ApiResponse<>(
                authResponse,
                "Login successful",
                200
        ));
    }
    
    /**
     * Refresh access token
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@RequestBody RefreshTokenRequest request) {
        AuthResponse authResponse = userService.refreshToken(request.getRefreshToken());
        
        return ResponseEntity.ok(new ApiResponse<>(
                authResponse,
                "Token refreshed successfully",
                200
        ));
    }
    
    /**
     * Logout user
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestBody RefreshTokenRequest request) {
        userService.logout(request.getRefreshToken());
        
        return ResponseEntity.ok(new ApiResponse<>(
                null,
                "Logout successful",
                200
        ));
    }
    
    /**
     * Logout from all devices
     */
    @PostMapping("/logout-all")
    public ResponseEntity<ApiResponse<Void>> logoutAll(@RequestBody LogoutAllRequest request) {
        userService.logoutAllDevices(request.getUserId());
        
        return ResponseEntity.ok(new ApiResponse<>(
                null,
                "Logged out from all devices",
                200
        ));
    }
    
    /**
     * Extract device information from request
     */
    private String extractDeviceInfo(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        String clientIp = getClientIpAddress(request);
        return userAgent + "|" + clientIp;
    }
    
    /**
     * Get client IP address
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader != null && !xForwardedForHeader.isEmpty()) {
            return xForwardedForHeader.split(",")[0];
        }
        return request.getRemoteAddr();
    }
    
    /**
     * Refresh token request DTO
     */
    public static class RefreshTokenRequest {
        private String refreshToken;
        
        public String getRefreshToken() {
            return refreshToken;
        }
        
        public void setRefreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
        }
    }
    
    /**
     * Logout all request DTO
     */
    public static class LogoutAllRequest {
        private Long userId;
        
        public Long getUserId() {
            return userId;
        }
        
        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }
}