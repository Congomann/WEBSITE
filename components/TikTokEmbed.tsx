import React, { useEffect } from 'react';

interface TikTokEmbedProps {
  embedId: string;
}

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({ embedId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Find and remove the script when the component unmounts
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/embed/v2/${embedId}`}
      data-video-id={embedId}
      style={{ maxWidth: '605px', minWidth: '325px', margin: '0 auto' }}
    >
      <section>
        {/* Fallback content for when JavaScript is disabled */}
        <a 
            target="_blank" 
            rel="noopener noreferrer"
            href={`https://www.tiktok.com/discover`}
        >
            View TikTok video
        </a>
      </section>
    </blockquote>
  );
};

export default TikTokEmbed;
