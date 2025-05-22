import React from "react";

const About = () => {
  return (
    <section id="about" className="relative bg-white overflow-hidden">
      {/* Background Image with Overlay Text */}
      <div className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center">
          <p className="text-gray-200 text-xl tracking-[.3em]">WELCOME TO</p>
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-black">ZOLA MODELI</span><span className="text-blue-900">NG</span>
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-6 py-12 md:py-16 text-center">
        <p className="text-lg md:text-xl font-semibold text-[#0a0a23] max-w-4xl mx-auto leading-relaxed">
          At Zola Modeling, we’re more than a development modeling agency – we’re a launchpad for aspiring models to transform their dreams into reality. Our advanced workshops, intensive training programs, confidence classes, and step-by-step action plans provide the foundation for a successful modeling career. With a strong emphasis on education, safety, and well-being, we set a new standard in the industry, equipping you with everything you need to succeed in the world of modeling.
        </p>
      </div>
    </section>
  );
};

export default About;
