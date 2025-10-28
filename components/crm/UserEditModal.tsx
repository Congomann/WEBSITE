import React, { useState, useEffect } from 'react';
import { User, Role } from '../../types';

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    onSave: (user: User) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState<User>(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'baseCommissionRate' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900";
    const labelStyles = "block text-sm font-medium text-gray-700";

    const availableRoles = Object.values(Role).filter(role => role !== Role.User);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-brand-blue mb-6">Edit User: {user.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className={labelStyles}>Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                        <label htmlFor="email" className={labelStyles}>Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputStyles} />
                    </div>
                    <div>
                        <label htmlFor="role" className={labelStyles}>Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} className={inputStyles}>
                            {availableRoles.map(role => (
                                <option key={role} value={role} className="capitalize">{role}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="baseCommissionRate" className={labelStyles}>Base Commission Rate (%)</label>
                        <input type="number" id="baseCommissionRate" name="baseCommissionRate" value={formData.baseCommissionRate || ''} onChange={handleChange} className={inputStyles} placeholder="e.g., 50" />
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 font-semibold">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEditModal;
