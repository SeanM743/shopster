package com.shopster.product.repository;

import com.shopster.product.document.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Product document operations
 */
@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    /**
     * Find product by SKU
     */
    Optional<Product> findBySku(String sku);
    
    /**
     * Check if product exists by SKU
     */
    boolean existsBySku(String sku);
    
    /**
     * Find products by category
     */
    Page<Product> findByCategoryAndStatusAndVisibility(
            String category, 
            Product.ProductStatus status, 
            Product.ProductVisibility visibility, 
            Pageable pageable);
    
    /**
     * Find products by brand
     */
    Page<Product> findByBrandAndStatusAndVisibility(
            String brand, 
            Product.ProductStatus status, 
            Product.ProductVisibility visibility, 
            Pageable pageable);
    
    /**
     * Find featured products
     */
    @Query("{'featured': true, 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> findFeaturedProducts(Pageable pageable);
    
    /**
     * Find trending products
     */
    @Query("{'trending': true, 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> findTrendingProducts(Pageable pageable);
    
    /**
     * Find recommended products
     */
    @Query("{'recommended': true, 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> findRecommendedProducts(Pageable pageable);
    
    /**
     * Search products by text
     */
    @Query("{'$text': {'$search': ?0}, 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> searchByText(String searchText, Pageable pageable);
    
    /**
     * Find products by price range
     */
    @Query("{'$or': [" +
           "{'salePrice': {'$gte': ?0, '$lte': ?1}}, " +
           "{'$and': [{'salePrice': null}, {'price': {'$gte': ?0, '$lte': ?1}}]}" +
           "], 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> findByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    /**
     * Find products with discount
     */
    @Query("{'salePrice': {'$ne': null, '$lt': '$price'}, 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> findProductsWithDiscount(Pageable pageable);
    
    /**
     * Find products by tags
     */
    @Query("{'tags': {'$in': ?0}, 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> findByTagsIn(List<String> tags, Pageable pageable);
    
    /**
     * Find in-stock products
     */
    @Query("{'inventory.inStock': true, 'inventory.quantity': {'$gt': 0}, 'status': 'ACTIVE', 'visibility': 'PUBLIC'}")
    Page<Product> findInStockProducts(Pageable pageable);
    
    /**
     * Find low-stock products (for admin)
     */
    @Query("{'inventory.inStock': true, '$expr': {'$lte': ['$inventory.quantity', '$inventory.lowStockThreshold']}}")
    List<Product> findLowStockProducts();
    
    /**
     * Advanced product search with filters
     */
    @Query("{'$and': [" +
           "{'$or': [{'name': {'$regex': ?0, '$options': 'i'}}, {'brand': {'$regex': ?0, '$options': 'i'}}, {'tags': {'$regex': ?0, '$options': 'i'}}]}, " +
           "{'category': {'$in': ?1}}, " +
           "{'$or': [{'salePrice': {'$gte': ?2, '$lte': ?3}}, {'$and': [{'salePrice': null}, {'price': {'$gte': ?2, '$lte': ?3}}]}]}, " +
           "{'status': 'ACTIVE', 'visibility': 'PUBLIC'}" +
           "]}")
    Page<Product> searchProducts(String searchTerm, List<String> categories, 
                               BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
    
    /**
     * Count products by category
     */
    Long countByCategoryAndStatusAndVisibility(
            String category, 
            Product.ProductStatus status, 
            Product.ProductVisibility visibility);
    
    /**
     * Count total active products
     */
    Long countByStatusAndVisibility(Product.ProductStatus status, Product.ProductVisibility visibility);
    
    /**
     * Find distinct categories
     */
    @Query(value = "{}", fields = "{'category': 1}")
    List<String> findDistinctCategories();
    
    /**
     * Find distinct brands
     */
    @Query(value = "{}", fields = "{'brand': 1}")
    List<String> findDistinctBrands();
}