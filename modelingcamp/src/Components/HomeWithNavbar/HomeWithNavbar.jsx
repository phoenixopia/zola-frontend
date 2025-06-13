import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const HomeWithNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Models", href: "#models" },
    { name: "Testimonials", href: "#testimonialls" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#10131a] text-white font-sans">
      {/* Navbar */}
      <nav className="w-full bg-[#10131a] text-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-orange-400 tracking-wide">
              Zola modeling and art school
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-orange-400 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 px-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-white hover:text-orange-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Home Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12"
      >
        <div>
          <p className="text-sm text-orange-300 mb-2">We Will Teach You How to Learn</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Best School & Anything <br />
            to <span className="text-blue-400">Learn</span> Smart Way
          </h2>
          <p className="mb-6">A Home to Kids, Learning & Curricula</p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/team")}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Team profile
            </button>
            <button
            onClick={handleRegisterClick}
            className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
              Register Here
            </button>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="/images/Zola.JPG"
            alt="Students"
            className="w-64 h-64 object-cover rounded-full shadow-2xl border-2 border-white"
          />
        </motion.div>
      </motion.section>

      <div className="relative z-10 text-center">
          <p className="text-gray-200 text-xl tracking-[.3em]">WELCOME TO</p>
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-white">ZOLA MODELI</span><span className="text-blue-900">NG</span>
          </h1>
        </div>
    </div>
  );
};

export default HomeWithNavbar;
