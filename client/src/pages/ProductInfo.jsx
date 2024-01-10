import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT } from '../utils/queries'; 
import { ADD_TO_CART } from '../utils/mutations'; 
import '../pages/ProductInfo.css';

function ProductInfo() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);  

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const [addToCart, { loading: addToCartLoading, error: addToCartError }] = useMutation(ADD_TO_CART);

  const handleAddToBag = async () => {
    try {
      const response = await addToCart({
        variables: {
          productId: productId,
          quantity: quantity
        }
      });
      addToCartGlobal(response.data.addToCart); // Update global cart state
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
      <button onClick={handleAddToBag}>Add to Bag</button>
    </div>
  );
}

export default ProductInfo;
