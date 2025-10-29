
import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';
import type { AdvisorRequest } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';
import RequestDetailModal from '../../components/crm/RequestDetailModal';

const ClientRequestsPage: React.FC = () => {
    const { user } = useAuth();
    const { requests, updateRequestStatus } = useCrm();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<AdvisorRequest | null>(null);

    const myRequests = useMemo(() => {
        if (!user) return [];
        return requests.filter(r => r.advisorId === user.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [requests, user]);

    const handleMarkContacted = (request: AdvisorRequest) => {
        if (request.status === 'New') {
            updateRequestStatus(request.id, 'Contacted');
        }
    };

    const handleViewDetails = (request: AdvisorRequest) => {
        setSelectedRequest(request);
        setIsDetailModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsDetailModalOpen(false);
        setSelectedRequest(null);
    };

    const requestColumns = [
        { header: 'Type', accessor: 'type' },
        { header: 'Name', accessor: 'name' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Received', accessor: 'createdAt', isDate: true },
        { header: 'Status', accessor: 'status' },
    ];
    
    const requestActions = [
        { 
            label: 'View Details', 
            onClick: (request: AdvisorRequest) => handleViewDetails(request),
        },
        { 
            label: 'Mark as Contacted', 
            onClick: (request: AdvisorRequest) => handleMarkContacted(request),
        }
    ];

    return (
        <div className="animate-fade-in">
            <SEO title="Client Requests" description="View and manage incoming client requests." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Client Requests</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable 
                  columns={requestColumns} 
                  data={myRequests} 
                  actions={requestActions}
                />
            </div>

            {selectedRequest && (
                <RequestDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={handleCloseModal}
                    request={selectedRequest}
                />
            )}
        </div>
    );
};

export default ClientRequestsPage;
