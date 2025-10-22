import React from 'react';
import { useCrm } from '../../../contexts/CrmContext';
import { useAdvisors } from '../../../contexts/AdvisorContext';
import StatCard from '../StatCard';
import ChartPlaceholder from '../ChartPlaceholder';

const ManagerDashboard: React.FC = () => {
    const { performanceData } = useCrm();
    const { advisors } = useAdvisors();

    const totalLeads = performanceData.reduce((sum, p) => sum + p.metrics.leads, 0);
    const totalClosedDeals = performanceData.reduce((sum, p) => sum + p.metrics.closedDeals, 0);
    const teamConversionRate = totalLeads > 0 ? ((totalClosedDeals / totalLeads) * 100).toFixed(2) : 0;
    const totalSalesVolume = performanceData.reduce((sum, p) => sum + p.metrics.salesVolume, 0);

    const topAgents = performanceData
        .sort((a, b) => b.metrics.salesVolume - a.metrics.salesVolume)
        .slice(0, 3)
        .map(p => {
            const agent = advisors.find(a => a.id === p.advisorId);
            return {
                ...p,
                name: agent?.name || 'Unknown Agent'
            };
        });
    
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <StatCard title="Team Conversion Rate" value={`${teamConversionRate}%`} color="bg-green-500" />
                 <StatCard title="Total Team Sales" value={`$${totalSalesVolume.toLocaleString()}`} color="bg-blue-500" />
                 <StatCard title="Total Closed Deals" value={totalClosedDeals.toString()} color="bg-indigo-500" />
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold text-brand-blue mb-4">Sales Trend</h3>
                    <ChartPlaceholder />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                     <h3 className="text-xl font-bold text-brand-blue mb-4">Top Performing Agents</h3>
                     <div className="space-y-4">
                        {topAgents.map((agent, index) => (
                            <div key={agent.advisorId} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className={`font-bold text-lg mr-3 ${index === 0 ? 'text-brand-gold' : 'text-gray-400'}`}>#{index + 1}</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">{agent.name}</p>
                                        <p className="text-sm text-gray-500">{agent.metrics.closedDeals} deals</p>
                                    </div>
                                </div>
                                <p className="font-bold text-green-600">${agent.metrics.salesVolume.toLocaleString()}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
