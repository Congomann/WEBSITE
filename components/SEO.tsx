
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, noIndex, structuredData }) => {
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

    // Handle Structured Data (JSON-LD)
    const scriptId = 'structured-data-script';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (structuredData) {
        if (!scriptElement) {
            scriptElement = document.createElement('script');
            scriptElement.id = scriptId;
            scriptElement.type = 'application/ld+json';
            document.head.appendChild(scriptElement);
        }
        scriptElement.innerHTML = JSON.stringify(structuredData);
    } else if (scriptElement) {
        // If no structured data is provided for this page, remove the old one.
        scriptElement.remove();
    }

  }, [title, description, keywords, noIndex, structuredData]);

  return null; // This component does not render anything
};

export default SEO;
