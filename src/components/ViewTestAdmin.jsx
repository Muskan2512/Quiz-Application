import { useParams } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import { getTestById } from "../api/testAPI";
import toast from "react-hot-toast"

const ViewTestAdmin = () => {
  const { id } = useParams(); 
  const [currentTest, setCurrentTest] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
        try {
            const data = await getTestById(id);
            // console.log(data)
            setCurrentTest(data);
        } catch (err) {
            toast.error("Failed to load test details. Please try again.");
            console.log(err.message);
        }
    };

    fetchTest(); // Call function when component mounts
}, [id]);


   return  (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex flex-col items-center">
      {currentTest ? (
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            {currentTest.quiz.title}
          </h2>
                    {currentTest.questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md border-l-4 border-indigo-500"
            >
              <p className="text-lg font-semibold text-gray-800">{question.question_text}</p>
              <div className="mt-2 space-y-2">
              {[question.option_a, question.option_b, question.option_c, question.option_d].map(
  (option, oIndex) => {
      console.log(oIndex+1,question.correct_answer)
    return (
      <label
        key={oIndex}
        className={`block p-3 rounded-md shadow-sm border
        ${(oIndex + 1) == question.correct_answer ? "bg-green-400" : "bg-white"}`}
      >
        {option}
      </label>
    );
  }
)}

              </div>
            </div>
          ))}
          
        </div>
      ) : (
        <p className="text-white text-xl font-semibold">Loading test...</p>
      )}
    </div>
  )
};

export default ViewTestAdmin;
