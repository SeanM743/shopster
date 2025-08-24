package com.shopster.bff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for hero banner cards
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroCardDto {
    
    private String id;
    private String title;
    private String subtitle;
    private String backgroundImage;
    private String ctaText;
    private String ctaLink;
    private int priority;
}