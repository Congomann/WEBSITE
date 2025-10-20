
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { service_details } from '../../data';

const GroupBenefitsPage: React.FC = () => {
    const details: ServiceDetail[] = service_details['group-benefits'] || [];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Group Benefits",
        "provider": {
            "@type": "FinancialService",
            "name": "New Holland Financial Group"
        },
        "areaServed": "Iowa",
        "description": "Comprehensive group and employee benefit packages, including health, disability, and income protection plans for businesses.",
        "name": "Employee Group Benefits"
    };

    return (
        <ServicePageLayout
            title="Group Benefits"
            subtitle="Attract and retain top talent with comprehensive employee benefit packages."
            seoDescription="Enhance your business with competitive group benefits packages from New Holland Financial Group in Des Moines, IA. We design employee benefits programs including group health, disability, and income protection to help you attract and retain top talent."
            seoKeywords="group benefits Des Moines, employee benefits packages Iowa, small business insurance, group health insurance, corporate benefits, employee retention, New Holland Financial"
            structuredData={structuredData}
            icon={
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            }
            serviceDetails={details}
        />
    );
}

export default GroupBenefitsPage;
