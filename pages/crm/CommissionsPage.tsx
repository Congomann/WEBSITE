
import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';
import { Role } from '../../types';
import SEO from '../../components/SEO';
import StatCard from '../../components/crm/StatCard';
import DataTable from '../../components/crm/DataTable';

const CommissionsPage: React.FC = () => {
    const { user } = useAuth();
    const { commissions } = useCrm();

    const commissionsToDisplay = useMemo(() => {
        if (!user) return [];
        if (user.role === Role.Admin || user.role === Role.Manager) {
            return commissions;
        }
        if (user.role === Role.Advisor) {
            return commissions.filter(c => c.advisorId === user.id);
        }
        return [];
    }, [commissions, user]);

    const summary = useMemo(() => {
        const totalPaid = commissionsToDisplay
            .filter(c => c.status === 'Paid')
            .reduce((sum, c) => sum + c.commissionAmount, 0);
        
        const totalPending = commissionsToDisplay
            .filter(c => c.status === 'Pending')
            .reduce((sum, c) => sum + c.commissionAmount, 0);

        return { totalPaid, totalPending, totalOverall: totalPaid + totalPending };
    }, [commissionsToDisplay]);

    const columns = [
        { header: 'Date', accessor: 'date', isDate: true },
        { header: 'Client', accessor: 'clientName' },
        { header: 'Policy Type', accessor: 'policyType' },
        { header: 'Premium', accessor: 'premium' },
        { header: 'Commission', accessor: 'commissionAmount' },
        { header: 'Status', accessor: 'status' },
    ];
    
    const formattedData = commissionsToDisplay.map(c => ({
        ...c,
        premium: `$${c.premium.toLocaleString()}`,
        commissionAmount: `$${c.commissionAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    }));

    const PaidIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
    const PendingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
    const TotalIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v-1m0-1V4m0 2.01M12 14v4m0 2v-2m0-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>);


    return (
        <div className="animate-fade-in">
            <SEO title="Commissions" description="View and track your commissions." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Commissions</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Commissions Paid" value={`$${summary.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} icon={<PaidIcon />} color="bg-green-500" />
                <StatCard title="Total Commissions Pending" value={`$${summary.totalPending.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} icon={<PendingIcon />} color="bg-yellow-500" />
                <StatCard title="Total Overall" value={`$${summary.totalOverall.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} icon={<TotalIcon />} color="bg-blue-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-brand-blue mb-4">Commission Details</h2>
                <DataTable columns={columns} data={formattedData} />
            </div>
        </div>
    );
};

export default CommissionsPage;
