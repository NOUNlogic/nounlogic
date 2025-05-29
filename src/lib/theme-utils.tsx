'use client';

import { useTheme } from './theme';

// Theme-aware wrapper components
export const ThemedText = ({ 
  children, 
  className = '', 
  lightClass = 'text-slate-900', 
  darkClass = 'dark:text-white' 
}: { 
  children: React.ReactNode, 
  className?: string,
  lightClass?: string,
  darkClass?: string
}) => {
  return (
    <span className={`transition-colors duration-300 ${lightClass} ${darkClass} ${className}`}>
      {children}
    </span>
  );
};

export const ThemedCard = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  return (
    <div className={`bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow-lg transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};

export const ThemedButton = ({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white font-medium transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

// Common style getter functions 
export const getTextStyles = (isDark: boolean) => ({
  primary: isDark ? 'text-white' : 'text-slate-900',
  secondary: isDark ? 'text-slate-300' : 'text-slate-700',
  muted: isDark ? 'text-slate-400' : 'text-slate-500',
});

export const getBackgroundStyles = (isDark: boolean) => ({
  primary: isDark ? 'bg-slate-900' : 'bg-white',
  secondary: isDark ? 'bg-slate-800' : 'bg-slate-50',
  highlight: isDark ? 'bg-purple-900/50' : 'bg-purple-100/50',
});