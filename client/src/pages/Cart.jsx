// Cart.jsx

import React, { useState } from 'react';
import '../pages/Cart.css';

 

function Cart({ items, updateCart }) {
  const [cartItems, setCartItems] = useState(items || []);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevents negative quantities
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    updateCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    updateCart(updatedCart);
  };

  if (cartItems.length === 0) {
    return <div className="cart">Your cart is empty.</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Price: ${item.price * item.quantity}</span>
            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalAmount}</p>
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
