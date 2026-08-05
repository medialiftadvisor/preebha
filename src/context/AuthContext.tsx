'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: 'USER' | 'ADMIN') => void;
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
        // Default guest/demo user for instant access
        setUser({
          id: 'demo-user-1',
          name: 'Ananya Sharma',
          email: 'ananya@example.com',
          phone: '+91 9898989898',
          role: 'USER',
        });
      }
    } catch (e) {
      console.error('Failed to load user session:', e);
    }
  }, []);

  const login = (email: string, role: 'USER' | 'ADMIN' = 'USER') => {
    const newUser: User = {
      id: role === 'ADMIN' ? 'admin-user-1' : `user-${Date.now()}`,
      name: role === 'ADMIN' ? 'PREEBHA Admin' : email.split('@')[0],
      email,
      role,
      phone: '+91 9876543210',
    };
    setUser(newUser);
    localStorage.setItem('preebha_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('preebha_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
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
