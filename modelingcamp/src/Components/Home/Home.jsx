import React, { useState, useEffect } from 'react';

const images = [
  '/images/model1.jpg',
  '/images/model-6.jpg',
  '/images/model3.webp',
  '/images/model-5.webp',
  // Add more image paths as needed

];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-5  h-screen relative">
      {/* Slideshow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Overlay Text */}
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-40">
        <div className="text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-xl font-medium mb-2 drop-shadow-lg">
             Elevate your confidence, master the runway, and launch your modeling career
            with professional training from the industry's finest. Join us and shine on every stage.
          </h1>
          
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-white' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
