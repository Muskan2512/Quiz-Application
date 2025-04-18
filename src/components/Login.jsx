import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {login} from "../api/authAPI"
import toast from "react-hot-toast";
import { ContextStore } from "../store/contextStore";

const Login = () => {
  const {token,setToken,userId,setUser}=useContext(ContextStore);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
     e.preventDefault();
     const userData = { username, password, role };
    //  console.log(userData);
     try {
         const response = await login(userData); 
        //  alert(response.message); // Show success message
        //  console.log(response);
         setToken(response.token)
         setUser(response.data.id)
         localStorage.setItem("token",response.token);
         localStorage.setItem("user",response.data.id);

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/student");
        }
        toast.success("Login successful!"); 
     } catch (error) {
          toast.error((error.response?.data?.message || error.message));
         console.log("Login failed: " + (error.response?.data?.message || error.message));
     }
 };
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
    {/* <Link to="/" className="absolute top-[1rem] right-[1.5rem] flex items-center hover:underline"><span>Home</span> <IoIosArrowForward /></Link> */}
      <h2 className="text-4xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="bg-white text-black p-6 rounded-lg shadow-lg w-80 md:w-100">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded" 
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded" 
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded">
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
        <div className="w-full flex justify-center ">

        <Link to="/signup" className="text-blue-700 underline">Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;