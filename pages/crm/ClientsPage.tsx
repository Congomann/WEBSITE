import React, { useMemo, useState } from 'react';
import SEO from '../../components/SEO';
import { useCrm } from '../../contexts/CrmContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { Role, Client } from '../../types';
import DataTable from '../../components/crm/DataTable';
import ClientDetailModal from '../../components/crm/ClientDetailModal';


const ClientsPage: React.FC = () => {
    const { user } = useAuth();
    const { clients, updateClient } = useCrm();
    const { advisors } = useAdvisors();
    
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const advisorMap = useMemo(() => new Map(advisors.map(a => [a.id, a.name])), [advisors]);

    const clientsToDisplay = useMemo(() => {
        if (!user) return [];
        const clientsWithAdvisor = clients.map(client => ({
            ...client,
            advisorName: advisorMap.get(client.advisorId) || 'Unknown'
        }));

        if (user.role === Role.Admin) {
            return clientsWithAdvisor;
        }
        if (user.role === Role.Advisor) {
            return clientsWithAdvisor.filter(client => client.advisorId === user.id);
        }
        return [];
    }, [clients, user, advisorMap]);
    
    const handleOpenDetailModal = (client: Client) => {
        const originalClient = clients.find(c => c.id === client.id);
        if (originalClient) {
            setSelectedClient(originalClient);
            setIsDetailModalOpen(true);
        }
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedClient(null);
    };

    const handleSaveClient = (updatedClient: Client) => {
        updateClient(updatedClient);
        handleCloseDetailModal();
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Assigned Advisor', accessor: 'advisorName' },
        { header: 'Client Since', accessor: 'since', isDate: true },
    ];

    const actions = [
        { label: 'View Details', onClick: (client: Client) => handleOpenDetailModal(client) },
    ];

    return (
        <div className="animate-fade-in">
            <SEO title="Client Management" description="View and manage clients." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Client Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={clientsToDisplay} actions={actions} />
            </div>
            
            {isDetailModalOpen && selectedClient && (
                <ClientDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={handleCloseDetailModal}
                    client={selectedClient}
                    onSave={handleSaveClient}
                />
            )}
        </div>
    );
};

export default ClientsPage;