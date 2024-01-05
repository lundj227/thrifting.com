import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Browse from './pages/Browse';
import './App.css';  

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/browse' element={<Browse />} />
      </Routes>
    </Router>
  );
}

export default App;
