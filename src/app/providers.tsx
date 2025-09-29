'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AuthModal from '@/components/auth/AuthModal';
import { account, appwriteAuth } from '@/lib/appwrite';
import { ThemeProvider } from '@/lib/theme';

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
  user: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
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
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await appwriteAuth.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await appwriteAuth.login(email, password);
      await refreshUser();
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await appwriteAuth.createAccount(email, password, name);
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await appwriteAuth.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// UI state for auth modal
interface AuthUIContextType {
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
}

const AuthUIContext = createContext<AuthUIContextType | undefined>(undefined);

export const useAuthUI = () => {
  const ctx = useContext(AuthUIContext);
  if (!ctx) throw new Error('useAuthUI must be used within AppProviders');
  return ctx;
};

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <ThemeProvider defaultMode={"system" as any}>
      <AuthProvider>
        <AuthUIContext.Provider value={{ isAuthOpen, openAuth: () => setIsAuthOpen(true), closeAuth: () => setIsAuthOpen(false) }}>
          {children}
          <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </AuthUIContext.Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}