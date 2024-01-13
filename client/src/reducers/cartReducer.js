import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
} from '../actions/cartAction';

const initialState = {
  cartItems: [], // Array of items in the cart
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Add the product to the cartItems array
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      // Remove the product with the given ID from cartItems
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };
    case UPDATE_CART_ITEM:
      // Update the quantity of a cart item with the given ID
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case CLEAR_CART:
      // Clear the cart
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
