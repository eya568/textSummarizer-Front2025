import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../config/apiConfig';
import { 
  User, 
  FileText, 
  Mail, 
  Key, 
  Trash2, 
  Shield 
} from 'lucide-react';
import Header from "../components/Header";
import { requestPasswordReset, deleteAccount } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resetStatus, setResetStatus] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usernameConfirmation, setUsernameConfirmation] = useState('');
  const [deleteError, setDeleteError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get the access token from localStorage
        const token = localStorage.getItem('access_token');
        
        // If no token is found, throw an error
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        // Decode the token to get the user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id; // Adjust this based on your actual token structure
        
        // Fetch profile data
        const response = await axios.get(`${API_BASE_URL}/profile/${userId}`);
        
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handlePasswordReset = async () => {
    try {
      // Set loading state
      setResetLoading(true);
      setResetStatus(null);

      // Use the email from profileData to request password reset
      const response = await requestPasswordReset(profileData.email);
      
      // Update status to show success message
      setResetStatus({
        type: 'success', 
        message: 'Password reset link sent to your email. Please check your inbox.'
      });
    } catch (error) {
      // Update status to show error message
      setResetStatus({
        type: 'error', 
        message: error.message || 'Failed to send password reset link.'
      });
    } finally {
      // Reset loading state
      setResetLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Verify username matches
      if (usernameConfirmation !== profileData.username) {
        setDeleteError('Username does not match. Please try again.');
        return;
      }

      // Get the user ID from the token
      const token = localStorage.getItem('access_token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      // Call delete account API
      await deleteAccount(userId);

      // Remove token from localStorage
      localStorage.removeItem('access_token');

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <Header />
        <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-8 max-w-2xl w-full backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <User size={40} className="text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <Header />
        <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-8 max-w-2xl w-full backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <User size={40} className="text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Error: {error}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <Header />
      <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-8 max-w-2xl w-full backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <User size={40} className="text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{profileData.username}</h1>
            <p className="text-gray-500">Member since 2025</p>
          </div>

          <div className="space-y-6">
            {/* User Stats */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-2">
                <FileText className="text-indigo-600" />
                <div>
                  <p className="text-gray-600">Summarized Texts</p>
                  <p className="text-2xl font-bold text-indigo-600">{profileData.summary_count}</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium">{profileData.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{profileData.email}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button 
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={handlePasswordReset}
                disabled={resetLoading}
              >
                {resetLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Key size={18} />
                )}
                {resetLoading ? 'Sending...' : 'Change Password'}
              </button>

              <button 
                className="w-auto self-end flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-all duration-300 group relative hover:cursor-pointer"
                onMouseMove={(e) => {
                  const button = e.currentTarget;
                  const rect = button.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const mouseY = e.clientY - rect.top;
                  
                  // Calculate direction to move away from mouse
                  const moveX = mouseX < rect.width / 2 ? 50 : -50;
                  const moveY = mouseY < rect.height / 2 ? 50 : -50;
                  
                  button.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                }}
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                Delete
              </button>
            </div>

            {resetStatus && (
              <div className={`mt-4 p-4 rounded-lg ${resetStatus.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {resetStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-8 max-w-2xl w-full backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Delete Account</h1>
            <p className="text-gray-500 mb-4">Please confirm your username to delete your account.</p>
            <input 
              type="text" 
              value={usernameConfirmation} 
              onChange={(e) => setUsernameConfirmation(e.target.value)} 
              className="w-full p-4 rounded-lg mb-4" 
              placeholder="Username"
            />
            {deleteError && (
              <div className="p-4 rounded-lg bg-red-100 text-red-600 mb-4">
                {deleteError}
              </div>
            )}
            <button 
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
            <button 
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors mt-4"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
