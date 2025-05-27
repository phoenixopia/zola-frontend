import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Your existing components
import About from "./Components/About/About";
import Programs from "./Components/Programs/Programs";
import ContactForm from "./Components/ContactForm/ContactForm";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import ShotsPicture from "./Components/ShotsPicture/ShotsPicture";
import MissionAndVision from "./Components/MissionAndVision/MissionAndVision";
import Footer from "./Components/Footer/Footer";

// Admin components
import AdminLogin from './Admin/AdminLogin'; 
import AdminDashboard from './Admin/AdminDashboard'; 
import Dashboard from './Admin/AdminPages/Dashboard';
import Users from './Admin/AdminPages/Users';
import Models from './Admin/AdminPages/Models';
import CreatePro from './Admin/AdminPages/CreatePro';

// Admin auth check wrapper
function RequireAdmin({ children }) {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin ? children : <Navigate to="/admin/login" />;
}

function MainLayout() {
  return (
    <div className="bg-black bg-opacity-30 h-auto w-full overflow-hidden">
      <Navbar />
      <Home />
      <About />
      <Programs />
      <ShotsPicture />
      <MissionAndVision />
      <ContactForm />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={<MainLayout />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin dashboard routes, protected */}
        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="models" element={<Models />} />
          <Route path="createprogram" element={<CreatePro />} />
        </Route>

        {/* Catch all: redirect unknown admin routes to login */}
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
