import React from "react";

const modelShots = [
  {
    id: 1,
    src: "/images/m1.jpg",
    alt: "Model 1 at Zola",
  },
  {
    id: 2,
    src: "/images/m2.jpeg",
    alt: "Model 2 at Zola",
  },
  {
    id: 3,
    src: "/images/m3.jpeg",
    alt: "Model 3 at Zola",
  },
  {
    id: 4,
    src: "/images/m5.jpeg",
    alt: "Model 4 at Zola",
  },
 
];

const ShotsPicture = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Shots at Zola Modeling</h2>
        <h4 className="text-3xl text-center mt-2">This can Be you</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {modelShots.map((shot) => (
          <div key={shot.id} className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={shot.src}
              alt={shot.alt}
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShotsPicture;
