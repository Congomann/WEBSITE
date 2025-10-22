import React from 'react';
import { useCrm } from '../../../contexts/CrmContext';
import { useAdvisors } from '../../../contexts/AdvisorContext';
import StatCard from '../StatCard';

const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-3.562a4.981 4.981 0 00-4.093-4.948 4 4 0 00-1.813 5.39" /></svg>);
const LeadsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const SalesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>);
const DealsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);

const AdminDashboard: React.FC = () => {
    const { leads, performanceData } = useCrm();
    const { advisors } = useAdvisors();

    const totalSalesVolume = performanceData.reduce((sum, p) => sum + p.metrics.salesVolume, 0);
    const totalClosedDeals = performanceData.reduce((sum, p) => sum + p.metrics.closedDeals, 0);
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={advisors.length.toString()} icon={<UsersIcon />} color="bg-blue-500" />
                <StatCard title="Total Leads" value={leads.length.toString()} icon={<LeadsIcon />} color="bg-green-500" />
                <StatCard title="Total Sales Volume" value={`$${totalSalesVolume.toLocaleString()}`} icon={<SalesIcon />} color="bg-yellow-500" />
                <StatCard title="Total Closed Deals" value={totalClosedDeals.toString()} icon={<DealsIcon />} color="bg-indigo-500" />
            </div>
        </div>
    );
};

export default AdminDashboard;
