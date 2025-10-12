import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { service_details } from '../../data';

const HealthInsurancePage: React.FC = () => {
    const details: ServiceDetail[] = service_details.health || [];
    
    return (
        <ServicePageLayout
            title="Health Insurance"
            subtitle="Access to quality healthcare for you and your family."
            seoDescription="Get affordable individual and family health insurance plans in Des Moines, IA. New Holland Financial helps you navigate coverage options in Iowa City, Cedar Rapids, and provides access to quality healthcare networks."
            seoKeywords="health insurance, dental insurance, medical plans, Des Moines health insurance, Iowa City, Cedar Rapids, Kansas City, St Louis, Dallas, Fort Worth"
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