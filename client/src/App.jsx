import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Login from './components/Login';
import SignUp from './components/Signup';
import Browse from './pages/Browse';
import ProductInfo from './pages/ProductInfo';
import Footer from './components/footer';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';  
import { createHttpLink } from '@apollo/client/link/http'; // Import createHttpLink
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
 
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <CartProvider> 
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/product/:productId" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
