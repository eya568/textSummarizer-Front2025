// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 

} from 'lucide-react';
const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

 const handleLogout = () => {
   // Remove the access token from localStorage
   localStorage.removeItem('access_token');
   
   // Navigate to login page
   navigate('/login');
 };
  return (
    <header className="flex items-center justify-between border-b border-solid border-b-[#e7eef4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0d151c]">
        <div className="w-10 h-10">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
          </svg>
        </div>
        <Link to="/">
  <h2 className="text-[#0d151c] text-lg font-bold leading-tight tracking-[-0.015em]">Summarize</h2>
</Link>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
        <Link to="/Saved" className="text-[#0d151c] text-sm font-medium leading-normal">Saved</Link>          <a className="text-[#0d151c] text-sm font-medium leading-normal" href="#">Explore</a>
          <Link to="/profile" className="text-[#0d151c] text-sm font-medium leading-normal">Profileeee</Link>
          <button 
            onClick={handleLogout} 
            className="text-[#0d151c] text-sm font-medium leading-normal hover:text-red-600"
          >
            Logout
          </button>
        </div>

       
      </div>
    </header>
  );
};

export default Header;
