
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import { PROPERTY_INSURANCE_DETAILS } from '../../constants';

const PropertyInsurancePage: React.FC = () => (
    <ServicePageLayout
        title="Property Insurance"
        subtitle="Protect your home and personal belongings from the unexpected."
        seoDescription="Protect your home and personal belongings with homeowners or renters insurance from New Holland Financial Group. Coverage for theft, flood, and fire."
        seoKeywords="property insurance, homeowners insurance, renters insurance, flood insurance, fire insurance"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        }
        serviceDetails={PROPERTY_INSURANCE_DETAILS}
    />
);

export default PropertyInsurancePage;