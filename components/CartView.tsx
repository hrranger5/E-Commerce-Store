import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { PlusIcon, MinusIcon, TrashIcon } from './Icons';
import { CartItem } from '../types';

const CartItemRow: React.FC<{item: CartItem}> = ({ item }) => {
    const { updateCartQuantity, removeFromCart } = useAppContext();
    return (
        <div className="flex items-center py-4 border-b">
            <img src={item.imageUrl} alt={item.name} className="h-24 w-24 object-cover rounded-md" />
            <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
                <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-500 hover:text-gray-800">
                    <MinusIcon className="h-5 w-5" />
                </button>
                <span className="px-4 font-medium">{item.quantity}</span>
                <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-500 hover:text-gray-800">
                    <PlusIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="ml-4 w-24 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="ml-4">
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:text-red-700">
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export const CartView: React.FC = () => {
  const { cart, getCartTotal, setView, user, saveCart } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);

  const handleCheckout = () => {
    if (user) {
      setView({ name: 'checkout' });
    } else {
      setView({ name: 'login' });
    }
  };

  const handleSaveCart = () => {
    saveCart();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => setView({ name: 'list' })} className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Your Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div>
          {cart.map(item => <CartItemRow key={item.id} item={item} />)}
        </div>
        <div className="mt-6 flex justify-end items-center">
            <div className="text-right">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-3xl font-bold text-gray-900">${getCartTotal().toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">Taxes and shipping calculated at checkout.</p>
            </div>
        </div>
        <div className="mt-8 flex justify-end items-center space-x-4">
            {user && cart.length > 0 && (
              <button
                onClick={handleSaveCart}
                disabled={isSaved}
                className={`px-8 py-3 text-base font-medium rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSaved
                    ? 'bg-green-500 text-white focus:ring-green-400'
                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500'
                }`}
              >
                {isSaved ? '✓ Saved' : 'Save Cart'}
              </button>
            )}
            <button 
              onClick={handleCheckout}
              className="px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform hover:scale-105"
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
        </div>
      </div>
    </div>
  );
};