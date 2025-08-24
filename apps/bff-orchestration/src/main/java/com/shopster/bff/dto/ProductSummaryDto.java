package com.shopster.bff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

/**
 * DTO for product summary in carousels
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSummaryDto {
    
    private String id;
    private String name;
    private BigDecimal price;
    private BigDecimal salePrice;
    private String image;
    private Double rating;
    private Integer reviewCount;
    private Boolean inStock;
    private String badge; // sale, new, featured
}