'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { appwriteAccount, ID } from './client';
import { usersService, analyticsService, FEATURE_FLAGS } from './services';
import type { User as DatabaseUser } from '@/types/database';

interface AppwriteUser {
  $id: string;
  email: string;
  name?: string;
  databaseUser?: DatabaseUser;
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
      
      // Try to get database user info if available
      let databaseUser = null;
      try {
        const userResponse = await usersService.getUserById(account.$id);
        databaseUser = userResponse;
      } catch (error) {
        // User might not exist in database yet, that's okay
        console.log('Database user not found, will create on next login');
      }
      
      setUser({ ...account, databaseUser });
      
      // Track login event if analytics enabled
      if (FEATURE_FLAGS.ANALYTICS_ENABLED) {
        try {
          await analyticsService.createEvent({
            user_id: account.$id,
            type: 'user_session_start',
            data: JSON.stringify({ timestamp: new Date().toISOString() })
          });
        } catch (error) {
          console.log('Analytics tracking failed:', error);
        }
      }
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