// App.js
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
<<<<<<< HEAD
          <Route path="/product/:productId" element={<ProductInfo />} />
=======
          <Route path="/product/:productId" element={<ProductInfo />} /> {/* Use 'element' here */}
>>>>>>> 24b275201289175b768a949d57e2840ac24ed1a4
        </Routes>
        <Footer /> 
      </Router>
    </ApolloProvider>
  );
}

export default App;
