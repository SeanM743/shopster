import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BFF_URL || 'http://localhost:8081';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

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
}

export interface ProductCarousel {
  title: string;
  products: ProductSummary[];
  viewAllLink: string;
}

export const productApi = {
  // Get random products for homepage
  getRandomProducts: async (limit: number = 15): Promise<ProductCarousel> => {
    const response = await api.get<ApiResponse<ProductCarousel>>(
      `/api/v1/homepage/product-carousel/random?limit=${limit}`
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch random products');
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit: number = 10): Promise<ProductCarousel> => {
    const response = await api.get<ApiResponse<ProductCarousel>>(
      `/api/v1/homepage/product-carousel/featured?limit=${limit}`
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch featured products');
    }
  },

  // Get trending products  
  getTrendingProducts: async (limit: number = 10): Promise<ProductCarousel> => {
    const response = await api.get<ApiResponse<ProductCarousel>>(
      `/api/v1/homepage/product-carousel/trending?limit=${limit}`
    );
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch trending products');
    }
  }
};

export default api;