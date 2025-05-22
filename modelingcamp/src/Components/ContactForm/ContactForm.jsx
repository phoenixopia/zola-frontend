// src/components/ContactForm.jsx
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    alert("✅ Message sent (simulated - no backend)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-black-100  py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Contact Us</h2>

      {/* Contact Links */}
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

      {/* Form */}
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
      </form>
    </section>
  );
};

export default ContactForm;
