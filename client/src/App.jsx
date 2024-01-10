import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Login from './components/Login';
import SignUp from './components/Signup';
import Browse from './pages/Browse';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';

import './App.css';

const client = new ApolloClient({
  uri: '/graphql',  
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/product/:productId" element={<ProductInfo />} /> {/* Use 'element' here */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
export default App;
