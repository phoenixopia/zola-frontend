import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import About from "./Components/About/About";
import Programs from "./Components/Programs/Programs";
import ContactForm from "./Components/ContactForm/ContactForm";
import ShotsPicture from "./Components/ShotsPicture/ShotsPicture";
import Footer from "./Components/Footer/Footer";
import Viewprogram from './Components/Viewprogram/Viewprogram';
import RegisterUser from './Components/RegisterUser/RegisterUser';
import TestimonialList from './Components/TestimonialList/TestimonialList';
import TestimonialForm from './Components/TestimonialList/TestmonialForm';
import TeamProfile from './Components/TeamProfile/TeamProfile';
import VirtualRunway from './Components/VirtualRunway/VirtualRunway';
import Blogs from './Components/Blogs/Blogs';
import Home from './Components/Home/Home';

import Navbar from './Components/NavBar/Navbar';

// Admin Components
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import Dashboard from './Admin/AdminPages/Dashboard';
import Users from './Admin/AdminPages/Users';
import Models from './Admin/AdminPages/Models';
import CreatePro from './Admin/AdminPages/CreatePro';
import Testimonials from './Admin/AdminPages/Testimonials';
import Settings from './Admin/AdminPages/Settings';

// Not Found Page
function NotFound() {
  return (
    <div className="text-white text-center mt-20">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

// Admin auth check
function RequireAdmin({ children }) {
  const isAdmin = localStorage.getItem('adminToken');
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

// Public layout
function MainLayout() {
  return (
    <div className="bg-[#10131a] h-auto w-full overflow-hidden">
      <Navbar /> 
      <Home />
      <About />
      <Blogs />
      <Programs />
      <VirtualRunway />
      <ShotsPicture />
      <TestimonialList />
      <ContactForm />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/program/:id" element={<Viewprogram />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/rateform" element={<TestimonialForm />} />
        <Route path="/team" element={<TeamProfile />} />

        {/* Correct admin login path */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Optional: Redirect wrongly typed route to correct one */}
        <Route path="/Admin/AdminLogin" element={<Navigate to="/admin/login" replace />} />

        {/* Protected admin dashboard and subroutes */}
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
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
