import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const teamProfiles = [
  {
    name: "Zelalem Tedla Mesfin",
    title: "General Manager",
    description: `He is a dedicated, self-driven, and passionate model as well as a dynamic event organizer with a strong background in both academia and professional experience. He holds a Bachelor of Arts in Economics from Admas University and two master's degrees—one in Public Financial Management from Oromia State University and another in Transport Planning and Management from Ethiopian Civil Service University. Additionally, he has earned a modeling certificate from Abyssinia Fine Art and Modeling School.

With over a decade of experience in governmental offices, he has developed a strong expertise in planning, monitoring, and evaluation. His professional journey includes significant roles at various esteemed organizations:
• Addis Ababa Food, Medicine, and Healthcare Administration and Control Authority
• Emergency Relief Transport Enterprise (ERTE)
• Ethiopian Energy Authority
• Sheger Mass Transport Service Enterprise

Beyond his governmental work, he has built an impressive three-year career in the modeling industry, demonstrating versatility and excellence. His talents earned him the prestigious title of Ethiopian Next Top Model 2024. He appeared in TV commercials and music videos, including Enaney Belegn—Veronica Adane’s music video. He organized impactful events like KINETIBEBN LELIB HMUMAN for the Children’s Heart Foundation of Ethiopia. Currently, he serves as the main coach at Zola Modeling and Art School.`
  },
  {
    name: "Tigist Shanbel Yishak",
    title: "Marketing Manager / Coach",
    description: `She is a self-motivated journalist, model, and writer. With two years as a radio host at FM Addis 97.1 (EBC) and FM 96.3 under Addis Media Network (AMN), she brought compelling stories to her audience. She also worked in various TV newsroom departments.

She holds a Journalism and International Communication degree from Bahir Dar University and a modeling certificate from Loret Modeling Academy. She was a Top 20 finalist in Miss International Ethiopia 2024 and part of Ethiopian Next Top Model.

Currently:
• Marketing Manager at TDS Multimedia PLC
• Associate Producer and Host at FM 96.3
• Coach at Zola Modeling and Art School`
  },
  {
    name: "Yohannes Workneh Alemayehu",
    title: "Vocal & Acting Coach",
    description: `A talented model with 2+ years of experience and a Top 5 contestant in Ethiopian Next Top Models 2024. He appeared in fashion shows and TV commercials, and now leads vocal and acting classes at Zola Modeling and Art School, helping students build a strong performance foundation.`
  },
  {
    name: "Abrham Shibeshi Aknaw",
    title: "Registration Officer",
    description: `He is an experienced ICT professional and transport officer with over six years in government service. He holds:
• BSc in Computer Science (Admas University)
• BSc in Urban Transport Management (Kotebe Metropolitan University)
• MSc in Transport Planning and Management (Ethiopian Civil Service University)

He currently works as Registration Officer at Zola Modeling and Art School, ensuring smooth administrative operations.`
  }
];

const TeamProfile = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-7xl bg-[#10131a] text-white mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-400 hover:text-blue-600 font-semibold"
      >
        &larr; Go Back
      </Link>

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-12">
        Manager & Team Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {teamProfiles.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.02]"
            layout
          >
            
            <h2 className="text-2xl font-semibold text-blue-600 mb-1">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500 italic mb-4">{member.title}</p>

            <AnimatePresence initial={false}>
              {expandedIndex === index ? (
                <motion.p
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-700 whitespace-pre-line leading-relaxed"
                >
                  {member.description}
                </motion.p>
              ) : (
                <motion.p
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-700 whitespace-pre-line leading-relaxed"
                >
                  {member.description.slice(0, 400)}...
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={() => toggleExpand(index)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium transition"
            >
              {expandedIndex === index ? "Show Less ▲" : "Read More ▼"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamProfile;
