import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  const { loading, error, data } = useQuery(QUERY_ME, {
    skip: !token,
  });

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data?.me) {
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 