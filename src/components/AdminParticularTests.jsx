import React, { useContext } from 'react'
import { useEffect } from 'react'
import { getAllTests } from '../api/testAPI'

import { useNavigate } from 'react-router-dom'
function AdminParticularTests() {
  const [tests,setTests]=React.useState([])
  const navigate=useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const tests = await getAllTests()
        setTests(tests)
        console.log(tests)
      } catch (error) {
        console.error("Error fetching tests:", error)
      }
    }
    fetchTests()
  }, [])


const handleTestClick = (testId) => {
  // console.log("test id is:",testId)
  navigate(`/view-test/${testId}`);
};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-3xl font-bold mb-6 text-white">Your Tests</h2>
          <div className="bg-white p-6 rounded shadow-lg w-96">
            {tests?.length > 0 ? (
              tests.map((test) => {
                {/* console.log(test); */}
                return <button
                  key={test.id}
                  onClick={() => handleTestClick(test.id)}
                  className="w-full cursor-pointer p-3 mb-3 bg-blue-600 text-white rounded-lg text-center font-semibold hover:bg-blue-700 flex justify-between items-center"
                >
                  <p>{test.title}</p>
                  {/* <span className="text-2xl"><IoMdArrowRoundForward /></span> */}
                </button>
            })
            ) : (
              <p className="text-gray-700">No tests Created.</p>
            )}
          </div>
        </div>
  )
}

export default AdminParticularTests
