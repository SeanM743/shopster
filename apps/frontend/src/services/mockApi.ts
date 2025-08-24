export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  images?: string[];
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

// Mock data matching our seeded products
const mockProducts: ProductSummary[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Electronics",
    price: 999.99,
    salePrice: 949.99,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=400&fit=crop&crop=center"
    ],
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    badge: "sale"
  },
  {
    id: "2", 
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Electronics", 
    price: 799.99,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    badge: "trending"
  },
  {
    id: "3",
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "Clothing",
    price: 110.00,
    salePrice: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 342,
    inStock: true,
    badge: "sale"
  },
  {
    id: "4",
    name: "MacBook Pro 14\"",
    brand: "Apple", 
    category: "Electronics",
    price: 1999.99,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center"
    ],
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    badge: "featured"
  },
  {
    id: "5",
    name: "Dyson V15 Detect",
    brand: "Dyson",
    category: "Home & Garden",
    price: 749.99,
    salePrice: 649.99,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 98,
    inStock: true,
    badge: "sale"
  },
  {
    id: "6",
    name: "The Psychology of Money",
    brand: "Harcourt",
    category: "Books", 
    price: 16.99,
    salePrice: 13.59,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 289,
    inStock: true,
    badge: "sale"
  },
  {
    id: "7",
    name: "Yeti Rambler Tumbler 30oz",
    brand: "Yeti",
    category: "Sports & Outdoors",
    price: 39.99,
    salePrice: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
    badge: "sale"
  },
  {
    id: "8",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    salePrice: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center"
    ],
    rating: 4.7,
    reviewCount: 445,
    inStock: true,
    badge: "sale"
  },
  {
    id: "9",
    name: "Levi's 501 Original Jeans",
    brand: "Levi's",
    category: "Clothing",
    price: 69.50,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviewCount: 267,
    inStock: true,
  },
  {
    id: "10",
    name: "KitchenAid Stand Mixer",
    brand: "KitchenAid",
    category: "Home & Garden",
    price: 379.99,
    salePrice: 329.99,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    badge: "sale"
  },
  {
    id: "11",
    name: "iPad Air",
    brand: "Apple",
    category: "Electronics",
    price: 749.99,
    salePrice: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    badge: "sale"
  },
  {
    id: "12",
    name: "Atomic Habits",
    brand: "Avery",
    category: "Books",
    price: 18.00,
    salePrice: 14.40,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviewCount: 456,
    inStock: true,
    badge: "sale"
  },
  {
    id: "13",
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "Clothing",
    price: 180.00,
    salePrice: 144.00,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 123,
    inStock: true,
    badge: "sale"
  },
  {
    id: "14",
    name: "Nintendo Switch OLED",
    brand: "Nintendo",
    category: "Electronics",
    price: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 334,
    inStock: true,
    badge: "trending"
  },
  {
    id: "15",
    name: "Hydro Flask Water Bottle",
    brand: "Hydro Flask",
    category: "Sports & Outdoors",
    price: 44.95,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 289,
    inStock: true,
  }
];

export const mockProductApi = {
  getRandomProducts: async (limit: number = 15): Promise<ProductCarousel> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      title: "Random Products",
      products: mockProducts.slice(0, limit),
      viewAllLink: "/products"
    };
  },

  getProductById: async (id: string): Promise<ProductSummary | null> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const product = mockProducts.find(p => p.id === id);
    return product || null;
  }
};
