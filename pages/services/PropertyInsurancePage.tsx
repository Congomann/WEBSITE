import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { service_details } from '../../data';

const PropertyInsurancePage: React.FC = () => {
    const details: ServiceDetail[] = service_details.property || [];

    return (
        <ServicePageLayout
            title="Property Insurance"
            subtitle="Protect your home and personal belongings from the unexpected."
            seoDescription="Protect your largest investment with comprehensive homeowners insurance in Des Moines, IA. We offer policies for homes in downtown Des Moines, Iowa City, and Cedar Rapids, covering you against theft, flood, and fire."
            seoKeywords="homeowners insurance, property insurance, renters insurance, Des Moines home insurance, downtown, Iowa City, Cedar Rapids, Kansas City, St Louis, Dallas, Fort Worth"
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            }
            serviceDetails={details}
        />
    );
}

export default PropertyInsurancePage;