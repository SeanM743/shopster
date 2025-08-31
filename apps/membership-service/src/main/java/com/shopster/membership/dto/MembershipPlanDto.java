package com.shopster.membership.dto;

import com.shopster.membership.entity.MembershipPlan;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for Shopster+ membership plans
 */
public class MembershipPlanDto {

    private Long id;

    @NotBlank(message = "Plan code is required")
    @Size(max = 50, message = "Plan code must not exceed 50 characters")
    private String planCode;

    @NotBlank(message = "Plan name is required")
    @Size(max = 100, message = "Plan name must not exceed 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be non-negative")
    private BigDecimal price;

    @NotNull(message = "Billing cycle is required")
    private MembershipPlan.BillingCycle billingCycle;

    @NotNull(message = "Trial days is required")
    @Min(value = 0, message = "Trial days must be non-negative")
    private Integer trialDays;

    @NotNull(message = "Active status is required")
    private Boolean active;

    @NotNull(message = "Plan type is required")
    private MembershipPlan.PlanType planType;

    private Integer displayOrder;

    private List<String> features;

    private String formattedPrice;
    private String billingCycleDisplay;
    private String trialDescription;

    // Constructors
    public MembershipPlanDto() {}

    public MembershipPlanDto(String planCode, String name, String description, BigDecimal price, 
                            MembershipPlan.BillingCycle billingCycle, Integer trialDays, 
                            MembershipPlan.PlanType planType) {
        this.planCode = planCode;
        this.name = name;
        this.description = description;
        this.price = price;
        this.billingCycle = billingCycle;
        this.trialDays = trialDays;
        this.planType = planType;
        this.active = true;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanCode() {
        return planCode;
    }

    public void setPlanCode(String planCode) {
        this.planCode = planCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public MembershipPlan.BillingCycle getBillingCycle() {
        return billingCycle;
    }

    public void setBillingCycle(MembershipPlan.BillingCycle billingCycle) {
        this.billingCycle = billingCycle;
    }

    public Integer getTrialDays() {
        return trialDays;
    }

    public void setTrialDays(Integer trialDays) {
        this.trialDays = trialDays;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public MembershipPlan.PlanType getPlanType() {
        return planType;
    }

    public void setPlanType(MembershipPlan.PlanType planType) {
        this.planType = planType;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public String getFormattedPrice() {
        return formattedPrice;
    }

    public void setFormattedPrice(String formattedPrice) {
        this.formattedPrice = formattedPrice;
    }

    public String getBillingCycleDisplay() {
        return billingCycleDisplay;
    }

    public void setBillingCycleDisplay(String billingCycleDisplay) {
        this.billingCycleDisplay = billingCycleDisplay;
    }

    public String getTrialDescription() {
        return trialDescription;
    }

    public void setTrialDescription(String trialDescription) {
        this.trialDescription = trialDescription;
    }

    // Helper methods
    public boolean isTrial() {
        return planType == MembershipPlan.PlanType.TRIAL;
    }

    public boolean hasFreeTrial() {
        return trialDays > 0;
    }
}