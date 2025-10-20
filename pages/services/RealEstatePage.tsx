
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { service_details } from '../../data';

const RealEstatePage: React.FC = () => {
    const details: ServiceDetail[] = service_details['real-estate'] || [];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "New Holland Financial Group - Real Estate Services",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Des Moines",
            "addressRegion": "IA"
        },
        "telephone": "(717) 847-9638",
        "description": "Expert real estate services for buying, selling, and investing in residential and commercial properties in the Des Moines area and across Iowa.",
        "areaServed": {
            "@type": "State",
            "name": "Iowa"
        }
    };

    return (
        <ServicePageLayout
            title="Real Estate Services"
            subtitle="Expert guidance for buying, selling, and investing in property."
            seoDescription="Find Des Moines homes for sale with a trusted Iowa real estate agent at New Holland Financial Group. We specialize in residential sales, commercial property investment, and helping you navigate the Iowa real estate market. Connect with our expert team today."
            seoKeywords="Des Moines homes for sale, Iowa real estate agent, commercial property investment Iowa, buy a home Des Moines, sell house Iowa, real estate listings Des Moines, New Holland Financial real estate services"
            structuredData={structuredData}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m6 0h.008v.008H21V3z" />
                </svg>
            }
            serviceDetails={details}
        />
    );
}

export default RealEstatePage;