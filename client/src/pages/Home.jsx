/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="relative w-full h-[92vh] overflow-hidden">
      {/* ✅ Background Image */}
      <img
        src={assets.siddarth_family_background}
        alt="Background"
        className="w-full h-full object-cover brightness-100"
      />

      {/* ✅ Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-green-400/50 to-white/80"></div>

      {/* ✅ Animated Content Grid */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">

          {/* ✅ Animated Text Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg leading-tight">
              <span className='text-6xl lg:text-7xl text-green-700'>Welcome to</span> <br />
              <span className="text-6xl lg:text-8xl md:text-6xl bg-gradient-to-l from-blue-900 to-orange-600 bg-clip-text text-transparent font-bold">
                Siddarth Family
              </span>
            </h1>
          </motion.div>

          {/* ✅ Animated Image Section */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            <img 
              style={{ transform: "scale(2.0)" }}
              className="cursor-pointer scale-150 lg:scale-200 md:scale-125 h-32 md:h-40 mt-40 lg:mt-10 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2" 
              src={assets.chairman} 
              alt="Chairman" 
            />
          </motion.div>

        </div>
      </div>

    </div>
  )
}

export default Home
