import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light for dark backgrounds, dark for light backgrounds
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light' }) => {
  const isLightVariant = variant === 'light';
  
  // Text colors now depend solely on the variant prop for readability on different backgrounds
  const textPrimaryColor = isLightVariant ? 'text-white' : 'text-brand-blue';
  const textSecondaryColor = isLightVariant ? 'text-gray-300' : 'text-gray-500';

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Icon wrapper */}
      <div className="flex-shrink-0 w-11 h-11">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Background: Set to official brand blue */}
            <rect 
                width="44" height="44" rx="9" 
                className="fill-brand-blue"
            />
            {/* Group for house and dot to animate them together with pop and spin */}
            <g className="transition-transform duration-300 ease-in-out origin-bottom group-hover:scale-125 group-hover:-translate-y-2 group-hover:-rotate-[15deg]">
                {/* House shape: Set to official brand gold */}
                <path 
                    d="M12 33V22.7647L22 14L32 22.7647V33H12Z" 
                    className="fill-brand-gold"
                />
                {/* Dot: Set to white for accent */}
                <circle 
                    cx="22" cy="23" r="3.5" 
                    className="fill-white"
                />
            </g>
        </svg>
      </div>

      {/* Text with hover animation */}
      <div className="relative">
        {/* Static text, visible by default, hidden on hover */}
        <div className="transition-opacity duration-200 group-hover:opacity-0">
          <span className={`block text-xl font-bold leading-tight ${textPrimaryColor}`}>
            New Holland
          </span>
          <span className={`block text-[10px] font-medium tracking-[0.2em] uppercase ${textSecondaryColor}`}>
            Financial Group
          </span>
        </div>
        {/* Animated text, hidden by default, visible and animates on hover */}
        <div className="absolute top-0 left-0 opacity-0 group-hover:animate-fade-in-down pointer-events-none">
          <span className={`block text-xl font-bold leading-tight ${textPrimaryColor}`}>
            New Holland
          </span>
          <span className={`block text-[10px] font-medium tracking-[0.2em] uppercase ${textSecondaryColor}`}>
            Financial Group
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;