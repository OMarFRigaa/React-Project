
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('postify_user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('postify_user', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('postify_user');
  };

  const register = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('postify_user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
