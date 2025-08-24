package com.shopster.product.dto;

import javax.validation.constraints.*;;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Data Transfer Object for Product document
 */
public class ProductDto {
    
    private String id;
    
    @NotBlank(message = "Product name is required")
    @Size(max = 255, message = "Product name must not exceed 255 characters")
    private String name;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;
    
    @NotBlank(message = "Brand is required")
    @Size(max = 100, message = "Brand must not exceed 100 characters")
    private String brand;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    private String subcategory;
    
    private Set<String> tags;
    
    @NotBlank(message = "SKU is required")
    @Size(max = 50, message = "SKU must not exceed 50 characters")
    private String sku;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "Sale price must be greater than 0")
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
    
    private SeoInfoDto seo;
    
    @NotNull(message = "Product status is required")
    private String status;
    
    @NotNull(message = "Product visibility is required")
    private String visibility;
    
    private Boolean featured = false;
    
    private Boolean trending = false;
    
    private Boolean recommended = false;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private Long version;
    
    // Constructors
    public ProductDto() {}
    
    public ProductDto(String name, String brand, String category, String sku, BigDecimal price) {
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.sku = sku;
        this.price = price;
        this.status = "ACTIVE";
        this.visibility = "PUBLIC";
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
    
    public Set<String> getTags() {
        return tags;
    }
    
    public void setTags(Set<String> tags) {
        this.tags = tags;
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
    
    public SeoInfoDto getSeo() {
        return seo;
    }
    
    public void setSeo(SeoInfoDto seo) {
        this.seo = seo;
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
    
    public Long getVersion() {
        return version;
    }
    
    public void setVersion(Long version) {
        this.version = version;
    }
}