
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CrmSidebar from '../../components/crm/CrmSidebar';
import NotificationBell from '../../components/crm/NotificationBell';
import { useAuth } from '../../contexts/AuthContext';
import CrmNotificationToast from '../../components/crm/CrmNotificationToast';
import SwitchAccountModal from '../../components/crm/SwitchAccountModal';

const SwitchUserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 7H8z" />
        <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 13H12z" />
    </svg>
);


const CrmLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSwitchAccountModalOpen, setIsSwitchAccountModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <CrmSidebar />
            <div className="flex-1 flex flex-col relative">
                <CrmNotificationToast />
                <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b z-10">
                    <div />
                    <div className="flex items-center gap-4">
                        <NotificationBell />
                        <span className="text-gray-700 font-medium">Welcome, {user?.name}!</span>
                        
                        <button 
                            onClick={() => setIsSwitchAccountModalOpen(true)}
                            className="flex items-center gap-1 text-sm text-gray-600 font-semibold hover:text-brand-blue p-2 rounded-md hover:bg-gray-100 transition-colors"
                            title="Switch Account"
                        >
                            <SwitchUserIcon />
                            Switch
                        </button>
                        
                        <button onClick={handleLogout} className="text-sm text-brand-blue font-semibold hover:underline">Logout</button>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
            <SwitchAccountModal 
                isOpen={isSwitchAccountModalOpen} 
                onClose={() => setIsSwitchAccountModalOpen(false)} 
            />
        </div>
    );
};

export default CrmLayout;
