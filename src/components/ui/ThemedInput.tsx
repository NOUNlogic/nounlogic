'use client';

import React, { useState, InputHTMLAttributes, ReactNode } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface ThemedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showPasswordToggle?: boolean;
  variant?: 'default' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
  helpText?: string;
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  variant = 'default',
  size = 'md',
  containerClassName = '',
  helpText,
  ...props
}) => {
  const { theme, isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = props.type === 'password';
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = isPasswordInput
    ? (showPassword ? 'text' : 'password')
    : props.type;

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2.5 px-4 text-sm',
    lg: 'py-3 px-5 text-base',
  };

  const variantClasses = {
    default: isDark 
      ? 'bg-input/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
      : 'bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20',
    glass: `bg-white/10 ${theme.blur.card} border border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:ring-2 focus:ring-white/20`,
    outline: 'bg-transparent border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20',
  };

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          {...props}
          type={inputType}
          className={`
            w-full rounded-lg transition-colors
            focus:outline-none focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${leftIcon ? 'pl-10' : ''}
            ${(rightIcon || (isPasswordInput && showPasswordToggle)) ? 'pr-10' : ''}
            ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}
          `}
        />
        {isPasswordInput && showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {rightIcon && !showPasswordToggle && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="text-xs text-muted-foreground mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default ThemedInput;