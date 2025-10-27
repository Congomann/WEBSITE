
import React, { useState, useMemo } from 'react';
import SEO from '../../components/SEO';
import { useCrm } from '../../contexts/CrmContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import type { AgentApplication, ApplicationStatus } from '../../types';
import DataTable from '../../components/crm/DataTable';
import ApplicationDetailModal from '../../components/crm/ApplicationDetailModal';

const AgentApplicationsPage: React.FC = () => {
    const { applications, updateApplicationStatus } = useCrm();
    const { addAdvisor } = useAdvisors();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<AgentApplication | null>(null);

    const handleViewDetails = (application: AgentApplication) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    const handleApprove = (application: AgentApplication) => {
        // Create a new advisor from the application data
        addAdvisor({
            name: application.name,
            title: 'New Advisor', // Default title
            imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop', // Default placeholder image
            specialties: ['Pending Review'],
            bio: application.experience,
            email: application.email,
            phone: application.phone,
            languages: [],
            availability: {},
        });

        // Update application status
        updateApplicationStatus(application.id, 'Approved');
        handleCloseModal();
    };

    const handleReject = (application: AgentApplication) => {
        updateApplicationStatus(application.id, 'Rejected');
        handleCloseModal();
    };
    
    const columns = [
        { header: 'Applicant Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Status', accessor: 'status' },
        { header: 'Date Submitted', accessor: 'submittedAt', isDate: true },
    ];
    
    const actions = [
        { label: 'View Details', onClick: (app: AgentApplication) => handleViewDetails(app) }
    ];

    const sortedApplications = useMemo(() => 
        [...applications].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()),
    [applications]);

    return (
        <div className="animate-fade-in">
            <SEO title="Agent Applications" description="Review and manage agent applications." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Agent Applications</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={sortedApplications} actions={actions} />
            </div>

            {selectedApplication && (
                <ApplicationDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    application={selectedApplication}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default AgentApplicationsPage;