package com.shopster.product.document;

import javax.validation.constraints.Min;

/**
 * Inventory embedded document for managing product stock and availability.
 */
public class Inventory {

    @Min(value = 0, message = "Quantity must be non-negative")
    private Integer quantity = 0;

    private Boolean inStock = false;

    @Min(value = 0, message = "Low stock threshold must be non-negative")
    private Integer lowStockThreshold = 5;

    private Boolean trackQuantity = true;

    private Boolean allowBackorders = false;

    @Min(value = 0, message = "Reserved quantity must be non-negative")
    private Integer reservedQuantity = 0;

    private String stockStatus = "in_stock"; // in_stock, out_of_stock, low_stock, backorder

    // Constructors
    public Inventory() {}

    public Inventory(Integer quantity, Boolean inStock) {
        this.quantity = quantity;
        this.inStock = inStock;
        updateStockStatus();
    }

    // Getters and Setters
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        updateStockStatus();
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
        updateStockStatus();
    }

    public Integer getLowStockThreshold() {
        return lowStockThreshold;
    }

    public void setLowStockThreshold(Integer lowStockThreshold) {
        this.lowStockThreshold = lowStockThreshold;
        updateStockStatus();
    }

    public Boolean getTrackQuantity() {
        return trackQuantity;
    }

    public void setTrackQuantity(Boolean trackQuantity) {
        this.trackQuantity = trackQuantity;
    }

    public Boolean getAllowBackorders() {
        return allowBackorders;
    }

    public void setAllowBackorders(Boolean allowBackorders) {
        this.allowBackorders = allowBackorders;
    }

    public Integer getReservedQuantity() {
        return reservedQuantity;
    }

    public void setReservedQuantity(Integer reservedQuantity) {
        this.reservedQuantity = reservedQuantity;
        updateStockStatus();
    }

    public String getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(String stockStatus) {
        this.stockStatus = stockStatus;
    }

    // Helper methods
    public Integer getAvailableQuantity() {
        return Math.max(0, quantity - reservedQuantity);
    }

    public boolean isLowStock() {
        return inStock && getAvailableQuantity() <= lowStockThreshold && getAvailableQuantity() > 0;
    }

    public boolean isOutOfStock() {
        return !inStock || getAvailableQuantity() <= 0;
    }

    public void reserve(Integer amount) {
        if (amount > 0 && amount <= getAvailableQuantity()) {
            reservedQuantity += amount;
            updateStockStatus();
        }
    }

    public void release(Integer amount) {
        if (amount > 0 && amount <= reservedQuantity) {
            reservedQuantity -= amount;
            updateStockStatus();
        }
    }

    public void consume(Integer amount) {
        if (amount > 0 && amount <= quantity) {
            quantity -= amount;
            reservedQuantity = Math.max(0, reservedQuantity - amount);
            updateStockStatus();
        }
    }

    private void updateStockStatus() {
        if (!inStock || getAvailableQuantity() <= 0) {
            if (allowBackorders) {
                stockStatus = "backorder";
            } else {
                stockStatus = "out_of_stock";
            }
        } else if (isLowStock()) {
            stockStatus = "low_stock";
        } else {
            stockStatus = "in_stock";
        }
    }

    // Stock status constants
    public static class StockStatus {
        public static final String IN_STOCK = "in_stock";
        public static final String LOW_STOCK = "low_stock";
        public static final String OUT_OF_STOCK = "out_of_stock";
        public static final String BACKORDER = "backorder";
    }
}