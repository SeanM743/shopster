/**
 * Main entry point for shared types package
 * Exports all domain and API types for the Shopster platform
 */

// Domain types
export * from './domain/user';
export * from './domain/product';

// API types
export * from './api/common';
export * from './api/homepage';
export * from './api/user';
export * from './api/product';

// Version information
export const SHARED_TYPES_VERSION = '1.0.0';