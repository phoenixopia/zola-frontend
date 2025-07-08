import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="pt-[100px] min-h-screen bg-[#10131a] text-white font-sans">

      {/* Home Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12"
      >
        {/* Left Side Content with Padding Left */}
        <div className="pl-6 md:pl-12">
          <h4 className="text-2xl font-bold text-orange-400 tracking-wide mb-2">
            Zola Modeling and Art School
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Best School & Anything <br />
            to <span className="text-blue-400">Learn</span> Smart Way
          </h2>
          <p className="mb-6">A Home to Kids, Learning & Curricula</p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/team")}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Team Profile
            </button>
            <button
              onClick={handleRegisterClick}
              className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Register Here
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="/images/Zola.JPG"
            alt="Students"
            className="w-64 h-64 object-cover rounded-full shadow-2xl border-2 border-white"
          />
        </motion.div>
      </motion.section>

      {/* Welcome Section */}
      <div className="relative z-10 text-center pl-6 md:pl-12">
        <p className="text-gray-200 text-xl tracking-[.3em] mb-2">WELCOME TO</p>
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="text-white">ZOLA MODELI</span>
          <span className="text-blue-900">NG</span>
        </h1>
      </div>

    </div>
  );
};

export default Home;
