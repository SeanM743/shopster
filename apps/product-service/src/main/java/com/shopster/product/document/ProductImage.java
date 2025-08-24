package com.shopster.product.document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * ProductImage embedded document for storing product image information.
 */
public class ProductImage {

    @NotBlank(message = "Image URL is required")
    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String url;

    @NotBlank(message = "Alt text is required for accessibility")
    @Size(max = 255, message = "Alt text must not exceed 255 characters")
    private String alt;

    private Boolean isPrimary = false;

    @Size(max = 500, message = "Zoom URL must not exceed 500 characters")
    private String zoomUrl;

    @Size(max = 100, message = "Image type must not exceed 100 characters")
    private String type;

    private Integer sortOrder = 0;

    // Constructors
    public ProductImage() {}

    public ProductImage(String url, String alt, Boolean isPrimary) {
        this.url = url;
        this.alt = alt;
        this.isPrimary = isPrimary;
    }

    // Getters and Setters
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public Boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(Boolean isPrimary) {
        this.isPrimary = isPrimary;
    }

    public String getZoomUrl() {
        return zoomUrl;
    }

    public void setZoomUrl(String zoomUrl) {
        this.zoomUrl = zoomUrl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}