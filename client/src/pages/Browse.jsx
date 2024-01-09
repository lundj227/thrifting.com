import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Product from '../components/Product';
import { GET_PRODUCTS } from '../utils/queries';  
import '../pages/Browse.css';

const BrowsePage = () => {
  const [favorites, setFavorites] = useState([]);
  
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
      <h3>New Arrivals</h3>
      <div className="product-list">
        {products.map((product) => (
         <Product
         key={product._id}
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
