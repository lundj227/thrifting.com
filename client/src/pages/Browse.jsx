import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useQuery } from '@apollo/client';
import Product from '../components/Product';
import { GET_PRODUCTS } from '../utils/queries';  
import Auth from '../utils/auth';  
import '../pages/Browse.css';
import newarrivals from '../assets/images/8.png';
import salesAdImage from '../assets/images/thrift.jpg';
  



const BrowsePage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/login');  
    }
  }, [navigate]);
  
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.products;  

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="browse-page">

<div className="sales-ad">
        <img
          src={salesAdImage} // Replace 'salesAdImage' with the path to your sales ad image
          alt="Sales Ad"
          style={{ width: '100%', height: 'auto' }} // Set width to 100% to fill the available space
        />
        {/* Add any additional sales ad content here */}
      </div>


      {/* New Arrivals */}
      <div className='newArrivals'>
        <img
          src={newarrivals}
          alt="new arrivals"
        />
      </div>
      
      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product._id}
            _id={product._id}  
            name={product.name}
            image={product.image}
            price={product.price}
            isFavorited={favorites.includes(product._id)}
            onToggleFavorite={() => toggleFavorite(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
