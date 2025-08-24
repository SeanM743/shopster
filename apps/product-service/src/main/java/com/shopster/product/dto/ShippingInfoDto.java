package com.shopster.product.dto;

public class ShippingInfoDto {
    private double weight;
    private DimensionsDto dimensions;
    private String shippingClass;
    
    // Default constructor
    public ShippingInfoDto() {}
    
    // Getters and setters
    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }
    
    public DimensionsDto getDimensions() { return dimensions; }
    public void setDimensions(DimensionsDto dimensions) { this.dimensions = dimensions; }
    
    public String getShippingClass() { return shippingClass; }
    public void setShippingClass(String shippingClass) { this.shippingClass = shippingClass; }
    
    // Inner class for dimensions
    public static class DimensionsDto {
        private double length;
        private double width;
        private double height;
        
        public DimensionsDto() {}
        
        public double getLength() { return length; }
        public void setLength(double length) { this.length = length; }
        
        public double getWidth() { return width; }
        public void setWidth(double width) { this.width = width; }
        
        public double getHeight() { return height; }
        public void setHeight(double height) { this.height = height; }
    }
}