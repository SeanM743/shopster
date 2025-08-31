import React from 'react';
import { ProductCard, Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  // Split products into rows of 5
  const productRows: Product[][] = [];
  for (let i = 0; i < products.length; i += 5) {
    productRows.push(products.slice(i, i + 5));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <div className="mt-2 h-1 w-20 bg-blue-600 rounded"></div>
        </div>
      )}
      
      <div className="space-y-8">
        {productRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {row.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;