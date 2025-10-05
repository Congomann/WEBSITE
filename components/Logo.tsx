import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light for dark backgrounds, dark for light backgrounds
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light' }) => {
  const isLightVariant = variant === 'light';
  
  const textPrimaryColor = isLightVariant ? 'text-white' : 'text-gray-900';
  const textSecondaryColor = isLightVariant ? 'text-gray-300' : 'text-gray-500';
  const iconBgColor = 'bg-[#1D2B3A]'; // A dark color matching the logo image

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className={`flex-shrink-0 w-11 h-11 ${iconBgColor} rounded-lg flex items-center justify-center`}>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="14" r="8" fill="white" fillOpacity="0.1"/>
            <path d="M9 24V17L16 11L23 17V24H9Z" fill="white" fillOpacity="0.8"/>
        </svg>
      </div>

      {/* Text */}
      <div>
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
