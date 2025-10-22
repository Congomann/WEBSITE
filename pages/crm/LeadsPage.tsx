import React, { useMemo, useState } from 'react';
import { useCrm } from '../../contexts/CrmContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { Role, Lead, LeadStatus } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';
import LeadFormModal from '../../components/crm/LeadFormModal';

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Approved', 'Closed - Won', 'Closed - Lost'];

const LeadsPage: React.FC = () => {
    const { user } = useAuth();
    const { leads, updateLead, updateLeadStatus } = useCrm();
    const { advisors } = useAdvisors();
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [newStatus, setNewStatus] = useState<LeadStatus>('New');

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
        setIsStatusModalOpen(true);
    };
    
    const handleCloseModals = () => {
        setIsEditModalOpen(false);
        setIsStatusModalOpen(false);
        setSelectedLead(null);
    };

    const handleSaveLead = (editedLead: Lead) => {
        updateLead(editedLead);
        handleCloseModals();
    };

    const handleStatusUpdate = () => {
        if (selectedLead) {
            updateLeadStatus(selectedLead.id, newStatus);
        }
        handleCloseModals();
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Status', accessor: 'status' },
        { header: 'Assigned To', accessor: 'assignedTo' },
        { header: 'Source', accessor: 'source' },
        { header: 'Last Contacted', accessor: 'lastContacted', isDate: true }
    ];

    const dataWithAdvisorNames = leadsToDisplay.map(lead => ({
        ...lead,
        assignedTo: lead.assignedTo ? advisorMap.get(lead.assignedTo) || `ID: ${lead.assignedTo}` : 'Unassigned',
        lastContacted: lead.lastContacted || 'N/A',
    }));

    const actions = [
        { label: 'Edit', onClick: (lead: Lead) => handleOpenEditModal(lead) },
        { label: 'Update Status', onClick: (lead: Lead) => handleOpenStatusModal(lead) }
    ];

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
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4">Update Status for {selectedLead.name}</h2>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value as LeadStatus)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md"
                            >
                                {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                            </select>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button onClick={handleCloseModals} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                            <button onClick={handleStatusUpdate} className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90">Save</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LeadsPage;