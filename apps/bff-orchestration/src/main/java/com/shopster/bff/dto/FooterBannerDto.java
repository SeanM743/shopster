package com.shopster.bff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * DTO for footer banners response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FooterBannerDto {
    
    private List<BannerContentDto> banners;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BannerContentDto {
        private String id;
        private String type; // promotion, newsletter, social, announcement
        private String title;
        private String message;
        private String ctaText;
        private String ctaLink;
    }
}