/**
 * Product-related type definitions for the Shopster platform
 */

export interface Product {
  id: string;
  name: string;
  description?: string;
  brand: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  sku: string;
  price: number;
  salePrice?: number;
  currency: string;
  images: ProductImage[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  inventory: Inventory;
  rating: Rating;
  shipping?: ShippingInfo;
  seo?: SeoInfo;
  status: ProductStatus;
  visibility: ProductVisibility;
  featured: boolean;
  trending: boolean;
  recommended: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  zoomUrl?: string;
  type?: string;
  sortOrder: number;
}

export interface ProductVariant {
  name: string;
  value: string;
  type: string;
  priceModifier: number;
  imageUrl?: string;
  colorCode?: string;
  available: boolean;
  sortOrder: number;
}

export interface Inventory {
  quantity: number;
  inStock: boolean;
  lowStockThreshold: number;
  trackQuantity: boolean;
  allowBackorders: boolean;
  reservedQuantity: number;
  stockStatus: StockStatus;
  availableQuantity: number;
}

export interface Rating {
  average: number;
  count: number;
  distribution?: Record<number, number>; // Star rating -> count
}

export interface ShippingInfo {
  freeShipping: boolean;
  shippingCost: number;
  freeShippingThreshold?: number;
  estimatedDelivery: string;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  weight?: number;
  dimensions?: string;
  requiresSpecialHandling: boolean;
  restrictions?: string;
}

export interface SeoInfo {
  title?: string;
  metaDescription?: string;
  keywords?: string[];
  slug?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: ProductBadge;
}

export interface ProductDetail extends Product {
  relatedProducts?: ProductSummary[];
  reviews?: ProductReview[];
  breadcrumbs?: BreadcrumbItem[];
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment?: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ProductSearchFilters {
  category?: string;
  subcategory?: string;
  brand?: string[];
  priceRange?: PriceRange;
  rating?: number;
  inStock?: boolean;
  tags?: string[];
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductSearchResult {
  products: ProductSummary[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: AvailableFilters;
}

export interface AvailableFilters {
  categories: FilterOption[];
  brands: FilterOption[];
  priceRanges: PriceRangeOption[];
  ratings: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface PriceRangeOption {
  min: number;
  max: number;
  label: string;
  count: number;
}

// Enums
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  DRAFT = 'DRAFT'
}

export enum ProductVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  HIDDEN = 'HIDDEN'
}

export enum StockStatus {
  IN_STOCK = 'in_stock',
  LOW_STOCK = 'low_stock',
  OUT_OF_STOCK = 'out_of_stock',
  BACKORDER = 'backorder'
}

export enum ProductBadge {
  SALE = 'sale',
  NEW = 'new',
  FEATURED = 'featured',
  BESTSELLER = 'bestseller'
}

export enum ProductSortBy {
  RELEVANCE = 'relevance',
  PRICE_LOW_HIGH = 'price_asc',
  PRICE_HIGH_LOW = 'price_desc',
  RATING = 'rating',
  NEWEST = 'newest',
  POPULARITY = 'popularity'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

// Variant type constants
export const VARIANT_TYPES = {
  COLOR: 'color',
  SIZE: 'size',
  STYLE: 'style',
  MATERIAL: 'material',
  CAPACITY: 'capacity'
} as const;

// Product categories
export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'electronics',
  CLOTHING: 'clothing',
  HOME_GARDEN: 'home-garden',
  BOOKS: 'books',
  SPORTS_OUTDOORS: 'sports-outdoors',
  HEALTH_BEAUTY: 'health-beauty',
  TOYS_GAMES: 'toys-games',
  AUTOMOTIVE: 'automotive'
} as const;