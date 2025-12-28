/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { events } from "../assets/assets";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16 px-6 md:px-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto text-center"
      >
        {/* ✅ Heading Section */}
        <motion.h2
          className="text-4xl font-bold text-green-700 mb-6"
          variants={cardVariants}
        >
          About Our Alumni Network
        </motion.h2>

        <motion.p
          className="text-gray-700 text-lg mb-12 leading-relaxed"
          variants={cardVariants}
        >
          Our Alumni Network is a vibrant community that keeps graduates connected
          through events, mentorship programs, and social initiatives.
          Explore some of our signature alumni events below!
        </motion.p>

        {/* ✅ Event Cards Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Event Image */}
              <motion.img
                src={event.image}
                alt={event.title}
                className="h-56 w-full object-cover rounded-t-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Event Content */}
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-base">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
