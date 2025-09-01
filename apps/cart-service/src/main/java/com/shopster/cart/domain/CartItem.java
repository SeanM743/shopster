package com.shopster.cart.domain;

import java.math.BigDecimal;

public class CartItem {

    private String productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
    private String imageUrl;
    private String brand;
    private boolean inStock;

    public CartItem() {
        this.imageUrl = "";
        this.brand = "";
        this.inStock = true;
    }

    public CartItem(String productId, String productName, int quantity, BigDecimal price) {
        this();
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    public CartItem(String productId, String productName, int quantity, BigDecimal price, String imageUrl, String brand, boolean inStock) {
        this();
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.imageUrl = imageUrl;
        this.brand = brand;
        this.inStock = inStock;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }
}
