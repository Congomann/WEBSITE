
import React, { useMemo, useState } from 'react';
import { useCrm } from '../../contexts/CrmContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { Role, Lead, LeadStatus, Policy } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';
import LeadFormModal from '../../components/crm/LeadFormModal';

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Approved', 'Declined', 'Closed - Won', 'Closed - Lost'];

const PriorityBadge: React.FC<{ priority?: 'High' | 'Medium' | 'Low' }> = ({ priority }) => {
    if (!priority) return null;

    const colors = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-green-100 text-green-800',
    };

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[priority]}`}>
            {priority}
        </span>
    );
};

const LeadsPage: React.FC = () => {
    const { user } = useAuth();
    const { leads, updateLead, updateLeadStatus } = useCrm();
    const { advisors } = useAdvisors();
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [newStatus, setNewStatus] = useState<LeadStatus>('New');
    const [declineReason, setDeclineReason] = useState('');
    const [policyInfo, setPolicyInfo] = useState({
        policyType: 'Life' as Policy['type'],
        carrier: '',
        policyNumber: '',
        premium: 0,
        commissionRate: 0,
    });
    const [policyFormErrors, setPolicyFormErrors] = useState({
        carrier: '', policyNumber: '', premium: ''
    });

    const leadsToDisplay = useMemo(() => {
        if (!user) return [];
        if (user.role === Role.Admin || user.role === Role.SubAdmin) {
            return leads;
        }
        if (user.role === Role.Advisor) {
            return leads.filter(lead => lead.assignedTo === user.id);
        }
        return [];
    }, [leads, user]);
    
    const advisorMap = useMemo(() => new Map(advisors.map(a => [a.id, a.name])), [advisors]);
    
    const handleOpenEditModal = (lead: Lead) => {
        setSelectedLead(lead);
        setIsEditModalOpen(true);
    };

    const handleOpenStatusModal = (lead: Lead) => {
        setSelectedLead(lead);
        setNewStatus(lead.status);
        setPolicyInfo(prev => ({ ...prev, commissionRate: user?.baseCommissionRate || 0 }));
        setIsStatusModalOpen(true);
    };
    
    const handleCloseModals = () => {
        setIsEditModalOpen(false);
        setIsStatusModalOpen(false);
        setSelectedLead(null);
        setDeclineReason('');
        setPolicyInfo({ policyType: 'Life', carrier: '', policyNumber: '', premium: 0, commissionRate: 0 });
        setPolicyFormErrors({ carrier: '', policyNumber: '', premium: '' });
    };

    const handleSaveLead = (editedLead: Lead) => {
        updateLead(editedLead);
        handleCloseModals();
    };

    const handlePolicyInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPolicyInfo(prev => ({...prev, [name]: name === 'premium' || name === 'commissionRate' ? Number(value) : value }));
    };

    const validatePolicyForm = () => {
        const errors = { carrier: '', policyNumber: '', premium: '' };
        let isValid = true;
        if (!policyInfo.carrier.trim()) { errors.carrier = 'Carrier is required.'; isValid = false; }
        if (!policyInfo.policyNumber.trim()) { errors.policyNumber = 'Policy number is required.'; isValid = false; }
        if (policyInfo.premium <= 0) { errors.premium = 'Premium must be a positive number.'; isValid = false; }
        setPolicyFormErrors(errors);
        return isValid;
    };

    const handleStatusUpdate = () => {
        if (selectedLead) {
            if (newStatus === 'Approved') {
                if (validatePolicyForm()) {
                    updateLeadStatus(selectedLead.id, 'Approved', policyInfo);
                    handleCloseModals();
                }
                return;
            }

            if (newStatus === 'Declined' && !declineReason.trim()) {
                alert('A reason is required to decline a lead.');
                return;
            }
            updateLeadStatus(selectedLead.id, newStatus, declineReason);
        }
        handleCloseModals();
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Status', accessor: 'status' },
        { header: 'Priority', accessor: 'priority' },
        { header: 'Assigned To', accessor: 'assignedTo' },
        { header: 'Source', accessor: 'source' },
        { header: 'Last Contacted', accessor: 'lastContacted', isDate: true }
    ];

    const dataWithAdvisorNames = leadsToDisplay.map(lead => ({
        ...lead,
        assignedTo: lead.assignedTo ? advisorMap.get(lead.assignedTo) || `ID: ${lead.assignedTo}` : 'Unassigned',
        lastContacted: lead.lastContacted || 'N/A',
        priority: <PriorityBadge priority={lead.priority} />,
    }));

    const actions = [
        { label: 'Edit', onClick: (lead: Lead) => handleOpenEditModal(lead) },
        { label: 'Update Status', onClick: (lead: Lead) => handleOpenStatusModal(lead) }
    ];
    
    const formInputStyles = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md bg-white text-gray-900";


    return (
        <div className="animate-fade-in">
            <SEO title="My Leads" description="Manage and track your assigned leads." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">My Leads</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={dataWithAdvisorNames} actions={actions} />
            </div>
            
            {isEditModalOpen && selectedLead && (
                <LeadFormModal
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModals}
                    onSave={handleSaveLead}
                    lead={selectedLead}
                />
            )}

            {isStatusModalOpen && selectedLead && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Update Status for {selectedLead.name}</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                <select id="status" value={newStatus} onChange={(e) => setNewStatus(e.target.value as LeadStatus)} className={formInputStyles}>
                                    {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                                </select>
                            </div>
                            {newStatus === 'Declined' && (
                                <div className="animate-fade-in">
                                    <label htmlFor="declineReason" className="block text-sm font-medium text-gray-700">
                                        Reason for Declining (Required)
                                    </label>
                                    <textarea
                                        id="declineReason"
                                        rows={3}
                                        value={declineReason}
                                        onChange={(e) => setDeclineReason(e.target.value)}
                                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue bg-white text-gray-900"
                                        placeholder="e.g., Client is no longer interested, wrong contact info, etc."
                                    />
                                </div>
                            )}
                             {newStatus === 'Approved' && (
                                <div className="animate-fade-in mt-4 pt-4 border-t space-y-3">
                                    <h3 className="text-lg font-semibold text-brand-blue">New Policy Details</h3>
                                    <div><label className="block text-sm font-medium text-gray-700">Policy Type</label><select name="policyType" value={policyInfo.policyType} onChange={handlePolicyInfoChange} className={formInputStyles}><option>Life</option><option>Auto</option><option>Home</option><option>Health</option></select></div>
                                    <div><label className="block text-sm font-medium text-gray-700">Carrier</label><input type="text" name="carrier" value={policyInfo.carrier} onChange={handlePolicyInfoChange} className={`${formInputStyles} ${policyFormErrors.carrier ? 'border-red-500' : ''}`} />{policyFormErrors.carrier && <p className="text-xs text-red-500 mt-1">{policyFormErrors.carrier}</p>}</div>
                                    <div><label className="block text-sm font-medium text-gray-700">Policy Number</label><input type="text" name="policyNumber" value={policyInfo.policyNumber} onChange={handlePolicyInfoChange} className={`${formInputStyles} ${policyFormErrors.policyNumber ? 'border-red-500' : ''}`} />{policyFormErrors.policyNumber && <p className="text-xs text-red-500 mt-1">{policyFormErrors.policyNumber}</p>}</div>
                                    <div><label className="block text-sm font-medium text-gray-700">Total Premium ($)</label><input type="number" name="premium" value={policyInfo.premium} onChange={handlePolicyInfoChange} className={`${formInputStyles} ${policyFormErrors.premium ? 'border-red-500' : ''}`} />{policyFormErrors.premium && <p className="text-xs text-red-500 mt-1">{policyFormErrors.premium}</p>}</div>
                                    <div><label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label><input type="number" name="commissionRate" value={policyInfo.commissionRate} onChange={handlePolicyInfoChange} className={formInputStyles} /></div>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button onClick={handleCloseModals} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                            <button 
                                onClick={handleStatusUpdate} 
                                className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 disabled:bg-gray-400"
                                disabled={(newStatus === 'Declined' && !declineReason.trim())}
                            >
                                {newStatus === 'Approved' ? 'Approve & Convert' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LeadsPage;