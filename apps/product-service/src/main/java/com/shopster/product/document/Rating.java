package com.shopster.product.document;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;

import java.math.BigDecimal;
import java.util.Map;

/**
 * Rating embedded document for storing product ratings and reviews.
 */
public class Rating {

    @DecimalMin(value = "0.0", message = "Average rating must be non-negative")
    @DecimalMax(value = "5.0", message = "Average rating must not exceed 5.0")
    private BigDecimal average = BigDecimal.ZERO;

    @Min(value = 0, message = "Review count must be non-negative")
    private Integer count = 0;

    private Map<Integer, Integer> distribution; // Rating value -> count (e.g., 5 -> 120, 4 -> 45)

    // Constructors
    public Rating() {}

    public Rating(BigDecimal average, Integer count) {
        this.average = average;
        this.count = count;
    }

    // Getters and Setters
    public BigDecimal getAverage() {
        return average;
    }

    public void setAverage(BigDecimal average) {
        this.average = average;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Map<Integer, Integer> getDistribution() {
        return distribution;
    }

    public void setDistribution(Map<Integer, Integer> distribution) {
        this.distribution = distribution;
    }

    // Helper methods
    public boolean hasRatings() {
        return count != null && count > 0;
    }

    public String getFormattedRating() {
        if (!hasRatings()) return "No ratings";
        return String.format("%.1f", average) + " (" + count + " reviews)";
    }

    public Integer getRatingForStars(Integer stars) {
        if (distribution == null || stars < 1 || stars > 5) return 0;
        return distribution.getOrDefault(stars, 0);
    }

    public Double getPercentageForStars(Integer stars) {
        if (!hasRatings()) return 0.0;
        Integer starCount = getRatingForStars(stars);
        return (starCount.doubleValue() / count.doubleValue()) * 100.0;
    }
}