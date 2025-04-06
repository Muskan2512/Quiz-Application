import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { ContextStore } from "../store/contextStore";
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(ContextStore);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (err) {
        console.error("Invalid token", err);
        setDecoded(null);
        setToken(null);
        localStorage.clear();
      }
    } else {
      setDecoded(null);
    }
  }, [token, setToken]);

  const logoutHandler = () => {
    localStorage.clear();
    setToken(null);
    toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white shadow">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold leading-none" >
        <img src="../../public/logo.png" alt="Logo" className="h-[40px]" />
      </Link>

      {/* Center Nav Options */}
      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
        {/* Admin Options */}
        {decoded?.role === "admin" && (
          <>
            <li>
              <Link className="text-sm text-blue-600 hover:text-gray-500 font-bold" to="/create-test">Create Test</Link>
            </li>
            <li>
              <Link className="text-sm text-blue-600 hover:text-gray-500 font-bold" to="/view-test-admin">View Created Test</Link>
            </li>
          </>
        )}

        {/* User Options */}
        {decoded?.role === "user" && (
          <>
            <li>
              <Link className="text-sm text-blue-600 hover:text-gray-500 font-bold" to="/student">View Test</Link>
            </li>
            <li>
              <Link className="text-sm text-blue-600 hover:text-gray-500 font-bold" to="/your-score">Your Scores</Link>
            </li>
          </>
        )}
      </ul>

      {/* Right Auth Buttons */}
      {token ? (
        <button
          onClick={logoutHandler}
          className="py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
        >
          Log Out
        </button>
      ) : (
        <>
          <Link
            to="/login"
            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          >
            Sign up
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
