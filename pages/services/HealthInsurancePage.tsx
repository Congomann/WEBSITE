
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { useData } from '../../contexts/DataContext';

const HealthInsurancePage: React.FC = () => {
    const { serviceDetails } = useData();
    const details: ServiceDetail[] = serviceDetails.health || [];
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Health Insurance",
        "provider": {
            "@type": "FinancialService",
            "name": "New Holland Financial Group"
        },
        "areaServed": "Iowa",
        "description": "Affordable and comprehensive individual and family health and dental insurance plans. We help you find the best coverage for your needs.",
        "name": "Individual & Family Health Insurance"
    };

    return (
        <ServicePageLayout
            title="Health Insurance Plans in Des Moines, IA | Individual & Family"
            subtitle="Access to quality healthcare for you and your family."
            seoDescription="Find the right health insurance plan in Des Moines, IA with New Holland Financial Group. We offer affordable individual, family, and dental insurance options, helping you navigate the marketplace and access top healthcare networks across Iowa."
            seoKeywords="health insurance Des Moines, individual health plans Iowa, family medical insurance, dental insurance quote, healthcare marketplace, open enrollment, New Holland Financial"
            structuredData={structuredData}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            }
            serviceDetails={details}
        />
    );
}

export default HealthInsurancePage;
