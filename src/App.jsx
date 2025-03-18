import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import ViewTests from "./components/ViewTests"
import Teacher from "./components/TeacherQuizCreation"
import TestAttempt from "./components/TestAttempt";

import { useState } from "react"
const App=()=>{
  // const [tests,setTests]=useState([])
  // const handleSetTests=(newTest)=>{
  //   setTests([...tests,newTest])
  // }
  // console.log("In the app.jsx",tests)

  const [tests, setTests] = useState(() => {
    // Load saved tests from localStorage when the app starts
    const savedTests = localStorage.getItem("tests");
    return savedTests ? JSON.parse(savedTests) : [];
  });

  const handleSetTests = (newTest) => {
    const updatedTests = [...tests, newTest];
    setTests(updatedTests);
    localStorage.setItem("tests", JSON.stringify(updatedTests)); // Save to localStorage
  };

  console.log("In the app.jsx", tests);
  
  return (

    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen h-fit">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/teacher" element={<Teacher handleSetTests={handleSetTests}/>} />
        <Route path="/student" element={<ViewTests tests={tests}/>}/>
        <Route path="/attempt-test/:id" element={<TestAttempt tests={tests} />} />


      </Routes>

    </div>
  )
}
export default App