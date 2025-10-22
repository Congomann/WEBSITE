import React from 'react';
import SEO from '../../components/SEO';

const ClientsPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <SEO title="Client Management" description="View and manage clients." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Client Management</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="text-gray-600">The client management feature is under construction. Soon you'll be able to view and manage your client list and their policies here.</p>
            </div>
        </div>
    );
};

export default ClientsPage;
