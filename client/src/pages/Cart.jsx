import React from 'react';
import '../pages/Cart.css';
import { connect } from 'react-redux';
import {
  removeFromCart,
  updateCartItem,
  clearCart,
} from '../actions/action';

class Cart extends React.Component {
  handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      this.props.updateCartItem(productId, quantity);
    }
  };
  render() {
    const { cartItems, removeFromCart, clearCart } = this.props;
  
    console.log('Cart Items:', cartItems);
    if (!cartItems || cartItems.length === 0 || !cartItems[0].items || cartItems[0].items.length === 0) {
      return <div>Your cart is empty.</div>;
    }


    const firstCart = cartItems[0];

    return (
      <div className="cart-container">
        <h2>My Shopping Cart</h2>
        <ul className="cart-list">
          {firstCart.items.map((item) => (
            <li key={`${firstCart.__typename}-${item.product._id}`} className="cart-item">
              <img className="cart-item-image" src={item.product.image} alt={item.product.name} />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.product.name}</h3>
                <p className="cart-item-price">Price: ${item.product.price}</p>
                <div className="cart-item-quantity">
                  <span>Quantity:</span>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => this.handleQuantityChange(item.product._id, e.target.value)}
                    aria-label={`Quantity for ${item.product.name}`}
                  />
                </div>
                <button
                  onClick={() => this.props.removeFromCart(item.product._id)}
                  className="remove-button"
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  Remove
                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                  onClick={this.props.clearCart}
                  className="clear-cart-button"
                  aria-label="Clear cart"
                >
                  Clear Cart
                </button>
                      </div>
    );
    
  }
}


const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
  removeFromCart,
  updateCartItem,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
