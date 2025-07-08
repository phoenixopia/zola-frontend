import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TestimonialForm from "../TestimonialList/TestmonialForm";

const ShotsPicture = () => {
  const [models, setModels] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 4;

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/models");
        const data = await res.json();
        setModels(data);
      } catch (err) {
        setError("Failed to fetch models.");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = models.slice(indexOfFirstModel, indexOfLastModel);

  const totalPages = Math.ceil(models.length / modelsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div id="models" className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl text-white font-bold mb-6 text-center">
        Our Top Models
      </h2>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#38bdf8" }}
        whileTap={{ scale: 0.95 }}
        className="bg-sky-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg mb-6 block mx-auto"
        onClick={() => setShowTestimonialForm(true)}
      >
        ⭐ Rate Us
      </motion.button>

      {/* Loading */}
      {loading && <p className="text-center text-white">Loading...</p>}
      {/* Error */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Grid of Models */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {currentModels.map((model) => (
          <motion.div
            key={model._id}
            className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg group"
            onClick={() => setSelectedImage(model.imageUrl)}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={`http://localhost:5000/${model.imageUrl}`}
              alt={model.name}
              className="w-full h-56 object-cover"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white transition-all duration-300 group-hover:translate-y-0 translate-y-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <h3 className="text-lg font-semibold">{model.name}</h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                {model.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-sky-500 text-white hover:bg-sky-600"
          }`}
        >
          Previous
        </button>

        <span className="text-white text-lg mt-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-sky-500 text-white hover:bg-sky-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* Fullscreen Image Modal */}
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

      {/* Testimonial Modal */}
      {showTestimonialForm && (
        <TestimonialForm onClose={() => setShowTestimonialForm(false)} />
      )}
    </div>
  );
};

export default ShotsPicture;
