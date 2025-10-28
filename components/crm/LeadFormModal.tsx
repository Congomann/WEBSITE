
import React, { useState, useEffect } from 'react';
import type { Lead } from '../../types';
import { Role } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { trustedCarrierNames, productTypes } from '../../data';

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (lead: Lead) => void;
    lead?: Lead | null;
}

const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose, onSave, lead }) => {
    const { advisors } = useAdvisors();
    const { user } = useAuth();
    const [formData, setFormData] = useState<Partial<Lead>>({});
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summaryError, setSummaryError] = useState('');

    useEffect(() => {
        setFormData(lead || { priority: 'Medium' });
        setSummary('');
        setSummaryError('');
    }, [lead]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setFormData(prev => ({ ...prev, [name]: isNumber ? (value === '' ? undefined : Number(value)) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Lead);
    };

    const handleGenerateSummary = async () => {
        setIsSummarizing(true);
        setSummaryError('');
        setSummary('');
        try {
            const response = await fetch('/api/summarize-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate summary.');
            }
            const data = await response.json();
            setSummary(data.summary);
        } catch (error: any) {
            setSummaryError(error.message);
        } finally {
            setIsSummarizing(false);
        }
    };
    
    const inputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-brand-blue mb-6">{lead ? 'Edit Lead' : 'Create New Lead'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Basic Info */}
                        <div><label className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className={inputStyles} required /></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Priority</label>
                            <select name="priority" value={formData.priority || 'Medium'} onChange={handleChange} className={inputStyles}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700">Phone</label><input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className={inputStyles} required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputStyles} required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">SSN</label><input type="password" name="ssn" placeholder="***-**-****" value={formData.ssn || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">State of Birth</label><input type="text" name="bornState" value={formData.bornState || ''} onChange={handleChange} className={inputStyles} /></div>
                        
                        {/* Address */}
                        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Home Address</label><input type="text" name="address" value={formData.address || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">City</label><input type="text" name="city" value={formData.city || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">State</label><input type="text" name="state" value={formData.state || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Zip Code</label><input type="text" name="zipcode" value={formData.zipcode || ''} onChange={handleChange} className={inputStyles} /></div>

                        {/* Insurance Info */}
                        <div className="md:col-span-2 mt-4 pt-4 border-t">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Insurance Details</h3>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Type of Product</label>
                            <input
                                list="product-types"
                                name="productType"
                                value={formData.productType || ''}
                                onChange={handleChange}
                                className={inputStyles}
                                placeholder="Start typing to select..."
                            />
                            <datalist id="product-types">
                                {productTypes.map(type => (
                                    <option key={type} value={type} />
                                ))}
                            </datalist>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Preferred Life Insurance Carrier</label>
                            <select name="preferredCarrier" value={formData.preferredCarrier || ''} onChange={handleChange} className={inputStyles}>
                                <option value="" disabled>Select a carrier...</option>
                                {trustedCarrierNames.map(carrier => (
                                    <option key={carrier} value={carrier}>{carrier}</option>
                                ))}
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700">Coverage Amount ($)</label><input type="number" name="coverageAmount" value={formData.coverageAmount || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Weight (lbs)</label><input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Height (inches)</label><input type="number" name="height" value={formData.height || ''} onChange={handleChange} className={inputStyles} /></div>
                        
                        {/* Banking Info */}
                        <div className="md:col-span-2 mt-4 pt-4 border-t">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Banking Information</h3>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700">Name of the Bank</label><input type="text" name="bankName" value={formData.bankName || ''} onChange={handleChange} className={inputStyles} /></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Account Type</label>
                            <select name="accountType" value={formData.accountType || ''} onChange={handleChange} className={inputStyles}>
                                <option value="" disabled>Select type</option>
                                <option value="checking">Checking</option>
                                <option value="saving">Saving</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700">Routing Number</label><input type="text" name="routingNumber" value={formData.routingNumber || ''} onChange={handleChange} className={inputStyles} inputMode="numeric" /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Account Number</label><input type="text" name="accountNumber" value={formData.accountNumber || ''} onChange={handleChange} className={inputStyles} inputMode="numeric" /></div>

                        {/* Assignment */}
                        {user?.role === Role.SubAdmin && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Assign to Advisor</label>
                                <select name="assignedTo" value={formData.assignedTo || ''} onChange={handleChange} className={inputStyles}>
                                    <option value="">Assign later</option>
                                    {advisors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                        )}
                         {/* AI Summary Section */}
                        {(user?.role === Role.SubAdmin || user?.role === Role.Advisor) && (
                            <div className="md:col-span-2 mt-4 pt-4 border-t">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">AI Summary</h3>
                                    <button
                                        type="button"
                                        onClick={handleGenerateSummary}
                                        disabled={isSummarizing}
                                        className="bg-brand-gold text-brand-blue font-semibold py-1 px-3 rounded-md hover:bg-yellow-400 text-sm disabled:bg-gray-400"
                                    >
                                        {isSummarizing ? 'Generating...' : 'Generate'}
                                    </button>
                                </div>
                                {isSummarizing && <p className="text-sm text-gray-500 mt-2">Generating summary, please wait...</p>}
                                {summaryError && <p className="text-sm text-red-600 mt-2">{summaryError}</p>}
                                {summary && (
                                    <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{summary}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90">Save Lead</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadFormModal;