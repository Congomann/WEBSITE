import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types';
import SEO from '../../components/SEO';
import AdminDashboard from '../../components/crm/dashboards/AdminDashboard';
import ManagerDashboard from '../../components/crm/dashboards/ManagerDashboard';
import SubAdminDashboard from '../../components/crm/dashboards/SubAdminDashboard';
import UnderwritingDashboard from '../../components/crm/dashboards/UnderwritingDashboard';
import AgentDashboard from '../../components/crm/dashboards/AgentDashboard';

const CrmDashboardPage: React.FC = () => {
    const { user } = useAuth();
    
    const renderDashboardByRole = () => {
        switch (user?.role) {
            case Role.Admin:
                return <AdminDashboard />;
            case Role.Manager:
                return <ManagerDashboard />;
            case Role.SubAdmin:
                return <SubAdminDashboard />;
            case Role.Underwriter:
                return <UnderwritingDashboard />;
            case Role.Advisor:
                return <AgentDashboard />;
            default:
                return <div className="text-center p-8 bg-white rounded-lg shadow">You do not have a dashboard assigned.</div>;
        }
    };

    return (
        <div>
            <SEO title="CRM Dashboard" description="CRM Dashboard for New Holland Financial Group" noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-2">Welcome, {user?.name.split(' ')[0]}!</h1>
            <p className="text-gray-600 mb-6">Here's your overview for today.</p>

            {renderDashboardByRole()}
        </div>
    );
};

export default CrmDashboardPage;
