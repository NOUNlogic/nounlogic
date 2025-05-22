"use client";

import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  isLoading = false,
  leftIcon,
  rightIcon,
  ripple = true,
  ...props
}, ref) => {
  // Base styles
  let baseStyles = 'relative inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 select-none';
  
  if (ripple) {
    baseStyles += ' btn-ripple overflow-hidden';
  }
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary shadow-sm hover:shadow',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary',
    outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent',
    ghost: 'hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent',
    link: 'text-primary underline-offset-4 hover:underline p-0 h-auto focus-visible:ring-0',
    success: 'bg-success text-white hover:bg-success/90 focus-visible:ring-success shadow-sm hover:shadow',
    warning: 'bg-warning text-white hover:bg-warning/90 focus-visible:ring-warning shadow-sm hover:shadow',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive shadow-sm hover:shadow',
  };
  
  // Size styles
  const sizeStyles = {
    xs: 'h-7 px-2.5 text-xs rounded',
    sm: 'h-9 px-3 py-2 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-5 py-2.5 text-base',
    icon: 'h-10 w-10 p-0 flex items-center justify-center'
  };
  
  // Handle loading state
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) return;
    onClick?.(e);
  };
  
  // Combine all styles
  const buttonStyles = twMerge(baseStyles, variantStyles[variant], sizeStyles[size], className);
  
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md">
          <svg className="animate-spin h-5 w-5 text-current opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : ''}`}>
        {leftIcon && <span className="inline-flex">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;