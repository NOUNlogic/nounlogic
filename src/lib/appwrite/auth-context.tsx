'use client';
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
  roles: string[];
  permissions: string[];
}

interface AppwriteAuthContextType {
  user: AppwriteUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
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
      
      let databaseUser: DatabaseUser | null = null;
      let roles: string[] = [];
      let permissions: string[] = [];

      try {
        const userResponse = await usersService.getUserById(account.$id);
        databaseUser = userResponse;
        roles = databaseUser.roles || [];
        permissions = roles.flatMap(role => ROLE_PERMISSIONS[role] || []);
      } catch (error) {
        console.log('Database user not found, will create on next login');
      }
      
      setUser({ ...account, databaseUser, roles, permissions });
      
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

  const signInWithGoogle = async () => {
    try {
      await appwriteAccount.createOAuth2Session(
        'google',
        `${window.location.origin}/dashboard`,
        `${window.location.origin}/login?error=google_oauth_failed`
      );
    } catch (error) {
      console.error('Google sign-in failed', error);
      // Redirect to login page with an error message
      window.location.href = '/login?error=google_oauth_failed';
    }
  };

  return (
    <AppwriteAuthContext.Provider value={{ user, loading, login, logout, register, signInWithGoogle, refresh }}>
      {children}
    </AppwriteAuthContext.Provider>
  );
};

// This is a higher-order component that can be used to protect pages
export const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { user, loading } = useAppwriteAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/login');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <div>Loading...</div>; // Or a spinner component
    }

    return <WrappedComponent {...props} />;
  };
};

// This is a hook that can be used in components to get the current user
export const useAuth = () => {
  const context = useContext(AppwriteAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AppwriteAuthProvider');
  }
  return context;
};

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) ?? false;
  };

  const hasRole = (role: string) => {
    return user?.roles.includes(role) ?? false;
  };

  return { hasPermission, hasRole };
};