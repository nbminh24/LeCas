import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@features/auth/context/AuthContext';
import CartProvider from '@features/cart/context/CartContext';
import AppRoutes from './routes';
import './App.css';
import './styles/theme.css';
import './styles/modern-ecommerce.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
