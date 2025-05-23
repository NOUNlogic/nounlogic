import React, { ReactNode } from 'react';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  gradientBg?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  borderColor?: string;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  shadowIntensity?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  backgroundOpacity?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  gradientBg = true,
  gradientFrom = 'from-primary/10',
  gradientTo = 'to-purple-500/10',
  borderColor = 'border-white/20',
  blurIntensity = 'xl',
  shadowIntensity = '2xl',
  backgroundOpacity = 'bg-white/10',
  onClick,
  hoverEffect = true,
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  };

  return (
    <div
      className={`
        relative rounded-xl overflow-hidden ${backgroundOpacity} ${blurClasses[blurIntensity]} 
        border ${borderColor} ${shadowClasses[shadowIntensity]} shadow-black/10
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-black/20 hover:border-white/30' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Optional gradient background */}
      {gradientBg && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} z-0 opacity-50`}></div>
      )}

      {/* Card content */}
      <div className="relative z-10">
        {/* Header */}
        {(title || subtitle) && (
          <div className={`px-6 py-5 ${headerClassName}`}>
            {title && (
              typeof title === 'string' 
                ? <h3 className="text-xl font-semibold text-white">{title}</h3>
                : title
            )}
            {subtitle && (
              typeof subtitle === 'string'
                ? <p className="text-sm text-white/70 mt-1">{subtitle}</p>
                : subtitle
            )}
          </div>
        )}

        {/* Body */}
        <div className={`px-6 py-5 ${(title || subtitle) ? 'pt-0' : ''} ${bodyClassName}`}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={`px-6 py-4 border-t border-white/10 ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlassmorphicCard;