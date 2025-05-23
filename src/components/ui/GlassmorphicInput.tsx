import React, { useState, InputHTMLAttributes, ReactNode } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface GlassmorphicInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showPasswordToggle?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helpText?: string;
}

const GlassmorphicInput: React.FC<GlassmorphicInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  helpText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = props.type === 'password';
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine the actual type for password fields
  const inputType = isPasswordInput
    ? (showPassword ? 'text' : 'password')
    : props.type;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className={`block text-sm font-medium text-white/90 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
            {leftIcon}
          </div>
        )}
        <input
          {...props}
          type={inputType}
          className={`
            w-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm
            px-4 py-2.5 text-white placeholder:text-white/40
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            ${leftIcon ? 'pl-10' : ''}
            ${(rightIcon || (isPasswordInput && showPasswordToggle)) ? 'pr-10' : ''}
            ${error ? 'border-red-500/50 focus:ring-red-500/30' : ''}
            ${inputClassName}
          `}
        />
        {isPasswordInput && showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {rightIcon && !showPasswordToggle && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="text-xs text-white/50 mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default GlassmorphicInput;