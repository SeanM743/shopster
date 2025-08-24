import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const effectivePrice = hasDiscount ? product.salePrice : product.price;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold ${
            product.badge === 'sale' ? 'bg-red-600 text-white' :
            product.badge === 'featured' ? 'bg-blue-500 text-white' :
            product.badge === 'trending' ? 'bg-green-600 text-white' :
            'bg-gray-600 text-white'
          }`}>
            {product.badge === 'sale' ? 'ROLLBACK' : product.badge.toUpperCase()}
          </div>
        )}
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Price - Walmart puts price first and prominent */}
        <div className="mb-2">
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-xl font-bold text-gray-900">
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

        {/* Product Name - Walmart style with proper line clamping */}
        <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] hover:text-blue-500">
          {product.name}
        </h3>
        
        {/* Rating and Reviews - More compact like Walmart */}
        {product.rating && product.reviewCount && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${star <= Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-600">({product.reviewCount})</span>
          </div>
        )}

        {/* Shipping Info - Walmart always shows this */}
        <div className="text-xs text-gray-600 mb-3">
          {product.inStock ? (
            <span className="text-green-700 font-medium">
              Free shipping, arrives in 3+ days
            </span>
          ) : (
            <span className="text-red-600">Currently unavailable</span>
          )}
        </div>

        {/* Add to Cart Button - Walmart style */}
        <button
          className={`w-full px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
            product.inStock
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={(e) => e.stopPropagation()}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to cart' : 'Out of stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;