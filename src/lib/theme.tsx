'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  isDark: boolean;
  setMode: (mode: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  isDark: true,
  setMode: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initialize theme when component mounts
  useEffect(() => {
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialIsDark = savedTheme 
      ? savedTheme === 'dark'
      : prefersDark;
    
    setIsDark(initialIsDark);
    
    // Apply initial theme
    applyTheme(initialIsDark);
  }, []);

  // Function to apply theme to HTML and localStorage
  const applyTheme = (dark: boolean) => {
    const rootElement = document.documentElement;
    
    if (dark) {
      rootElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      rootElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Ensure text colors change properly
    if (dark) {
      rootElement.style.setProperty('--foreground', 'rgba(255, 255, 255, 0.87)');
      rootElement.style.setProperty('--background', '#121212');
    } else {
      rootElement.style.setProperty('--foreground', '#213547');
      rootElement.style.setProperty('--background', '#ffffff');
    }
  };

  // Function to set specific mode
  const setMode = (mode: 'light' | 'dark') => {
    const dark = mode === 'dark';
    setIsDark(dark);
    applyTheme(dark);
  };

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      applyTheme(newValue);
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};