'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useTheme } from '@/lib/theme';

interface ThemedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText,
  fullWidth = false,
  ...props
}) => {
  const { theme, isDark } = useTheme();

  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-2.5 px-4 text-sm',
    lg: 'py-3 px-6 text-base',
  };

  const      variantClasses = {
    default: isDark 
      ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 shadow-lg'
      : 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 shadow-md',
    secondary: isDark
      ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/20'
      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/20',
    outline: isDark
      ? 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground focus:ring-primary/20'
      : 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground focus:ring-primary/20',
    ghost: isDark
      ? 'text-primary bg-transparent hover:bg-primary/10 focus:ring-primary/20'
      : 'text-primary bg-transparent hover:bg-primary/10 focus:ring-primary/20',
    gradient: `bg-gradient-to-r ${theme.gradients.primary} text-white hover:opacity-90 focus:ring-primary/20 shadow-lg hover:shadow-xl hover:scale-[1.02]`,
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive/20',
  };

  const Spinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span>{loadingText || 'Loading...'}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default ThemedButton;