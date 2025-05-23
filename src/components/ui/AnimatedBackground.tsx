import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gradientColors?: {
    first: string;
    second: string;
    third?: string;
  };
  orbs?: Array<{
    size: string; 
    position: string;
    color: string;
    animationDelay?: string;
  }>;
  showGrid?: boolean;
  gridOpacity?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  className = '',
  gradientColors = {
    first: 'from-slate-900',
    second: 'via-slate-950',
    third: 'to-slate-900'
  },
  orbs = [
    { size: 'w-80 h-80', position: 'absolute -top-40 -right-40', color: 'bg-gradient-to-br from-purple-500/20 to-blue-600/20', animationDelay: '' },
    { size: 'w-72 h-72', position: 'absolute top-20 left-20', color: 'bg-gradient-to-r from-blue-500/10 to-cyan-400/10', animationDelay: 'animation-delay-1000' },
    { size: 'w-96 h-96', position: 'absolute bottom-20 right-40', color: 'bg-gradient-to-tr from-indigo-500/10 to-pink-500/10', animationDelay: 'animation-delay-2000' }
  ],
  showGrid = true,
  gridOpacity = 'opacity-5'
}) => {
  const bgGradient = `bg-gradient-to-br ${gradientColors.first} ${gradientColors.second} ${gradientColors.third || ''}`;
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${bgGradient} p-4 overflow-hidden ${className}`}>
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {orbs.map((orb, index) => (
          <div 
            key={index}
            className={`${orb.size} ${orb.position} ${orb.color} rounded-full filter blur-3xl animate-pulse-slow ${orb.animationDelay || ''}`}
          ></div>
        ))}
      </div>
      
      {/* Optional grid pattern */}
      {showGrid && (
        <div className={`absolute inset-0 w-full h-full bg-grid-pattern ${gridOpacity}`}></div>
      )}
      
      {/* Content */}
      {children}
      
      {/* Extra decorative elements for larger screens */}
      <div className="hidden md:block absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
    </div>
  );
};

export default AnimatedBackground;