package com.shopster.product.controller;

import com.shopster.product.dto.ProductSummaryDto;
import com.shopster.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for product operations
 */
@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*", maxAge = 3600)
@Validated
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Get random products for homepage
     */
    @GetMapping("/random")
    public ResponseEntity<List<ProductSummaryDto>> getRandomProducts(
            @RequestParam(defaultValue = "15") @Min(1) @Max(50) int limit) {
        List<ProductSummaryDto> products = productService.getRandomProducts(limit);
        return ResponseEntity.ok(products);
    }

    /**
     * Get featured products
     */
    @GetMapping("/featured")
    public ResponseEntity<List<ProductSummaryDto>> getFeaturedProducts(
            @RequestParam(defaultValue = "10") @Min(1) @Max(50) int limit) {
        List<ProductSummaryDto> products = productService.getFeaturedProducts(limit);
        return ResponseEntity.ok(products);
    }

    /**
     * Get trending products
     */
    @GetMapping("/trending")
    public ResponseEntity<List<ProductSummaryDto>> getTrendingProducts(
            @RequestParam(defaultValue = "10") @Min(1) @Max(50) int limit) {
        List<ProductSummaryDto> products = productService.getTrendingProducts(limit);
        return ResponseEntity.ok(products);
    }

    /**
     * Get recommended products
     */
    @GetMapping("/recommended")
    public ResponseEntity<List<ProductSummaryDto>> getRecommendedProducts(
            @RequestParam(defaultValue = "10") @Min(1) @Max(50) int limit) {
        List<ProductSummaryDto> products = productService.getRecommendedProducts(limit);
        return ResponseEntity.ok(products);
    }

    /**
     * Get product by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductSummaryDto> getProductById(@PathVariable String id) {
        Optional<ProductSummaryDto> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get all products with pagination
     */
    @GetMapping
    public ResponseEntity<Page<ProductSummaryDto>> getAllProducts(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("DESC") ? 
                   Sort.by(sortBy).descending() : 
                   Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ProductSummaryDto> products = productService.getAllProducts(pageable);
        return ResponseEntity.ok(products);
    }

    /**
     * Search products by text
     */
    @GetMapping("/search")
    public ResponseEntity<Page<ProductSummaryDto>> searchProducts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductSummaryDto> products = productService.searchProducts(q, pageable);
        return ResponseEntity.ok(products);
    }

    /**
     * Get products by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<ProductSummaryDto>> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductSummaryDto> products = productService.getProductsByCategory(category, pageable);
        return ResponseEntity.ok(products);
    }
}