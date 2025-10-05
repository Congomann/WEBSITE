
import React, { useState, useEffect } from 'react';
import ServicePageLayout from './ServicePageLayout';
import type { ServiceDetail } from '../../types';
import { API_BASE_URL } from '../../constants';

const AutoInsurancePage: React.FC = () => {
    const [details, setDetails] = useState<ServiceDetail[]>([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/services/auto`);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Failed to fetch auto insurance details:", error);
            }
        };
        fetchDetails();
    }, []);

    return (
        <ServicePageLayout
            title="Auto & Commercial Insurance"
            subtitle="Reliable coverage for your personal, classic, and commercial vehicles."
            seoDescription="Get reliable coverage for your personal car, classic vehicle, or commercial fleet. New Holland Financial Group offers comprehensive auto insurance solutions."
            seoKeywords="auto insurance, commercial vehicle insurance, car insurance, classic car insurance, fleet insurance"
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