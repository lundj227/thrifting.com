import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Auth from '../utils/auth';
import homeTitleImage from '../assets/images/title.png';
import accountIcon from '../assets/images/accountblack.png';
import cartIcon from '../assets/images/bagblack.png';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/browse">
            <img src={homeTitleImage} alt="Thrifting Logo" />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger-icon" onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className={`mobile-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className={`icons ${isMobileMenuOpen ? 'hide' : ''}`}>
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
