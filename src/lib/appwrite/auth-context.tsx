import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { appwriteAccount } from './client';

interface AppwriteUser {
  $id: string;
  email: string;
  name?: string;
}

interface AppwriteAuthContextType {
  user: AppwriteUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const AppwriteAuthContext = createContext<AppwriteAuthContextType | undefined>(undefined);

export const useAppwriteAuth = () => {
  const ctx = useContext(AppwriteAuthContext);
  if (!ctx) throw new Error('useAppwriteAuth must be used within AppwriteAuthProvider');
  return ctx;
};

export const AppwriteAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const account = await appwriteAccount.get();
      setUser(account);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const login = async (email: string, password: string) => {
    await appwriteAccount.createEmailPasswordSession(email, password);
    await refresh();
  };

  const logout = async () => {
    await appwriteAccount.deleteSession('current');
    setUser(null);
  };

  const register = async (email: string, password: string, name?: string) => {
    await appwriteAccount.create('unique()', email, password, name);
    await login(email, password);
  };

  return (
    <AppwriteAuthContext.Provider value={{ user, loading, login, logout, register, refresh }}>
      {children}
    </AppwriteAuthContext.Provider>
  );
};