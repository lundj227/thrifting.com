// reducers/cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/actionTypes';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Add the new item to the cart
      return {
        ...state,
        cartItems: action.payload,
      };
      case REMOVE_FROM_CART:
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product._id !== action.payload),
        };
      default:
        return state;
  }


};

export default cartReducer;
