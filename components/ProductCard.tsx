import React, { useState } from 'react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { HeartIcon } from './Icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setView, addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useAppContext();
  const inWishlist = isInWishlist(product.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click event
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col group">
      <div className="relative">
        <button 
            onClick={handleWishlistToggle} 
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${inWishlist ? 'text-red-500 bg-red-100' : 'text-gray-400 bg-white/60 backdrop-blur-sm hover:text-red-500 hover:bg-red-100/80'}`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon className="h-6 w-6" filled={inWishlist} />
        </button>
        <button onClick={() => setView({ name: 'detail', productId: product.id })} className="block w-full aspect-square bg-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          <img
            className={`w-full aspect-square object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={product.imageUrl}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
          />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="mt-4 flex-grow">
          <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex space-x-2">
            <button
              onClick={() => setView({ name: 'detail', productId: product.id })}
              className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => addToCart(product, 1)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};