/**
 * Product API types for catalog and search functionality
 */

import { 
  Product, 
  ProductDetail, 
  ProductSummary, 
  ProductSearchFilters, 
  ProductSearchResult,
  ProductSortBy,
  ProductStatus,
  ProductVisibility,
  StockStatus 
} from '../domain/product';
import { ApiResponse, PaginationRequest, PaginationResponse, SearchRequest } from './common';

// Product API request types
export interface ProductDetailRequest {
  productId: string;
  includeRelated?: boolean;
  includeReviews?: boolean;
}

export interface ProductSearchRequest extends SearchRequest {
  query?: string;
  filters?: ProductSearchFilters;
  includeOutOfStock?: boolean;
}

export interface ProductListRequest extends PaginationRequest {
  category?: string;
  subcategory?: string;
  featured?: boolean;
  trending?: boolean;
  recommended?: boolean;
  status?: ProductStatus;
  visibility?: ProductVisibility;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  brand: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  sku: string;
  price: number;
  salePrice?: number;
  currency?: string;
  images: ProductImageRequest[];
  specifications?: Record<string, string>;
  variants?: ProductVariantRequest[];
  inventory: InventoryRequest;
  shipping?: ShippingInfoRequest;
  seo?: SeoInfoRequest;
  status?: ProductStatus;
  visibility?: ProductVisibility;
  featured?: boolean;
  trending?: boolean;
  recommended?: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductImageRequest {
  url: string;
  alt: string;
  isPrimary?: boolean;
  zoomUrl?: string;
  type?: string;
  sortOrder?: number;
}

export interface ProductVariantRequest {
  name: string;
  value: string;
  type: string;
  priceModifier?: number;
  imageUrl?: string;
  colorCode?: string;
  available?: boolean;
  sortOrder?: number;
}

export interface InventoryRequest {
  quantity: number;
  inStock?: boolean;
  lowStockThreshold?: number;
  trackQuantity?: boolean;
  allowBackorders?: boolean;
}

export interface ShippingInfoRequest {
  freeShipping?: boolean;
  shippingCost?: number;
  freeShippingThreshold?: number;
  estimatedDelivery?: string;
  minDeliveryDays?: number;
  maxDeliveryDays?: number;
  weight?: number;
  dimensions?: string;
  requiresSpecialHandling?: boolean;
  restrictions?: string;
}

export interface SeoInfoRequest {
  title?: string;
  metaDescription?: string;
  keywords?: string[];
  slug?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

// Inventory management types
export interface UpdateInventoryRequest {
  productId: string;
  quantity: number;
  operation: InventoryOperation;
  reason?: string;
}

export interface BulkInventoryUpdateRequest {
  updates: UpdateInventoryRequest[];
}

export interface StockReservationRequest {
  productId: string;
  quantity: number;
  reservationId: string;
  expiresAt?: string;
}

// Product analytics types
export interface ProductAnalyticsRequest {
  productIds?: string[];
  dateFrom: string;
  dateTo: string;
  metrics?: ProductMetric[];
}

export interface ProductAnalyticsResponse {
  data: ProductAnalytics[];
}

export interface ProductAnalytics {
  productId: string;
  productName: string;
  views: number;
  clicks: number;
  addToCarts: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  bounceRate: number;
  averageSessionDuration: number;
}

// API Response types
export type ProductDetailApiResponse = ApiResponse<ProductDetail>;
export type ProductSearchApiResponse = ApiResponse<ProductSearchResult>;
export type ProductListApiResponse = ApiResponse<PaginationResponse<ProductSummary>>;
export type CreateProductApiResponse = ApiResponse<Product>;
export type UpdateProductApiResponse = ApiResponse<Product>;
export type BulkInventoryUpdateApiResponse = ApiResponse<{ updated: number; failed: number; errors: string[] }>;
export type ProductAnalyticsApiResponse = ApiResponse<ProductAnalyticsResponse>;

// Category management types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  level: number;
  sortOrder: number;
  imageUrl?: string;
  isActive: boolean;
  productCount: number;
  children?: Category[];
}

export interface CreateCategoryRequest {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
  sortOrder?: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface CategoryTreeResponse extends ApiResponse<Category[]> {}
export type CategoryApiResponse = ApiResponse<Category>;

// Enums
export enum InventoryOperation {
  SET = 'set',
  ADD = 'add',
  SUBTRACT = 'subtract',
  RESERVE = 'reserve',
  RELEASE = 'release'
}

export enum ProductMetric {
  VIEWS = 'views',
  CLICKS = 'clicks',
  ADD_TO_CARTS = 'addToCarts',
  PURCHASES = 'purchases',
  REVENUE = 'revenue',
  CONVERSION_RATE = 'conversionRate'
}

// API endpoint paths
export const PRODUCT_ENDPOINTS = {
  // Product CRUD
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/{productId}',
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT: '/products/{productId}',
  DELETE_PRODUCT: '/products/{productId}',
  
  // Product search and listing
  SEARCH: '/products/search',
  FEATURED: '/products/featured',
  TRENDING: '/products/trending',
  RECOMMENDED: '/products/recommended',
  BY_CATEGORY: '/products/category/{categoryId}',
  
  // Inventory management
  UPDATE_INVENTORY: '/products/{productId}/inventory',
  BULK_INVENTORY_UPDATE: '/products/inventory/bulk',
  RESERVE_STOCK: '/products/{productId}/inventory/reserve',
  RELEASE_STOCK: '/products/{productId}/inventory/release',
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_TREE: '/categories/tree',
  CREATE_CATEGORY: '/categories',
  UPDATE_CATEGORY: '/categories/{categoryId}',
  DELETE_CATEGORY: '/categories/{categoryId}',
  
  // Analytics
  ANALYTICS: '/products/analytics',
  PRODUCT_ANALYTICS: '/products/{productId}/analytics'
} as const;

// Search configuration
export const SEARCH_CONFIG = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 200,
  DEFAULT_SORT: ProductSortBy.RELEVANCE,
  FACET_LIMITS: {
    CATEGORIES: 20,
    BRANDS: 20,
    TAGS: 30,
    PRICE_RANGES: 10
  }
} as const;