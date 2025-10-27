
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { users } from '../../data';
import { Role } from '../../types';

interface SwitchAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SwitchAccountModal: React.FC<SwitchAccountModalProps> = ({ isOpen, onClose }) => {
    const { switchRole, user: currentUser } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }

    const crmUsers = users.filter(u => 
        [Role.Admin, Role.Manager, Role.SubAdmin, Role.Advisor, Role.Underwriter].includes(u.role)
    );

    const handleSwitch = (role: Role) => {
        switchRole(role, navigate);
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
            style={{ animationDuration: '300ms' }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="switch-account-title"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full relative transform animate-fade-in-up"
                style={{ animationDuration: '400ms' }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="switch-account-title" className="text-2xl font-bold text-brand-blue text-center mb-6">
                    Switch Account
                </h2>

                <div className="space-y-3">
                    {crmUsers.map(user => (
                        <button
                            key={user.id}
                            onClick={() => handleSwitch(user.role)}
                            disabled={user.id === currentUser?.id}
                            className="w-full flex items-center justify-between text-left p-3 border border-gray-300 rounded-lg hover:bg-brand-light hover:border-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue transition-colors duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <div>
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                            </div>
                            {user.id === currentUser?.id && (
                                <span className="text-sm font-bold text-green-600">Current</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SwitchAccountModal;
