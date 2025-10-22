import React from 'react';
import SEO from '../../components/SEO';

const UnderwritingPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <SEO title="Underwriting" description="Underwriting dashboard and tools." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Underwriting</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="text-gray-600">The underwriting feature is under construction. This section will contain tools for policy review and risk assessment.</p>
            </div>
        </div>
    );
};

export default UnderwritingPage;
