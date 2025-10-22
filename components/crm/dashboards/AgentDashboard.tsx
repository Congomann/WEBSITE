import React, { useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useCrm } from '../../../contexts/CrmContext';
import StatCard from '../StatCard';
import ChartPlaceholder from '../ChartPlaceholder';

const AgentDashboard: React.FC = () => {
    const { user } = useAuth();
    const { leads, clients, performanceData } = useCrm();

    const myPerformance = useMemo(() => {
        const data = performanceData.find(p => p.advisorId === user?.id);
        return data ? data.metrics : { leads: 0, conversionRate: 0, closedDeals: 0, salesVolume: 0, commissions: 0 };
    }, [performanceData, user]);

    const myLeads = useMemo(() => {
        return leads.filter(l => l.assignedTo === user?.id && l.status !== 'Closed - Won' && l.status !== 'Closed - Lost');
    }, [leads, user]);
    
    const myClients = useMemo(() => {
        return clients.filter(c => c.advisorId === user?.id);
    }, [clients, user]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="My Active Leads" value={myLeads.length.toString()} color="bg-blue-500" />
                <StatCard title="Conversion Rate" value={`${myPerformance.conversionRate.toFixed(2)}%`} color="bg-green-500" description="All time" />
                <StatCard title="My Clients" value={myClients.length.toString()} color="bg-indigo-500" />
                <StatCard title="Total Commissions" value={`$${myPerformance.commissions.toLocaleString()}`} color="bg-yellow-500" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-brand-blue mb-4">My Sales Funnel</h3>
                <ChartPlaceholder />
            </div>
        </div>
    );
};

export default AgentDashboard;
