import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { AppContextType, Product, CartItem, User, View, Review } from '../types';
import { mockProducts } from '../data/products';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>({ name: 'list' });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Wishlist auto-saving effect
  useEffect(() => {
    if (user) {
        try {
            localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlist));
        } catch (e) {
            console.error("Failed to save wishlist to localStorage", e);
        }
    }
  }, [wishlist, user]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };
  
  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const saveCart = useCallback(() => {
    if (user) {
      try {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [user, cart]);
  
  const addReview = useCallback((reviewData: { productId: number; rating: number; text: string }) => {
    if (!user) return;
    const newReview: Review = {
        id: Date.now(),
        productId: reviewData.productId,
        userName: user.name,
        rating: reviewData.rating,
        text: reviewData.text
    };
    setReviews(prev => [...prev, newReview]);
  }, [user]);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Load Cart
    const savedCartJson = localStorage.getItem(`cart_${userData.email}`);
    if (savedCartJson) {
      try {
        const savedCart: CartItem[] = JSON.parse(savedCartJson);
        setCart(Array.isArray(savedCart) ? savedCart : []);
      } catch (e) {
        console.error("Failed to parse saved cart:", e);
        setCart([]);
      }
    } else {
      setCart([]);
    }
    // Load Wishlist
    const savedWishlistJson = localStorage.getItem(`wishlist_${userData.email}`);
    if (savedWishlistJson) {
        try {
            const savedWishlist: Product[] = JSON.parse(savedWishlistJson);
            setWishlist(Array.isArray(savedWishlist) ? savedWishlist : []);
        } catch (e) {
            console.error("Failed to parse saved wishlist:", e);
            setWishlist([]);
        }
    } else {
        setWishlist([]);
    }

    setView({ name: 'list' });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const contextValue = useMemo(() => ({
    products,
    cart,
    user,
    view,
    reviews,
    wishlist,
    setView,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    clearWishlist,
    login,
    logout,
    getCartTotal,
    getCartItemCount,
    saveCart,
    addReview,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }), [products, cart, user, view, reviews, wishlist, saveCart, addReview, addToWishlist, removeFromWishlist, isInWishlist]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};