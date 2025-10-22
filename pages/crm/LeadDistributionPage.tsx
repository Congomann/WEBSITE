import React, { useMemo, useState } from 'react';
import { useCrm } from '../../contexts/CrmContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { Lead } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';
import LeadFormModal from '../../components/crm/LeadFormModal';

const LeadDistributionPage: React.FC = () => {
    const { leads, addLead, updateLead, assignLead } = useCrm();
    const { advisors } = useAdvisors();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);

    const advisorMap = useMemo(() => new Map(advisors.map(a => [a.id, a.name])), [advisors]);

    const handleOpenCreateModal = () => {
        setEditingLead(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (lead: Lead) => {
        setEditingLead(lead);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLead(null);
    };

    const handleSaveLead = (leadData: Lead) => {
        if (editingLead) {
            updateLead({ ...editingLead, ...leadData });
        } else {
            // The form returns partial data, needs to be cast to the correct type for addLead
            const newLeadData = {
                name: leadData.name || '',
                email: leadData.email || '',
                phone: leadData.phone || '',
                assignedTo: leadData.assignedTo ? Number(leadData.assignedTo) : null,
                ...leadData
            };
            addLead(newLeadData);
        }
        handleCloseModal();
    };
    
    const handleAssign = (leadId: number) => {
        const advisorIdStr = prompt("Enter Advisor ID to assign this lead:");
        const advisorId = parseInt(advisorIdStr || '', 10);
        
        if (advisorId && advisors.some(a => a.id === advisorId)) {
            assignLead(leadId, advisorId);
            alert(`Lead assigned successfully.`);
        } else if (advisorIdStr) {
            alert("Invalid or non-existent Advisor ID.");
        }
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Status', accessor: 'status' },
        { header: 'Assigned To', accessor: 'assignedTo' },
        { header: 'Decline Reason', accessor: 'declineReason' },
        { header: 'Source', accessor: 'source' },
        { header: 'Date', accessor: 'createdAt', isDate: true }
    ];

    const dataWithFormattedFields = leads.map(lead => ({
        ...lead,
        assignedTo: lead.assignedTo ? advisorMap.get(lead.assignedTo) || `ID: ${lead.assignedTo}` : 'Unassigned',
        declineReason: lead.declineReason || 'N/A',
    }));

    const actions = [
        { label: 'Edit', onClick: (lead: Lead) => handleOpenEditModal(lead) },
        { label: 'Assign', onClick: (lead: Lead) => handleAssign(lead.id) }
    ];

    return (
        <div className="animate-fade-in">
            <SEO title="Lead Distribution" description="Create and distribute new leads to advisors." noIndex={true} />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-brand-blue">Lead Distribution</h1>
                <button
                    onClick={handleOpenCreateModal}
                    className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors"
                >
                    Create New Lead
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={dataWithFormattedFields} actions={actions} />
            </div>

            {isModalOpen && (
                <LeadFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveLead}
                    lead={editingLead}
                />
            )}
        </div>
    );
};

export default LeadDistributionPage;