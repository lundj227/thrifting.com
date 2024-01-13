import React, { useEffect, useMemo } from 'react';
import { useMutation } from '@apollo/client'; // Import useMutation
import { REMOVE_FROM_CART } from '../utils/mutations';
import '../pages/Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem } from '../actions/cartActions';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const filteredCartItems = useMemo(() =>
    cartItems.filter((item) => item.product),
    [cartItems]
  );

  // Define the removeFromCart mutation
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);

  const handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      dispatch(updateCartItem(productId, quantity));
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      console.log("Attempting to remove cart item with productId:", productId);
  
      // You've provided the correct user context with the user's ID
      const context = { user: { _id: '65a2f88e1b8b5069c3d35a61' } };
  
      if (!context.user) {
        throw new Error('User not authenticated.');
      }
  
      const userId = context.user._id;
  
      if (!userId) {
        throw Error('User ID not found in context.');
      }
  
      // Use the mutation to remove the item from the cart
      const { data } = await removeFromCartMutation({
        variables: { productId }, // Use the correct variable name "productId"
      });
  
      // Handle the response data as needed
      console.log("Item removed successfully.");
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      // Handle the error
    }
  };
  

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="cart-container">
      <h2>My Shopping Cart</h2>
      {isCartEmpty ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <ul className="cart-list">
{cartItems.map((item, index) => (
  <li key={`${item.product._id}-${index}`} className="cart-item">
              <img
                className="cart-item-image"
                src={item.product.image}
                alt={item.product.name}
              />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.product.name}</h3>
                <p className="cart-item-price">Price: ${item.product.price}</p>
                <div className="cart-item-quantity">
                  <span>Quantity:</span>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.product._id, e.target.value)
                    }
                    aria-label={`Quantity for ${item.product.name}`}
                  />
                </div>
                <button onClick={() => handleRemoveFromCart(item.product._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
