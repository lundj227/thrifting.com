// actions/cartActions.js
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM } from './actionTypes';

export const addToCart = (cartItems) => ({
  type: ADD_TO_CART,
  payload: cartItems, 
});

export const removeFromCart = (productId) => {
  console.log('Removing item from cart:', productId);
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};
 
export const updateCartItem = (productId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, quantity },
});