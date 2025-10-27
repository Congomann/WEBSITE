import React, { useState, useEffect } from 'react';
import { Client } from '../../types';

interface ClientDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    client: Client;
    onSave: (client: Client) => void;
}

const ClientDetailModal: React.FC<ClientDetailModalProps> = ({ isOpen, onClose, client, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Client>>({});

    useEffect(() => {
        if (client) {
            setFormData(client);
        }
    }, [client]);

    useEffect(() => {
        if (!isOpen) {
            setIsEditing(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData as Client);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(client);
        setIsEditing(false);
    };

    const inputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900";
    const infoRowStyles = "py-2 sm:grid sm:grid-cols-3 sm:gap-4";
    const infoLabelStyles = "text-sm font-medium text-gray-500";
    const infoValueStyles = "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-brand-blue mb-4">Client Information</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200" aria-label="Close">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {isEditing ? (
                    <div className="space-y-4">
                        <div><label className={infoLabelStyles}>Full Name</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className={infoLabelStyles}>Email</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className={infoLabelStyles}>Phone</label><input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className={inputStyles} /></div>
                    </div>
                ) : (
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className={infoRowStyles}><dt className={infoLabelStyles}>Full Name</dt><dd className={infoValueStyles}>{client.name}</dd></div>
                            <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Email</dt><dd className={infoValueStyles}>{client.email}</dd></div>
                            <div className={infoRowStyles}><dt className={infoLabelStyles}>Phone</dt><dd className={infoValueStyles}>{client.phone}</dd></div>
                            <div className={`${infoRowStyles} bg-gray-50`}><dt className={infoLabelStyles}>Client Since</dt><dd className={infoValueStyles}>{new Date(client.since).toLocaleDateString()}</dd></div>
                        </dl>
                    </div>
                )}
                
                <h3 className="text-xl font-bold text-brand-blue mt-6 mb-4 border-t pt-4">Policies</h3>
                {client.policies.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium">Policy ID</th>
                                    <th className="px-4 py-2 text-left font-medium">Type</th>
                                    <th className="px-4 py-2 text-left font-medium">Status</th>
                                    <th className="px-4 py-2 text-right font-medium">Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {client.policies.map(policy => (
                                    <tr key={policy.id}>
                                        <td className="px-4 py-2 whitespace-nowrap">{policy.id}</td>
                                        <td className="px-4 py-2">{policy.type}</td>
                                        <td className="px-4 py-2"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{policy.status}</span></td>
                                        <td className="px-4 py-2 text-right">${policy.premium.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No policies found for this client.</p>
                )}

                <div className="mt-6 flex justify-end gap-4">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90">Save Changes</button>
                        </>
                    ) : (
                        <>
                            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Close</button>
                            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90">Edit Client</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientDetailModal;