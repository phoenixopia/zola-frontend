import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    instagram: '',
    gender: '',
    goals: '',
    selectedProgram: '',  // <-- New field for program selection
  });

  const [programs, setPrograms] = useState([]);  // Programs fetched from backend
  const [message, setMessage] = useState('');

  // Fetch programs on component mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/programs');
        setPrograms(response.data);
      } catch (err) {
        console.error('Failed to fetch programs:', err);
      }
    };

    fetchPrograms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/consultations', formData);
      setMessage('Submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        instagram: '',
        gender: '',
        goals: '',
        selectedProgram: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('Submission failed. Try again.');
    }
  };

  return (
    <div className="bg-[#10131a] rounded-2xl p-8 shadow-lg">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-500 hover:text-violet-800 font-semibold"
      >
        &larr; Go Back
      </Link>

      <h2 className="text-2xl text-white font-semibold text-center mb-6">
        Fill out the form below for a free 1:1 consultation to see if you're a good fit
      </h2>

      {message && (
        <div className="text-center mb-4 text-green-600 font-semibold">{message}</div>
      )}

      <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-white font-medium mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            placeholder="Your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-white font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-white font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            placeholder="+251948877456"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-white font-medium mb-1">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Instagram */}
        <div>
          <label htmlFor="instagram" className="block text-white font-medium mb-1">
            Instagram Username
          </label>
          <input
            id="instagram"
            type="text"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            placeholder="@yourusername"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-white font-medium mb-1">
            Gender
          </label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Select Program */}
        <div>
          <label htmlFor="selectedProgram" className="block text-white font-medium mb-1">
            Select Program
          </label>
          <select
            id="selectedProgram"
            value={formData.selectedProgram}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            required
          >
            <option value="">Select a program</option>
            {programs.map((program) => (
              <option key={program._id} value={program.title}>
                {program.title}
              </option>
            ))}
          </select>
        </div>

        {/* Goals */}
        <div>
          <label htmlFor="goals" className="block text-white font-medium mb-1">
            What are your goals?
          </label>
          <textarea
            id="goals"
            rows="4"
            value={formData.goals}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            placeholder="Tell us what you're looking for..."
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition w-full"
        >
          Request Free Consultation
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
