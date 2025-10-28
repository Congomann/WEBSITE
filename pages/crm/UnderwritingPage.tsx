import React, { useMemo, useState } from 'react';
import { useCrm } from '../../contexts/CrmContext';
import type { Client, Policy } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';
import UnderwritingReviewModal from '../../components/crm/UnderwritingReviewModal';

interface PendingPolicy {
    id: string; // Unique key for the row
    clientId: number;
    clientName: string;
    policyId: string;
    policyType: Policy['type'];
    policyPremium: number;
    policy: Policy;
}

const UnderwritingPage: React.FC = () => {
    const { clients } = useCrm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{client: Client, policy: Policy} | null>(null);

    const pendingPolicies: PendingPolicy[] = useMemo(() => {
        const allPending: PendingPolicy[] = [];
        clients.forEach(client => {
            client.policies.forEach(policy => {
                if (policy.status === 'Pending') {
                    allPending.push({
                        id: `${client.id}-${policy.id}`,
                        clientId: client.id,
                        clientName: client.name,
                        policyId: policy.id,
                        policyType: policy.type,
                        policyPremium: policy.premium,
                        policy: policy,
                    });
                }
            });
        });
        return allPending;
    }, [clients]);

    const handleReview = (item: PendingPolicy) => {
        const client = clients.find(c => c.id === item.clientId);
        if (client) {
            setSelectedItem({ client, policy: item.policy });
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const columns = [
        { header: 'Client Name', accessor: 'clientName' },
        { header: 'Policy ID', accessor: 'policyId' },
        { header: 'Policy Type', accessor: 'policyType' },
        { header: 'Premium', accessor: 'policyPremium' },
    ];
    
    const formattedData = pendingPolicies.map(item => ({
        ...item,
        policyPremium: `$${item.policyPremium.toLocaleString()}`,
    }));

    const actions = [
        { label: 'Review', onClick: (item: PendingPolicy) => handleReview(item) },
    ];

    return (
        <div className="animate-fade-in">
            <SEO title="Underwriting Queue" description="Review pending policy applications." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Underwriting Queue</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={formattedData} actions={actions} />
            </div>

            {isModalOpen && selectedItem && (
                <UnderwritingReviewModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    client={selectedItem.client}
                    policy={selectedItem.policy}
                />
            )}
        </div>
    );
};

export default UnderwritingPage;