import React,{useState,useContext} from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/Signup"
import ViewTests from "./components/ViewTests"
import Teacher from "./components/TeacherQuizCreation"
import TestAttempt from "./components/TestAttempt";
import Navbar from "./components/Navbar"
import PrivateRoute from "./components/PrivateRoute"
import PrivateRouteAdmin from "./components/PrivateRouteAdmin"
import Dashboard from "./components/Dashboard"
import YourScore from "./components/YourScores"
import AdminParticularTests from "./components/AdminParticularTests"
import {ContextStore} from "./store/contextStore"
import ViewTestAdmin from "./components/ViewTestAdmin"
const App=()=>{

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(localStorage.getItem("user"))
  return (
    

    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen h-fit">

    <ContextStore.Provider value={{
      token: token,
      userId: user,
      setToken,
      setUser
    }}>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<p className="text-2xl text-center mt-3 font-bold mx-auto text-white">Unauthorized User</p>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/admin" element={
          <PrivateRouteAdmin>
          <Dashboard/>
          </PrivateRouteAdmin>
        } />
        <Route path="/view-test/:id" element={
          <PrivateRouteAdmin>
          <ViewTestAdmin/>
          </PrivateRouteAdmin>
        } />
        <Route path="/create-test" element={
          <PrivateRouteAdmin>
          <Teacher/>
          </PrivateRouteAdmin>
        } />
        <Route path="/view-test-admin" element={
          <PrivateRouteAdmin>
          <AdminParticularTests/>
          </PrivateRouteAdmin>
        } />
        <Route path="/student" element={
        <PrivateRoute>          
          <ViewTests />
        </PrivateRoute>
          }/>
        <Route path="/your-score" element={
        <PrivateRoute>          
          <YourScore />
        </PrivateRoute>
          }/>
        <Route path="/attempt-test/:id" element={
          <PrivateRoute>
          <TestAttempt />
          </PrivateRoute>
         } />

      </Routes>

      </ContextStore.Provider>
    </div>
  )
}
export default App