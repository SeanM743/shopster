package com.shopster.bff.client;

import com.shopster.bff.dto.ProductSummaryDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

/**
 * Client for communicating with Product Service
 */
@Component
@Slf4j
public class ProductServiceClient {
    
    private final WebClient webClient;
    
    public ProductServiceClient(@Value("${services.product-service.url}") String productServiceUrl) {
        this.webClient = WebClient.builder()
                .baseUrl(productServiceUrl)
                .build();
    }
    
    @CircuitBreaker(name = "product-service", fallbackMethod = "getFeaturedProductsFallback")
    @Retry(name = "product-service")
    @Cacheable(value = "featured-products", unless = "#result.isEmpty()")
    public List<ProductSummaryDto> getFeaturedProducts(int limit) {
        log.info("Fetching featured products with limit: {}", limit);
        
        try {
            return webClient.get()
                    .uri("/api/v1/products/featured?limit={limit}", limit)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<ProductSummaryDto>>() {})
                    .timeout(Duration.ofSeconds(5))
                    .block();
        } catch (Exception e) {
            log.error("Error fetching featured products: {}", e.getMessage());
            return getFeaturedProductsFallback(limit, e);
        }
    }
    
    @CircuitBreaker(name = "product-service", fallbackMethod = "getTrendingProductsFallback")
    @Retry(name = "product-service")
    @Cacheable(value = "trending-products", unless = "#result.isEmpty()")
    public List<ProductSummaryDto> getTrendingProducts(int limit) {
        log.info("Fetching trending products with limit: {}", limit);
        
        try {
            return webClient.get()
                    .uri("/api/v1/products/trending?limit={limit}", limit)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<ProductSummaryDto>>() {})
                    .timeout(Duration.ofSeconds(5))
                    .block();
        } catch (Exception e) {
            log.error("Error fetching trending products: {}", e.getMessage());
            return getTrendingProductsFallback(limit, e);
        }
    }
    
    @CircuitBreaker(name = "product-service", fallbackMethod = "getRecommendedProductsFallback")
    @Retry(name = "product-service")
    @Cacheable(value = "recommended-products", unless = "#result.isEmpty()")
    public List<ProductSummaryDto> getRecommendedProducts(int limit) {
        log.info("Fetching recommended products with limit: {}", limit);
        
        try {
            return webClient.get()
                    .uri("/api/v1/products/recommended?limit={limit}", limit)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<ProductSummaryDto>>() {})
                    .timeout(Duration.ofSeconds(5))
                    .block();
        } catch (Exception e) {
            log.error("Error fetching recommended products: {}", e.getMessage());
            return getRecommendedProductsFallback(limit, e);
        }
    }

    @CircuitBreaker(name = "product-service", fallbackMethod = "getRandomProductsFallback")
    @Retry(name = "product-service")
    @Cacheable(value = "random-products", unless = "#result.isEmpty()")
    public List<ProductSummaryDto> getRandomProducts(int limit) {
        log.info("Fetching random products with limit: {}", limit);
        
        try {
            return webClient.get()
                    .uri("/api/v1/products/random?limit={limit}", limit)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<ProductSummaryDto>>() {})
                    .timeout(Duration.ofSeconds(5))
                    .block();
        } catch (Exception e) {
            log.error("Error fetching random products: {}", e.getMessage());
            return getRandomProductsFallback(limit, e);
        }
    }
    
    @CircuitBreaker(name = "product-service", fallbackMethod = "getProductByIdFallback")
    @Retry(name = "product-service")
    @Cacheable(value = "products", key = "#productId")
    public ProductSummaryDto getProductById(String productId) {
        log.info("Fetching product by id: {}", productId);
        
        try {
            return webClient.get()
                    .uri("/api/v1/products/{productId}", productId)
                    .retrieve()
                    .bodyToMono(ProductSummaryDto.class)
                    .timeout(Duration.ofSeconds(5))
                    .block();
        } catch (Exception e) {
            log.error("Error fetching product {}: {}", productId, e.getMessage());
            return getProductByIdFallback(productId, e);
        }
    }
    
    // Fallback methods
    public List<ProductSummaryDto> getFeaturedProductsFallback(int limit, Exception ex) {
        log.warn("Using fallback for featured products due to: {}", ex.getMessage());
        return createMockProducts("Featured Product", limit);
    }
    
    public List<ProductSummaryDto> getTrendingProductsFallback(int limit, Exception ex) {
        log.warn("Using fallback for trending products due to: {}", ex.getMessage());
        return createMockProducts("Trending Product", limit);
    }
    
    public List<ProductSummaryDto> getRecommendedProductsFallback(int limit, Exception ex) {
        log.warn("Using fallback for recommended products due to: {}", ex.getMessage());
        return createMockProducts("Recommended Product", limit);
    }

    public List<ProductSummaryDto> getRandomProductsFallback(int limit, Exception ex) {
        log.warn("Using fallback for random products due to: {}", ex.getMessage());
        return createMockProducts("Random Product", limit);
    }
    
    public ProductSummaryDto getProductByIdFallback(String productId, Exception ex) {
        log.warn("Using fallback for product {} due to: {}", productId, ex.getMessage());
        return createMockProduct("Product " + productId);
    }
    
    private List<ProductSummaryDto> createMockProducts(String namePrefix, int limit) {
        return Arrays.stream(new int[Math.min(limit, 5)])
                .mapToObj(i -> createMockProduct(namePrefix + " " + (i + 1)))
                .toList();
    }
    
    private ProductSummaryDto createMockProduct(String name) {
        var product = new ProductSummaryDto();
        product.setId("mock-" + name.toLowerCase().replace(" ", "-"));
        product.setName(name);
        product.setPrice(java.math.BigDecimal.valueOf(99.99));
        product.setImage("https://via.placeholder.com/300x300?text=" + name.replace(" ", "+"));
        product.setRating(4.5);
        product.setReviewCount(150);
        product.setInStock(true);
        product.setBadge("featured");
        return product;
    }
}