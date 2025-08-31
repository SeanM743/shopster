package com.shopster.membership.controller;

import com.shopster.membership.dto.CreateSubscriptionRequest;
import com.shopster.membership.dto.MembershipPlanDto;
import com.shopster.membership.entity.MembershipSubscription;
import com.shopster.membership.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for Shopster+ membership operations
 */
@RestController
@RequestMapping("/api/membership")
@CrossOrigin(origins = "http://localhost:3000")
public class MembershipController {

    @Autowired
    private MembershipService membershipService;

    /**
     * Get all available Shopster+ plans
     */
    @GetMapping("/plans")
    public ResponseEntity<ApiResponse<List<MembershipPlanDto>>> getShopsterPlusPlans() {
        try {
            List<MembershipPlanDto> plans = membershipService.getActiveShopsterPlusPlans();
            return ResponseEntity.ok(ApiResponse.success("Shopster+ plans retrieved successfully", plans));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve plans: " + e.getMessage()));
        }
    }

    /**
     * Get plan by code
     */
    @GetMapping("/plans/{planCode}")
    public ResponseEntity<ApiResponse<MembershipPlanDto>> getPlanByCode(@PathVariable String planCode) {
        try {
            Optional<MembershipPlanDto> plan = membershipService.getPlanByCode(planCode);
            if (plan.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Plan found", plan.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Plan not found: " + planCode));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve plan: " + e.getMessage()));
        }
    }

    /**
     * Create a new Shopster+ subscription
     */
    @PostMapping("/subscriptions")
    public ResponseEntity<ApiResponse<MembershipSubscription>> createSubscription(
            @Valid @RequestBody CreateSubscriptionRequest request) {
        try {
            MembershipSubscription subscription = membershipService.createSubscription(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Subscription created successfully", subscription));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to create subscription: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Internal server error: " + e.getMessage()));
        }
    }

    /**
     * Get user's active subscription
     */
    @GetMapping("/subscriptions/user/{userId}")
    public ResponseEntity<ApiResponse<MembershipSubscription>> getUserActiveSubscription(
            @PathVariable Long userId) {
        try {
            Optional<MembershipSubscription> subscription = membershipService.getUserActiveSubscription(userId);
            if (subscription.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Active subscription found", subscription.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("No active subscription found for user"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve subscription: " + e.getMessage()));
        }
    }

    /**
     * Get user's subscription history
     */
    @GetMapping("/subscriptions/user/{userId}/history")
    public ResponseEntity<ApiResponse<List<MembershipSubscription>>> getUserSubscriptionHistory(
            @PathVariable Long userId) {
        try {
            List<MembershipSubscription> subscriptions = membershipService.getUserSubscriptionHistory(userId);
            return ResponseEntity.ok(ApiResponse.success("Subscription history retrieved", subscriptions));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve subscription history: " + e.getMessage()));
        }
    }

    /**
     * Cancel a subscription
     */
    @PutMapping("/subscriptions/{subscriptionId}/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelSubscription(
            @PathVariable Long subscriptionId,
            @RequestParam(required = false) String reason) {
        try {
            membershipService.cancelSubscription(subscriptionId, reason);
            return ResponseEntity.ok(ApiResponse.success("Subscription cancelled successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to cancel subscription: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Internal server error: " + e.getMessage()));
        }
    }

    /**
     * Check if user is a Shopster+ member
     */
    @GetMapping("/users/{userId}/status")
    public ResponseEntity<ApiResponse<Boolean>> isShopsterPlusMember(@PathVariable Long userId) {
        try {
            boolean isMember = membershipService.isShopsterPlusMember(userId);
            return ResponseEntity.ok(ApiResponse.success("Membership status retrieved", isMember));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to check membership status: " + e.getMessage()));
        }
    }

    /**
     * Generic API response wrapper
     */
    public static class ApiResponse<T> {
        private boolean success;
        private String message;
        private T data;

        private ApiResponse(boolean success, String message, T data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public static <T> ApiResponse<T> success(String message, T data) {
            return new ApiResponse<>(true, message, data);
        }

        public static <T> ApiResponse<T> error(String message) {
            return new ApiResponse<>(false, message, null);
        }

        // Getters
        public boolean isSuccess() {
            return success;
        }

        public String getMessage() {
            return message;
        }

        public T getData() {
            return data;
        }
    }
}