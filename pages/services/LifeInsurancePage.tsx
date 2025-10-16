
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { useData } from '../../contexts/DataContext';

const LifeInsurancePage: React.FC = () => {
    const { serviceDetails } = useData();
    const details: ServiceDetail[] = serviceDetails.life || [];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Life Insurance",
        "provider": {
            "@type": "FinancialService",
            "name": "New Holland Financial Group",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Des Moines",
                "addressRegion": "IA"
            },
            "telephone": "(717) 847-9638"
        },
        "areaServed": {
            "@type": "State",
            "name": "Iowa"
        },
        "description": "Offering tailored life insurance solutions including whole life, term life, and Indexed Universal Life (IUL) to protect your family's financial future.",
        "name": "Life Insurance Policies"
    };

    return (
        <ServicePageLayout
            title="Life Insurance"
            subtitle="Secure your family's financial future and create a lasting legacy."
            seoDescription="Protect your legacy with comprehensive life insurance from New Holland Financial Group in Des Moines, IA. Our expert advisors provide personalized whole life, term life, IUL, and final expense policies to secure your family's financial future across Iowa, including Iowa City and Cedar Rapids."
            seoKeywords="life insurance Des Moines, whole life insurance Iowa, term life insurance policy, final expense planning, IUL Iowa, retirement annuities, financial security, New Holland Financial Group"
            structuredData={structuredData}
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-15.904z" />
                </svg>
            }
            serviceDetails={details}
        />
    );
}

export default LifeInsurancePage;
