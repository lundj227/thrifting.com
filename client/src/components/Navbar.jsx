import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Auth from '../utils/auth';
import homeTitleImage from '../assets/images/title.png';
import accountIcon from '../assets/images/accountblack.png'; // Import the account icon image
import cartIcon from '../assets/images/bagblack.png'; // Import the cart icon image


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

   <Link to="/account">
            <img src={accountIcon} alt="Account Icon" className="account-icon" /> {/* Use the imported account icon */}
          </Link>
 

          <Link to="/cart">
            <img src={cartIcon} alt="Cart Icon" className="bag-icon" /> {/* Use the imported cart icon */}
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
