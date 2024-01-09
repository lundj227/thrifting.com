// Hero.jsx

import React from 'react';
import './Hero.css'; 

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Our Thrift Store</h1>
        <p className="hero-description">
          Discover unique and affordable products for your lifestyle.
        </p>
        <a href="/browse" className="hero-button">
          Explore Now
        </a>
      </div>
    </div>
  );
}

export default Hero;
