import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Star, Heart, Users } from "lucide-react";

const milestones = [
  { year: "2015", title: "Founded", description: "Zola Modeling School was born." },
  { year: "2017", title: "First International Show", description: "Debuted in South Africa." },
  { year: "2020", title: "Launched Art Programs", description: "Expanded to fine arts and choreography." },
  { year: "2023", title: "Opened 3rd Branch", description: "Now in Addis Ababa, Bahir Dar, and Hawassa." },
];

const values = [
  { icon: <Star className="text-orange-400" />, title: "Excellence", desc: "We pursue world-class modeling skills." },
  { icon: <Heart className="text-red-500" />, title: "Passion", desc: "Driven by love for fashion and art." },
  { icon: <Users className="text-blue-400" />, title: "Community", desc: "We uplift every student's unique path." },
];

const stats = [
  { label: "Students Trained", value: 100 },
  { label: "Awards Won", value: 5 },
  { label: "Shows Hosted", value: 10 },
];

const About = () => {
  return (
    <section id="about">
      {/* New White Description Section */}
      <div className="relative bg-white overflow-hidden px-6 py-12 md:py-16 text-center">
        <p className="text-lg md:text-xl font-semibold text-[#0a0a23] max-w-4xl mx-auto leading-relaxed">
          At Zola Modeling, we’re more than a development modeling agency – we’re a launchpad for aspiring models to transform their dreams into reality. Our advanced workshops, intensive training programs, confidence classes, and step-by-step action plans provide the foundation for a successful modeling career. With a strong emphasis on education, safety, and well-being, we set a new standard in the industry, equipping you with everything you need to succeed in the world of modeling.
        </p>
      </div>

      {/* Advanced Section */}
      <div className="bg-[#10131a] text-white px-6 py-12">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-orange-400 mb-10"
        >
          About Zola Modeling & Art School
        </motion.h2>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#1f2937] p-6 rounded-xl"
          >
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">Our Mission</h3>
            <p>
              Our mission is to become the leading school of modeling and art education in Ethiopia by 2030, 
            fostering creativity and innovation while preparing students for successful careers. 
            We aim to cultivate cultural pride and ensure our students are competitive at a global level.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#1f2937] p-6 rounded-xl"
          >
            <h3 className="text-2xl font-semibold text-orange-300 mb-2">Our Vision</h3>
            <p>
               Our vision is to provide comprehensive and engaging education in modeling and art, 
            equipping students with the skills, knowledge, and confidence to thrive in their chosen careers.
            </p>
          </motion.div>
        </div>

        {/* Founder Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1f2e] rounded-xl p-6 shadow-lg text-center max-w-sm mx-auto mb-16"
        >
          <img
            src="/images/Z2.jpg"
            alt="Founder"
            className="w-32 h-32 mx-auto rounded-full border-4 border-orange-400 mb-4"
          />
          <h3 className="text-xl font-bold text-white">Zelalem Tedla Mesfin</h3>
          <p className="text-orange-300 italic">“Inspiring models to walk with passion and purpose.”</p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-16">
          {values.map((val) => (
            <motion.div
              key={val.title}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1f2937] p-6 rounded-xl"
            >
              <div className="flex justify-center mb-3">{val.icon}</div>
              <h4 className="text-lg font-semibold text-white mb-1">{val.title}</h4>
              <p className="text-sm text-gray-300">{val.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-blue-400 mb-6">Our Journey</h3>
          <div className="border-l-2 border-orange-500 ml-4">
            {milestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="mb-6 ml-6"
              >
                <h4 className="text-lg font-bold">{item.year} - {item.title}</h4>
                <p className="text-sm text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 text-center gap-6 mb-16">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              whileInView={{ scale: 1 }}
              initial={{ scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1f2937] p-6 rounded-xl shadow-md"
            >
              <h3 className="text-3xl font-bold text-orange-400">
                <CountUp end={s.value} duration={2} separator="," />
                {s.label === "Students Trained" && "+"}
              </h3>
              <p className="mt-2 text-gray-300">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Video Intro */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-orange-300 mb-4">Watch Our Story</h3>
          <video controls className="w-full rounded-xl shadow-lg">
            <source src="/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default About;
