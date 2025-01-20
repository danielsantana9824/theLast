import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return Auth.loggedIn() ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute; 