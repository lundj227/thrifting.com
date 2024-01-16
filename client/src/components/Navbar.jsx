import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Auth from '../utils/auth';
import homeTitleImage from '../assets/images/title.png';
import accountIcon from '../assets/images/accountblack.png';
import cartIcon from '../assets/images/bagblack.png';

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
      // Handle scroll effects here if needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/browse">
            <img src={homeTitleImage} alt="Thrifting Logo" />
          </Link>
        </div>
        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`icons ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/account">
            <img src={accountIcon} alt="Account Icon" className="account-icon" />
          </Link>
          <Link to="/cart">
            <img src={cartIcon} alt="Cart Icon" className="bag-icon" />
          </Link>
          <button onClick={handleLogout} className="nav-button logout-button">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
