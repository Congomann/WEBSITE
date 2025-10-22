import React, { useMemo } from 'react';
import { useCrm } from '../../contexts/CrmContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import { Role } from '../../types';
import SEO from '../../components/SEO';
import DataTable from '../../components/crm/DataTable';

const LeadsPage: React.FC = () => {
    const { user } = useAuth();
    const { leads, assignLead } = useCrm();
    const { advisors } = useAdvisors();

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

    const handleAssign = (leadId: number) => {
        const advisorIdStr = prompt("Enter Advisor ID to assign this lead:");
        const advisorId = parseInt(advisorIdStr || '', 10);
        
        if (advisorId && advisors.some(a => a.id === advisorId)) {
            assignLead(leadId, advisorId);
            alert(`Lead ${leadId} assigned to advisor ${advisorId}.`);
        } else if (advisorIdStr) {
            alert("Invalid or non-existent Advisor ID.");
        }
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
        assignedTo: lead.assignedTo ? advisorMap.get(lead.assignedTo) || 'Unknown' : 'Unassigned',
    }));

    const actions = (user?.role === Role.Admin || user?.role === Role.SubAdmin) ? [
        { label: 'Assign', onClick: (lead: any) => handleAssign(lead.id) }
    ] : [];

    return (
        <div className="animate-fade-in">
            <SEO title="Leads Management" description="Manage and assign leads." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">Leads Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <DataTable columns={columns} data={dataWithAdvisorNames} actions={actions} />
            </div>
        </div>
    );
};

export default LeadsPage;
