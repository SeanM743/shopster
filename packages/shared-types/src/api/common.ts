/**
 * Common API types used across all services in the Shopster platform
 */

export interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: number;
  timestamp: string;
  error?: ErrorDetails;
}

export interface ErrorDetails {
  code: string;
  message: string;
  details: string[];
  path: string;
  traceId?: string;
}

export interface PaginationRequest {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse<T = any> {
  items: T[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface HealthCheck {
  status: HealthStatus;
  timestamp: string;
  version: string;
  dependencies: HealthCheckDependency[];
  uptime: number;
}

export interface HealthCheckDependency {
  name: string;
  status: HealthStatus;
  responseTime?: number;
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  rejectedValue?: any;
}

export interface SearchRequest {
  query?: string;
  filters?: Record<string, any>;
  pagination?: PaginationRequest;
}

export interface SearchResponse<T = any> {
  results: T[];
  totalCount: number;
  searchTime: number;
  suggestions?: string[];
  pagination: PaginationInfo;
}

export interface AuditInfo {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  version: number;
}

export interface CacheInfo {
  cached: boolean;
  cacheKey?: string;
  ttl?: number;
  timestamp?: string;
}

// Enums
export enum HealthStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  DEGRADED = 'DEGRADED',
  UNKNOWN = 'UNKNOWN'
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

export enum ErrorCode {
  // Generic errors
  INVALID_REQUEST = 'INVALID_REQUEST',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  ACCESS_DENIED = 'ACCESS_DENIED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // Authentication errors
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // User-specific errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',

  // Product-specific errors
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
  PRODUCT_UNAVAILABLE = 'PRODUCT_UNAVAILABLE',

  // Business logic errors
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED'
}

// Common API configuration
export const API_CONFIG = {
  BASE_URL: '/api/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_TTL: 300000, // 5 minutes
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
} as const;

// HTTP Headers
export const HTTP_HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  USER_AGENT: 'User-Agent',
  X_REQUEST_ID: 'X-Request-ID',
  X_CORRELATION_ID: 'X-Correlation-ID',
  CACHE_CONTROL: 'Cache-Control',
  ETAG: 'ETag',
  IF_NONE_MATCH: 'If-None-Match'
} as const;

// Content types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  HTML: 'text/html'
} as const;