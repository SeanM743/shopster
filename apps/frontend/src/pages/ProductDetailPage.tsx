import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mockProductApi } from '../services/mockApi';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';

interface ProductDetailPageProps {}

const ProductDetailPage: React.FC<ProductDetailPageProps> = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => mockProductApi.getProductById(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-900">Shopster</Link>
                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">DEMO MODE</span>
              </div>
              <nav className="flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
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
              <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
              <p className="text-gray-600 mb-6">
                The product you're looking for doesn't exist or couldn't be loaded.
              </p>
              <Link 
                to="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const effectivePrice = hasDiscount ? product.salePrice : product.price;
  const savings = hasDiscount ? product.price - product.salePrice! : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">Shopster</Link>
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">DEMO MODE</span>
            </div>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <a href="#" className="text-gray-700 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {product.images && product.images.length > 1 ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = product.imageUrl;
                      }}
                    />
                    {product.badge && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-md text-sm font-bold ${
                        product.badge === 'sale' ? 'bg-red-600 text-white' :
                        product.badge === 'featured' ? 'bg-blue-500 text-white' :
                        product.badge === 'trending' ? 'bg-green-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {product.badge === 'sale' ? 'ROLLBACK' : product.badge.toUpperCase()}
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <span className="text-white font-semibold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border-2 border-gray-200 hover:border-blue-500 cursor-pointer flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = product.imageUrl;
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                  {product.badge && (
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-md text-sm font-bold ${
                      product.badge === 'sale' ? 'bg-red-600 text-white' :
                      product.badge === 'featured' ? 'bg-blue-500 text-white' :
                      product.badge === 'trending' ? 'bg-green-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {product.badge === 'sale' ? 'ROLLBACK' : product.badge.toUpperCase()}
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <span className="text-white font-semibold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.brand}</p>
              </div>

              {/* Rating */}
              {product.rating && product.reviewCount && (
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(effectivePrice!)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <div className="text-lg text-green-700 font-medium">
                    You save {formatPrice(savings)} ({Math.round((savings / product.price) * 100)}% off)
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-700">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">In Stock - Free shipping, arrives in 3+ days</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="font-medium">Currently unavailable</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-6">
                <button
                  className={`w-full px-6 py-3 rounded-full font-semibold text-lg transition-colors duration-200 flex items-center justify-center ${
                    product.inStock
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <div className="flex space-x-4">
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Wishlist
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Product ID:</span>
                    <span>{product.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Shopster</h3>
            <p className="text-gray-400 mb-2">Your one-stop shop for amazing products at great prices.</p>
            <p className="text-yellow-400 text-sm">🚀 This is a demo using mock data</p>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Shopster Demo. Built with React & Spring Boot.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;