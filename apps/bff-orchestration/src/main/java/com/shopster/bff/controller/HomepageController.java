package com.shopster.bff.controller;

import com.shopster.bff.client.ProductServiceClient;
import com.shopster.bff.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.Arrays;
import java.util.List;

/**
 * REST controller for homepage content operations
 */
@RestController
@RequestMapping("/api/v1/homepage")
@CrossOrigin(origins = "*", maxAge = 3600)
@Validated
@Slf4j
public class HomepageController {
    
    private final ProductServiceClient productServiceClient;
    
    @Autowired
    public HomepageController(ProductServiceClient productServiceClient) {
        this.productServiceClient = productServiceClient;
    }
    
    /**
     * Get hero content for homepage banner
     */
    @GetMapping("/hero-content")
    @Cacheable(value = "hero-content", unless = "#result.body.data.cards.isEmpty()")
    public ResponseEntity<ApiResponse<HeroContentDto>> getHeroContent() {
        log.info("Fetching hero content");
        
        try {
            // For now, return mock hero content
            // In a real application, this would come from a CMS or database
            List<HeroCardDto> heroCards = Arrays.asList(
                new HeroCardDto("hero-1", "Summer Sale", "Up to 50% off selected items", 
                    "https://via.placeholder.com/1200x400?text=Summer+Sale", "Shop Now", "/categories/sale", 1),
                new HeroCardDto("hero-2", "New Arrivals", "Check out our latest products", 
                    "https://via.placeholder.com/1200x400?text=New+Arrivals", "Discover", "/categories/new", 2),
                new HeroCardDto("hero-3", "Free Shipping", "On orders over $50", 
                    "https://via.placeholder.com/1200x400?text=Free+Shipping", "Learn More", "/shipping", 3)
            );
            
            HeroContentDto heroContent = new HeroContentDto(heroCards);
            return ResponseEntity.ok(ApiResponse.success(heroContent));
            
        } catch (Exception e) {
            log.error("Error fetching hero content: {}", e.getMessage());
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to load hero content", 500));
        }
    }
    
    /**
     * Get product carousel content by type
     */
    @GetMapping("/product-carousel/{carouselType}")
    public ResponseEntity<ApiResponse<ProductCarouselDto>> getProductCarousel(
            @PathVariable String carouselType,
            @RequestParam(defaultValue = "10") @Min(1) @Max(50) int limit) {
        
        log.info("Fetching product carousel: {} with limit: {}", carouselType, limit);
        
        try {
            List<ProductSummaryDto> products;
            String title;
            String viewAllLink;
            
            switch (carouselType.toLowerCase()) {
                case "featured":
                    products = productServiceClient.getFeaturedProducts(limit);
                    title = "Featured Products";
                    viewAllLink = "/products?category=featured";
                    break;
                case "trending":
                    products = productServiceClient.getTrendingProducts(limit);
                    title = "Trending Products";
                    viewAllLink = "/products?category=trending";
                    break;
                case "recommended":
                    products = productServiceClient.getRecommendedProducts(limit);
                    title = "Recommended Products";
                    viewAllLink = "/products?category=recommended";
                    break;
                case "random":
                    products = productServiceClient.getRandomProducts(limit);
                    title = "Random Products";
                    viewAllLink = "/products";
                    break;
                default:
                    log.warn("Unknown carousel type: {}", carouselType);
                    return ResponseEntity.badRequest()
                            .body(ApiResponse.error("Invalid carousel type. Must be: featured, trending, recommended, or random", 400));
            }
            
            ProductCarouselDto carousel = new ProductCarouselDto(title, products, viewAllLink);
            return ResponseEntity.ok(ApiResponse.success(carousel));
            
        } catch (Exception e) {
            log.error("Error fetching product carousel {}: {}", carouselType, e.getMessage());
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to load product carousel", 500));
        }
    }
    
    /**
     * Get footer banner content
     */
    @GetMapping("/footer-banners")
    @Cacheable(value = "footer-banners", unless = "#result.body.data.banners.isEmpty()")
    public ResponseEntity<ApiResponse<FooterBannerDto>> getFooterBanners() {
        log.info("Fetching footer banners");
        
        try {
            // Mock footer banner content
            List<FooterBannerDto.BannerContentDto> banners = Arrays.asList(
                new FooterBannerDto.BannerContentDto("footer-1", "promotion", "Free Shipping", 
                    "On orders over $50", "Learn More", "/shipping-info"),
                new FooterBannerDto.BannerContentDto("footer-2", "newsletter", "Stay Updated", 
                    "Subscribe to our newsletter for exclusive deals", "Subscribe", "/newsletter"),
                new FooterBannerDto.BannerContentDto("footer-3", "social", "Follow Us", 
                    "Join our community for the latest updates", "Follow", "/social")
            );
            
            FooterBannerDto footerBanners = new FooterBannerDto(banners);
            return ResponseEntity.ok(ApiResponse.success(footerBanners));
            
        } catch (Exception e) {
            log.error("Error fetching footer banners: {}", e.getMessage());
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to load footer banners", 500));
        }
    }
}