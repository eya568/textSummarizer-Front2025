import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerService, login as loginService } from '../services/authService';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginService(email, password);
      localStorage.setItem('access_token', response.access_token);
      // Navigate to homepage on successful login
      navigate('/homepage');
    } catch (err) {
      if (err.message.includes('Invalid credentials')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Failed to login. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerService(username, email, password);
      
      // Success handling based on server response
      if (response.message === "User registered successfully") {
        // Optional: You can use response.user_id if needed
        navigate('/login');
      } else {
        // Fallback error handling
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      // Specific error handling for different scenarios
      if (err.message.includes('Email already exists')) {
        setError('This email is already in use. Please try another one.');
      } else if (err.message.includes('Username already taken')) {
        setError('This username is already taken. Please choose another.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      handleLogin, 
      handleRegister, 
      error, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}