import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { ContextStore } from '../store/contextStore';

const PrivateRoute = ({children}) => {
  const {token} = useContext(ContextStore);
  return token ? <>{children}</>:<Navigate to="/login"/>
}

export default PrivateRoute