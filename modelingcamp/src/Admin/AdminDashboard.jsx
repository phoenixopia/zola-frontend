import { useState ,React } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

   const logout = () => {
    localStorage.removeItem('adminToken'); // Remove token from localStorage
    alert('You have been logged out.');
    navigate('/admin/login'); // Redirect to login page
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-md transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Registerd Users
            </Link>
            <Link
              to="/admin/models"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Models
            </Link>
          <Link
              to="/admin/createprogram"
              className="text-gray-700 hover:text-blue-600 font-semibold"
            >
              Programs
            </Link>

            <button
              onClick={logout}
              className="mt-6 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
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
