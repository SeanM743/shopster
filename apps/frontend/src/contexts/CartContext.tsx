import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { cartApi } from '../services/api';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  productId: string;
  brand: string;
  inStock: boolean;
}

interface Cart {
  items: CartItem[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, productName: string, price: number, imageUrl: string, brand: string, inStock: boolean, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const cart: Cart = await cartApi.getCart(user.id);
          // Map backend response to frontend CartItem interface
          const mappedItems = cart.items?.map(item => ({
            ...item,
            id: item.productId // Use productId as the id for frontend operations
          })) || [];
          setCartItems(mappedItems);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      }
    };
    fetchCart();
  }, [isAuthenticated, user?.id]);

  const addToCart = useCallback(async (productId: string, productName: string, price: number, imageUrl: string, brand: string, inStock: boolean, quantity: number = 1) => {
    if (!user?.id) return;
    try {
      const updatedCart: Cart = await cartApi.addItem(user.id, { productId, productName, price, imageUrl, brand, inStock, quantity });
      // Map backend response to frontend CartItem interface
      const mappedItems = updatedCart.items?.map(item => ({
        ...item,
        id: item.productId
      })) || [];
      setCartItems(mappedItems);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  }, [user?.id]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (!user?.id) return;
    try {
      const updatedCart: Cart = await cartApi.updateItem(user.id, id, quantity);
      // Map backend response to frontend CartItem interface
      const mappedItems = updatedCart.items?.map(item => ({
        ...item,
        id: item.productId
      })) || [];
      setCartItems(mappedItems);
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  }, [user?.id]);

  const removeItem = useCallback(async (id: string) => {
    if (!user?.id) return;
    try {
      const updatedCart: Cart = await cartApi.removeItem(user.id, id);
      // Map backend response to frontend CartItem interface
      const mappedItems = updatedCart.items?.map(item => ({
        ...item,
        id: item.productId
      })) || [];
      setCartItems(mappedItems);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  }, [user?.id]);

  const clearCart = useCallback(() => {
    // This would need a backend implementation
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartTotal,
    cartItemCount,
  }), [cartItems, addToCart, updateQuantity, removeItem, clearCart, cartTotal, cartItemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
