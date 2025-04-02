import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import ViewTests from "./components/ViewTests"
import Teacher from "./components/TeacherQuizCreation"
import TestAttempt from "./components/TestAttempt";
import Navbar from "./components/Navbar"
import { useState } from "react"
const App=()=>{
  
  return (

    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen h-fit">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Teacher/>} />
        <Route path="/student" element={<ViewTests />}/>
        <Route path="/attempt-test/:id" element={<TestAttempt  />} />

      </Routes>

    </div>
  )
}
export default App