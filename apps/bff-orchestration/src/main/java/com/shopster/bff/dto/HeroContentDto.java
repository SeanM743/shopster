package com.shopster.bff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * DTO for hero content response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeroContentDto {
    
    private List<HeroCardDto> cards;
}