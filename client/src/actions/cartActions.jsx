// actions/cartActions.js
import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_CART_ITEM, 
  CLEAR_CART, 
  SET_CART 
} from './actionTypes';


export const addToCart = (cartItems) => ({
  type: ADD_TO_CART,
  payload: cartItems, 
});

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });

  const { cart } = getState();
  localStorage.setItem('cart', JSON.stringify(cart));
};

 
export const updateCartItem = (productId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, quantity },
});

export const logoutUser = () => (dispatch) => {
  // Perform other logout operations
  dispatch({ type: CLEAR_CART }); // Action to clear the cart in your Redux store
};

export const loginUser = (userData) => async (dispatch) => {
  // Perform login logic...

  // Fetch cart data for the logged-in user
  const cartData = await fetchUserCart(userData.userId);
  dispatch({ type: SET_CART, payload: cartData }); // Action to set the cart in Redux store
};
