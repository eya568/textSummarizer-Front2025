import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const location = useLocation();
  
  // More robust token check
  const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return token && token !== 'undefined' && token.trim() !== '';
  };

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
