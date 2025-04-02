import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTestById } from "../api/testAPI";
import { setUserScore } from "../api/scoreAPI";

const TestAttempt = () => {
  const { id } = useParams(); // Get test ID from URL
  const userId=localStorage.getItem("user")
  // console.log(userId)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentTest, setCurrentTest] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
        try {
            const data = await getTestById(id);
            setCurrentTest(data);
        } catch (err) {
            alert("Failed to load test details. Please try again.");
            console.log(err.message);
        }
    };

    fetchTest(); // Call function when component mounts
}, [id]);

const handleAnswerChange = (questionIndex, optionIndex) => {
  setSelectedAnswers({
    ...selectedAnswers,
    [questionIndex]: optionIndex,
  });
};



//error because userid nahi mil raha because hame login karte hi use cookies ke form  mein bhejna tha..
const evaluateScore = async () => { 
  if (!currentTest) return;

  let totalScore = 0;
  currentTest.questions.forEach((question, index) => {
      const selectedOptionIndex = selectedAnswers[index]; 
      const selectedOption = [question.option_a, question.option_b, question.option_c, question.option_d][selectedOptionIndex]; 

      if (selectedOption === question.correct_answer) {
          totalScore+=10;
      }
  });

  setScore(totalScore);
  // console.log(currentTest,currentTest.quiz,currentTest.quiz.id);

  try {
      // Call the API to update the score in the database
      await setUserScore(userId, currentTest.quiz.id, totalScore);
      console.log("Score updated successfully!");
  } catch (error) {
      console.error("Failed to update score:", error);
  }
};

   return (score !== null) ? (<div className="p-6   shadow-lg rounded-lg text-center ">
    <h2 className="text-3xl font-extrabold text-indigo-700">
      🎉 Your Score: {score} / {(currentTest.questions.length)*10} 🎯
    </h2>
  
    {/* Progress Bar */}
    <div className="w-[80%] mb-9 mx-auto bg-gray-200 rounded-full h-3 mt-4">
      <div 
        className="bg-indigo-300 h-3 rounded-full transition-all" 
        style={{ width: `${(score /( (currentTest.questions.length)*10)) * 100}%` }}
      ></div>
    </div>
  
   
  
    
    <Link 
      className=" bg-blue-700 cursor-pointer text-white px-6 py-2  rounded-lg font-semibold hover:bg-indigo-700 transition"
      to="/student"
    >
      🔄 Back to Test
    </Link>
  </div>
  
  ):
  (
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
                  (option, oIndex) => (
                    <label
                      key={oIndex}
                      className="block bg-white p-3 rounded-md shadow-sm border cursor-pointer hover:bg-indigo-100 transition"
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        checked={selectedAnswers[qIndex] === oIndex}
                        onChange={() => handleAnswerChange(qIndex, oIndex)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>
          ))}
          <button
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-lg transition cursor-pointer"
            onClick={evaluateScore}
          >
            Submit Test
          </button>
        </div>
      ) : (
        <p className="text-white text-xl font-semibold">Loading test...</p>
      )}
    </div>
  )
};

export default TestAttempt;
