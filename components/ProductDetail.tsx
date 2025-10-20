import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, PlusIcon, MinusIcon, HeartIcon } from './Icons';
import { StarRating } from './StarRating';
import { ProductCard } from './ProductCard';

interface ProductDetailProps {
  productId: number;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const { products, addToCart, setView, user, reviews, addReview, isInWishlist, addToWishlist, removeFromWishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [formError, setFormError] = useState('');

  const product = products.find(p => p.id === productId);
  const productReviews = reviews.filter(review => review.productId === productId);
  const inWishlist = product ? isInWishlist(product.id) : false;
  
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  if (!product) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h2 className="text-2xl font-bold text-red-600">Product not found!</h2>
            <button onClick={() => setView({ name: 'list' })} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Back to Products
            </button>
        </div>
    );
  }
  
  const getStockStatus = () => {
    if (product.stock > 10) return <span className="text-green-600 font-semibold">In Stock</span>;
    if (product.stock > 0) return <span className="text-yellow-600 font-semibold">Low Stock ({product.stock} left)</span>;
    return <span className="text-red-600 font-semibold">Out of Stock</span>;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setView({ name: 'cart' });
  };
  
  const incrementQuantity = () => setQuantity(prev => (prev < product.stock ? prev + 1 : prev));
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === '') {
        setFormError('Please provide a star rating and a comment.');
        return;
    }
    addReview({ productId: product.id, rating, text: reviewText });
    setRating(0);
    setReviewText('');
    setFormError('');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => setView({ name: 'list' })} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 group">
        <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
            <div className="md:w-1/2">
            <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{product.category}</p>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h1>
            <p className="text-3xl font-bold text-gray-800 mt-4">${product.price.toFixed(2)}</p>
            <p className="mt-2 text-sm">{getStockStatus()}</p>
            <p className="text-gray-600 mt-4 text-lg">{product.description}</p>
            
            <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={decrementQuantity} className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-md focus:outline-none disabled:opacity-50" disabled={product.stock === 0}>
                        <MinusIcon className="h-5 w-5"/>
                    </button>
                    <span className="px-4 text-lg font-medium">{quantity}</span>
                    <button onClick={incrementQuantity} className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-md focus:outline-none disabled:opacity-50" disabled={product.stock === 0}>
                        <PlusIcon className="h-5 w-5"/>
                    </button>
                </div>
                <button 
                  onClick={handleAddToCart} 
                  disabled={product.stock === 0}
                  className="flex-1 px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button onClick={handleWishlistToggle} className={`p-3 rounded-md transition-colors ${inWishlist ? 'bg-red-100 text-red-500 hover:bg-red-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    <HeartIcon className="h-6 w-6" filled={inWishlist}/>
                </button>
            </div>
            </div>
        </div>
        
        {/* Product Details Section */}
        <div className="px-8 py-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Product Details</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <h4 className="font-semibold text-gray-800">Specifications</h4>
                    <ul className="mt-2 text-gray-600 space-y-2 text-sm">
                        <li><strong className="text-gray-700">Brand:</strong> {product.details.brand}</li>
                        <li><strong className="text-gray-700">Weight:</strong> {product.details.weight}</li>
                        <li><strong className="text-gray-700">Dimensions:</strong> {product.details.dimensions}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">Features</h4>
                    <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1 text-sm">
                        {product.details.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Reviews Section */}
        <div className="px-8 py-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>
            {productReviews.length > 0 ? (
                <div className="mt-6 space-y-8">
                    {productReviews.map(review => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                            <div className="flex items-center mb-2">
                                <StarRating rating={review.rating} />
                                <p className="ml-3 text-sm font-medium text-gray-900">{review.userName}</p>
                            </div>
                            <p className="text-gray-600 prose">{review.text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-6 text-gray-600">No reviews yet. Be the first to share your thoughts!</p>
            )}
        </div>

        {/* Review Form Section */}
        <div className="px-8 py-8 bg-gray-50/50 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Write a review</h3>
            {user ? (
                <form onSubmit={handleAddReview} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Rating</label>
                        <StarRating rating={rating} onRatingChange={setRating} className="mt-1" />
                    </div>
                    <div>
                        <label htmlFor="review-text" className="block text-sm font-medium text-gray-700">Your Review</label>
                        <textarea
                            id="review-text"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Share your experience..."
                            required
                        />
                    </div>
                    {formError && <p className="text-sm text-red-600">{formError}</p>}
                    <div>
                        <button type="submit" className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Submit Review
                        </button>
                    </div>
                </form>
            ) : (
                <p className="mt-4 text-gray-600">
                    You must be{' '}
                    <button onClick={() => setView({ name: 'login' })} className="font-medium text-indigo-600 hover:underline focus:outline-none">
                        logged in
                    </button>
                    {' '}to post a review.
                </p>
            )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="px-8 py-8 border-t border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">You Might Also Like</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};