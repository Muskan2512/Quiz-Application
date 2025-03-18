import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to QuizMaster</h1>
      <p className="text-lg mb-6">Test your knowledge with fun and challenging quizzes!</p>
      <div className=" flex flex-row space-x-4">

      <Link
        to="/login"
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
       Login
      </Link>
      <Link
        to="/signup"
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Signup
      </Link>
      </div>
    </div>
  );
};

export default Home;