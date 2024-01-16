import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Auth from '../utils/auth';
import homeTitleImage from '../assets/images/title.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPaths = ['/', '/login', '/signup'];
  const shouldHideNavbar = hiddenPaths.includes(location.pathname);

  const handleLogout = () => {
    Auth.logout(navigate);
  };

  useEffect(() => {
    const handleScroll = () => {
       
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (shouldHideNavbar) {
    return null; // Return null to hide the Navbar on specified paths
  }

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/browse">
            <img src={homeTitleImage} alt="Thrifting Logo" />
          </Link>
        </div>
        <div className="hamburger-icon" onClick={toggleMenu}>
          {/* You can use CSS to create hamburger menu icons */}
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`icons ${isMenuOpen ? 'open' : ''}`}>
          <button className="nav-button">
            <Link to="/account">Account</Link>
          </button>
          <button className="nav-button">
            <Link to="/cart">Cart</Link>
          </button>
          <button onClick={handleLogout} className="nav-button">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
