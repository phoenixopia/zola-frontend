import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Your existing components
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
import HomeWithNavbar from './Components/HomeWithNavbar/HomeWithNavbar';
import VirtualRunway from './Components/VirtualRunway/VirtualRunway';

// Admin components
import AdminLogin from './Admin/AdminLogin'; 
import AdminDashboard from './Admin/AdminDashboard'; 
import Dashboard from './Admin/AdminPages/Dashboard';
import Users from './Admin/AdminPages/Users';
import Models from './Admin/AdminPages/Models';
import CreatePro from './Admin/AdminPages/CreatePro';
import Testimonials from './Admin/AdminPages/Testimonials';


// Admin auth check wrapper
function RequireAdmin({ children }) {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin ? children : <Navigate to="/admin/login" />;
}

function MainLayout() {
  return (
    <div className="bg-[#10131a] h-auto w-full overflow-hidden">
  <HomeWithNavbar />
      <About />
      <Programs />
      < VirtualRunway/>
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
        {/* Main site routes */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/program/:id" element={<Viewprogram />} />
        <Route path='/register' element={< RegisterUser />} />
        <Route path='/rateform' element={< TestimonialForm />} />
        <Route path='/team' element={< TeamProfile />} />
        <Route path="/hm" element={<HomeWithNavbar />} />
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
          <Route path="testimonials" element={<Testimonials />} />
        </Route>

        {/* Catch all: redirect unknown admin routes to login */}
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
