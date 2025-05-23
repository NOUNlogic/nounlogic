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
  const { mode, setMode, isDark } = useTheme();

  const toggleOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'system', icon: Monitor, label: 'System' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ] as const;

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {toggleOptions.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${mode === value 
              ? isDark 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-primary text-primary-foreground shadow-md'
              : isDark
                ? 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }
          `}
          title={label}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon size={18} />
        </button>
      ))}
      {showLabel && (
        <span className="ml-2 text-sm text-muted-foreground capitalize">
          {mode}
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;