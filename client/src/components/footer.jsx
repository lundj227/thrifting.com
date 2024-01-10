
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light text-center p-3">
      <div className="container">
        <span>© {new Date().getFullYear()} Thrifting.com. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
