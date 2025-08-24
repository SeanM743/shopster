package com.shopster.product.document;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

/**
 * ShippingInfo embedded document for storing product shipping information.
 */
public class ShippingInfo {

    private Boolean freeShipping = false;

    @DecimalMin(value = "0.0", message = "Shipping cost must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Shipping cost must have at most 8 integer digits and 2 decimal places")
    private BigDecimal shippingCost = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Free shipping threshold must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Free shipping threshold must have at most 8 integer digits and 2 decimal places")
    private BigDecimal freeShippingThreshold;

    @Size(max = 100, message = "Estimated delivery must not exceed 100 characters")
    private String estimatedDelivery = "2-3 business days";

    @Min(value = 0, message = "Min delivery days must be non-negative")
    private Integer minDeliveryDays = 2;

    @Min(value = 0, message = "Max delivery days must be non-negative")
    private Integer maxDeliveryDays = 5;

    @DecimalMin(value = "0.0", message = "Weight must be non-negative")
    @Digits(integer = 8, fraction = 3, message = "Weight must have at most 8 integer digits and 3 decimal places")
    private BigDecimal weight; // in kg

    @Size(max = 100, message = "Dimensions must not exceed 100 characters")
    private String dimensions; // "L x W x H cm"

    private Boolean requiresSpecialHandling = false;

    @Size(max = 255, message = "Shipping restrictions must not exceed 255 characters")
    private String restrictions; // Geographic or other shipping restrictions

    // Constructors
    public ShippingInfo() {}

    public ShippingInfo(Boolean freeShipping, String estimatedDelivery) {
        this.freeShipping = freeShipping;
        this.estimatedDelivery = estimatedDelivery;
    }

    // Getters and Setters
    public Boolean getFreeShipping() {
        return freeShipping;
    }

    public void setFreeShipping(Boolean freeShipping) {
        this.freeShipping = freeShipping;
    }

    public BigDecimal getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(BigDecimal shippingCost) {
        this.shippingCost = shippingCost;
    }

    public BigDecimal getFreeShippingThreshold() {
        return freeShippingThreshold;
    }

    public void setFreeShippingThreshold(BigDecimal freeShippingThreshold) {
        this.freeShippingThreshold = freeShippingThreshold;
    }

    public String getEstimatedDelivery() {
        return estimatedDelivery;
    }

    public void setEstimatedDelivery(String estimatedDelivery) {
        this.estimatedDelivery = estimatedDelivery;
    }

    public Integer getMinDeliveryDays() {
        return minDeliveryDays;
    }

    public void setMinDeliveryDays(Integer minDeliveryDays) {
        this.minDeliveryDays = minDeliveryDays;
    }

    public Integer getMaxDeliveryDays() {
        return maxDeliveryDays;
    }

    public void setMaxDeliveryDays(Integer maxDeliveryDays) {
        this.maxDeliveryDays = maxDeliveryDays;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public String getDimensions() {
        return dimensions;
    }

    public void setDimensions(String dimensions) {
        this.dimensions = dimensions;
    }

    public Boolean getRequiresSpecialHandling() {
        return requiresSpecialHandling;
    }

    public void setRequiresSpecialHandling(Boolean requiresSpecialHandling) {
        this.requiresSpecialHandling = requiresSpecialHandling;
    }

    public String getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(String restrictions) {
        this.restrictions = restrictions;
    }

    // Helper methods
    public boolean qualifiesForFreeShipping(BigDecimal orderTotal) {
        if (freeShipping) return true;
        if (freeShippingThreshold == null) return false;
        return orderTotal.compareTo(freeShippingThreshold) >= 0;
    }

    public BigDecimal calculateShippingCost(BigDecimal orderTotal) {
        if (qualifiesForFreeShipping(orderTotal)) {
            return BigDecimal.ZERO;
        }
        return shippingCost != null ? shippingCost : BigDecimal.ZERO;
    }

    public String getDeliveryRange() {
        if (minDeliveryDays != null && maxDeliveryDays != null) {
            if (minDeliveryDays.equals(maxDeliveryDays)) {
                return minDeliveryDays + " business day" + (minDeliveryDays > 1 ? "s" : "");
            } else {
                return minDeliveryDays + "-" + maxDeliveryDays + " business days";
            }
        }
        return estimatedDelivery;
    }
}