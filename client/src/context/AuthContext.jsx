import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedUserId = localStorage.getItem('kalyani_user_id');
    if (savedUserId) {
      const foundUser = usersData.find(u => u.id === savedUserId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        // If they registered a new mock user that isn't in JSON
        const storedProfile = localStorage.getItem('kalyani_mock_profile');
        if (storedProfile) {
          try {
            setUser(JSON.parse(storedProfile));
          } catch (e) {}
        }
      }
    }
    setLoading(false);
  }, []);

  const mockLogin = (mobile) => {
    let foundUser = usersData.find(u => u.mobile === mobile);
    
    if (!foundUser) {
      foundUser = {
        id: 'mock-' + Date.now(),
        name: 'New User',
        mobile,
        role: null, // Forces them to RoleSelect
        ecoPoints: 50,
        badges: [],
        village: 'Bengaluru'
      };
      localStorage.setItem('kalyani_mock_profile', JSON.stringify(foundUser));
    }

    setUser(foundUser);
    localStorage.setItem('kalyani_user_id', foundUser.id);
    return foundUser;
  };

  const logout = () => {
    localStorage.removeItem('kalyani_user_id');
    localStorage.removeItem('kalyani_mock_profile');
    setUser(null);
  };

  const updateRole = (newRole, profileData = {}) => {
    const updatedUser = { ...user, role: newRole, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('kalyani_mock_profile', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, updateRole, mockLogin, setUser }}>
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
