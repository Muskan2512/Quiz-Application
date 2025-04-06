import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import {ContextStore} from "../store/contextStore"
import { useContext } from 'react';

const PrivateRouteAdmin = ({ children }) => {
  const token = useContext(ContextStore).token;

  if (!token) return <Navigate to="/login" />

  try {
    const decoded = jwtDecode(token)
    console.log(decoded)
    if (decoded.role === "admin") {
      return <>{children}</>
    } else {
      return <Navigate to="/unauthorized" />  // or redirect to student dashboard
    }
  } catch (error) {
    return <Navigate to="/login" />
  }
}

export default PrivateRouteAdmin
