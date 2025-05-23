import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface AnimatedGradientButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  gradientDirection?: 'to-r' | 'to-br' | 'to-tr' | 'to-b';
  colorFrom?: string;
  colorTo?: string;
  spinnerColor?: string;
}

const AnimatedGradientButton: React.FC<AnimatedGradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText,
  fullWidth = false,
  gradientDirection = 'to-r',
  colorFrom,
  colorTo,
  spinnerColor = 'white',
  ...props
}) => {
  // Define variant styles
  const variantStyles = {
    primary: {
      base: `bg-gradient-${gradientDirection} ${colorFrom || 'from-primary'} ${colorTo || 'to-purple-600'} text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40`,
      border: 'border-transparent',
      hover: 'hover:opacity-95 hover:scale-[1.02]',
      disabled: 'opacity-70 cursor-not-allowed',
    },
    secondary: {
      base: `bg-gradient-${gradientDirection} ${colorFrom || 'from-gray-700'} ${colorTo || 'to-gray-800'} text-white shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/20`,
      border: 'border-transparent',
      hover: 'hover:opacity-95 hover:scale-[1.02]',
      disabled: 'opacity-70 cursor-not-allowed',
    },
    outline: {
      base: 'bg-transparent text-white border shadow-sm',
      border: 'border-white/30',
      hover: 'hover:bg-white/10 hover:border-white/50',
      disabled: 'opacity-70 cursor-not-allowed',
    },
    ghost: {
      base: 'bg-transparent text-white',
      border: 'border-transparent',
      hover: 'hover:bg-white/10',
      disabled: 'opacity-70 cursor-not-allowed',
    },
  };

  // Define size styles
  const sizeStyles = {
    sm: 'py-1.5 px-3 text-sm rounded-lg',
    md: 'py-2.5 px-4 text-sm rounded-lg',
    lg: 'py-3 px-5 text-base rounded-xl',
  };

  // Spinner component
  const Spinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
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
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      className={`
        ${variantStyles[variant].base}
        ${variantStyles[variant].border}
        ${!props.disabled && variantStyles[variant].hover}
        ${props.disabled ? variantStyles[variant].disabled : ''}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        relative flex items-center justify-center transition-all duration-300 overflow-hidden
        before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-150%] before:animate-shine
        focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900
        disabled:before:hidden disabled:transform-none disabled:hover:scale-100
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

export default AnimatedGradientButton;