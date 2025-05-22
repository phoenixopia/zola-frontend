import About from "./Components/About/About";
import Programs from "./Components/Programs/Programs";
import ContactForm from "./Components/ContactForm/ContactForm";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import ShotsPicture from "./Components/ShotsPicture/ShotsPicture";
import MissionAndVision from "./Components/MissionAndVision/MissionAndVision";
import Footer from "./Components/Footer/Footer";
function App() {
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

export default App;
