import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';  
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Auth from '../utils/auth';
import Cart from '../pages/Cart';


function Navbar() {
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
          <Link to="/browse" className="logo-text">T H R I F T I N G</Link>
        </div>
        <div className="icons">
          <Link to="/account" className='hoverGold'>
            <FontAwesomeIcon icon={faUser} size="xl" />
          </Link>
          <Link to="/favorites" className='hoverGold'>
            <FontAwesomeIcon icon={faHeart} size="xl" />
          </Link>
          <Link to="/cart" className='hoverGold'>
            <FontAwesomeIcon icon={faShoppingCart} size="xl" />
          </Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
