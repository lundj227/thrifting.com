import React from 'react';
import { useSelector } from 'react-redux';

const accountStyle = {
  marginTop: '100px', // Add a top margin of 100px
};

function Account() {
  // Access the 'user' property from the Redux store
  const user = useSelector(state => state.user); // Replace 'state.user' with your actual user reducer path
  console.log('User:', user);

  return (
    <div style={accountStyle}>
      <h2>My Account</h2>
      {user ? (
        // Render user account information if the user is authenticated
        <div>
          <p>Welcome, {user.username}!</p>
          {/* Display other user account information here */}
        </div>
      ) : (
        // Render a message or login prompt if the user is not authenticated
        <p>Please log in to access your account.</p>
      )}
    </div>
  );
}

export default Account;
