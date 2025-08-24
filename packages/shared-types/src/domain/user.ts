/**
 * User-related type definitions for the Shopster platform
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  emailVerified: boolean;
  accountStatus: AccountStatus;
  preferredLanguage: string;
  marketingConsent: boolean;
  roles: Role[];
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
}

export interface Address {
  id: string;
  type: AddressType;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: string;
  sessionToken: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
  deviceType?: string;
  location?: string;
  isActive: boolean;
  lastAccessedAt?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  preferredLanguage: string;
  marketingConsent: boolean;
  emailVerified: boolean;
  accountStatus: AccountStatus;
  defaultShippingAddress?: Address;
  defaultBillingAddress?: Address;
}

export interface UserPreferences {
  userId: string;
  language: string;
  currency: string;
  timezone?: string;
  marketingConsent: boolean;
  newsletterSubscription: boolean;
  notificationSettings: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  recommendations: boolean;
}

// Enums
export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED'
}

export enum AddressType {
  SHIPPING = 'SHIPPING',
  BILLING = 'BILLING',
  BOTH = 'BOTH'
}

// Role constants
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  SUPPORT: 'SUPPORT',
  MODERATOR: 'MODERATOR'
} as const;

// Permission resources and actions
export const PERMISSIONS = {
  RESOURCES: {
    USER: 'user',
    PRODUCT: 'product',
    ORDER: 'order',
    ADMIN: 'admin'
  },
  ACTIONS: {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    MANAGE: 'manage'
  }
} as const;