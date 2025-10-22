import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { Lead, Client, PerformanceData, Notification } from '../types';
import { crmLeads, crmClients, crmPerformance } from '../crmData';
import { useAdvisors } from './AdvisorContext';

interface CrmContextType {
    leads: Lead[];
    clients: Client[];
    performanceData: PerformanceData[];
    notifications: Notification[];
    addLead: (leadData: Omit<Lead, 'id' | 'status' | 'source' | 'lastContacted' | 'createdAt'>) => void;
    updateLead: (updatedLead: Lead) => void;
    assignLead: (leadId: number, advisorId: number) => void;
    updateLeadStatus: (leadId: number, status: Lead['status']) => void;
    markNotificationAsRead: (notificationId: number) => void;
    getUnreadNotificationCount: (userId: number) => number;
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
    const { advisors } = useAdvisors();

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

    const [notifications, setNotifications] = useState<Notification[]>(() => {
         try {
            const localData = localStorage.getItem('nhf-crm-notifications');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => { localStorage.setItem('nhf-crm-leads', JSON.stringify(leads)); }, [leads]);
    useEffect(() => { localStorage.setItem('nhf-crm-clients', JSON.stringify(clients)); }, [clients]);
    useEffect(() => { localStorage.setItem('nhf-crm-performance', JSON.stringify(performanceData)); }, [performanceData]);
    useEffect(() => { localStorage.setItem('nhf-crm-notifications', JSON.stringify(notifications)); }, [notifications]);

    const addNotification = useCallback((userId: number, message: string, link?: string) => {
        const newNotification: Notification = {
            id: Date.now(),
            userId,
            message,
            link,
            read: false,
            createdAt: new Date().toISOString(),
        };
        setNotifications(prev => [newNotification, ...prev]);
    }, []);
    
    const addLead = useCallback((leadData: Omit<Lead, 'id' | 'status' | 'source' | 'lastContacted' | 'createdAt'>) => {
        setLeads(prev => {
            const newLead: Lead = {
                ...leadData,
                id: Date.now(),
                status: 'New',
                source: 'Manual Entry',
                lastContacted: '',
                createdAt: new Date().toISOString(),
            };
            if (newLead.assignedTo) {
                const advisor = advisors.find(a => a.id === newLead.assignedTo);
                addNotification(newLead.assignedTo, `You have been assigned a new lead: ${newLead.name}`, '/crm/leads');
            }
            return [newLead, ...prev];
        });
    }, [advisors, addNotification]);

    const updateLead = useCallback((updatedLead: Lead) => {
        setLeads(prev => prev.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    }, []);

    const assignLead = useCallback((leadId: number, advisorId: number) => {
        setLeads(prevLeads => {
            const leadToAssign = prevLeads.find(l => l.id === leadId);
            if (leadToAssign) {
                const advisor = advisors.find(a => a.id === advisorId);
                addNotification(advisorId, `Lead "${leadToAssign.name}" has been assigned to you.`, '/crm/leads');
            }
            return prevLeads.map(lead => lead.id === leadId ? { ...lead, assignedTo: advisorId, status: lead.status === 'New' ? 'Contacted' : lead.status } : lead);
        });
    }, [addNotification, advisors]);

    const updateLeadStatus = useCallback((leadId: number, status: Lead['status']) => {
        const leadToUpdate = leads.find(l => l.id === leadId);
        if (!leadToUpdate) return;
        
        if (status === 'Approved') {
            // Convert lead to client
            const newClient: Client = {
                id: Date.now(),
                name: leadToUpdate.name,
                email: leadToUpdate.email,
                phone: leadToUpdate.phone,
                advisorId: leadToUpdate.assignedTo!,
                policies: [],
                since: new Date().toISOString().split('T')[0],
            };
            setClients(prev => [newClient, ...prev]);
            setLeads(prev => prev.filter(l => l.id !== leadId)); // Remove from leads
            if (leadToUpdate.assignedTo) {
                addNotification(leadToUpdate.assignedTo, `Lead ${leadToUpdate.name} approved and converted to a client!`, '/crm/clients');
            }
        } else {
            setLeads(prevLeads => prevLeads.map(lead => lead.id === leadId ? { ...lead, status: status } : lead));
        }
    }, [leads, addNotification]);

    const markNotificationAsRead = useCallback((notificationId: number) => {
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    }, []);

    const getUnreadNotificationCount = useCallback((userId: number) => {
        return notifications.filter(n => n.userId === userId && !n.read).length;
    }, [notifications]);


    const value = useMemo(() => ({
        leads,
        clients,
        performanceData,
        notifications,
        addLead,
        updateLead,
        assignLead,
        updateLeadStatus,
        markNotificationAsRead,
        getUnreadNotificationCount,
    }), [leads, clients, performanceData, notifications, addLead, updateLead, assignLead, updateLeadStatus, markNotificationAsRead, getUnreadNotificationCount]);

    return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
};