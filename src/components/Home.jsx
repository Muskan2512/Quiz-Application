import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import quizImage from "../assets/quiz.svg"; // Make sure to add an image in assets

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-6">
      {/* Quiz Image */}
      {/* <motion.img 
        src={quizImage} 
        alt="Quiz Illustration"
        className="w-64 md:w-80 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      /> */}

      {/* Title */}
      <motion.h1 
        className="text-5xl font-extrabold mb-4 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-yellow-300">QuizMaster</span> 🎯
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        className="text-lg mb-6 text-gray-200 px-4 md:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Test your knowledge with fun and challenging quizzes! 🧠🔥
      </motion.p>

      {/* Buttons */}
      <motion.div 
        className="flex flex-row space-x-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Link
          to="/login"
          className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition duration-300 ease-in-out transform"
        >
          Login 🚀
        </Link>
        <Link
          to="/signup"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 hover:scale-105 transition duration-300 ease-in-out transform"
        >
          Signup 📝
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
