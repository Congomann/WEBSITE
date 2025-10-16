
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { useData } from '../../contexts/DataContext';

const AutoInsurancePage: React.FC = () => {
    const { serviceDetails } = useData();
    const details: ServiceDetail[] = serviceDetails.auto || [];
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Auto Insurance",
        "provider": {
            "@type": "FinancialService",
            "name": "New Holland Financial Group"
        },
        "areaServed": "Iowa",
        "description": "Comprehensive auto and commercial vehicle insurance. Get a free quote for personal cars, classic cars, and commercial fleets.",
        "name": "Auto & Commercial Insurance"
    };

    return (
        <ServicePageLayout
            title="Auto & Commercial Insurance"
            subtitle="Reliable coverage for your personal, classic, and commercial vehicles."
            seoDescription="Get a free quote for affordable car insurance in Des Moines, IA with New Holland Financial Group. We offer competitive rates for personal auto, classic car, and commercial vehicle insurance in Iowa City, Cedar Rapids, and beyond. Drive protected today."
            seoKeywords="auto insurance Des Moines, car insurance quote Iowa, commercial vehicle insurance, classic car insurance, Iowa auto insurance rates, New Holland Financial, vehicle protection"
            structuredData={structuredData}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 22l-4-4 1.5-1.5L9 18l4.5-4.5L19 18l-4 4-2.5-2.5L9 22zM12 12v.01" />
                </svg>
            }
            serviceDetails={details}
        />
    );
}

export default AutoInsurancePage;
