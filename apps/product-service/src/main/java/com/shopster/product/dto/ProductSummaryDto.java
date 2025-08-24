package com.shopster.product.dto;

import java.math.BigDecimal;

/**
 * DTO for product summary in carousels and listings
 */
public class ProductSummaryDto {
    
    private String id;
    private String name;
    private String brand;
    private String category;
    private BigDecimal price;
    private BigDecimal salePrice;
    private String imageUrl;
    private BigDecimal rating;
    private Integer reviewCount;
    private Boolean inStock;
    private String badge;
    private Integer quantity;

    // Constructors
    public ProductSummaryDto() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    // Helper methods
    public boolean hasDiscount() {
        return salePrice != null && salePrice.compareTo(price) < 0;
    }

    public BigDecimal getEffectivePrice() {
        return hasDiscount() ? salePrice : price;
    }
}