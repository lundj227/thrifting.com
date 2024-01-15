import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ _id, name, image, price, isFavorited, onToggleFavorite }) => {
  return (
    <div className="product">
      <Link to={`/product/${_id}`} className="product-link">
        {/* Wrap the img element with Link */}
        <img src={image} alt={name} className="product-image" />
      </Link>
      <h2 className="product-name">{name}</h2>
      <p className="product-price">${price}</p>
    </div>
  );
};

export default Product;
