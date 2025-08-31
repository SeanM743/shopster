package com.shopster.membership.service;

import com.shopster.membership.entity.MembershipSubscription;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Payment stub service for development/testing purposes
 * Always returns successful payment responses
 */
@Service
public class PaymentStubService {

    /**
     * Processes a payment for a membership subscription
     * This is a stub implementation that always succeeds
     */
    public PaymentResult processPayment(String paymentMethodId, 
                                      MembershipSubscription.PaymentMethodType paymentMethodType,
                                      BigDecimal amount, 
                                      String description) {
        // Simulate payment processing delay
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Generate mock transaction ID
        String transactionId = "txn_" + UUID.randomUUID().toString().substring(0, 8);
        
        // Always return successful payment
        return PaymentResult.success(transactionId, amount, paymentMethodType);
    }

    /**
     * Validates a payment method
     * This is a stub implementation that always validates successfully
     */
    public boolean validatePaymentMethod(String paymentMethodId, 
                                       MembershipSubscription.PaymentMethodType paymentMethodType) {
        // Stub validation - always returns true
        return paymentMethodId != null && !paymentMethodId.trim().isEmpty();
    }

    /**
     * Cancels a recurring payment
     * This is a stub implementation that always succeeds
     */
    public boolean cancelRecurringPayment(String paymentMethodId) {
        // Stub cancellation - always returns true
        return true;
    }

    /**
     * Result of a payment processing attempt
     */
    public static class PaymentResult {
        private final boolean success;
        private final String transactionId;
        private final BigDecimal amount;
        private final MembershipSubscription.PaymentMethodType paymentMethodType;
        private final String errorMessage;
        private final Map<String, Object> metadata;

        private PaymentResult(boolean success, String transactionId, BigDecimal amount, 
                            MembershipSubscription.PaymentMethodType paymentMethodType, 
                            String errorMessage) {
            this.success = success;
            this.transactionId = transactionId;
            this.amount = amount;
            this.paymentMethodType = paymentMethodType;
            this.errorMessage = errorMessage;
            this.metadata = new HashMap<>();
            
            // Add mock metadata
            if (success) {
                this.metadata.put("processor", "stub-payment-processor");
                this.metadata.put("timestamp", System.currentTimeMillis());
                this.metadata.put("last4", generateMockLast4());
            }
        }

        public static PaymentResult success(String transactionId, BigDecimal amount, 
                                          MembershipSubscription.PaymentMethodType paymentMethodType) {
            return new PaymentResult(true, transactionId, amount, paymentMethodType, null);
        }

        public static PaymentResult failure(String errorMessage) {
            return new PaymentResult(false, null, null, null, errorMessage);
        }

        private String generateMockLast4() {
            return switch (paymentMethodType) {
                case CREDIT_CARD, DEBIT_CARD -> "****" + (1000 + (int)(Math.random() * 9000));
                case PAYPAL -> "****@example.com";
                case APPLE_PAY -> "****-apple-pay";
                case GOOGLE_PAY -> "****-google-pay";
            };
        }

        // Getters
        public boolean isSuccess() {
            return success;
        }

        public String getTransactionId() {
            return transactionId;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public MembershipSubscription.PaymentMethodType getPaymentMethodType() {
            return paymentMethodType;
        }

        public String getErrorMessage() {
            return errorMessage;
        }

        public Map<String, Object> getMetadata() {
            return metadata;
        }
    }
}