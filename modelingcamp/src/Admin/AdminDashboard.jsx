import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserAlt, FaChalkboardTeacher, FaQuoteRight, FaSignOutAlt, FaTimes } from 'react-icons/fa';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    alert('You have been logged out.');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-md transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-6 relative">
          {/* Close icon for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>

          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <nav className="flex flex-col space-y-4 text-[16px]">
            <Link to="/admin/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/users" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold">
              <FaUsers />
              <span>Registered Users</span>
            </Link>
            <Link to="/admin/models" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold">
              <FaUserAlt />
              <span>Models</span>
            </Link>
            <Link to="/admin/createprogram" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold">
              <FaChalkboardTeacher />
              <span>Programs</span>
            </Link>
            <Link to="/admin/testimonials" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold">
              <FaQuoteRight />
              <span>Testimonials</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 mt-6 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for mobile */}
        <header className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="font-semibold text-lg">Admin Dashboard</h2>
          <div></div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
