import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { Lead, Client, PerformanceData } from '../types';
import { crmLeads, crmClients, crmPerformance } from '../crmData';

interface CrmContextType {
    leads: Lead[];
    clients: Client[];
    performanceData: PerformanceData[];
    assignLead: (leadId: number, advisorId: number) => void;
    updateLeadStatus: (leadId: number, status: Lead['status']) => void;
}

const CrmContext = createContext<CrmContextType | undefined>(undefined);

export const useCrm = () => {
    const context = useContext(CrmContext);
    if (!context) {
        throw new Error('useCrm must be used within a CrmProvider');
    }
    return context;
};

interface CrmProviderProps {
    children: ReactNode;
}

export const CrmProvider: React.FC<CrmProviderProps> = ({ children }) => {
    const [leads, setLeads] = useState<Lead[]>(() => {
        try {
            const localData = localStorage.getItem('nhf-crm-leads');
            return localData ? JSON.parse(localData) : crmLeads;
        } catch (error) {
            return crmLeads;
        }
    });

    const [clients, setClients] = useState<Client[]>(() => {
        try {
            const localData = localStorage.getItem('nhf-crm-clients');
            return localData ? JSON.parse(localData) : crmClients;
        } catch (error) {
            return crmClients;
        }
    });

    const [performanceData, setPerformanceData] = useState<PerformanceData[]>(() => {
         try {
            const localData = localStorage.getItem('nhf-crm-performance');
            return localData ? JSON.parse(localData) : crmPerformance;
        } catch (error) {
            return crmPerformance;
        }
    });

    useEffect(() => {
        localStorage.setItem('nhf-crm-leads', JSON.stringify(leads));
    }, [leads]);

    useEffect(() => {
        localStorage.setItem('nhf-crm-clients', JSON.stringify(clients));
    }, [clients]);
    
    useEffect(() => {
        localStorage.setItem('nhf-crm-performance', JSON.stringify(performanceData));
    }, [performanceData]);

    const assignLead = useCallback((leadId: number, advisorId: number) => {
        setLeads(prevLeads =>
            prevLeads.map(lead =>
                lead.id === leadId ? { ...lead, assignedTo: advisorId, status: 'Contacted' } : lead
            )
        );
    }, []);

    const updateLeadStatus = useCallback((leadId: number, status: Lead['status']) => {
        setLeads(prevLeads =>
            prevLeads.map(lead =>
                lead.id === leadId ? { ...lead, status: status } : lead
            )
        );
    }, []);

    const value = useMemo(() => ({
        leads,
        clients,
        performanceData,
        assignLead,
        updateLeadStatus,
    }), [leads, clients, performanceData, assignLead, updateLeadStatus]);

    return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
};
