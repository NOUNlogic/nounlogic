'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { appwriteAccount } from './client';

interface AppwriteUser {
  $id: string;
  email: string;
  name: string;
  emailVerification: boolean;
}

interface AppwriteAuthContextType {
  user: AppwriteUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AppwriteAuthContext = createContext<AppwriteAuthContextType | null>(null);

export const AppwriteAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await appwriteAccount.get();
        setUser(currentUser as AppwriteUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await appwriteAccount.createEmailPasswordSession(email, password);
      const currentUser = await appwriteAccount.get();
      setUser(currentUser as AppwriteUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await appwriteAccount.deleteSession('current');
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await appwriteAccount.create('unique()', email, password, name);
      await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register
  };

  return (
    <AppwriteAuthContext.Provider value={value}>
      {children}
    </AppwriteAuthContext.Provider>
  );
};

export const useAppwriteAuth = () => {
  const ctx = useContext(AppwriteAuthContext);
  if (!ctx) throw new Error('useAppwriteAuth must be used within AppwriteAuthProvider');
  return ctx;
};