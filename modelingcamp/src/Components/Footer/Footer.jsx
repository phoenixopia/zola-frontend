import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black-100 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Zola Modeling</h2>
          <p className="text-sm leading-relaxed">
            Empowering aspiring models with expert guidance, workshops, and confidence to succeed in the modeling industry.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#programs" className="hover:text-white transition">Programs</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: info@Zola.com</li>
            <li>Phone: (058) 456-7890</li>
            <li>Address: Megenagna ,sitiMall, 8thfloor</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom */}
      <div className="text-center text-sm text-white">
        &copy; {new Date().getFullYear()} Zola Modeling. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
