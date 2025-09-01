import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BFF_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Add request/response interceptors for debugging
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  badge?: string;
  quantity?: number;
  effectivePrice?: number;
}

export interface ProductCarousel {
  title: string;
  products: ProductSummary[];
  viewAllLink: string;
}

export interface MembershipPlan {
  id: number;
  planCode: string;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  billingCycle: 'WEEKLY' | 'MONTHLY' | 'ANNUALLY';
  billingCycleDisplay: string;
  trialDays: number;
  trialDescription?: string;
  planType: 'TRIAL' | 'STANDARD' | 'PREMIUM';
  features: string[];
  displayOrder: number;
  active: boolean;
}

export interface MembershipSubscription {
  id: number;
  userId: number;
  plan: MembershipPlan;
  status: 'PENDING' | 'TRIALING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'SUSPENDED';
  trialStartDate?: string;
  trialEndDate?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  nextBillingDate?: string;
  lastBillingDate?: string;
  amount: number;
  paymentMethodId?: string;
  paymentMethodType?: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
  autoRenew: boolean;
  cancellationDate?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSubscriptionRequest {
  userId: number;
  planCode: string;
  paymentMethodId: string;
  paymentMethodType: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
  autoRenew: boolean;
}

// Mock membership data when service is unavailable
const mockMembershipPlans: MembershipPlan[] = [
  {
    id: 1,
    planCode: 'MONTHLY_PLUS',
    name: 'Monthly',
    description: 'Perfect for trying Shopster+ with full flexibility',
    price: 9.99,
    formattedPrice: '$9.99',
    billingCycle: 'MONTHLY',
    billingCycleDisplay: 'per month',
    trialDays: 14,
    trialDescription: '14-day free trial',
    planType: 'STANDARD',
    features: [
      'Free shipping on all orders',
      'Priority customer support',
      'Early access to sales',
      'Exclusive member-only deals',
      'Cancel anytime'
    ],
    displayOrder: 1,
    active: true
  },
  {
    id: 2,
    planCode: 'ANNUAL_PLUS',
    name: 'Annual',
    description: 'Best value with 2 months free compared to monthly',
    price: 99.00,
    formattedPrice: '$99.00',
    billingCycle: 'ANNUALLY',
    billingCycleDisplay: 'per year',
    trialDays: 14,
    trialDescription: '14-day free trial',
    planType: 'PREMIUM',
    features: [
      'Free shipping on all orders',
      'Priority customer support',
      'Early access to sales',
      'Exclusive member-only deals',
      'Save $20 compared to monthly',
      'Premium rewards program'
    ],
    displayOrder: 2,
    active: true
  }
];

export const membershipApi = {
  // Get all available membership plans
  getPlans: async (): Promise<MembershipPlan[]> => {
    try {
      const response = await api.get<ApiResponse<MembershipPlan[]>>('/api/membership/plans');
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Failed to fetch plans');
    } catch (error) {
      console.log('Membership service unavailable, using mock data');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockMembershipPlans;
    }
  },

  // Get plan by code
  getPlanByCode: async (planCode: string): Promise<MembershipPlan> => {
    try {
      const response = await api.get<ApiResponse<MembershipPlan>>(`/api/membership/plans/${planCode}`);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Plan not found');
    } catch (error) {
      console.log('Membership service unavailable, using mock data');
      await new Promise(resolve => setTimeout(resolve, 300));
      const plan = mockMembershipPlans.find(p => p.planCode === planCode);
      if (!plan) {
        throw new Error('Plan not found');
      }
      return plan;
    }
  },

  // Create subscription
  createSubscription: async (request: CreateSubscriptionRequest): Promise<MembershipSubscription> => {
    try {
      const response = await api.post<ApiResponse<MembershipSubscription>>('/api/membership/subscriptions', request);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.message || 'Failed to create subscription');
    } catch (error) {
      console.log('Membership service unavailable, creating mock subscription');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      
      const plan = mockMembershipPlans.find(p => p.planCode === request.planCode);
      if (!plan) {
        throw new Error('Plan not found');
      }

      const now = new Date();
      const trialEnd = new Date(now);
      trialEnd.setDate(trialEnd.getDate() + plan.trialDays);
      
      const subscriptionStart = new Date(trialEnd);
      let subscriptionEnd = new Date(subscriptionStart);
      let nextBilling = new Date(subscriptionStart);
      
      if (plan.billingCycle === 'MONTHLY') {
        subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
        nextBilling.setMonth(nextBilling.getMonth() + 1);
      } else if (plan.billingCycle === 'ANNUALLY') {
        subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
        nextBilling.setFullYear(nextBilling.getFullYear() + 1);
      } else if (plan.billingCycle === 'WEEKLY') {
        subscriptionEnd.setDate(subscriptionEnd.getDate() + 7);
        nextBilling.setDate(nextBilling.getDate() + 7);
      }

      const mockSubscription: MembershipSubscription = {
        id: Math.floor(Math.random() * 1000000),
        userId: request.userId,
        plan: plan,
        status: 'TRIALING',
        trialStartDate: now.toISOString(),
        trialEndDate: trialEnd.toISOString(),
        subscriptionStartDate: subscriptionStart.toISOString(),
        subscriptionEndDate: subscriptionEnd.toISOString(),
        nextBillingDate: nextBilling.toISOString(),
        amount: plan.price,
        paymentMethodId: request.paymentMethodId,
        paymentMethodType: request.paymentMethodType,
        autoRenew: request.autoRenew,
        createdAt: now.toISOString()
      };

      console.log('Created mock subscription:', mockSubscription);
      return mockSubscription;
    }
  },

  // Get user's active subscription
  getUserActiveSubscription: async (userId: number): Promise<MembershipSubscription | null> => {
    try {
      const response = await api.get<ApiResponse<MembershipSubscription>>(`/api/membership/subscriptions/user/${userId}`);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      
      // Fallback to mock data when service unavailable
      console.log('Membership service unavailable, using mock subscription data');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Return mock subscription data for specific customer IDs
      if (userId === 1) {
        const now = new Date();
        const trialStart = new Date(now);
        trialStart.setDate(trialStart.getDate() - 5); // Started 5 days ago
        const trialEnd = new Date(trialStart);
        trialEnd.setDate(trialEnd.getDate() + 14); // 14-day trial
        
        const subscriptionStart = new Date(trialEnd);
        const subscriptionEnd = new Date(subscriptionStart);
        subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1); // Annual plan
        
        const nextBilling = new Date(subscriptionStart);
        nextBilling.setFullYear(nextBilling.getFullYear() + 1);
        
        return {
          id: 100001,
          userId: userId,
          plan: mockMembershipPlans[1], // Annual plan
          status: 'TRIALING',
          trialStartDate: trialStart.toISOString(),
          trialEndDate: trialEnd.toISOString(),
          subscriptionStartDate: subscriptionStart.toISOString(),
          subscriptionEndDate: subscriptionEnd.toISOString(),
          nextBillingDate: nextBilling.toISOString(),
          amount: 99.00,
          paymentMethodId: 'card_demo_123',
          paymentMethodType: 'CREDIT_CARD',
          autoRenew: true,
          createdAt: trialStart.toISOString()
        };
      } else if (userId === 123) {
        const now = new Date();
        const subscriptionStart = new Date(now);
        subscriptionStart.setMonth(subscriptionStart.getMonth() - 2); // Started 2 months ago
        const subscriptionEnd = new Date(subscriptionStart);
        subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 12); // Monthly plan, but showing 1 year
        
        const nextBilling = new Date(now);
        nextBilling.setMonth(nextBilling.getMonth() + 1);
        
        const lastBilling = new Date(now);
        lastBilling.setMonth(lastBilling.getMonth() - 1);
        
        return {
          id: 100002,
          userId: userId,
          plan: mockMembershipPlans[0], // Monthly plan
          status: 'ACTIVE',
          subscriptionStartDate: subscriptionStart.toISOString(),
          subscriptionEndDate: subscriptionEnd.toISOString(),
          nextBillingDate: nextBilling.toISOString(),
          lastBillingDate: lastBilling.toISOString(),
          amount: 9.99,
          paymentMethodId: 'paypal_demo_456',
          paymentMethodType: 'PAYPAL',
          autoRenew: true,
          createdAt: subscriptionStart.toISOString()
        };
      } else {
        // No subscription found for other customer IDs
        return null;
      }
    }
  },

  // Get user's subscription history
  getUserSubscriptionHistory: async (userId: number): Promise<MembershipSubscription[]> => {
    const response = await api.get<ApiResponse<MembershipSubscription[]>>(`/api/membership/subscriptions/user/${userId}/history`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch subscription history');
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId: number, reason?: string): Promise<void> => {
    const params = reason ? { reason } : {};
    const response = await api.put<ApiResponse<void>>(`/api/membership/subscriptions/${subscriptionId}/cancel`, null, { params });
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to cancel subscription');
    }
  },

  // Check if user is Shopster+ member
  isShopsterPlusMember: async (userId: number): Promise<boolean> => {
    const response = await api.get<ApiResponse<boolean>>(`/api/membership/users/${userId}/status`);
    if (response.data.success && response.data.data !== undefined) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to check membership status');
  }
};

export const productApi = {
  // Get random products for homepage  
  getRandomProducts: async (limit: number = 15): Promise<ProductCarousel> => {
    try {
      console.log('Making API request to:', `/api/v1/products/random?limit=${limit}`);
      const response = await api.get<ProductSummary[]>(
        `/api/v1/products/random?limit=${limit}`
      );
      
      console.log('Raw API response:', response.data);
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format: expected array of products');
      }
      
      // Convert direct product service response to expected format
      const result = {
        title: "Featured Products",
        products: response.data,
        viewAllLink: "/products"
      };
      
      console.log('Processed result:', result);
      return result;
    } catch (error: any) {
      console.error('getRandomProducts error details:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit: number = 10): Promise<ProductCarousel> => {
    const response = await api.get<ProductSummary[]>(
      `/api/v1/products/featured?limit=${limit}`
    );
    
    return {
      title: "Featured Products",
      products: response.data,
      viewAllLink: "/products/featured"
    };
  },

  // Get trending products  
  getTrendingProducts: async (limit: number = 10): Promise<ProductCarousel> => {
    const response = await api.get<ProductSummary[]>(
      `/api/v1/products/trending?limit=${limit}`
    );
    
    return {
      title: "Trending Products", 
      products: response.data,
      viewAllLink: "/products/trending"
    };
  }
};

export const cartApi = {
  getCart: async (userId: string) => {
    const response = await api.get(`/api/v1/cart/${userId}`);
    return response.data;
  },
  addItem: async (userId: string, item: { productId: string; productName: string; price: number; imageUrl: string; brand: string; inStock: boolean; quantity: number }) => {
    const response = await api.post(`/api/v1/cart/${userId}/items`, item);
    return response.data;
  },
  updateItem: async (userId: string, itemId: string, quantity: number) => {
    const response = await api.put(`/api/v1/cart/${userId}/items/${itemId}`, { quantity });
    return response.data;
  },
  removeItem: async (userId: string, itemId: string) => {
    const response = await api.delete(`/api/v1/cart/${userId}/items/${itemId}`);
    return response.data;
  },
};

export default api;
