/**
 * Homepage API types for the Shopster platform
 * Based on the backend orchestration specification
 */

import { ProductSummary } from '../domain/product';

export interface HeroContentResponse {
  data: {
    cards: HeroCard[];
  };
  status: number;
  message: string;
}

export interface HeroCard {
  id: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
  priority: number;
}

export interface ProductCarouselResponse {
  data: {
    title: string;
    products: ProductSummary[];
    viewAllLink?: string;
  };
  status: number;
  message?: string;
}

export interface FooterBannersResponse {
  data: {
    banners: FooterBanner[];
  };
  status: number;
  message?: string;
}

export interface FooterBanner {
  id: string;
  type: FooterBannerType;
  title: string;
  message: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Homepage component props interfaces for React components
export interface HeroBannerProps {
  cards: HeroCard[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
}

export interface ProductCarouselProps {
  title: string;
  products: ProductSummary[];
  viewAllLink?: string;
  itemsPerView: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
}

export interface FooterBannerProps {
  type: 'single' | 'grid' | 'carousel';
  content: FooterBanner[];
  backgroundColor?: string;
  dismissible?: boolean;
}

// Enums
export enum CarouselType {
  FEATURED = 'featured',
  TRENDING = 'trending',
  RECOMMENDED = 'recommended'
}

export enum FooterBannerType {
  PROMOTION = 'promotion',
  NEWSLETTER = 'newsletter',
  SOCIAL = 'social',
  ANNOUNCEMENT = 'announcement'
}

// API endpoint paths
export const HOMEPAGE_ENDPOINTS = {
  HERO_CONTENT: '/homepage/hero-content',
  PRODUCT_CAROUSEL: '/homepage/product-carousel',
  FOOTER_BANNERS: '/homepage/footer-banners'
} as const;

// Carousel configuration
export const CAROUSEL_CONFIG = {
  AUTO_PLAY_INTERVAL: 5000,
  TRANSITION_DURATION: 300,
  ITEMS_PER_VIEW: {
    mobile: { min: 1, max: 2.5 },
    tablet: { min: 2, max: 3.5 },
    desktop: { min: 4, max: 5 }
  }
} as const;