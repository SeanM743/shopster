package com.shopster.product.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Product document representing items in the product catalog.
 * Stored in MongoDB for flexible schema and search capabilities.
 */
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @Field("name")
    @TextIndexed
    @NotBlank(message = "Product name is required")
    @Size(max = 255, message = "Product name must not exceed 255 characters")
    private String name;

    @Field("description")
    @TextIndexed
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @Field("brand")
    @TextIndexed
    @NotBlank(message = "Brand is required")
    @Size(max = 100, message = "Brand must not exceed 100 characters")
    private String brand;

    @Field("category")
    @Indexed
    @NotBlank(message = "Category is required")
    private String category;

    @Field("subcategory")
    @Indexed
    private String subcategory;

    @Field("tags")
    @TextIndexed
    private Set<String> tags;

    @Field("sku")
    @Indexed(unique = true)
    @NotBlank(message = "SKU is required")
    @Size(max = 50, message = "SKU must not exceed 50 characters")
    private String sku;

    @Field("price")
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Price must have at most 8 integer digits and 2 decimal places")
    private BigDecimal price;

    @Field("sale_price")
    @DecimalMin(value = "0.0", inclusive = false, message = "Sale price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Sale price must have at most 8 integer digits and 2 decimal places")
    private BigDecimal salePrice;

    @Field("currency")
    @NotBlank(message = "Currency is required")
    @Size(min = 3, max = 3, message = "Currency must be a 3-character currency code")
    private String currency = "USD";

    @Field("images")
    @NotEmpty(message = "At least one product image is required")
    private List<ProductImage> images;

    @Field("specifications")
    private Map<String, String> specifications;

    @Field("variants")
    private List<ProductVariant> variants;

    @Field("inventory")
    @NotNull(message = "Inventory information is required")
    private Inventory inventory;

    @Field("rating")
    private Rating rating;

    @Field("shipping")
    private ShippingInfo shipping;

    @Field("seo")
    private SeoInfo seo;

    @Field("status")
    @NotNull(message = "Product status is required")
    private ProductStatus status = ProductStatus.ACTIVE;

    @Field("visibility")
    @NotNull(message = "Product visibility is required")
    private ProductVisibility visibility = ProductVisibility.PUBLIC;

    @Field("featured")
    private Boolean featured = false;

    @Field("trending")
    private Boolean trending = false;

    @Field("recommended")
    private Boolean recommended = false;

    @CreatedDate
    @Field("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Field("updated_at")
    private LocalDateTime updatedAt;

    @Field("version")
    private Long version = 1L;

    // Constructors
    public Product() {}

    public Product(String name, String brand, String category, String sku, BigDecimal price) {
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.sku = sku;
        this.price = price;
        this.inventory = new Inventory();
        this.rating = new Rating();
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

    public List<ProductImage> getImages() {
        return images;
    }

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    public Map<String, String> getSpecifications() {
        return specifications;
    }

    public void setSpecifications(Map<String, String> specifications) {
        this.specifications = specifications;
    }

    public List<ProductVariant> getVariants() {
        return variants;
    }

    public void setVariants(List<ProductVariant> variants) {
        this.variants = variants;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public ShippingInfo getShipping() {
        return shipping;
    }

    public void setShipping(ShippingInfo shipping) {
        this.shipping = shipping;
    }

    public SeoInfo getSeo() {
        return seo;
    }

    public void setSeo(SeoInfo seo) {
        this.seo = seo;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public ProductVisibility getVisibility() {
        return visibility;
    }

    public void setVisibility(ProductVisibility visibility) {
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

    // Helper methods
    public boolean hasDiscount() {
        return salePrice != null && salePrice.compareTo(price) < 0;
    }

    public BigDecimal getDiscountPercentage() {
        if (!hasDiscount()) return BigDecimal.ZERO;
        BigDecimal discount = price.subtract(salePrice);
        return discount.divide(price, 4, BigDecimal.ROUND_HALF_UP)
                       .multiply(new BigDecimal("100"))
                       .setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    public BigDecimal getEffectivePrice() {
        return hasDiscount() ? salePrice : price;
    }

    public ProductImage getPrimaryImage() {
        return images.stream()
                .filter(ProductImage::getIsPrimary)
                .findFirst()
                .orElse(images.isEmpty() ? null : images.get(0));
    }

    public boolean isInStock() {
        return inventory != null && inventory.getInStock() && inventory.getQuantity() > 0;
    }

    public boolean isLowStock() {
        return inventory != null && inventory.getInStock() && 
               inventory.getQuantity() <= inventory.getLowStockThreshold();
    }

    // Enums
    public enum ProductStatus {
        ACTIVE,
        INACTIVE,
        DISCONTINUED,
        DRAFT
    }

    public enum ProductVisibility {
        PUBLIC,
        PRIVATE,
        HIDDEN
    }
}