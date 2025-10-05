
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import { HEALTH_INSURANCE_DETAILS } from '../../constants';

const HealthInsurancePage: React.FC = () => (
    <ServicePageLayout
        title="Health Insurance"
        subtitle="Access to quality healthcare for you and your family."
        seoDescription="Find affordable health and dental insurance plans for individuals and families. Access quality healthcare with New Holland Financial Group."
        seoKeywords="health insurance, dental insurance, medical coverage, family health plans"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        }
        serviceDetails={HEALTH_INSURANCE_DETAILS}
    />
);

export default HealthInsurancePage;