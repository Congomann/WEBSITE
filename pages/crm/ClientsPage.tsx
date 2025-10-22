import React, { useMemo } from 'react';
import SEO from '../../components/SEO';
import { useCrm } from '../../contexts/CrmContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { Role } from '../../types';
import DataTable from '../../components/crm/DataTable';


const ClientsPage: React.FC = () => {
    const { user } = useAuth();
    const { clients } = useCrm();
    const { advisors } = useAdvisors();
    
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

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Assigned Advisor', accessor: 'advisorName' },
        { header: 'Client Since', accessor: 'since', isDate: true },
    ];

    const actions = [
        { label: 'View Details', onClick: (client: any) => alert(`Viewing details for ${client.name}`) },
    ];

    return (
        <div className="animate-fade-in">
            <SEO title="Client Management" description="View and manage clients." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Client Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={clientsToDisplay} actions={actions} />
            </div>
        </div>
    );
};

export default ClientsPage;