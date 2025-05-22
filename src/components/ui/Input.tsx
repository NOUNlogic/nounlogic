'use client';

import React, { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outline' | 'floating';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    error, 
    label, 
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    fullWidth = true,
    required,
    id,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    // Handle floating label state
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    // Base input styles
    const baseInputStyles = twMerge(
      'rounded-md text-sm ring-offset-background transition-all duration-200',
      'placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      fullWidth ? 'w-full' : 'w-auto',
      error ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary',
      leftIcon ? 'pl-10' : 'pl-3',
      rightIcon ? 'pr-10' : 'pr-3'
    );

    // Variant-specific styles
    const variantStyles = {
      default: twMerge(
        'h-10 border bg-background py-2 px-3',
        'focus:ring-2 focus:ring-offset-2'
      ),
      filled: twMerge(
        'h-10 border-0 bg-secondary/50 py-2 px-3',
        'focus:bg-secondary/70 focus:ring-1 focus:ring-offset-0'
      ),
      outline: twMerge(
        'h-10 bg-transparent border-2 py-2 px-3',
        'focus:border-primary focus:ring-0'
      ),
      floating: twMerge(
        'h-12 border bg-background py-6 px-3',
        'focus:ring-2 focus:ring-offset-2 focus:border-primary'
      ),
    };

    // Combine input styles
    const inputStyles = twMerge(
      baseInputStyles,
      variantStyles[variant],
      className
    );

    // Render different styles based on variant
    const renderLabel = () => {
      if (!label) return null;

      if (variant === 'floating') {
        return (
          <label
            htmlFor={id}
            className={twMerge(
              'absolute left-3 transition-all duration-200 pointer-events-none',
              (isFocused || hasValue) 
                ? 'text-xs text-primary transform -translate-y-3.5' 
                : 'text-muted-foreground transform translate-y-0',
              error ? 'text-destructive' : ''
            )}
          >
            {label}{required && <span className="text-destructive ml-1">*</span>}
          </label>
        );
      }

      return (
        <label 
          htmlFor={id}
          className={twMerge(
            'block text-sm font-medium mb-1.5',
            error ? 'text-destructive' : ''
          )}
        >
          {label}{required && <span className="text-destructive ml-1">*</span>}
        </label>
      );
    };

    return (
      <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
        {variant !== 'floating' && renderLabel()}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <div className={variant === 'floating' ? 'relative' : ''}>
            <input
              id={id}
              className={inputStyles}
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              required={required}
              {...props}
            />
            
            {variant === 'floating' && renderLabel()}
          </div>
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={twMerge(
            'mt-1.5 text-xs',
            error ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;