import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations';
import '../pages/ProductInfo.css';
import { useCart } from '../contexts/CartContext'; 
import AuthService from '../utils/auth'; 
 

function ProductInfo() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart(); // Access the dispatch function from CartContext

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const [addToCart, { loading: addToCartLoading, error: addToCartError }] = useMutation(ADD_TO_CART);

  const handleAddToBag = async () => {
    try {
      const token = AuthService.getToken(); // Retrieve the token from AuthService
      console.log('Token:', token); // Add this line to check the token

      const response = await addToCart({
        variables: {
          productId: productId,
          quantity: quantity,
        },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "", // Add the token to the headers
          },
        },
      });

      // Dispatch an action to add the item to the cart
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          productId: productId,
          quantity: quantity,
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading || addToCartLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (addToCartError) return <p>Error adding to cart: {addToCartError.message}</p>;

  const product = data.product;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <div>
        <p>Quantity: {quantity}</p>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1}>-</button>
      </div>
      <button onClick={handleAddToBag}>Add to Cart</button>
    </div>
  );
}

export default ProductInfo;
