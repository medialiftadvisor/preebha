'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loginUser: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('preebha_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Start as guest (not automatically logged in as demo user)
        setUser(null);
      }
    } catch (e) {
      console.error('Failed to load user session:', e);
    }
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('preebha_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('preebha_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
