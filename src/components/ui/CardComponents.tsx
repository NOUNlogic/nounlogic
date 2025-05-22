'use client';

import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'glass' | 'gradient' | 'hover';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'md',
  ...props
}, ref) => {
  // Base styles
  const baseStyles = 'bg-card text-card-foreground rounded-xl transition-all duration-300';
  
  // Variant styles
  const variantStyles = {
    default: 'border border-border shadow-sm',
    bordered: 'border-2 border-primary/20 shadow-sm',
    glass: 'glass backdrop-blur-md border border-white/10 shadow-md',
    gradient: 'border border-border bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md',
    hover: 'border border-border shadow-sm hover:shadow-md hover:border-primary/30 card-hover'
  };
  
  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  };
  
  return (
    <div 
      ref={ref}
      className={twMerge(baseStyles, variantStyles[variant], paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ 
  children, 
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={twMerge('flex flex-col space-y-1.5', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = '',
  level = 3,
  as,
}) => {
  const TagName = as || `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <TagName
      className={twMerge('font-semibold leading-none tracking-tight', className)}
    >
      {children}
    </TagName>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ 
  children, 
  className = '',
  ...props
}, ref) => {
  return (
    <p 
      ref={ref}
      className={twMerge('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ 
  children, 
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={twMerge('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ 
  children, 
  className = '',
  ...props
}, ref) => {
  return (
    <div 
      ref={ref}
      className={twMerge('flex items-center justify-between pt-4 mt-auto', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';