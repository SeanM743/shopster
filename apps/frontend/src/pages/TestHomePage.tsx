import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockProductApi, ProductSummary } from '../services/mockApi';
import { ProductGrid } from '../components/ProductGrid';
import { Product } from '../components/ProductCard';

const TestHomePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
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
                <Link to="/" className="text-2xl font-bold text-gray-900">Shopster</Link>
                <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">DEMO</span>
              </div>
              <div className="flex items-center space-x-8">
                <nav className="flex space-x-8">
                  <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                  <a href="#" className="text-gray-700 hover:text-gray-900">Products</a>
                  <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
                  <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
                </nav>
                
                {/* Auth Controls */}
                <div className="flex items-center space-x-4">
                  {isAuthenticated ? (
                    <>
                      <span className="text-sm text-gray-700">Hello, {user?.name}</span>
                      <button
                        onClick={logout}
                        className="text-gray-700 hover:text-gray-900 text-sm"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="text-gray-700 hover:text-gray-900 text-sm"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
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
                <Link to="/" className="text-2xl font-bold text-gray-900">Shopster</Link>
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
