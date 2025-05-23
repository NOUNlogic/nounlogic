import React, { ReactNode } from 'react';

interface GradientCardProps {
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  gradient?: string;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  borderEffect?: boolean;
}

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  children,
  icon,
  gradient = 'from-primary/10 to-purple-500/5',
  className = '',
  onClick,
  hoverEffect = true,
  borderEffect = true,
}) => {
  return (
    <div 
      className={`
        rounded-xl overflow-hidden bg-gradient-to-br ${gradient} 
        ${borderEffect ? 'border border-white/10 dark:border-slate-800/50' : ''}
        ${hoverEffect ? 'hover:shadow-lg hover:shadow-primary/10 hover:translate-y-[-2px]' : ''}
        transition-all duration-300 ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && (
        <div className="px-5 py-3 flex items-center justify-between border-b border-white/5 dark:border-slate-800/50">
          <h3 className="font-medium flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
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

export default GradientCard;