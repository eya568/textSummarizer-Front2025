import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Update this to your FastAPI server URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Assuming the response contains access_token and token_type
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Login failed. Please try again.');
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { 
      username, 
      email, 
      password 
    });
    return response.data; // Returns { message: "User registered successfully", user_id: ... }
  } catch (error) {
    // Propagate specific error messages from the server
    if (error.response) {
      throw new Error(error.response.data.detail || 'Registration failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/request-password-reset`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Password reset request failed. Please try again.');
  }
};

export const confirmPasswordReset = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { 
      token, 
      new_password: newPassword 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Password reset failed. Please try again.');
  }
};

export const deleteAccount = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete_account/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Account deletion failed. Please try again.');
  }
};
