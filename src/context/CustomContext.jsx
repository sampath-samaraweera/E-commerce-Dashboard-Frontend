import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomContext = createContext();

export const CustomProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    console.log('Added products', cart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCart(prevCart => {
        if (quantity <= 0) {
            return prevCart.filter(item => item._id !== id);
        }
        return prevCart.map(item => 
            item._id === id ? { ...item, quantity } : item
        );
    });
  };

  return (
    <CustomContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        setCart,
        updateCartItemQuantity,
        clearCart
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(CustomContext);
  if (!context) {
    throw new Error('useCustomContext must be used within a customProvider');
  }
  return context;
};
