import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";

const ViewTests = ({tests}) => {
  // console.log("tests in viewTest is:",tests)
  const [testList, setTestList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tests.length > 0) {
      setTestList(tests); // Ensure state updates correctly
    }
  }, [tests]); // Re-run effect when `tests` updates

  const handleTestClick = (testId) => {
    navigate(`/attempt-test/${testId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Available Tests</h2>
      <div className="bg-white p-6 rounded shadow-lg w-96">
        {testList?.length > 0 ? (
          testList.map((test) => {
            return <button
              key={test.id}
              onClick={() => handleTestClick(test.id)}
              className="w-full cursor-pointer p-3 mb-3 bg-blue-600 text-white rounded-lg text-center font-semibold hover:bg-blue-700 flex justify-between items-center"
            >
              <p>{test.title}</p>
              <span className="text-2xl"><IoMdArrowRoundForward /></span>
            </button>
        })
        ) : (
          <p className="text-gray-700">No tests available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewTests;
