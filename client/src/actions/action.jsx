// actions.js
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM,
    CLEAR_CART,
  } from './actionTypes';
  
  export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
  });
  
  export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
  
  export const updateCartItem = (productId, quantity) => ({
    type: UPDATE_CART_ITEM,
    payload: { productId, quantity },
  });
  
  export const clearCart = () => ({
    type: CLEAR_CART,
  });
  