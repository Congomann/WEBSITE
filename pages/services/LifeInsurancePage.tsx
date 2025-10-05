
import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import { LIFE_INSURANCE_DETAILS } from '../../constants';

const LifeInsurancePage: React.FC = () => (
    <ServicePageLayout
        title="Life Insurance"
        subtitle="Secure your family's financial future and create a lasting legacy."
        seoDescription="Explore life insurance options like Whole, Universal, IUL, Term Life, and Annuities to secure your family's financial future with New Holland Financial Group."
        seoKeywords="life insurance, whole life, universal life, IUL, term life, annuities"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-15.904z" />
            </svg>
        }
        serviceDetails={LIFE_INSURANCE_DETAILS}
    />
);

export default LifeInsurancePage;