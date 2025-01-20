import React, { createContext, useContext, useState, useEffect } from 'react';
import Auth from '../utils/auth';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (Auth.loggedIn()) {
        setUser(Auth.getProfile());
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    Auth.login(token);
    setUser(Auth.getProfile());
    setIsAuthenticated(true);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 