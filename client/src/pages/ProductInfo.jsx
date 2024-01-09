// ProductInfo.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
  // Define your GraphQL query here

function ProductInfo() {
  // Get the productId parameter from the URL
  const { productId } = useParams();

  // Fetch product details using Apollo Client and your GraphQL query
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data.product; // Assuming your query returns a 'product' field

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
