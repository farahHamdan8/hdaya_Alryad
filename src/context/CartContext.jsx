import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('luxury_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeCheckoutItem, setActiveCheckoutItem] = useState(null); // Direct buy item if any

  useEffect(() => {
    localStorage.setItem('luxury_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, addedAt: Date.now() }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  const openCheckoutWithItem = (item) => {
    setActiveCheckoutItem(item);
    setIsCheckoutModalOpen(true);
  };

  const openCartCheckout = () => {
    setActiveCheckoutItem(null); // Full cart checkout
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        activeCheckoutItem,
        openCheckoutWithItem,
        openCartCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
