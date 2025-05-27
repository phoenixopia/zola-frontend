import { useState } from "react";
import axios from "axios";


const Programs = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    instagram: "",
    gender: "",
    goals: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/consultations", formData);
      setMessage("Submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        instagram: "",
        gender: "",
        goals: "",
      });
    } catch (err) {
      console.error(err);      
      console.log(err);
      setMessage("Submission failed. Try again.");
    }
  };



  return (
    <div id="programs" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Modeling Programs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Program 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Fashion Modeling</h3>
          <p className="mb-4 text-gray-600">
            Learn the fundamentals of fashion modeling, posing techniques, and
            build confidence in front of the camera.
          </p>
          <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
            View Program
          </button>
        </div>

        {/* Program 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Runway Coaching</h3>
          <p className="mb-4 text-gray-600">
            Master your runway walk, posture, and presence with professional
            coaching tailored to all levels.
          </p>
          <button className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition">
            View Program
          </button>
        </div>
      </div>

      {/* Consultation Form */}
      <div className="bg-gray-100 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Fill out the form below for a free 1:1 consultation to see if you're a good fit
      </h2>

      {message && (
        <div className="text-center mb-4 text-green-600 font-semibold">{message}</div>
      )}

      <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
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
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
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
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
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
          <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium mb-1">
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
          <label htmlFor="instagram" className="block text-gray-700 font-medium mb-1">
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
          <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">
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

        {/* Goals */}
        <div>
          <label htmlFor="goals" className="block text-gray-700 font-medium mb-1">
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
    </div>
  );
};

export default Programs;
