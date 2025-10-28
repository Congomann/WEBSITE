import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';
import { Role, User } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';
import UserEditModal from '../../components/crm/UserEditModal';

const UserManagementPage: React.FC = () => {
    const { user } = useAuth();
    const { users, updateUser, deleteUser } = useCrm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    if (user?.role !== Role.Admin) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (userId: number) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            deleteUser(userId);
        }
    };

    const handleSave = (updatedUser: User) => {
        updateUser(updatedUser);
        setIsModalOpen(false);
        setEditingUser(null);
    };
    
    const allUsers = users.filter(u => u.role !== Role.User);
    
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Role', accessor: 'role' },
        { header: 'Commission Rate', accessor: 'baseCommissionRate' },
    ];

    const formattedData = allUsers.map(u => ({
        ...u,
        baseCommissionRate: u.baseCommissionRate ? `${u.baseCommissionRate}%` : 'N/A',
    }));

    const actions = [
        { label: 'Edit', onClick: (user: User) => handleEdit(user) },
        { label: 'Delete', onClick: (user: User) => handleDelete(user.id) }
    ];

    return (
        <div className="animate-fade-in">
            <SEO title="User Management" description="Manage CRM user accounts." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">User Management</h1>
             <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={formattedData} actions={actions} />
            </div>

            {isModalOpen && editingUser && (
                <UserEditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={editingUser}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default UserManagementPage;