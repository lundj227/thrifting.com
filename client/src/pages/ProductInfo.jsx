import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client'; // Import useMutation
import { GET_PRODUCT } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations'; // Import your ADD_TO_CART mutation
import '../pages/ProductInfo.css';
import AuthService from '../utils/auth';
import { addToCart as addToCartRedux } from '../actions/cartAction'; // Ensure this is the correct import

function ProductInfo() {
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id: productId } });

  const handleAddToCart = async () => {
    if (!AuthService.loggedIn()) {
      console.log('User is not logged in. Redirecting to /login...');
      navigate('/login');
      return;
    }

    try {
      const response = await addToCartMutation({ variables: { productId, quantity } });
      // Dispatch Redux action with the result of the GraphQL mutation
      dispatch(addToCartRedux(response.data.addToCart));
    } catch (error) {
      console.error('Error updating the cart:', error);
      // Handle the error appropriately
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
      <button onClick={() => handleAddToCart(productId, quantity)}>Add to Cart</button>
    </div>
  );
}

export default ProductInfo; // Since Redux's connect is not used, removed it.
