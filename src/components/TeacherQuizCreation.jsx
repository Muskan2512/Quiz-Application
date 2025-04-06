import React, { useState,useEffect } from "react";

import {createATest} from "../api/createTest"

const TeacherQuizCreation = () => {
  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  const handleQuestionSubmit = async(e) => {
    e.preventDefault();
    if (questions.length < numQuestions) {
      const newQuestion = {
        questionText: e.target.question.value,       
        optionA:e.target.option1.value,
        optionB:e.target.option2.value,
        optionC:e.target.option3.value,
        optionD:e.target.option4.value,
        correctAnswer: e.target.correctAnswer.value,
      };


         // Update the question array first
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    // console.log("Number of questions is:",numQuestions);
    // console.log("Title:",title);
    // console.log("Question array is", updatedQuestions);

    // When all questions are added, store the test
    if (updatedQuestions.length === parseInt(numQuestions)) {
      setCurrentStep(2);
      try {
        // console.log("Creating test:", title, numQuestions, updatedQuestions);
        await createATest(title, numQuestions, updatedQuestions);
        // console.log("Test created successfully!");
      } catch (error) {
        console.error("Failed to create the test:", error);
      }
    }

    e.target.reset();
    }

  };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h2 className="text-3xl font-bold mb-4 text-white">Create a Quiz</h2>
      {currentStep === 0 && (
        <form onSubmit={handleTitleSubmit} className="bg-white p-6 rounded shadow-lg w-96">
          <label className="block mb-2 font-semibold">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <label className="block mb-2 font-semibold">Number of Questions</label>
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded font-semibold hover:bg-blue-700">
            Next
          </button>
        </form>
      )}
      {currentStep === 1 && questions.length < numQuestions && (
        <form onSubmit={handleQuestionSubmit} className="bg-white p-6 rounded shadow-lg w-96">
          <label className="block mb-2 font-semibold">Question {questions.length + 1}</label>
          <input type="text" name="question" className="w-full p-2 border border-gray-300 rounded mb-4" required />
          <label className="block mb-2 font-semibold">Options</label>
          <input type="text" name="option1" className="w-full p-2 border border-gray-300 rounded mb-2" required />
          <input type="text" name="option2" className="w-full p-2 border border-gray-300 rounded mb-2" required />
          <input type="text" name="option3" className="w-full p-2 border border-gray-300 rounded mb-2" required />
          <input type="text" name="option4" className="w-full p-2 border border-gray-300 rounded mb-2" required />
          <label className="block mb-2 font-semibold">Correct Answer</label>
          <select
  name="correctAnswer"
  className="w-full p-2 border border-gray-300 rounded mb-4"
  required
>
  <option value="">Select Correct Answer</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
</select>

          <button type="submit" className="bg-green-600 text-white w-full py-2 rounded font-semibold hover:bg-green-700">
            Add Question
          </button>
        </form>
      )}
      {currentStep === 2 && (
        <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
          <h3 className="text-xl font-bold mb-4">Quiz Created Successfully!</h3>
          <p className="text-gray-700">Title: {title}</p>
          <p className="text-gray-700">Total Questions: {numQuestions}</p>
          <button
            onClick={() => {setCurrentStep(0);setTitle("");setNumQuestions(0);setQuestions([]);}}
            className="bg-blue-600 text-white w-full py-2 rounded font-semibold hover:bg-blue-700 mt-4"
          >
            Create Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherQuizCreation;
