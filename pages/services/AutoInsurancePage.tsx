import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { service_details } from '../../data';

const AutoInsurancePage: React.FC = () => {
    const details: ServiceDetail[] = service_details.auto || [];

    return (
        <ServicePageLayout
            title="Auto & Commercial Insurance"
            subtitle="Reliable coverage for your personal, classic, and commercial vehicles."
            seoDescription="Find affordable car insurance and commercial auto coverage in Des Moines, IA. Get a free quote for your vehicle in Iowa City, Cedar Rapids, and Rockford, and protect your commute with New Holland Financial."
            seoKeywords="car insurance, auto insurance, commercial auto insurance, fleet insurance, Des Moines car insurance, Iowa City, Cedar Rapids, Rockford, Kansas City, St Louis, Dallas, Fort Worth"
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