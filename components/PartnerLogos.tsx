import React, { useState } from 'react';
import { trusted_carriers } from '../data';

// Helper component to render logos with a fallback
const CarrierLogo: React.FC<{ name: string; url: string | null; customLogo?: React.ReactNode }> = ({ name, url, customLogo }) => {
    const [error, setError] = useState(false);

    if (customLogo) {
        return <>{customLogo}</>;
    }

    if (error || !url) {
        return (
            <div className="flex items-center justify-center w-full h-full text-center text-gray-600 font-semibold text-sm">
                {name}
            </div>
        );
    }
    
    return (
        <img
            src={url}
            alt={`${name} logo`}
            className="max-h-16 w-auto object-contain"
            onError={() => setError(true)}
            loading="lazy"
        />
    );
};

const PartnerLogos: React.FC = () => {
    // Duplicate the logos to create a seamless looping effect
    const logos = [...trusted_carriers, ...trusted_carriers];

    return (
        <div className="w-full overflow-hidden">
            <div className="flex animate-marquee">
                {logos.map((carrier, index) => (
                    <a
                        key={`${carrier.name}-${index}`}
                        href={carrier.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Visit ${carrier.name}`}
                        className="flex-shrink-0 w-48 mx-6 flex justify-center items-center transition-transform duration-300 transform hover:scale-110"
                    >
                        <div className="filter grayscale hover:grayscale-0 transition-all duration-300">
                            <CarrierLogo
                                name={carrier.name}
                                url={carrier.domain ? `https://logo.clearbit.com/${carrier.domain}` : null}
                                customLogo={carrier.customLogo}
                            />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default PartnerLogos;