package com.shopster.product.dto;

import java.math.BigDecimal;
import java.util.Map;

public class ProductVariantDto {
    private String id;
    private String name;
    private String sku;
    private BigDecimal price;
    private Map<String, String> attributes;
    private InventoryDto inventory;
    
    // Default constructor
    public ProductVariantDto() {}
    
    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public Map<String, String> getAttributes() { return attributes; }
    public void setAttributes(Map<String, String> attributes) { this.attributes = attributes; }
    
    public InventoryDto getInventory() { return inventory; }
    public void setInventory(InventoryDto inventory) { this.inventory = inventory; }
}