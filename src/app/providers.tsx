'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SensayProvider } from '@/lib/sensay/context';

interface UserProfile {
  name?: string;
  avatar?: string;
  bio?: string;
}

interface User {
  email: string;
  role: 'student' | 'instructor' | 'admin';
  walletAddress?: string;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithWallet: (walletAddress: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set mock user data
      setUser({
        email,
        role: 'student',
        profile: {
          name: 'Demo User',
          avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John',
          bio: 'Learning enthusiast'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithWallet = async (walletAddress: string) => {
    setIsLoading(true);
    try {
      // Mock wallet authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set mock user data
      setUser({
        email: `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}@web3.user`,
        role: 'student',
        walletAddress,
        profile: {
          name: 'Web3 User',
          avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=' + walletAddress,
          bio: 'Blockchain enthusiast'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    loginWithWallet,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <SensayProvider>
        {children}
      </SensayProvider>
    </AuthProvider>
  );
}