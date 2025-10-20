import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { TrashIcon, PlusIcon, MinusIcon } from './Icons';

interface WishlistItemCardProps {
    product: Product;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ product, quantity, onQuantityChange }) => {
    const { removeFromWishlist, addToCart, setView } = useAppContext();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        removeFromWishlist(product.id);
    };

    const incrementQuantity = () => onQuantityChange(quantity + 1);
    const decrementQuantity = () => onQuantityChange(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-shadow hover:shadow-xl">
            <button onClick={() => setView({ name: 'detail', productId: product.id })} className="block relative aspect-square bg-gray-200">
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
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
                <div className="mt-4 pt-4 border-t flex-grow flex flex-col justify-end">
                    <div className="flex items-center justify-center mb-3">
                        <button onClick={decrementQuantity} className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <MinusIcon className="h-5 w-5" />
                        </button>
                        <span className="px-4 font-medium text-lg text-gray-800 w-12 text-center">{quantity}</span>
                        <button onClick={incrementQuantity} className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <PlusIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex items-end space-x-2">
                        <button
                          onClick={handleAddToCart}
                          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-2 text-gray-500 bg-gray-100 rounded-md hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          aria-label="Remove from wishlist"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const WishlistView: React.FC = () => {
    const { wishlist, setView, addToCart, clearWishlist } = useAppContext();
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    useEffect(() => {
        const initialQuantities = wishlist.reduce((acc, item) => {
          acc[item.id] = quantities[item.id] || 1;
          return acc;
        }, {} as Record<number, number>);
        setQuantities(initialQuantities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [wishlist]);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
        }
    };

    const handleMoveAllToCart = () => {
        wishlist.forEach(product => {
            addToCart(product, quantities[product.id] || 1);
        });
        clearWishlist();
    };

    if (wishlist.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Your Wishlist is Empty</h1>
                <p className="text-gray-600 mb-8">You haven't added any products to your wishlist yet.</p>
                <button 
                    onClick={() => setView({ name: 'list' })} 
                    className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Discover Products
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Wishlist</h1>
                <button
                    onClick={handleMoveAllToCart}
                    className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Move All to Cart
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlist.map(product => (
                    <WishlistItemCard 
                        key={product.id} 
                        product={product}
                        quantity={quantities[product.id] || 1}
                        onQuantityChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)}
                    />
                ))}
            </div>
        </div>
    );
};