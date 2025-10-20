export interface ProductDetails {
  brand: string;
  weight: string;
  dimensions: string;
  features: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  details: ProductDetails;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number; // 1-5
  text: string;
}

export type View = 
  | { name: 'list' }
  | { name: 'detail'; productId: number }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'login' }
  | { name: 'wishlist' };

export interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  view: View;
  reviews: Review[];
  wishlist: Product[];
  setView: (view: View) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  login: (user: User) => void;
  logout: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  saveCart: () => void;
  addReview: (reviewData: { productId: number; rating: number; text: string }) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}