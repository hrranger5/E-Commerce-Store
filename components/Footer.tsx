import React from 'react';
import { useAppContext } from '../context/AppContext';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './Icons';

export const Footer: React.FC = () => {
  const { products } = useAppContext();
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="mb-6 md:mb-0 col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold mb-2">React Store</h2>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for high-quality products. Built with modern technology for a great user experience.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Shop</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <a href="#" className="text-base text-gray-300 hover:text-white transition-colors">{category}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">&copy; 2024 React Store. All rights reserved. A demo project.</p>
        </div>
      </div>
    </footer>
  );
};
