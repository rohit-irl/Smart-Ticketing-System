import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('eventbot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('eventbot_user', JSON.stringify(userData));
    
    // Manage all users (accounts) list
    const allUsers = JSON.parse(localStorage.getItem('eventbot_accounts') || '[]');
    const userExists = allUsers.find(u => u.contact === userData.contact);
    if (!userExists) {
      allUsers.push(userData);
      localStorage.setItem('eventbot_accounts', JSON.stringify(allUsers));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventbot_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
