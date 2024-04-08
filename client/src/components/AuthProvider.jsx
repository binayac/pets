import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/checkAuth');
        if (response.data.valid && response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    checkAuth();
  }, []);

  const signIn = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/signin', formData);
      if (response.data.Login) {
        setUser(response.data.user);
        window.location.href = '/dashboard'; // Redirect to dashboard after successful login
      } else {
        console.error('Login failed:', response.data.Message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const signOut = () => {
    setUser(null);
    // Perform any additional sign out actions (e.g., clearing cookies, etc.)
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default { AuthProvider, useAuth };
