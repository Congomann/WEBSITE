import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { users } from '../../data';
import { Role } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';

const UserManagementPage: React.FC = () => {
    const { user } = useAuth();
    
    // In a real app, this would be a fetch to a users API
    const allUsers = users.filter(u => u.role !== Role.User);

    if (user?.role !== Role.Admin) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }
    
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
    ];

    const actions = [
        { label: 'Edit', onClick: (user: any) => alert(`Editing ${user.name}`) },
        { label: 'Delete', onClick: (user: any) => alert(`Deleting ${user.name}`) }
    ];

    return (
        <div className="animate-fade-in">
            <SEO title="User Management" description="Manage CRM user accounts." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">User Management</h1>
             <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={allUsers} actions={actions} />
            </div>
        </div>
    );
};

export default UserManagementPage;
