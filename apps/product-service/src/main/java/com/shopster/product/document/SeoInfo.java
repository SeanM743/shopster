package com.shopster.product.document;

import javax.validation.constraints.Size;

import java.util.List;

/**
 * SeoInfo embedded document for storing product SEO metadata.
 */
public class SeoInfo {

    @Size(max = 255, message = "SEO title must not exceed 255 characters")
    private String title;

    @Size(max = 500, message = "Meta description must not exceed 500 characters")
    private String metaDescription;

    private List<String> keywords;

    @Size(max = 255, message = "URL slug must not exceed 255 characters")
    private String slug;

    @Size(max = 500, message = "Canonical URL must not exceed 500 characters")
    private String canonicalUrl;

    @Size(max = 500, message = "OG image must not exceed 500 characters")
    private String ogImage;

    @Size(max = 255, message = "OG title must not exceed 255 characters")
    private String ogTitle;

    @Size(max = 500, message = "OG description must not exceed 500 characters")
    private String ogDescription;

    // Constructors
    public SeoInfo() {}

    public SeoInfo(String title, String metaDescription, String slug) {
        this.title = title;
        this.metaDescription = metaDescription;
        this.slug = slug;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getCanonicalUrl() {
        return canonicalUrl;
    }

    public void setCanonicalUrl(String canonicalUrl) {
        this.canonicalUrl = canonicalUrl;
    }

    public String getOgImage() {
        return ogImage;
    }

    public void setOgImage(String ogImage) {
        this.ogImage = ogImage;
    }

    public String getOgTitle() {
        return ogTitle;
    }

    public void setOgTitle(String ogTitle) {
        this.ogTitle = ogTitle;
    }

    public String getOgDescription() {
        return ogDescription;
    }

    public void setOgDescription(String ogDescription) {
        this.ogDescription = ogDescription;
    }

    // Helper methods
    public String generateSlugFromName(String productName) {
        if (productName == null) return "";
        return productName.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }
}