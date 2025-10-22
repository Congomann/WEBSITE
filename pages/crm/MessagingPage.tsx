import React from 'react';
import SEO from '../../components/SEO';

const MessagingPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <SEO title="Messaging" description="Internal messaging system." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Messaging</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="text-gray-600">The internal messaging system is in development. This feature will enable seamless communication between team members.</p>
            </div>
        </div>
    );
};

export default MessagingPage;
