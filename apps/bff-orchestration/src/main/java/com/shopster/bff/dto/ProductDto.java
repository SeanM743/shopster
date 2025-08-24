package com.shopster.bff.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Product DTO for BFF orchestration layer
 * Based on frontend specifications and API requirements
 */
public class ProductDto {
    
    private String id;
    
    @NotBlank(message = "Product name is required")
    private String name;
    
    private String description;
    
    @NotBlank(message = "Brand is required")
    private String brand;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    private String subcategory;
    
    @NotBlank(message = "SKU is required")
    private String sku;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;
    
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal salePrice;
    
    private String currency = "USD";
    
    @NotEmpty(message = "At least one product image is required")
    private List<ProductImageDto> images;
    
    private Map<String, String> specifications;
    
    private List<ProductVariantDto> variants;
    
    @NotNull(message = "Inventory information is required")
    private InventoryDto inventory;
    
    private RatingDto rating;
    
    private ShippingInfoDto shipping;
    
    private String status;
    
    private String visibility;
    
    private Boolean featured = false;
    
    private Boolean trending = false;
    
    private Boolean recommended = false;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    // Constructors
    public ProductDto() {}
    
    public ProductDto(String id, String name, String brand, String category, 
                     BigDecimal price, List<ProductImageDto> images, InventoryDto inventory) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.price = price;
        this.images = images;
        this.inventory = inventory;
        this.rating = new RatingDto();
    }
    
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
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
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
    
    public String getSubcategory() {
        return subcategory;
    }
    
    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }
    
    public String getSku() {
        return sku;
    }
    
    public void setSku(String sku) {
        this.sku = sku;
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
    
    public String getCurrency() {
        return currency;
    }
    
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    public List<ProductImageDto> getImages() {
        return images;
    }
    
    public void setImages(List<ProductImageDto> images) {
        this.images = images;
    }
    
    public Map<String, String> getSpecifications() {
        return specifications;
    }
    
    public void setSpecifications(Map<String, String> specifications) {
        this.specifications = specifications;
    }
    
    public List<ProductVariantDto> getVariants() {
        return variants;
    }
    
    public void setVariants(List<ProductVariantDto> variants) {
        this.variants = variants;
    }
    
    public InventoryDto getInventory() {
        return inventory;
    }
    
    public void setInventory(InventoryDto inventory) {
        this.inventory = inventory;
    }
    
    public RatingDto getRating() {
        return rating;
    }
    
    public void setRating(RatingDto rating) {
        this.rating = rating;
    }
    
    public ShippingInfoDto getShipping() {
        return shipping;
    }
    
    public void setShipping(ShippingInfoDto shipping) {
        this.shipping = shipping;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getVisibility() {
        return visibility;
    }
    
    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }
    
    public Boolean getFeatured() {
        return featured;
    }
    
    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }
    
    public Boolean getTrending() {
        return trending;
    }
    
    public void setTrending(Boolean trending) {
        this.trending = trending;
    }
    
    public Boolean getRecommended() {
        return recommended;
    }
    
    public void setRecommended(Boolean recommended) {
        this.recommended = recommended;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    // Helper methods
    public boolean hasDiscount() {
        return salePrice != null && salePrice.compareTo(price) < 0;
    }
    
    public BigDecimal getEffectivePrice() {
        return hasDiscount() ? salePrice : price;
    }
    
    public ProductImageDto getPrimaryImage() {
        return images.stream()
                .filter(ProductImageDto::getIsPrimary)
                .findFirst()
                .orElse(images.isEmpty() ? null : images.get(0));
    }
    
    public boolean isInStock() {
        return inventory != null && inventory.getInStock() && inventory.getQuantity() > 0;
    }
}