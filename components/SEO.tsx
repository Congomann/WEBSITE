
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, noIndex }) => {
  useEffect(() => {
    document.title = `${title} | New Holland Financial Group`;

    const setMetaTag = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };
    
    const removeMetaTag = (name: string) => {
        const element = document.querySelector(`meta[name="${name}"]`);
        if (element) {
            element.remove();
        }
    };

    setMetaTag('description', description);
    
    if (keywords) {
        setMetaTag('keywords', keywords);
    } else {
        removeMetaTag('keywords');
    }

    if (noIndex) {
        setMetaTag('robots', 'noindex, nofollow');
    } else {
        removeMetaTag('robots');
    }

  }, [title, description, keywords, noIndex]);

  return null; // This component does not render anything
};

export default SEO;
