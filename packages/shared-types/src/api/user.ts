/**
 * User API types for authentication and profile management
 */

import { User, UserProfile, Address, UserSession, AccountStatus, AddressType } from '../domain/user';
import { ApiResponse, PaginationRequest, PaginationResponse } from './common';

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserProfile;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  marketingConsent?: boolean;
}

export interface RegisterResponse {
  user: UserProfile;
  message: string;
  emailVerificationRequired: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

// Profile management types
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  preferredLanguage?: string;
  marketingConsent?: boolean;
}

export interface CreateAddressRequest {
  type: AddressType;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {
  id: string;
}

// Session management types
export interface ActiveSessionsResponse extends PaginationResponse<UserSession> {}

export interface SessionRequest extends PaginationRequest {
  activeOnly?: boolean;
}

// Admin types (for user management)
export interface UsersSearchRequest extends PaginationRequest {
  email?: string;
  status?: AccountStatus;
  role?: string;
  createdAfter?: string;
  createdBefore?: string;
}

export interface UsersSearchResponse extends PaginationResponse<User> {}

export interface UpdateUserStatusRequest {
  userId: string;
  status: AccountStatus;
  reason?: string;
}

// API Response types
export type LoginApiResponse = ApiResponse<LoginResponse>;
export type RegisterApiResponse = ApiResponse<RegisterResponse>;
export type RefreshTokenApiResponse = ApiResponse<RefreshTokenResponse>;
export type UserProfileApiResponse = ApiResponse<UserProfile>;
export type AddressApiResponse = ApiResponse<Address>;
export type AddressListApiResponse = ApiResponse<Address[]>;
export type ActiveSessionsApiResponse = ApiResponse<ActiveSessionsResponse>;
export type UsersSearchApiResponse = ApiResponse<UsersSearchResponse>;

// Validation interfaces
export interface UserValidation {
  email: {
    required: boolean;
    pattern: RegExp;
    maxLength: number;
  };
  password: {
    required: boolean;
    minLength: number;
    maxLength: number;
    pattern: RegExp;
  };
  name: {
    required: boolean;
    maxLength: number;
    pattern: RegExp;
  };
  phoneNumber: {
    pattern: RegExp;
    maxLength: number;
  };
}

// API endpoint paths
export const USER_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  
  // Profile
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  
  // Addresses
  ADDRESSES: '/users/addresses',
  CREATE_ADDRESS: '/users/addresses',
  UPDATE_ADDRESS: '/users/addresses',
  DELETE_ADDRESS: '/users/addresses',
  
  // Sessions
  SESSIONS: '/users/sessions',
  REVOKE_SESSION: '/users/sessions',
  REVOKE_ALL_SESSIONS: '/users/sessions/revoke-all',
  
  // Admin
  USERS_SEARCH: '/admin/users/search',
  UPDATE_USER_STATUS: '/admin/users/status'
} as const;

// Validation constants
export const USER_VALIDATION: UserValidation = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 255
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  },
  name: {
    required: true,
    maxLength: 100,
    pattern: /^[a-zA-Z\s\-'\.]+$/
  },
  phoneNumber: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    maxLength: 20
  }
};