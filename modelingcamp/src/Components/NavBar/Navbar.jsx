import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Blogs", href: "#blogs" },
    { name: "Programs", href: "#programs" },
    { name: "Models", href: "#models" },
    { name: "Testimonials", href: "#testimonialls" },
    { name: "Contact Us", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full text-white px-6 py-2 transition-all duration-500 ${
        scrolled
          ? "bg-black bg-opacity-90 backdrop-blur-md shadow-md"
          : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[80px]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="images/logoo2.png"
            alt="Zola Logo"
            style={{ maxHeight: "110px", width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
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

      {/* Mobile Dropdown Nav */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-95 transition-all duration-500 rounded-md mt-2 p-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-white hover:text-orange-400 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
