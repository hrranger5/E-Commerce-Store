
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export const CheckoutView: React.FC = () => {
  const { clearCart, setView, user } = useAppContext();

  useEffect(() => {
    // Clear cart when component mounts
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <svg className="h-16 w-16 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-4">Thank You!</h1>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
        {user && <p className="text-gray-600 mt-1">A confirmation email has been sent to {user.email}.</p>}
        <button onClick={() => setView({ name: 'list' })} className="mt-8 w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
