import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT } from '../utils/queries';

function ProductInfo() {
  // Get the productId parameter from the URL
  const { productId } = useParams();

  if (!productId) {
    // Handle the case where productId is not provided
    return <p>Product ID is missing.</p>;
  }

  // Fetch product details using Apollo Client and your GraphQL query
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId }, // Use the productId from URL parameters
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data.product;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      {/* Add buttons or components for purchase, add to cart, etc. */}
    </div>
  );
}

export default ProductInfo;
