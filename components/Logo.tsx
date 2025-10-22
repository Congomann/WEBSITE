import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light for dark backgrounds, dark for light backgrounds
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light' }) => {
  const isLightVariant = variant === 'light';
  
  const textPrimaryColor = isLightVariant ? 'text-white' : 'text-gray-900';
  const textSecondaryColor = isLightVariant ? 'text-gray-300' : 'text-gray-500';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="flex-shrink-0 w-11 h-11 animate-fade-in-down" style={{ animationDuration: '600ms' }}>
        <svg width="44" height="44" viewBox="5 6 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5 30 L5 22 L19.5 14 L34 22 L34 30 Z" fill="#F7C548"/>
            <circle cx="19.5" cy="26" r="3.5" fill="white"/>
        </svg>
      </div>

      {/* Text */}
      <div className="animate-fade-in-down" style={{ animationDelay: '200ms', animationDuration: '600ms' }}>
        <span className={`block text-xl font-bold leading-tight ${textPrimaryColor}`}>
          New Holland
        </span>
        <span className={`block text-[10px] font-medium tracking-[0.2em] uppercase ${textSecondaryColor}`}>
          Financial Group
        </span>
      </div>
    </div>
  );
};

export default Logo;