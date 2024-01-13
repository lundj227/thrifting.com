import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../utils/mutations';
import { GET_PRODUCT } from '../utils/queries';
import '../pages/ProductInfo.css';
import AuthService from '../utils/auth';
import { addToCart } from '../actions/cartActions'; // Corrected import

function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false); // Define state for success message
  const [addToCartMutation, { loading: addToCartLoading, error: addToCartError }] = useMutation(ADD_TO_CART);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id: productId } });

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      console.log('User is not logged in. Redirecting to login...');
      navigate('/login');
    }
  }, [navigate]);

  const handleAddToCart = async () => {
    if (!productId || quantity < 1) {
      console.error('Product ID or invalid quantity.');
      return;
    }
  
    try {
      const { data: addToCartData } = await addToCartMutation({
        variables: { productId, quantity },
      });
      
      if (addToCartData && addToCartData.addToCart) {
        dispatch(addToCart(addToCartData.addToCart.items)); // Dispatch the array of cart items
        setAddToCartSuccess(true); // Set success state
      } else {
        console.error('Unexpected response format from addToCartMutation.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }; // Added closing brace for handleAddToCart function

  if (loading || addToCartLoading) return <p>Loading...</p>;
  if (error || addToCartError) return <p>Error: {error?.message || addToCartError?.message}</p>;

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
      </div>
      <button onClick={handleAddToCart} disabled={addToCartLoading}>
        {addToCartLoading ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
      {addToCartSuccess && (
        <div className="success-message">
          Item added to cart!
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
