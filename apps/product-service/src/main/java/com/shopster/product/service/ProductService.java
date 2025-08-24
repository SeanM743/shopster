package com.shopster.product.service;

import com.shopster.product.document.Product;
import com.shopster.product.dto.ProductSummaryDto;
import com.shopster.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * Get random products using MongoDB aggregation
     */
    public List<ProductSummaryDto> getRandomProducts(int limit) {
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.match(Criteria.where("status").is(Product.ProductStatus.ACTIVE)
                .and("visibility").is(Product.ProductVisibility.PUBLIC)),
            Aggregation.sample(limit)
        );

        AggregationResults<Product> results = mongoTemplate.aggregate(
            aggregation, "products", Product.class);

        return results.getMappedResults().stream()
                .map(this::convertToSummaryDto)
                .collect(Collectors.toList());
    }

    /**
     * Get featured products
     */
    public List<ProductSummaryDto> getFeaturedProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<Product> products = productRepository.findFeaturedProducts(pageable);
        return products.getContent().stream()
                .map(this::convertToSummaryDto)
                .collect(Collectors.toList());
    }

    /**
     * Get trending products
     */
    public List<ProductSummaryDto> getTrendingProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<Product> products = productRepository.findTrendingProducts(pageable);
        return products.getContent().stream()
                .map(this::convertToSummaryDto)
                .collect(Collectors.toList());
    }

    /**
     * Get recommended products
     */
    public List<ProductSummaryDto> getRecommendedProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<Product> products = productRepository.findRecommendedProducts(pageable);
        return products.getContent().stream()
                .map(this::convertToSummaryDto)
                .collect(Collectors.toList());
    }

    /**
     * Get product by ID
     */
    public Optional<ProductSummaryDto> getProductById(String id) {
        return productRepository.findById(id)
                .map(this::convertToSummaryDto);
    }

    /**
     * Get all products with pagination
     */
    public Page<ProductSummaryDto> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::convertToSummaryDto);
    }

    /**
     * Search products by text
     */
    public Page<ProductSummaryDto> searchProducts(String searchText, Pageable pageable) {
        return productRepository.searchByText(searchText, pageable)
                .map(this::convertToSummaryDto);
    }

    /**
     * Get products by category
     */
    public Page<ProductSummaryDto> getProductsByCategory(String category, Pageable pageable) {
        return productRepository.findByCategoryAndStatusAndVisibility(
                category, 
                Product.ProductStatus.ACTIVE, 
                Product.ProductVisibility.PUBLIC, 
                pageable)
                .map(this::convertToSummaryDto);
    }

    /**
     * Convert Product entity to summary DTO
     */
    private ProductSummaryDto convertToSummaryDto(Product product) {
        ProductSummaryDto dto = new ProductSummaryDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setBrand(product.getBrand());
        dto.setCategory(product.getCategory());
        dto.setPrice(product.getPrice());
        dto.setSalePrice(product.getSalePrice());
        
        // Set primary image URL
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            dto.setImageUrl(product.getPrimaryImage().getUrl());
        }
        
        // Set rating information
        if (product.getRating() != null) {
            dto.setRating(product.getRating().getAverage());
            dto.setReviewCount(product.getRating().getCount());
        }
        
        // Set inventory information
        dto.setInStock(product.isInStock());
        dto.setQuantity(product.getInventory() != null ? product.getInventory().getQuantity() : 0);
        
        // Set badges
        if (product.getFeatured()) {
            dto.setBadge("featured");
        } else if (product.getTrending()) {
            dto.setBadge("trending");
        } else if (product.hasDiscount()) {
            dto.setBadge("sale");
        }
        
        return dto;
    }
}