package com.shopster.product.dto;

public class InventoryDto {
    private int quantity;
    private boolean inStock;
    private int lowStockThreshold;
    private boolean trackQuantity;
    private boolean allowBackorders;
    private int reservedQuantity;
    private String stockStatus;
    
    // Default constructor
    public InventoryDto() {}
    
    // Getters and setters
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    
    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }
    
    public int getLowStockThreshold() { return lowStockThreshold; }
    public void setLowStockThreshold(int lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; }
    
    public boolean isTrackQuantity() { return trackQuantity; }
    public void setTrackQuantity(boolean trackQuantity) { this.trackQuantity = trackQuantity; }
    
    public boolean isAllowBackorders() { return allowBackorders; }
    public void setAllowBackorders(boolean allowBackorders) { this.allowBackorders = allowBackorders; }
    
    public int getReservedQuantity() { return reservedQuantity; }
    public void setReservedQuantity(int reservedQuantity) { this.reservedQuantity = reservedQuantity; }
    
    public String getStockStatus() { return stockStatus; }
    public void setStockStatus(String stockStatus) { this.stockStatus = stockStatus; }
}