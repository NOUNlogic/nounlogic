import React, { ReactNode } from 'react';

interface GlassCardProps {
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  blurIntensity?: 'sm' | 'md' | 'lg';
  borderColor?: string;
  iconColor?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  title,
  children,
  icon,
  className = '',
  onClick,
  hoverEffect = true,
  blurIntensity = 'md',
  borderColor = 'border-white/10 dark:border-slate-700/40',
  iconColor = 'text-primary'
}) => {
  const blurClass = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  }[blurIntensity];

  return (
    <div 
      className={`
        rounded-xl bg-white/10 dark:bg-slate-900/20 ${blurClass}
        border ${borderColor}
        ${hoverEffect ? 'hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 dark:hover:border-primary/20' : ''}
        transition-all duration-300 ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && (
        <div className="px-5 py-3 flex items-center justify-between border-b border-white/5 dark:border-slate-700/20">
          <h3 className="font-medium flex items-center">
            {icon && <span className={`mr-2 ${iconColor}`}>{icon}</span>}
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;