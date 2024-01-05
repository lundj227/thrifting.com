import React, { useState } from 'react';
import './Signup.css';

function SignUpForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to send the data to the server or perform validation
    console.log('Form data:', formData);
  };

  return (
    <div>
      <h2 class="createAccount">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"></label>
          <input
          className="centered-input"
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input
          className="centered-input"
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
          className="centered-input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" id="signUp-btn">Let's thrift</button>
      </form>
    </div>
  );
  
}

export default SignUpForm;
