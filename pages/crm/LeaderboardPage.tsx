import React, { useState, useMemo } from 'react';
import SEO from '../../components/SEO';
import { useCrm } from '../../contexts/CrmContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { useAuth } from '../../contexts/AuthContext';
import type { PerformanceData } from '../../types';

type SortKey = 'salesVolume' | 'closedDeals';
type SortDirection = 'ascending' | 'descending';

interface LeaderboardEntry extends PerformanceData {
    name: string;
}

const SortIcon: React.FC<{ direction: SortDirection | null }> = ({ direction }) => {
    if (!direction) return <span className="text-gray-400">↕</span>;
    return direction === 'ascending' ? <span className="text-brand-blue">▲</span> : <span className="text-brand-blue">▼</span>;
};

const LeaderboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'monthly' | 'weekly'>('monthly');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'salesVolume', direction: 'descending' });

    const { performanceData } = useCrm();
    const { advisors } = useAdvisors();
    const { user } = useAuth();

    const leaderboardData: LeaderboardEntry[] = useMemo(() => {
        return performanceData.map(perf => {
            const advisor = advisors.find(a => a.id === perf.advisorId);
            return {
                ...perf,
                name: advisor?.name || 'Unknown Advisor',
            };
        });
    }, [performanceData, advisors]);

    const sortedData = useMemo(() => {
        const sortableItems = [...leaderboardData];
        sortableItems.sort((a, b) => {
            if (a.metrics[sortConfig.key] < b.metrics[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a.metrics[sortConfig.key] > b.metrics[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            // Secondary sort by name if primary values are equal
            return a.name.localeCompare(b.name);
        });
        return sortableItems;
    }, [leaderboardData, sortConfig]);

    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'descending';
        if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    };

    const getSortDirection = (key: SortKey) => {
        return sortConfig.key === key ? sortConfig.direction : null;
    };

    const tabButtonStyles = "px-6 py-2 font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold";
    const activeTabStyles = "border-b-2 border-brand-blue text-brand-blue";
    const inactiveTabStyles = "text-gray-500 hover:text-brand-blue";

    return (
        <div className="animate-fade-in">
            <SEO title="Leaderboard" description="View agent performance rankings." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Performance Leaderboard</h1>
            
            <div className="mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('monthly')}
                        className={`${tabButtonStyles} ${activeTab === 'monthly' ? activeTabStyles : inactiveTabStyles}`}
                        aria-current={activeTab === 'monthly'}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setActiveTab('weekly')}
                        className={`${tabButtonStyles} ${activeTab === 'weekly' ? activeTabStyles : inactiveTabStyles}`}
                        aria-current={activeTab === 'weekly'}
                    >
                        Weekly
                    </button>
                </div>
                 <p className="text-xs text-gray-500 mt-2 italic">Note: Weekly and monthly data is the same for demonstration purposes.</p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Rank</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advisor</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => requestSort('salesVolume')} className="flex items-center gap-2 font-medium text-gray-500 uppercase focus:outline-none">
                                        Sales Volume
                                        <SortIcon direction={getSortDirection('salesVolume')} />
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <button onClick={() => requestSort('closedDeals')} className="flex items-center gap-2 font-medium text-gray-500 uppercase focus:outline-none">
                                        Closed Deals
                                        <SortIcon direction={getSortDirection('closedDeals')} />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sortedData.map((item, index) => (
                                <tr key={item.advisorId} className={`transition-colors duration-200 ${item.advisorId === user?.id ? 'bg-brand-gold/20' : 'hover:bg-gray-50'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 text-center">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${item.metrics.salesVolume.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.metrics.closedDeals}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;