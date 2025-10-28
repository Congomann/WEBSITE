import React, { useMemo } from 'react';
import SEO from '../../components/SEO';
import { useCrm } from '../../contexts/CrmContext';
import { Role } from '../../types';
import DataTable from '../../components/crm/DataTable';

const AgentsPage: React.FC = () => {
    const { users, performanceData } = useCrm();

    const agentPerformanceData = useMemo(() => {
        const agents = users.filter(u => u.role === Role.Advisor);
        return agents.map(agent => {
            const perf = performanceData.find(p => p.advisorId === agent.id)?.metrics;
            return {
                id: agent.id,
                name: agent.name,
                email: agent.email,
                salesVolume: perf?.salesVolume || 0,
                closedDeals: perf?.closedDeals || 0,
                conversionRate: perf?.conversionRate || 0,
            };
        });
    }, [users, performanceData]);

    const columns = [
        { header: 'Agent Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Sales Volume', accessor: 'salesVolume' },
        { header: 'Closed Deals', accessor: 'closedDeals' },
        { header: 'Conversion Rate', accessor: 'conversionRate' },
    ];
    
    const formattedData = agentPerformanceData.map(d => ({
        ...d,
        salesVolume: `$${d.salesVolume.toLocaleString()}`,
        conversionRate: `${d.conversionRate.toFixed(2)}%`,
    }));

    return (
        <div className="animate-fade-in">
            <SEO title="Agents Performance" description="View performance metrics for all agents." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Agents Performance</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={formattedData} />
            </div>
        </div>
    );
};

export default AgentsPage;
