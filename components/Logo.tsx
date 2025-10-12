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
      <div className="flex-shrink-0 w-11 h-11">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="44" height="44" rx="9" fill="black"/>
            <path d="M12 33V22.7647L22 14L32 22.7647V33H12Z" fill="#B8B8B8"/>
            <circle cx="22" cy="23" r="3.5" fill="white"/>
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