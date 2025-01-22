import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  const { loading, data, error } = useQuery(QUERY_ME, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 