// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/components/ui/Button.tsx
"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className = "", 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    leftIcon, 
    rightIcon, 
    disabled, 
    ...props 
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "primary":
          return "bg-primary hover:bg-primary/90 text-white";
        case "secondary":
          return "bg-secondary hover:bg-secondary/90 text-secondary-foreground";
        case "outline":
          return "border border-input bg-transparent hover:bg-muted text-foreground";
        case "ghost":
          return "hover:bg-muted text-foreground";
        case "danger":
          return "bg-danger hover:bg-danger/90 text-white";
        default:
          return "bg-primary hover:bg-primary/90 text-white";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-8 px-3 text-xs";
        case "md":
          return "h-10 px-4 text-sm";
        case "lg":
          return "h-12 px-6 text-base";
        default:
          return "h-10 px-4 text-sm";
      }
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={`
          inline-flex items-center justify-center rounded-md font-medium transition-colors 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
          focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none
          ${getVariantClasses()} ${getSizeClasses()} ${className}
        `}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;