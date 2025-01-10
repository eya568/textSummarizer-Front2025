import { useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { requestPasswordReset } from '../services/authService';  // Import the new function

const LoginPage = () => {
  const { handleLogin, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const handleForgotPassword = async () => {
    // Reset previous messages
    setResetError('');
    setResetSuccess('');
    setIsResettingPassword(true);

    // Validate email before sending reset request
    if (!email) {
      setResetError('Please enter your email address first');
      setIsResettingPassword(false);
      return;
    }

    try {
      const response = await requestPasswordReset(email);
      setResetSuccess('Password reset link sent to your email');
    } catch (err) {
      setResetError(err.message);
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/register'); // Redirect to register page when the sign-up button is clicked
  };

  return (
    <AuthProvider>
      <div 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="w-full max-w-md">
          <div className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your credentials to access your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    disabled={isResettingPassword}
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 flex items-center gap-1 disabled:opacity-50"
                  >
                    {isResettingPassword && (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    )}
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>

              {/* Password Reset Success/Error Messages */}
              {resetError && (
                <p className="text-sm text-red-600 dark:text-red-400">{resetError}</p>
              )}
              {resetSuccess && (
                <p className="text-sm text-green-600 dark:text-green-400">{resetSuccess}</p>
              )}

              {/* Existing login error */}
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>GitHub</span>
                </div>
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button type="button" onClick={handleSignUpRedirect} className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
                Sign up
              </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default LoginPage;