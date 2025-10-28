

import React, { useState, useEffect, useMemo } from 'react';
import { Commission } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types';

interface CommissionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    commission: Commission;
    onSave: (commission: Commission) => void;
}

const CommissionDetailModal: React.FC<CommissionDetailModalProps> = ({ isOpen, onClose, commission, onSave }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState<Commission>(commission);

    const canEditRate = useMemo(() => {
        return user?.role === Role.Admin || user?.role === Role.Manager;
    }, [user]);

    useEffect(() => {
        setFormData(commission);
    }, [commission]);

    useEffect(() => {
        const premium = Number(formData.premium) || 0;
        const rate = Number(formData.commissionRate) || 0;
        const newAmount = (premium * rate) / 100;
        setFormData(prev => ({ ...prev, commissionAmount: newAmount }));
    }, [formData.premium, formData.commissionRate]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isNumberField = ['premium', 'commissionRate'].includes(name);
        setFormData(prev => ({ ...prev, [name]: isNumberField ? parseFloat(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500";
    const labelStyles = "block text-sm font-medium text-gray-700";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-brand-blue mb-6">Commission Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={labelStyles}>Date</label><input type="text" value={new Date(formData.date).toLocaleDateString()} readOnly disabled className={inputStyles} /></div>
                        <div><label className={labelStyles}>Client</label><input type="text" value={formData.clientName} readOnly disabled className={inputStyles} /></div>
                        <div>
                            <label htmlFor="policyType" className={labelStyles}>Policy Type</label>
                            <select id="policyType" name="policyType" value={formData.policyType} onChange={handleChange} className={inputStyles}>
                                <option>Life</option><option>Auto</option><option>Home</option><option>Health</option>
                            </select>
                        </div>
                        <div><label htmlFor="carrier" className={labelStyles}>Carrier</label><input type="text" id="carrier" name="carrier" value={formData.carrier} onChange={handleChange} className={inputStyles} /></div>
                        <div className="md:col-span-2"><label htmlFor="policyNumber" className={labelStyles}>Policy Number</label><input type="text" id="policyNumber" name="policyNumber" value={formData.policyNumber} onChange={handleChange} className={inputStyles} /></div>
                        <div><label htmlFor="premium" className={labelStyles}>Premium ($)</label><input type="number" id="premium" name="premium" value={formData.premium} onChange={handleChange} className={inputStyles} step="0.01" /></div>
                        <div>
                            <label htmlFor="commissionRate" className={labelStyles}>Commission Rate (%)</label>
                            <div className="relative">
                                <input type="number" id="commissionRate" name="commissionRate" value={formData.commissionRate} onChange={handleChange} className={`${inputStyles} pr-8`} step="0.1" disabled={!canEditRate} />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">%</span>
                            </div>
                        </div>
                        <div><label className={labelStyles}>Commission Amount ($)</label><input type="text" value={formData.commissionAmount.toFixed(2)} readOnly disabled className={inputStyles} /></div>
                        <div>
                            <label htmlFor="status" className={labelStyles}>Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange} className={inputStyles}>
                                <option>Pending</option><option>Paid</option>
                            </select>
                        </div>
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

export default CommissionDetailModal;
