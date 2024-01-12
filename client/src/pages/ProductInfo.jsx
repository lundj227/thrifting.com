import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_PRODUCT } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations';
import '../pages/ProductInfo.css';
import { useCart } from '../contexts/CartContext';
import AuthService from '../utils/auth';

function ProductInfo() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id: productId } });
  const [addToCartMutation, { loading: addingToCart }] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("id_token");
    console.log("Token from localStorage:", token);
  
    if (!AuthService.loggedIn()) {
      console.log("User is not logged in. Redirecting to /login...");
      navigate('/login');
      return;
    }
  
    try {
      const { data: addToCartData } = await addToCartMutation({
        variables: { productId, quantity },
      });
  
      dispatch({
        type: 'ADD_TO_CART',
        payload: { productId, quantity },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;

  const product = data?.product;

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <div>
        <p>Quantity: {quantity}</p>
        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
        <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} disabled={quantity === 1}>-</button>
      </div>
      <button onClick={handleAddToCart} disabled={addingToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductInfo;
