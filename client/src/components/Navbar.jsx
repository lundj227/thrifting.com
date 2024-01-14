import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';  
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Auth from '../utils/auth';
import Cart from '../pages/Cart';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const location = useLocation();
  const navigate = useNavigate();  

  const hiddenPaths = ['/', '/login', '/signup'];
  const shouldHideNavbar = hiddenPaths.includes(location.pathname);

  if (shouldHideNavbar) {
    return null;
  }
  const handleLogout = () => {
    Auth.logout(navigate); 
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/browse">
            <img src="../src/assets/images/title.png" alt="Thrifting Logo" />
          </Link>
        </div>
        <div className="hamburger-icon" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`icons ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/account" className='nav-item'>
            <FontAwesomeIcon icon={faUser} size="xl" /><span>Account</span>
          </Link>
          <Link to="/favorites" className='nav-item'>
            <FontAwesomeIcon icon={faHeart} size="xl" /><span>Favorites</span>
          </Link>
          <Link to="/cart" className='nav-item'>
            <FontAwesomeIcon icon={faShoppingCart} size="xl" /><span>Cart</span>
          </Link>
          <button onClick={handleLogout} className="nav-item logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} size="xl" /><span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}


export default Navbar;
