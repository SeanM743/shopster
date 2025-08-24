package com.shopster.product.dto;

import java.math.BigDecimal;
import java.util.Map;

public class RatingDto {
    private BigDecimal average;
    private int count;
    private Map<String, Integer> distribution;
    
    // Default constructor
    public RatingDto() {}
    
    // Getters and setters
    public BigDecimal getAverage() { return average; }
    public void setAverage(BigDecimal average) { this.average = average; }
    
    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }
    
    public Map<String, Integer> getDistribution() { return distribution; }
    public void setDistribution(Map<String, Integer> distribution) { this.distribution = distribution; }
}