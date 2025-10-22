import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CrmSidebar from '../../components/crm/CrmSidebar';
import NotificationBell from '../../components/crm/NotificationBell';
import { useAuth } from '../../contexts/AuthContext';

const CrmLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex h-[calc(100vh-96px)] bg-gray-100">
            <CrmSidebar />
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b z-10">
                    <div />
                    <div className="flex items-center gap-4">
                        <NotificationBell />
                        <span className="text-gray-700 font-medium">Welcome, {user?.name}!</span>
                        <button onClick={handleLogout} className="text-sm text-brand-blue font-semibold hover:underline">Logout</button>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default CrmLayout;