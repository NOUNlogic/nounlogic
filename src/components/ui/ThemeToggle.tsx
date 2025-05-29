'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabel = false 
}) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg transition-all duration-300 hover:bg-secondary flex items-center justify-center theme-toggle-btn ${className}
        ${isDark ? 'text-yellow-200 hover:text-yellow-300' : 'text-purple-700 hover:text-purple-800'}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? 
        <Sun size={18} className="transition-transform duration-300" /> : 
        <Moon size={18} className="transition-transform duration-300" />
      }
      {showLabel && (
        <span className="ml-2 text-sm font-medium capitalize">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;