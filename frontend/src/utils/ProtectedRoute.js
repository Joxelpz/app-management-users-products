import React from 'react'
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/auth';
import Bar from '../components/bar'

function ProtectedRoute({ children }) {
    return getToken() ? <> <Bar />{children}</>  : <Navigate to="/login" />;
  }
  
export default ProtectedRoute;
  
