#!/bin/bash

echo "🚀 Testing Shopster Frontend with Mock Data"
echo "============================================="

echo "Since Docker isn't available, we'll test the frontend with mock data."
echo ""

# Check if we're in the right directory
cd /home/seanmah/ecommerce

# First, let's modify the frontend to use mock data for testing
echo "📝 Creating mock data for testing..."

# Create a mock API service
cat > apps/frontend/src/services/mockApi.ts << 'EOF'
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

// Mock data matching our seeded products
const mockProducts: ProductSummary[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Electronics",
    price: 999.99,
    salePrice: 949.99,
    imageUrl: "https://via.placeholder.com/400x400?text=iPhone+15+Pro",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Galaxy+S24",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Air+Force+1",
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
    imageUrl: "https://via.placeholder.com/400x400?text=MacBook+Pro",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Dyson+V15",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Psychology+of+Money",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Yeti+Rambler",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Sony+WH1000XM5",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Levis+501",
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
    imageUrl: "https://via.placeholder.com/400x400?text=KitchenAid+Mixer",
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
    imageUrl: "https://via.placeholder.com/400x400?text=iPad+Air",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Atomic+Habits",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Ultraboost+22",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Switch+OLED",
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
    imageUrl: "https://via.placeholder.com/400x400?text=Hydro+Flask",
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
  }
};
EOF

# Create a test version of HomePage that uses mock data
cat > apps/frontend/src/pages/TestHomePage.tsx << 'EOF'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockProductApi, ProductSummary } from '../services/mockApi';
import { ProductGrid } from '../components/ProductGrid';
import { Product } from '../components/ProductCard';

const TestHomePage: React.FC = () => {
  const { data: randomProducts, isLoading, error } = useQuery({
    queryKey: ['mock-random-products'],
    queryFn: () => mockProductApi.getRandomProducts(15),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const convertToProduct = (apiProduct: ProductSummary): Product => ({
    id: apiProduct.id,
    name: apiProduct.name,
    brand: apiProduct.brand,
    category: apiProduct.category,
    price: apiProduct.price,
    salePrice: apiProduct.salePrice,
    imageUrl: apiProduct.imageUrl,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviewCount,
    inStock: apiProduct.inStock,
    badge: apiProduct.badge,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Shopster</h1>
                <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">DEMO</span>
              </div>
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Products</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
              </nav>
            </div>
          </div>
        </header>

        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Loading mock products...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Shopster</h1>
                <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded">ERROR</span>
              </div>
            </div>
          </div>
        </header>

        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">Failed to load mock data</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Shopster</h1>
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">DEMO MODE</span>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Shopster
            </h2>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Discover amazing products at unbeatable prices
            </p>
            <p className="text-lg mb-8 text-blue-200">
              🎯 Demo: 15 products displayed in 5x3 grid layout
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <main className="py-16">
        {randomProducts && randomProducts.products && (
          <ProductGrid 
            products={randomProducts.products.map(convertToProduct)} 
            title="Featured Products (Mock Data)"
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Shopster</h3>
              <p className="text-gray-400">
                Your one-stop shop for amazing products at great prices.
              </p>
              <p className="text-yellow-400 text-sm mt-2">
                🚀 This is a demo using mock data
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tech Stack</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• React + TypeScript</li>
                <li>• TailwindCSS</li>
                <li>• React Query</li>
                <li>• Spring Boot</li>
                <li>• MongoDB</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• 5x3 Product Grid</li>
                <li>• Responsive Design</li>
                <li>• Product Cards</li>
                <li>• Price & Rating Display</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Demo Info</h4>
              <div className="text-gray-400 text-sm">
                <p>Products: 15 items</p>
                <p>Layout: 5 per row, 3 rows</p>
                <p>Data: Mock (no backend)</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Shopster Demo. Built with React & Spring Boot.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TestHomePage;
EOF

echo "✅ Mock data and test components created!"
echo ""

# Update App.tsx to use TestHomePage
echo "📝 Updating App.tsx to use mock data..."
cat > apps/frontend/src/App.tsx << 'EOF'
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TestHomePage from './pages/TestHomePage';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TestHomePage />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
EOF

echo "✅ App.tsx updated for testing!"
echo ""

echo "🎯 Starting Frontend Development Server..."
echo "========================================="
cd apps/frontend

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🚀 Starting React development server..."
echo "This will show you the 15-product grid layout!"
echo ""
echo "📋 What you'll see:"
echo "  • Beautiful homepage with header and hero section"
echo "  • 15 products in a 5x3 grid (5 products per row)"
echo "  • Product cards with images, names, brands, prices"
echo "  • Sale badges and ratings"
echo "  • Responsive design"
echo ""
echo "🌐 The app will open at: http://localhost:3000"
echo "👀 Look for the 'DEMO MODE' badge in the header"
echo ""

npm start
EOF

chmod +x test-without-db.sh