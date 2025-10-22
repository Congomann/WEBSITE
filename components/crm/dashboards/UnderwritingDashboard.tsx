import React, { useMemo } from 'react';
import { useCrm } from '../../../contexts/CrmContext';
import StatCard from '../StatCard';
import ChartPlaceholder from '../ChartPlaceholder';

const UnderwritingDashboard: React.FC = () => {
    const { clients } = useCrm();

    const pendingPolicies = useMemo(() => {
        return clients.flatMap(c => c.policies).filter(p => p.status === 'Pending');
    }, [clients]);

    return (
         <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <StatCard title="Policies Pending Review" value={pendingPolicies.length.toString()} color="bg-yellow-500" />
                 <StatCard title="Approval Rate" value="92.5%" color="bg-green-500" description="Last 30 days" />
                 <StatCard title="Avg. Review Time" value="2.3 Days" color="bg-blue-500" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-brand-blue mb-4">Risk Assessment Overview</h3>
                <ChartPlaceholder />
            </div>
        </div>
    );
};

export default UnderwritingDashboard;
