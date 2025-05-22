'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for the auth context
interface User {
  id: string;
  email: string;
  role: string;
  walletAddress?: string;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithWallet: (walletAddress: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate loading user from localStorage or API
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login with email/password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '123',
        email,
        role: 'student',
        profile: {
          name: 'John Doe',
          avatar: 'https://via.placeholder.com/150',
        },
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  // Login with wallet
  const loginWithWallet = async (walletAddress: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '456',
        email: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}@web3.user`,
        role: 'student',
        walletAddress,
        profile: {
          name: `User ${walletAddress.slice(0, 6)}`,
          avatar: 'https://via.placeholder.com/150',
        },
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithWallet,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Main providers component that wraps all providers
export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};