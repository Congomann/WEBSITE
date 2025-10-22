import React from 'react';
import { Outlet } from 'react-router-dom';
import CrmSidebar from '../../components/crm/CrmSidebar';

const CrmLayout: React.FC = () => {
    return (
        <div className="flex min-h-[calc(100vh-150px)] bg-gray-100">
            <CrmSidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default CrmLayout;
