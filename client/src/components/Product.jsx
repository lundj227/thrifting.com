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
      <button
        className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
        onClick={onToggleFavorite}
      >
        <i className={`fas fa-heart ${isFavorited ? 'favorited-icon' : ''}`}></i>
      </button>
    </div>
  );
};

export default Product;
