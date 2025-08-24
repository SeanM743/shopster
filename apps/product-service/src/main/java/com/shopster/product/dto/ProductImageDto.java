package com.shopster.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductImageDto {
    private String url;
    private String alt;
    
    @JsonProperty("isPrimary")
    private boolean isPrimary;
    
    private String zoomUrl;
    private String type;
    private int sortOrder;
    
    // Default constructor
    public ProductImageDto() {}
    
    // Getters and setters
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    
    public String getAlt() { return alt; }
    public void setAlt(String alt) { this.alt = alt; }
    
    public boolean isPrimary() { return isPrimary; }
    public void setPrimary(boolean isPrimary) { this.isPrimary = isPrimary; }
    
    public String getZoomUrl() { return zoomUrl; }
    public void setZoomUrl(String zoomUrl) { this.zoomUrl = zoomUrl; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}