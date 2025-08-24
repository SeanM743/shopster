package com.shopster.user.controller;

import com.shopster.user.dto.UserDto;
import com.shopster.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for user management operations
 */
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    
    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Get user profile by ID
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> getUserProfile(@PathVariable Long userId) {
        UserDto user = userService.getUserProfile(userId);
        
        return ResponseEntity.ok(new ApiResponse<>(
                user,
                "User profile retrieved successfully",
                200
        ));
    }
    
    /**
     * Get user profile by email
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<UserDto>> getUserProfileByEmail(@PathVariable String email) {
        UserDto user = userService.getUserProfileByEmail(email);
        
        return ResponseEntity.ok(new ApiResponse<>(
                user,
                "User profile retrieved successfully",
                200
        ));
    }
    
    /**
     * Update user profile
     */
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> updateUserProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UserDto userDto) {
        
        UserDto updatedUser = userService.updateUserProfile(userId, userDto);
        
        return ResponseEntity.ok(new ApiResponse<>(
                updatedUser,
                "User profile updated successfully",
                200
        ));
    }
    
    /**
     * Change user password
     */
    @PostMapping("/{userId}/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @PathVariable Long userId,
            @RequestBody ChangePasswordRequest request) {
        
        userService.changePassword(userId, request.getCurrentPassword(), request.getNewPassword());
        
        return ResponseEntity.ok(new ApiResponse<>(
                null,
                "Password changed successfully",
                200
        ));
    }
    
    /**
     * Deactivate user account
     */
    @PostMapping("/{userId}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivateAccount(@PathVariable Long userId) {
        userService.deactivateAccount(userId);
        
        return ResponseEntity.ok(new ApiResponse<>(
                null,
                "Account deactivated successfully",
                200
        ));
    }
    
    /**
     * Get all users (admin only)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserDto>>> getAllUsers(Pageable pageable) {
        Page<UserDto> users = userService.getAllUsers(pageable);
        
        return ResponseEntity.ok(new ApiResponse<>(
                users,
                "Users retrieved successfully",
                200
        ));
    }
    
    /**
     * Search users by name
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<UserDto>>> searchUsers(
            @RequestParam String searchTerm,
            Pageable pageable) {
        
        Page<UserDto> users = userService.searchUsers(searchTerm, pageable);
        
        return ResponseEntity.ok(new ApiResponse<>(
                users,
                "Users search completed",
                200
        ));
    }
    
    /**
     * Change password request DTO
     */
    public static class ChangePasswordRequest {
        private String currentPassword;
        private String newPassword;
        
        public String getCurrentPassword() {
            return currentPassword;
        }
        
        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }
        
        public String getNewPassword() {
            return newPassword;
        }
        
        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
}