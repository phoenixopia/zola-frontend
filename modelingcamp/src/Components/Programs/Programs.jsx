import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Programs = () => {
  const [programs, setPrograms] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/programs");
        setPrograms(res.data);
      } catch (err) {
        console.error("Error fetching programs", err);
      }
    };
    fetchPrograms();
  }, []);

 
  return (
    <div id="programs" className="max-w-6xl mx-auto px-4 py-12">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-3xl font-bold text-center mb-10 text-white"
      >
        Our Modeling Programs
      </motion.h2>

      {/* Display Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {programs.map((program, index) => (
          <motion.div
            key={program._id}
            className="bg-white rounded-2xl shadow-lg p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={index}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
          >
            <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
            <p className="mb-4 text-gray-600">{program.description}</p>
            <button
              onClick={() => navigate(`/program/${program._id}`)}
              className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              View Program
            </button>
          </motion.div>
        ))}
      </div>

     
    </div>
  );
};


export default Programs;
