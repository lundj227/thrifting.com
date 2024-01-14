import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; 
import './Login.css';
import loginImage from '../assets/images/3.png';
import loginButtonImage from '../assets/images/5.png';

function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await loginUser({
        variables: {
          username: username,
          password: password,
        },
      });

      const idToken = response?.data?.login?.token;
  
      if (idToken) {
        
        localStorage.setItem('id_token', idToken);
        navigate('/browse');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };
  

  return (
    <div className={`login-container ${showLoginForm ? 'login-form-visible' : ''}`}>
      {!showLoginForm && (
        <div className="create-account">
         <img src={loginImage} alt="Login" />
        </div>
      )}
      <h1>{showLoginForm ? 'LOGIN' : ''}</h1>
      <div className={`login-form ${showLoginForm ? 'visible' : 'hidden'}`}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
          <img src={loginButtonImage} alt="Login" />

          </button>
        </form>
      </div>
      {!showLoginForm && (
        <Link to="/signup" className="signup-link">
          Sign Up Instead
        </Link>
      )}
    </div>
  );
  
}

export default Login;
