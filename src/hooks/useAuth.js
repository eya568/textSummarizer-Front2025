import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [user, setUser] = useState(null); // Stores the authenticated user
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const navigate = useNavigate();

  // Simulate fetching user data from local storage or API
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // Save user data to local storage (or perform API call)
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/login');
  };

  // Check if user is authenticated
  const isAuthenticated = () => !!user;

  return { user, isLoading, login, logout, isAuthenticated };
};

export default useAuth;
