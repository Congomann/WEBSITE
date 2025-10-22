import React, { useMemo } from 'react';
import { useCrm } from '../../../contexts/CrmContext';
import { useAdvisors } from '../../../contexts/AdvisorContext';
import DataTable from '../DataTable';

const SubAdminDashboard: React.FC = () => {
    const { leads, assignLead } = useCrm();
    const { advisors } = useAdvisors();

    const unassignedLeads = useMemo(() => leads.filter(lead => lead.assignedTo === null), [leads]);

    const handleAssign = (leadId: number) => {
        const advisorId = prompt("Enter Advisor ID to assign this lead:");
        if (advisorId && !isNaN(parseInt(advisorId)) && advisors.some(a => a.id === parseInt(advisorId))) {
            assignLead(leadId, parseInt(advisorId));
        } else if (advisorId) {
            alert("Invalid Advisor ID. Please check the ID and try again.");
        }
    };
    
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Source', accessor: 'source' },
        { header: 'Date', accessor: 'createdAt', isDate: true },
        { header: 'Status', accessor: 'status' }
    ];

    const actions = [
        { label: 'Assign', onClick: (lead: any) => handleAssign(lead.id) }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-brand-blue mb-4">Unassigned Leads ({unassignedLeads.length})</h3>
                <DataTable columns={columns} data={unassignedLeads} actions={actions} />
            </div>
        </div>
    );
};

export default SubAdminDashboard;
