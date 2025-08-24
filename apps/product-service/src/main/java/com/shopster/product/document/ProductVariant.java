package com.shopster.product.document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;

import java.math.BigDecimal;

/**
 * ProductVariant embedded document for storing product variations.
 * Examples: different colors, sizes, or other configurable options.
 */
public class ProductVariant {

    @NotBlank(message = "Variant name is required")
    @Size(max = 100, message = "Variant name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Variant value is required")
    @Size(max = 100, message = "Variant value must not exceed 100 characters")
    private String value;

    @NotBlank(message = "Variant type is required")
    @Size(max = 50, message = "Variant type must not exceed 50 characters")
    private String type; // color, size, style, etc.

    @DecimalMin(value = "0.0", message = "Price modifier must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Price modifier must have at most 8 integer digits and 2 decimal places")
    private BigDecimal priceModifier = BigDecimal.ZERO;

    @Size(max = 255, message = "Image URL must not exceed 255 characters")
    private String imageUrl;

    @Size(max = 50, message = "Color code must not exceed 50 characters")
    private String colorCode; // For color variants

    private Boolean available = true;

    private Integer sortOrder = 0;

    // Constructors
    public ProductVariant() {}

    public ProductVariant(String name, String value, String type) {
        this.name = name;
        this.value = value;
        this.type = type;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getPriceModifier() {
        return priceModifier;
    }

    public void setPriceModifier(BigDecimal priceModifier) {
        this.priceModifier = priceModifier;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    // Variant types constants
    public static class VariantTypes {
        public static final String COLOR = "color";
        public static final String SIZE = "size";
        public static final String STYLE = "style";
        public static final String MATERIAL = "material";
        public static final String CAPACITY = "capacity";
    }
}