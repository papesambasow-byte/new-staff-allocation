// import React from "react";
// import { Outlet, Navigate } from 'react-router-dom';

// const ProtectedRoute = () => {

//     const token = localStorage.getItem('token'); 

    
//     return token ? <Outlet /> : <Navigate to="/" replace />;
// }

// export default ProtectedRoute;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { user,  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !user.token) {
      navigate('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [user]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;









