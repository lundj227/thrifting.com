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
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

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
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/product/:productId" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
