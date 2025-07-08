import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react"; // You can choose any Lucide icon you like

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching blogs");
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-600">Error: {error}</p>;
  }

  return (
    <div id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Gradient Heading with Icon */}
      <div className="flex items-center justify-center mb-10">
        <Newspaper className="w-8 h-8 text-pink-500 animate-bounce mr-2" />
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
          Latest Blogs & News
        </h2>
      </div>

      {blogs.length === 0 ? (
       <p className="text-center text-lg text-gray-500 bg-yellow-100 border border-yellow-300 rounded-md py-4 px-6 shadow-sm">
  🚫 No blogs to display at the moment. Please check back later!
</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogs.map(({ _id, title, description, date }) => (
            <motion.article
              key={_id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-100"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              layout
            >
              {/* Top Icon */}
              <div className="flex items-center mb-4">
                <Newspaper className="text-red-500 w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              </div>

              {/* Blog Description */}
              <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

              {/* Date */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>

              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Blogs;
