
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShoppingCartIcon, UserIcon, HeartIcon } from './Icons';

export const Header: React.FC = () => {
  const { setView, user, logout, getCartItemCount, wishlist } = useAppContext();
  const cartItemCount = getCartItemCount();
  const wishlistItemCount = wishlist.length;

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={() => setView({ name: 'list' })} className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
              React Store
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setView({ name: 'wishlist' })} className="relative text-gray-500 hover:text-gray-800 transition-colors">
              <HeartIcon className="h-6 w-6" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                  {wishlistItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setView({ name: 'cart' })} className="relative text-gray-500 hover:text-gray-800 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-indigo-600 text-white text-xs rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2">
                <UserIcon className="h-6 w-6 text-gray-500"/>
                {user ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                        <button onClick={logout} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">Logout</button>
                    </div>
                ) : (
                    <button onClick={() => setView({ name: 'login' })} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">Login</button>
                )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};