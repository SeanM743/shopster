package com.shopster.membership.dto;

import com.shopster.membership.entity.MembershipSubscription;
import jakarta.validation.constraints.*;

/**
 * Request DTO for creating a new Shopster+ subscription
 */
public class CreateSubscriptionRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Plan code is required")
    @Size(max = 50, message = "Plan code must not exceed 50 characters")
    private String planCode;

    @NotBlank(message = "Payment method ID is required")
    @Size(max = 100, message = "Payment method ID must not exceed 100 characters")
    private String paymentMethodId;

    @NotNull(message = "Payment method type is required")
    private MembershipSubscription.PaymentMethodType paymentMethodType;

    private Boolean autoRenew = true;

    // Constructors
    public CreateSubscriptionRequest() {}

    public CreateSubscriptionRequest(Long userId, String planCode, String paymentMethodId, 
                                   MembershipSubscription.PaymentMethodType paymentMethodType) {
        this.userId = userId;
        this.planCode = planCode;
        this.paymentMethodId = paymentMethodId;
        this.paymentMethodType = paymentMethodType;
    }

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPlanCode() {
        return planCode;
    }

    public void setPlanCode(String planCode) {
        this.planCode = planCode;
    }

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public MembershipSubscription.PaymentMethodType getPaymentMethodType() {
        return paymentMethodType;
    }

    public void setPaymentMethodType(MembershipSubscription.PaymentMethodType paymentMethodType) {
        this.paymentMethodType = paymentMethodType;
    }

    public Boolean getAutoRenew() {
        return autoRenew;
    }

    public void setAutoRenew(Boolean autoRenew) {
        this.autoRenew = autoRenew;
    }
}