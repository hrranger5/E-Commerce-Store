import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { LoginView } from './components/LoginView';
import { WishlistView } from './components/WishlistView';
import { Footer } from './components/Footer';

const CurrentView: React.FC = () => {
    const { view } = useAppContext();

    switch(view.name) {
        case 'list':
            return <ProductList />;
        case 'detail':
            return <ProductDetail productId={view.productId} />;
        case 'cart':
            return <CartView />;
        case 'checkout':
            return <CheckoutView />;
        case 'login':
            return <LoginView />;
        case 'wishlist':
            return <WishlistView />;
        default:
            return <ProductList />;
    }
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <CurrentView />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};

export default App;