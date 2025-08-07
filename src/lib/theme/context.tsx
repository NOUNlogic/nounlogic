'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, lightTheme, darkTheme } from './config';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeConfig;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  applyTheme: (config: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'system',
  storageKey = 'nounlogic-theme-mode',
}) => {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

  // Determine if we should use dark theme
  const isDark = mode === 'dark' || (mode === 'system' && systemTheme === 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  // Apply CSS variables to the document
  const applyTheme = (themeConfig: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply gradient variables
    Object.entries(themeConfig.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    // Apply shadow variables
    Object.entries(themeConfig.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply blur variables
    if (themeConfig.blur) {
      Object.entries(themeConfig.blur).forEach(([key, value]) => {
        root.style.setProperty(`--blur-${key}`, value);
      });
    }

    // Set dark class on document and ensure proper text color accessibility
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      root.style.setProperty('--text-primary', '210 40% 98%');
      root.style.setProperty('--text-secondary', '215 20.2% 70.1%');
      root.style.setProperty('--text-muted', '215 20.2% 70.1%');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      root.style.setProperty('--text-primary', '222.2 84% 4.9%');
      root.style.setProperty('--text-secondary', '215.4 16.3% 46.9%');
      root.style.setProperty('--text-muted', '215.4 16.3% 46.9%');
    }
  };

  // Load saved theme mode from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem(storageKey) as ThemeMode;
      if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
        setModeState(savedMode);
      }
    }
  }, [storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

      const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, isDark]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newMode);
    }
  };

  const toggleTheme = () => {
    if (mode === 'system') {
      setMode(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setMode(mode === 'dark' ? 'light' : 'dark');
    }
  };

  const value: ThemeContextType = {
    theme,
    mode,
    isDark,
    setMode,
    toggleTheme,
    applyTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${theme.name}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};