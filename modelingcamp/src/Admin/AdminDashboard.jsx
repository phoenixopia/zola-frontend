import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaUserAlt,
  FaChalkboardTeacher,
  FaQuoteRight,
  FaSignOutAlt,
  FaTimes,
  FaCog,
  FaBars,
} from 'react-icons/fa';

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          } md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-6 relative h-full flex flex-col">
          {/* Close icon for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-red-500"
            aria-label="Close sidebar"
          >
            <FaTimes size={24} />
          </button>

          <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 tracking-tight drop-shadow-md">
            Admin
          </h1>

          <nav className="flex flex-col space-y-4 text-[16px] flex-grow">
            {[
              { to: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
              { to: '/admin/users', icon: <FaUsers />, label: 'Registered Users' },
              { to: '/admin/models', icon: <FaUserAlt />, label: 'Models' },
              { to: '/admin/createprogram', icon: <FaChalkboardTeacher />, label: 'Programs' },
              { to: '/admin/testimonials', icon: <FaQuoteRight />, label: 'Testimonials' },
              { to: '/admin/settings', icon: <FaCog />, label: 'Settings' },
            ].map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 font-semibold px-2 rounded-md ${
                    isActive
                      ? 'text-blue-600 font-bold bg-blue-100'
                      : 'text-gray-700 hover:text-blue-600'
                  }`
                }
                onClick={() => setSidebarOpen(false)} // close sidebar on link click (mobile)
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            ))}

            <button
              onClick={logout}
              className="flex items-center space-x-2 mt-auto bg-red-500 text-white p-2 rounded hover:bg-red-600"
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
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
            aria-label="Open sidebar"
          >
            <FaBars size={24} />
          </button>
          <h2 className="font-semibold text-lg">Admin Dashboard</h2>
          <div style={{ width: 24 }} /> {/* placeholder for symmetry */}
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">       
          <Outlet />
        </main>
      </div>
    </div>
  );
}
