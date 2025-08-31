import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import TestHomePage from './pages/TestHomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ShopsterPlusPage from './pages/ShopsterPlusPage';
import CartPage from './pages/CartPage';
import CustomerLookupPage from './pages/CustomerLookupPage';
import MembershipSignupPage from './pages/MembershipSignupPage';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<TestHomePage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/shopster-plus" element={<ShopsterPlusPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin/customers" element={<CustomerLookupPage />} />
              <Route path="/membership-signup" element={<MembershipSignupPage />} />
            </Routes>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
