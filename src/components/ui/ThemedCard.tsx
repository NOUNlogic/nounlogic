'use client';

import React, { ReactNode } from 'react';
import { useTheme } from '@/lib/theme';

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hoverEffect?: boolean;
}

const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  variant = 'default',
  size = 'md',
  onClick,
  hoverEffect = true,
}) => {
  const { theme, isDark } = useTheme();

  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    default: isDark 
      ? `bg-card/80 border border-border/50 ${theme.blur.card}` 
      : 'bg-card border border-border shadow-md',
    glass: `bg-white/10 ${theme.blur.card} border border-white/20`,
    gradient: `bg-gradient-to-br ${theme.gradients.primary} text-white border-transparent`,
    outline: 'bg-transparent border-2 border-primary/50 hover:border-primary',
  };

  const hoverClasses = hoverEffect 
    ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' 
    : '';

  return (
    <div
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            typeof title === 'string' 
              ? <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              : title
          )}
          {subtitle && (
            typeof subtitle === 'string'
              ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              : subtitle
          )}
        </div>
      )}
      
      <div className={title || subtitle ? 'pt-0' : ''}>
        {children}
      </div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-border/50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ThemedCard;