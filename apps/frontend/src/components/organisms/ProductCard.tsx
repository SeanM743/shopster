import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

export interface Product {
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

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const effectivePrice = hasDiscount ? product.salePrice : product.price;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user?.id) {
      addToCart(product.id, product.name, product.price, product.imageUrl, product.brand, product.inStock, 1);
      // Show feedback modal
      setShowFeedback(true);
      // Hide feedback after 2 seconds
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    } else {
      // Optionally, redirect to login or show a message
      navigate('/login');
    }
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden group cursor-pointer flex flex-col h-full transform hover:-translate-y-2 will-change-transform relative"
      onClick={handleCardClick}
    >
      {/* Feedback Modal */}
      {showFeedback && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10 rounded-xl">
          <div className="bg-white rounded-lg p-4 shadow-lg text-center max-w-[80%]">
            <div className="text-green-600 font-bold text-sm">✓ Added to Cart</div>
            <div className="text-gray-700 text-xs mt-1 truncate">{product.name}</div>
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {!imageError && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          // Custom centered fallback
          <div className="w-full h-full bg-gray-200 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-gray-500 text-sm font-medium leading-relaxed max-w-full break-words">
                {product.name}
              </div>
            </div>
          </div>
        )}
        {/* Badge */}
        {product.badge && (
          <div 
            className={`
              absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase
              transition-all duration-300 ease-in-out shadow-lg hover:scale-105
              ${
                product.badge === 'sale' 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                  : product.badge === 'featured'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : product.badge === 'trending'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                  : product.badge === 'new'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
              }
            `}
          >
            {product.badge === 'sale' ? '🔥 Hot Deal' : 
             product.badge === 'featured' ? '⭐ Featured' :
             product.badge === 'trending' ? '📈 Trending' :
             product.badge === 'new' ? '✨ New' :
             product.badge.toUpperCase()}
          </div>
        )}
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white bg-opacity-90 px-4 py-2 rounded-full text-gray-900 font-bold text-sm shadow-lg">
              ❌ Out of Stock
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name - Now first and most prominent for better UX */}
        <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 h-12 overflow-hidden hover:text-primary-600 leading-tight tracking-tight transition-colors duration-300" 
            aria-label={`Product name: ${product.name}`}>
          {product.name}
        </h3>
        {/* Rating and Reviews - Now second for social proof */}
        <div className="h-5 mb-2">
        {product.rating && product.reviewCount && (
          <div className="flex items-center text-sm" aria-label={`Rated ${product.rating} out of 5 stars, ${product.reviewCount} reviews`}>
            <div className="flex text-yellow-500 space-x-0.5" role="img" aria-label={`${product.rating} star rating`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`
                    w-4 h-4 transition-colors duration-200 
                    ${star <= Math.floor(product.rating!) ? 'fill-yellow-500' : 'fill-gray-300'}
                  `}
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviewCount})</span>
          </div>
        )}
        </div>

        {/* Price - Now third, after name and social proof */}
        <div className="mb-2" aria-label={hasDiscount ? `Sale price ${formatPrice(effectivePrice!)}, was ${formatPrice(product.price)}` : `Price ${formatPrice(effectivePrice!)}`}>
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(effectivePrice!)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          {hasDiscount && (
            <div className="text-sm text-green-700 font-medium">
              You save ${(product.price - product.salePrice!).toFixed(2)}
            </div>
          )}
        </div>

        {/* Shipping Info - Fixed height */}
        <div className="text-xs text-gray-600 mb-3 h-4">
          {product.inStock ? (
            <span className="text-green-700 font-medium">
              Free shipping, arrives in 3+ days
            </span>
          ) : (
            <span className="text-red-600">Currently unavailable</span>
          )}
        </div>

        {/* Add to Cart Button - Positioned at bottom */}
        <button
          className={`mt-auto w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 min-h-[48px] transform hover:scale-105 ${
            product.inStock
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary-300 focus:outline-none'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label={`${product.inStock ? 'Add' : 'Out of stock for'} ${product.name} ${product.inStock ? 'to cart' : ''}`}
        >
          {product.inStock ? '🛒 Add to cart' : 'Out of stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
