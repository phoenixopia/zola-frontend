import React from "react";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

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
            <li>Email: Zolamodelingandartschool@gmail.com</li>
            <li>Phone: +2519 42825584</li>
            <li>Address: Megenagna city mall 8th Floor  </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=6155029435461" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="https://www.instagram.com/official.model.zola?igsh=MWFyZDFnOGN4d2kwOQ==" className="hover:text-white transition"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@zolamodelingschool?_t=ZM-8xr5YOwcu2v&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
  <SiTiktok />
</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom */}
<div className="text-center text-sm text-white">
  &copy; {new Date().getFullYear()} Zola Modeling. All rights reserved. |{' '}
  <span style={{ color: '#FFD700', fontWeight: 'bold' }}>Powered by Phoenixopia Solution</span>
</div>

    </footer>
  );
};

export default Footer;
