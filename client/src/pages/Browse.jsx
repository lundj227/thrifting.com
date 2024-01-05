import React from 'react';
import '../Browse.css';

function Selection() {
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <h1 className="header-title">Thrifting</h1>
        <div className="search-container">
        </div>
        <div className="user-controls">
        <input type="text" placeholder="Search" className="search-input"/>
          <button className="search-button">🔍</button>
          <button className="user-button">🛒</button>
          
        </div>
      </header>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="new-arrivals">
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
          <div className="new-arrival-item"></div>
        </div>
      </div>
    </div>
  );
}

export default Selection;

