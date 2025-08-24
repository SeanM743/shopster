package com.shopster.product.dto;

import java.util.List;

public class SeoInfoDto {
    private String metaTitle;
    private String metaDescription;
    private String slug;
    private List<String> keywords;
    
    // Default constructor
    public SeoInfoDto() {}
    
    // Getters and setters
    public String getMetaTitle() { return metaTitle; }
    public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
    
    public String getMetaDescription() { return metaDescription; }
    public void setMetaDescription(String metaDescription) { this.metaDescription = metaDescription; }
    
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    
    public List<String> getKeywords() { return keywords; }
    public void setKeywords(List<String> keywords) { this.keywords = keywords; }
}