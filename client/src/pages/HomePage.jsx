import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create a separate CSS file for styling

function HomePage() {
  return (
    <div className="home-container center-content">
      <h1 className="home-title">T H R I F T I N G</h1>
      <div className="home-buttons">
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/signup" className="home-button">Sign Up</Link>
      </div>
    </div>
  );
}

export default HomePage;
