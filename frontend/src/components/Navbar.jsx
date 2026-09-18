import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiHome, FiBarChart2, FiZap } from 'react-icons/fi';
import { useAppStore } from '../store/appStore';

function Navbar() {
  const { logout, user } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">HabitForge</span>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-8">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FiHome size={20} />
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FiBarChart2 size={20} />
              Analytics
            </Link>
            <Link
              to="/predictions"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <FiZap size={20} />
              Predictions
            </Link>

            {/* User Info and Logout */}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <div className="text-sm">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition px-4 py-2 rounded-lg hover:bg-red-50"
              >
                <FiLogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
