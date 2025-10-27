
import React from 'react';
import { HeroBackground } from '../types';

interface HeroBackgroundProps {
    background: HeroBackground;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ background }) => {
    const commonBgStyles: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
    };

    switch (background.type) {
        case 'image':
            return (
                <div
                    style={{
                        ...commonBgStyles,
                        backgroundImage: `url('${background.source}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                    aria-label="Homepage background image"
                    role="img"
                />
            );
        case 'video':
            return (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={background.source}
                    style={commonBgStyles}
                    className="pointer-events-none"
                    key={background.source} // Add key to force re-render on source change
                />
            );
        case 'youtube':
            return (
                <div style={{...commonBgStyles, overflow: 'hidden'}}>
                     <iframe
                        style={{
                            ...commonBgStyles,
                            top: '50%',
                            left: '50%',
                            width: '177.77vh', // 16:9 aspect ratio
                            minWidth: '100vw',
                            height: '56.25vw', // 16:9 aspect ratio
                            minHeight: '100vh',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                        }}
                        src={`https://www.youtube.com/embed/${background.source}?autoplay=1&mute=1&loop=1&playlist=${background.source}&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        title="YouTube background video"
                    ></iframe>
                </div>
            );
        default:
             // Fallback to a default image if type is unknown or source is missing
            return (
                 <div
                    style={{
                        ...commonBgStyles,
                        backgroundImage: `url('https://images.unsplash.com/photo-1555431182-0c34c83e4244?q=80&w=2070&auto=format&fit=crop')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                    aria-label="Default homepage background image"
                    role="img"
                />
            );
    }
};

export default HeroBackground;