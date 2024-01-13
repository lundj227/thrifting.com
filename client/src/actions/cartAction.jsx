// actionTypes.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

// actions.js
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
