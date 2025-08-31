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
}

export interface ProductCarousel {
  title: string;
  products: ProductSummary[];
  viewAllLink: string;
}

export interface DetailedProduct extends ProductSummary {
  description: string;
  specifications: { [key: string]: string };
  images: string[];
  variants?: {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    inStock: boolean;
  }[];
}

// Mock data with real product images from Unsplash
const mockProducts: ProductSummary[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Electronics",
    price: 999.99,
    salePrice: 949.99,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
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
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
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
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center",
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
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
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
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
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
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
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
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop&crop=center",
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

  getProductById: async (id: string): Promise<DetailedProduct> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Create detailed product with additional information
    const detailedProduct: DetailedProduct = {
      ...product,
      description: `Experience the best of ${product.brand} with the ${product.name}. This premium ${product.category.toLowerCase()} item combines innovative technology with sleek design, delivering exceptional value and performance.`, 
      specifications: {
        "Brand": product.brand,
        "Category": product.category,
        "Model": product.name,
        "Availability": product.inStock ? "In Stock" : "Out of Stock",
        "Rating": product.rating ? `${product.rating}/5.0` : "Not Rated",
        "Reviews": product.reviewCount ? `${product.reviewCount} reviews` : "No reviews yet"
      },
      images: [
        product.imageUrl,
        product.imageUrl.replace('w=400&h=400', 'w=600&h=600'),
        product.imageUrl.replace('w=400&h=400', 'w=800&h=800')
      ]
    };

    return detailedProduct;
  }
};

let cart: ProductSummary[] = []; // In-memory cart for mock API

export const mockCartApi = {
  getCart: async (): Promise<ProductSummary[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return [...cart]; // Return a copy to prevent direct modification
  },

  addItemToCart: async (productId: string, quantity: number = 1): Promise<ProductSummary[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    
    const productToAdd = mockProducts.find(p => p.id === productId);
    if (!productToAdd) {
      throw new Error(`Product with id ${productId} not found`);
    }

    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      cart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: (item.quantity || 0) + quantity }
          : item
      );
    } else {
      // Add new item to cart
      cart = [...cart, { ...productToAdd, quantity }];
    }
    
    console.log(`Mock API: Added product ${productId} with quantity ${quantity} to cart. Current cart:`, cart);
    return [...cart];
  },

  updateCartItemQuantity: async (productId: string, quantity: number): Promise<ProductSummary[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    cart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ).filter(item => (item.quantity || 0) > 0); // Remove if quantity becomes 0 or less
    
    console.log(`Mock API: Updated product ${productId} quantity to ${quantity}. Current cart:`, cart);
    return [...cart];
  },

  removeCartItem: async (productId: string): Promise<ProductSummary[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    cart = cart.filter(item => item.id !== productId);
    
    console.log(`Mock API: Removed product ${productId} from cart. Current cart:`, cart);
    return [...cart];
  },

  clearCart: async (): Promise<ProductSummary[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    cart = [];
    console.log(`Mock API: Cart cleared. Current cart:`, cart);
    return [];
  }
};