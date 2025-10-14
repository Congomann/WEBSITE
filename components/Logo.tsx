import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light for dark backgrounds, dark for light backgrounds
}

const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light' }) => {
  const isLightVariant = variant === 'light';
  
  const textPrimaryColor = isLightVariant ? 'text-white' : 'text-gray-900';
  const textSecondaryColor = isLightVariant ? 'text-gray-300' : 'text-gray-500';

  // Define hover colors for text based on variant
  const textPrimaryHoverColor = isLightVariant ? 'group-hover:text-brand-gold' : 'group-hover:text-brand-blue';
  const textSecondaryHoverColor = isLightVariant ? 'group-hover:text-gray-100' : 'group-hover:text-brand-gold';

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Icon with a subtle scale and rotate animation on hover for more dynamism */}
      <div className="flex-shrink-0 w-11 h-11 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:-rotate-6">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Background: black -> white on hover */}
            <rect 
                width="44" height="44" rx="9" 
                className="fill-black transition-colors duration-500 ease-in-out group-hover:fill-white"
            />
            {/* House shape: gray -> brand-blue on hover */}
            <path 
                d="M12 33V22.7647L22 14L32 22.7647V33H12Z" 
                className="fill-[#B8B8B8] transition-colors duration-500 ease-in-out group-hover:fill-brand-blue"
            />
            {/* Dot: white -> brand-gold on hover */}
            <circle 
                cx="22" cy="23" r="3.5" 
                className="fill-white transition-colors duration-500 ease-in-out group-hover:fill-brand-gold"
            />
        </svg>
      </div>

      {/* Text */}
      <div>
        <span className={`block text-xl font-bold leading-tight transition-colors duration-300 ${textPrimaryColor} ${textPrimaryHoverColor}`}>
          New Holland
        </span>
        <span className={`block text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${textSecondaryColor} ${textSecondaryHoverColor}`}>
          Financial Group
        </span>
      </div>
    </div>
  );
};

export default Logo;