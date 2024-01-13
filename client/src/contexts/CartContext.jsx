// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { productId, quantity } = action.payload;
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (existingCartItemIndex >= 0) {
        // Item already in cart, update the quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndex] = {
          ...updatedCartItems[existingCartItemIndex],
          quantity: updatedCartItems[existingCartItemIndex].quantity + quantity,
        };
        return { ...state, cartItems: updatedCartItems };
      } else {
        // Item not in cart, add a new item
        return {
          ...state,
          cartItems: [...state.cartItems, { productId, quantity }],
        };
      }

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { cartItems: [] });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
