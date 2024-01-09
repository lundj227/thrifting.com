import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations';  
import './Signup.css';

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',  
    lastName: '',  
    username: '',  
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [signup, { loading }] = useMutation(ADD_USER); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await signup({
        variables: {
          firstName: formData.firstName,  
          lastName: formData.lastName, 
          username: formData.username,  
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.data.addUser.token) {
        navigate('/browse');  
      }
    } catch (error) {
      setError('Signup error: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="firstName">First Name</label>  
        <input
          type="text"
          name="firstName"  
          id="firstName"  
          placeholder="Enter your first name"  
          value={formData.firstName}  
          onChange={handleChange}
          className="signup-input"
        />
        <label htmlFor="lastName">Last Name</label>  
        <input
          type="text"
          name="lastName"  
          id="lastName"  
          placeholder="Enter your last name"  
          value={formData.lastName}  
          onChange={handleChange}
          className="signup-input"
        />
        <label htmlFor="username">Username</label>  
        <input
          type="text"
          name="username"  
          id="username"  
          placeholder="Enter your username"  
          value={formData.username}  
          onChange={handleChange}
          className="signup-input"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button" disabled={loading}>
          Sign Up
        </button>
      </form>
      <Link to="/login" className="login-link">Login Instead</Link>
    </div>
  );
}

export default SignUpForm;
