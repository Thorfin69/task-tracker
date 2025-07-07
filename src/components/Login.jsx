import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { setUser } from '../utils/LocalStorage';
import '../styles/App.css';

const Login = ({ onLogin }) => {
  const [username, setUsernameState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setUser(username.trim());
    onLogin(username.trim());
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <User className="user-icon" />
          </div>
          <div>
            <h2 className="login-title">Task Tracker</h2>
            <p className="login-description">Welcome back! Enter your name to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsernameState(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={!username.trim() || isLoading}>
            {isLoading ? (
              <div className="loading-group">
                <div className="spinner" />
                Signing in...
              </div>
            ) : (
              <div className="button-content">
                Get Started <ArrowRight className="arrow-icon" />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
