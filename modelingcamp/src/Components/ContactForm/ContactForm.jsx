// src/components/ContactForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Try again.");
    }
  };

  return (
    <section id="contact" className="bg-black-100 py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Contact Us</h2>

      {/* Social Links */}
      <div className="flex justify-center gap-6 text-3xl text-blue-600 mb-10">
        <a href="mailto:your@email.com" target="_blank" rel="noreferrer">
          <MdOutlineEmail className="hover:text-blue-800 transition" />
        </a>
        <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noreferrer">
          <CiLinkedin className="hover:text-blue-800 transition" />
        </a>
        <a href="https://github.com/yourgithub" target="_blank" rel="noreferrer">
          <FaGithub className="hover:text-blue-800 transition" />
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Send Message
        </button>

        {status && <p className="mt-4 text-center text-green-600 font-semibold">{status}</p>}
      </form>

      {/* Responsive Map */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">Our Location</h3>
        <div className="w-full h-64 md:h-96 rounded overflow-hidden shadow-md">
          <iframe
            title="Google Map"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1844.839599843673!2d38.7995048857988!3d9.018967468847956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8514e70ebf03%3A0x163f30c6bd2ab455!2sCity%20Mall!5e0!3m2!1sen!2set!4v1750931615453!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
