import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { service_details } from '../../data';

const LifeInsurancePage: React.FC = () => {
    const details: ServiceDetail[] = service_details.life || [];

    return (
        <ServicePageLayout
            title="Life Insurance"
            subtitle="Secure your family's financial future and create a lasting legacy."
            seoDescription="Secure your family's future with tailored life insurance and final expense policies in Des Moines, IA. New Holland Financial offers expert advice on whole life, term, and IUL plans in Iowa City, Cedar Rapids, and beyond."
            seoKeywords="life insurance, final expense insurance, whole life, term life, IUL, annuities, Des Moines life insurance, Iowa City, Cedar Rapids, Kansas City, St Louis, Dallas, Fort Worth"
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