
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';
import { users } from '../../data';
import { Role } from '../../types';

interface NewConversationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectConversation: (conversationId: string) => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({ isOpen, onClose, onSelectConversation }) => {
    const { user } = useAuth();
    const { createConversation } = useCrm();
    const [searchTerm, setSearchTerm] = useState('');

    const availableUsers = useMemo(() => {
        const crmRoles = [Role.Admin, Role.Manager, Role.SubAdmin, Role.Advisor, Role.Underwriter];
        return users.filter(u => u.id !== user?.id && crmRoles.includes(u.role) && u.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [user, searchTerm]);
    
    const handleUserSelect = (participantId: number) => {
        const newConversationId = createConversation(participantId);
        onSelectConversation(newConversationId);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-brand-blue mb-4">New Message</h2>
                <input
                    type="text"
                    placeholder="Search for a user..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md mb-4 bg-white text-gray-900"
                    aria-label="Search for a user to message"
                />
                <div className="max-h-64 overflow-y-auto space-y-2">
                    {availableUsers.length > 0 ? (
                        availableUsers.map(u => (
                            <button
                                key={u.id}
                                onClick={() => handleUserSelect(u.id)}
                                className="w-full text-left p-3 rounded-md hover:bg-gray-100"
                            >
                                <p className="font-semibold">{u.name}</p>
                                <p className="text-sm text-gray-500 capitalize">{u.role}</p>
                            </button>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewConversationModal;