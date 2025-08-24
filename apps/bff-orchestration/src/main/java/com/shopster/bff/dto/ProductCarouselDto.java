package com.shopster.bff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * DTO for product carousel response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCarouselDto {
    
    private String title;
    private List<ProductSummaryDto> products;
    private String viewAllLink;
}