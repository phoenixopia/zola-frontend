import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ShotsPicture = () => {
  const [models, setModels] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/models");
        const data = await res.json();
        setModels(data);
      } catch (err) {
        console.error("Failed to fetch models", err);
      }
    };

    fetchModels();
  }, []);
   const handleRateUsClick = () => {
    navigate("/rateform"); // Route must match your route in React Router
  };


  return (
    <div id="models" className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl text-white font-bold mb-6 text-center">Our Top Models</h2>
       {/* Rate Us Button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#38bdf8" }}
        whileTap={{ scale: 0.95 }}
        className="bg-sky-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg mb-6 block mx-auto"
        onClick={handleRateUsClick}
      >
        ⭐ Rate Us
      </motion.button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {models.map((model) => (
          <motion.div
            key={model._id}
            className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg group"
            onClick={() => setSelectedImage(model.imageUrl)}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={`http://localhost:5000/${model.imageUrl}`}
              alt={model.name}
              className="w-full h-56 object-cover transition-transform duration-300"
            />

            {/* Overlay with name and description */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white transition-all duration-300 group-hover:translate-y-0 translate-y-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <h3 className="text-lg font-semibold">{model.name}</h3>
              <p className="text-sm text-gray-300 line-clamp-2">{model.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={`http://localhost:5000/${selectedImage}`}
              alt="Full View"
              className="max-w-3xl max-h-[80vh] rounded-xl shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShotsPicture;
