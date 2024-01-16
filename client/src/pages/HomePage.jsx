import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create a separate CSS file for styling
import video from '../assets/video.mp4';
import homeTitleImage from '../assets/images/title.png';
import loginButtonImage from '../assets/images/3.png'; // Replace with the actual path to your login button image
import signUpButtonImage from '../assets/images/4.png'; // Replace with the actual path to your sign-up button image

function HomePage() {
  return (
    <div className="home-container center-content">
      <img src={homeTitleImage} alt="Home Title" className="home-title-image" />
      <div className="home-buttons">

      <Link to="/login">
        <button className="login-button" onClick={() => navigate('/login')}>
          Login
        </button>
        </Link>
  
      </div>
    </div>
  );
}

export default HomePage;