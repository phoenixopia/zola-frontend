import React from 'react';

const MissionAndVision = () => {
  return (
    <section id="mission-vision" className="p-8 bg-black-100 mt-10 max-w-5xl mx-auto rounded-xl shadow-lg space-y-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Mission & Vision</h2>

      {/* Mission Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Image on Left */}
        <img
          src="/images/Z2.jpg"
          alt="Mission"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        {/* Text on Right */}
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-white">🚀 Mission</h3>
          <p className="text-white mt-2">
            Our mission is to become the leading school of modeling and art education in Ethiopia by 2030, 
            fostering creativity and innovation while preparing students for successful careers. 
            We aim to cultivate cultural pride and ensure our students are competitive at a global level.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-6">
        {/* Image on Right */}
        <img
          src="/images/Z1.jpg"
          alt="Vision"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        {/* Text on Left */}
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-white">🌟 Vision</h3>
          <p className="text-white mt-2">
            Our vision is to provide comprehensive and engaging education in modeling and art, 
            equipping students with the skills, knowledge, and confidence to thrive in their chosen careers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
