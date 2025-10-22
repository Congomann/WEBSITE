import React from 'react';
import SEO from '../../components/SEO';

const LeaderboardPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <SEO title="Leaderboard" description="View agent performance rankings." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Performance Leaderboard</h1>
             <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="text-gray-600">The leaderboard is currently in development. Soon you will see weekly and monthly performance rankings for all agents.</p>
            </div>
        </div>
    );
};

export default LeaderboardPage;
