import React from "react";

const Programs = () => {
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

        <form className="space-y-6 max-w-xl mx-auto">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="+251948877456"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="dob">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Instagram Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="instagram">
              Instagram Username
            </label>
            <input
              id="instagram"
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
              placeholder="@yourusername"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black outline-none"
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-say">Prefer not to say</option>
            </select>
          </div>

          {/* Goals */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
              What are your goals?
            </label>
            <textarea
              id="message"
              rows="4"
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
