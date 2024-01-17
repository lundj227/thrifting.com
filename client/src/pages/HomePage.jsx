import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Create a separate CSS file for styling
import video from '../assets/video.mp4';
import homeTitleImage from '../assets/images/title.png';
 
function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="home-container center-content">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src={homeTitleImage} alt="Home Title" className="home-title-image" />
      <div className="home-buttons">

      <Link to="/login">
      <button className="login-button" id='home-Pg-Login' onClick={() => navigate('/login')}>
          Login
        </button>
        </Link>
  
      </div>
    </div>
  );
}

export default HomePage;