
import React, { useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useCrm } from '../../../contexts/CrmContext';
import StatCard from '../StatCard';
import SalesChart from '../SalesChart';

const LeadsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>);
const ConversionIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>);
const ClientsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-3.562a4.981 4.981 0 00-4.093-4.948 4 4 0 00-1.813 5.39" /></svg>);
const CommissionsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v-1m0-1V4m0 2.01M12 14v4m0 2v-2m0-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>);

const AgentDashboard: React.FC = () => {
    const { user } = useAuth();
    const { leads, clients, performanceData, commissions } = useCrm();

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

    const myCommissions = useMemo(() => {
        return commissions.filter(c => c.advisorId === user?.id);
    }, [commissions, user]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="My Active Leads" value={myLeads.length.toString()} icon={<LeadsIcon />} color="bg-blue-500" />
                <StatCard title="Conversion Rate" value={`${myPerformance.conversionRate.toFixed(2)}%`} icon={<ConversionIcon />} color="bg-green-500" description="All time" />
                <StatCard title="My Clients" value={myClients.length.toString()} icon={<ClientsIcon />} color="bg-indigo-500" />
                <StatCard title="Total Commissions" value={`$${myPerformance.commissions.toLocaleString()}`} icon={<CommissionsIcon />} color="bg-yellow-500" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-brand-blue mb-4">Your Epic Sales Journey (Last 6 Months)</h3>
                <SalesChart data={myCommissions} />
            </div>
        </div>
    );
};

export default AgentDashboard;
