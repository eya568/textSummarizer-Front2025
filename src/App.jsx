import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HomePage from './pages/HomePage';
import SavedSummaries from './components/savedSummaries'
import SummaryPage from './components/SummaryPage';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage'; // Added import statement for ProfilePage

function App() {
  // Check if token exists
  const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return token && token !== 'undefined' && token.trim() !== '';
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirect based on authentication status */}
          <Route 
            path="/login" 
            element={isAuthenticated() ? <Navigate to="/homepage" replace /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated() ? <Navigate to="/homepage" replace /> : <RegisterPage />} 
          />
          <Route 
            path="/reset-password" 
            element={isAuthenticated() ? <Navigate to="/homepage" replace /> : <ResetPasswordPage />} 
          />
          
          {/* Default route */}
          <Route 
            path="/" 
            element={
              isAuthenticated() ? 
                <Navigate to="/homepage" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/Saved" element={<SavedSummaries />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/profile" element={<ProfilePage />} /> // Added route for ProfilePage
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;