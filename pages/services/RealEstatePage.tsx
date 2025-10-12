import React from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { service_details } from '../../data';

const RealEstatePage: React.FC = () => {
    const details: ServiceDetail[] = service_details['real-estate'] || [];

    return (
        <ServicePageLayout
            title="Real Estate Services"
            subtitle="Expert guidance for buying, selling, and investing in property."
            seoDescription="Searching for a house for sale in Des Moines, IA? Our expert real estate agents guide you through buying or selling homes in Iowa City, Cedar Rapids, and the greater downtown area. Find your dream home or next investment property with us."
            seoKeywords="real estate, house for sale, home for sale, buying a home, selling a home, Des Moines real estate, downtown, Iowa City, Cedar Rapids, Rockford, Kansas City, St Louis, Dallas, Fort Worth"
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m6 0h.008v.008H21V3z" />
                </svg>
            }
            serviceDetails={details}
        />
    );
}

export default RealEstatePage;