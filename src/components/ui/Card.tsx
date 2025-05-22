// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/components/ui/Card.tsx
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-card text-card-foreground rounded-lg border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}