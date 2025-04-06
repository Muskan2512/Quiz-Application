import React, { useEffect, useState } from 'react';
import {fetchScores} from '../api/scoreAPI'; 
import { useContext } from 'react';
import { ContextStore } from '../store/contextStore';
import {  useNavigate } from 'react-router-dom';

const YourScore = () => {
  const [score, setScore] = useState([]);
  const navigate=useNavigate()

  const {userId} = useContext(ContextStore);
  useEffect(() => {
    const fetchAndSetScores = async () => {
      const scoresArr = await fetchScores(userId);
      setScore(scoresArr.scores);
      // console.log(scoresArr.scores);
    };
  
    fetchAndSetScores();
  }, [userId]);
  

  
  if (score?.length === 0) return <div className="bg-white p-6 rounded mx-auto mt-5 shadow-lg w-96"><p className="text-gray-700">No tests Attempted Yet.</p>
  <button
            onClick={() => {navigate("/student")}}
            className="bg-blue-600 text-white w-full py-2 rounded font-semibold hover:bg-blue-700 mt-4"
          >
            Attempt a Quiz
          </button>
  </div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto mt-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Scores</h2>
  <ul className="divide-y divide-gray-200">
    {score.map((s, index) => (
      <li key={index} className="py-4 hover:bg-gray-50 transition rounded-md px-4">
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold text-gray-800">Quiz:</span> {s.title}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold text-gray-800">Your Score:</span> {s.score}
        </p>
       
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Attempted On:</span>{" "}
          {new Date(s.created_at).toLocaleString()}
        </p>
      </li>
    ))}
  </ul>
</div>

  );
};

export default YourScore;
