

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { Lead, Client, PerformanceData, Notification, AdvisorRequest, Commission, AgentApplication, ApplicationStatus, Conversation, ChatMessage, CrmNotificationToastData, CalendarEvent, EventType } from '../types';
import { crmLeads, crmClients, crmPerformance, crmAdvisorRequests, crmCommissions, crmConversations, crmMessages, crmEvents as initialCrmEvents, crmEventTypes } from '../crmData';
import { useAdvisors } from './AdvisorContext';
import { users } from '../data';
import { Role, User } from '../types';
import { useAuth } from './AuthContext';

interface CrmContextType {
    leads: Lead[];
    clients: Client[];
    performanceData: PerformanceData[];
    notifications: Notification[];
    requests: AdvisorRequest[];
    commissions: Commission[];
    applications: AgentApplication[];
    conversations: Conversation[];
    messages: ChatMessage[];
    events: CalendarEvent[];
    eventTypes: EventType[];
    toastNotification: CrmNotificationToastData | null;
    addLead: (leadData: Omit<Lead, 'id' | 'status' | 'source' | 'lastContacted' | 'createdAt'>) => void;
    updateLead: (updatedLead: Lead) => void;
    updateClient: (updatedClient: Client) => void;
    assignLead: (leadId: number, advisorId: number) => void;
    updateLeadStatus: (leadId: number, status: Lead['status'], declineReason?: string) => void;
    markNotificationAsRead: (notificationId: number) => void;
    getUnreadNotificationCount: (userId: number) => number;
    addRequest: (requestData: Omit<AdvisorRequest, 'id' | 'createdAt' | 'status'>) => void;
    updateRequestStatus: (requestId: string, status: AdvisorRequest['status']) => void;
    addApplication: (applicationData: Omit<AgentApplication, 'id' | 'status' | 'submittedAt'>) => void;
    updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;
    sendMessage: (conversationId: string, senderId: number, text: string) => void;
    dismissToastNotification: () => void;
    setActiveConversationId: (id: string | null) => void;
    markConversationAsRead: (conversationId: string) => void;
    createConversation: (participantId: number) => string;
    addEvent: (eventData: Omit<CalendarEvent, 'id'>) => void;
    updateEvent: (updatedEvent: CalendarEvent) => void;
    deleteEvent: (eventId: string) => void;
    addEventType: (eventType: EventType) => void;
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

// Dynamically adjust demo event dates to the current month for better visibility
const getDynamicInitialEvents = (): CalendarEvent[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    
    // Add a past event for demonstration
    const lastMonthDate = new Date(today);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastMonthYear = lastMonthDate.getFullYear();
    const lastMonth = (lastMonthDate.getMonth() + 1).toString().padStart(2, '0');

    return [
        {
            id: 'evt-past-1',
            title: 'Performance Review',
            description: 'Reviewed Q2 performance with the management team.',
            startDate: `${lastMonthYear}-${lastMonth}-15`,
            isPublic: false,
            creatorId: 1, // Admin
            type: 'Team Meeting',
            color: '#8b5cf6',
        },
        {
            id: 'evt-1',
            title: 'Jessica - Days Off',
            description: 'Annual vacation.',
            startDate: `${year}-${month}-05`,
            endDate: `${year}-${month}-07`,
            isPublic: true,
            creatorId: 2,
            type: 'Days Off',
            color: '#ef4444',
        },
        {
            id: 'evt-2',
            title: 'Quarterly Review - Google Meet',
            description: 'Team-wide quarterly performance review and planning session.',
            startDate: `${year}-${month}-08`,
            isPublic: true,
            creatorId: 1,
            type: 'Google Meet',
            color: '#22c55e',
        },
        {
            id: 'evt-3',
            title: 'Call Brian Carter at 4pm',
            description: 'Discuss the new commercial lead from the website.',
            startDate: `${year}-${month}-08`,
            isPublic: false,
            creatorId: 1,
            type: 'Personal Reminder',
            color: '#6b7280',
        },
    ];
};

export const CrmProvider: React.FC<CrmProviderProps> = ({ children }) => {
    const { advisors } = useAdvisors();
    const { user } = useAuth();

    const [leads, setLeads] = useState<Lead[]>(() => {
        try { const localData = localStorage.getItem('nhf-crm-leads'); return localData ? JSON.parse(localData) : crmLeads; } catch (error) { return crmLeads; }
    });

    const [clients, setClients] = useState<Client[]>(() => {
        try { const localData = localStorage.getItem('nhf-crm-clients'); return localData ? JSON.parse(localData) : crmClients; } catch (error) { return crmClients; }
    });

    const [performanceData, setPerformanceData] = useState<PerformanceData[]>(() => {
         try { const localData = localStorage.getItem('nhf-crm-performance'); return localData ? JSON.parse(localData) : crmPerformance; } catch (error) { return crmPerformance; }
    });

    const [notifications, setNotifications] = useState<Notification[]>(() => {
         try { const localData = localStorage.getItem('nhf-crm-notifications'); return localData ? JSON.parse(localData) : []; } catch (error) { return []; }
    });

    const [requests, setRequests] = useState<AdvisorRequest[]>(() => {
        try { const localData = localStorage.getItem('nhf-crm-requests'); return localData ? JSON.parse(localData) : crmAdvisorRequests; } catch (error) { return crmAdvisorRequests; }
    });

    const [commissions, setCommissions] = useState<Commission[]>(() => {
        try { const localData = localStorage.getItem('nhf-crm-commissions'); return localData ? JSON.parse(localData) : crmCommissions; } catch (error) { return crmCommissions; }
    });

    const [applications, setApplications] = useState<AgentApplication[]>(() => {
        try { const localData = localStorage.getItem('nhf-crm-applications'); return localData ? JSON.parse(localData) : []; } catch (error) { return []; }
    });
    
    const [conversations, setConversations] = useState<Conversation[]>(() => {
        try { const localData = localStorage.getItem('nhf-crm-conversations'); return localData ? JSON.parse(localData) : crmConversations; } catch (error) { return crmConversations; }
    });

    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        try { const localData = localStorage.getItem('nhf-crm-messages'); return localData ? JSON.parse(localData) : crmMessages; } catch (error) { return crmMessages; }
    });
    
    const [events, setEvents] = useState<CalendarEvent[]>(() => {
        try {
            const localData = localStorage.getItem('nhf-crm-events');
            return localData ? JSON.parse(localData) : getDynamicInitialEvents();
        } catch (error) {
            return getDynamicInitialEvents();
        }
    });

    const [eventTypes, setEventTypes] = useState<EventType[]>(() => {
        try {
            const localData = localStorage.getItem('nhf-crm-event-types');
            return localData ? JSON.parse(localData) : crmEventTypes;
        } catch (error) {
            return crmEventTypes;
        }
    });

    const [toastNotification, setToastNotification] = useState<CrmNotificationToastData | null>(null);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

    useEffect(() => { localStorage.setItem('nhf-crm-leads', JSON.stringify(leads)); }, [leads]);
    useEffect(() => { localStorage.setItem('nhf-crm-clients', JSON.stringify(clients)); }, [clients]);
    useEffect(() => { localStorage.setItem('nhf-crm-performance', JSON.stringify(performanceData)); }, [performanceData]);
    useEffect(() => { localStorage.setItem('nhf-crm-notifications', JSON.stringify(notifications)); }, [notifications]);
    useEffect(() => { localStorage.setItem('nhf-crm-requests', JSON.stringify(requests)); }, [requests]);
    useEffect(() => { localStorage.setItem('nhf-crm-commissions', JSON.stringify(commissions)); }, [commissions]);
    useEffect(() => { localStorage.setItem('nhf-crm-applications', JSON.stringify(applications)); }, [applications]);
    useEffect(() => { localStorage.setItem('nhf-crm-conversations', JSON.stringify(conversations)); }, [conversations]);
    useEffect(() => { localStorage.setItem('nhf-crm-messages', JSON.stringify(messages)); }, [messages]);
    useEffect(() => { localStorage.setItem('nhf-crm-events', JSON.stringify(events)); }, [events]);
    useEffect(() => { localStorage.setItem('nhf-crm-event-types', JSON.stringify(eventTypes)); }, [eventTypes]);

    // Listen for storage changes to sync messages between tabs
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'nhf-crm-messages' && event.newValue) {
                setMessages(JSON.parse(event.newValue));
            }
            if (event.key === 'nhf-crm-conversations' && event.newValue) {
                setConversations(JSON.parse(event.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


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
    
    const updateClient = useCallback((updatedClient: Client) => {
        setClients(prev => prev.map(client => client.id === updatedClient.id ? updatedClient : client));
    }, []);

    const assignLead = useCallback((leadId: number, advisorId: number) => {
        setLeads(prevLeads => {
            const leadToAssign = prevLeads.find(l => l.id === leadId);
            if (leadToAssign) {
                const advisor = advisors.find(a => a.id === advisorId);
                addNotification(advisorId, `Lead "${leadToAssign.name}" has been assigned to you.`, '/crm/leads');
            }
            // Also clear decline reason on re-assignment
            return prevLeads.map(lead => lead.id === leadId ? { ...lead, assignedTo: advisorId, status: 'Contacted', declineReason: undefined } : lead);
        });
    }, [addNotification, advisors]);

    const updateLeadStatus = useCallback((leadId: number, status: Lead['status'], declineReason?: string) => {
        const leadToUpdate = leads.find(l => l.id === leadId);
        if (!leadToUpdate) return;
        
        if (status === 'Approved') {
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
            setLeads(prev => prev.filter(l => l.id !== leadId));
            if (leadToUpdate.assignedTo) {
                addNotification(leadToUpdate.assignedTo, `Lead ${leadToUpdate.name} approved and converted to a client!`, '/crm/clients');
            }
        } else if (status === 'Declined') {
            const decliningAdvisor = advisors.find(a => a.id === leadToUpdate.assignedTo);
            const advisorName = decliningAdvisor ? decliningAdvisor.name : 'an advisor';

            setLeads(prevLeads => prevLeads.map(lead => 
                lead.id === leadId 
                ? { ...lead, status: 'Declined', assignedTo: null, declineReason: declineReason } 
                : lead
            ));

            const subAdmins = users.filter(u => u.role === Role.SubAdmin);
            subAdmins.forEach(subAdmin => {
                addNotification(subAdmin.id, `Lead '${leadToUpdate.name}' was declined by ${advisorName}.`, '/crm/lead-distribution');
            });

        } else {
            setLeads(prevLeads => prevLeads.map(lead => lead.id === leadId ? { ...lead, status: status } : lead));
        }
    }, [leads, addNotification, advisors]);

    const markNotificationAsRead = useCallback((notificationId: number) => {
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    }, []);

    const getUnreadNotificationCount = useCallback((userId: number) => {
        return notifications.filter(n => n.userId === userId && !n.read).length;
    }, [notifications]);

    const addRequest = useCallback((requestData: Omit<AdvisorRequest, 'id' | 'createdAt' | 'status'>) => {
        const newRequest: AdvisorRequest = {
            ...requestData,
            id: `req-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'New',
        };
        setRequests(prev => [newRequest, ...prev]);
        addNotification(requestData.advisorId, `You have a new ${requestData.type} request from ${requestData.name}.`, '/crm/my-profile');
    }, [addNotification]);

    const updateRequestStatus = useCallback((requestId: string, status: AdvisorRequest['status']) => {
        setRequests(prev => prev.map(req => req.id === requestId ? { ...req, status } : req));
    }, []);

    const addApplication = useCallback((applicationData: Omit<AgentApplication, 'id' | 'status' | 'submittedAt'>) => {
        const newApplication: AgentApplication = {
            ...applicationData,
            id: `app-${Date.now()}`,
            status: 'Pending',
            submittedAt: new Date().toISOString(),
        };
        setApplications(prev => [newApplication, ...prev]);
        const adminsAndManagers = users.filter(u => u.role === Role.Admin || u.role === Role.Manager);
        adminsAndManagers.forEach(user => {
            addNotification(user.id, `New agent application from ${newApplication.name}.`, '/crm/applications');
        });
    }, [addNotification]);

    const updateApplicationStatus = useCallback((applicationId: string, status: ApplicationStatus) => {
        setApplications(prev => prev.map(app => app.id === applicationId ? { ...app, status } : app));
    }, []);

    const dismissToastNotification = useCallback(() => {
        setToastNotification(null);
    }, []);

    const sendMessage = useCallback((conversationId: string, senderId: number, text: string) => {
        const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            conversationId,
            senderId,
            text,
            timestamp: new Date().toISOString(),
            read: true,
        };
        setMessages(prev => [...prev, newMessage]);

        const currentConv = conversations.find(c => c.id === conversationId);
        if (!currentConv) return;
        
        const otherParticipantId = currentConv.participantIds.find(id => id !== senderId);

        setConversations(prev => prev.map(conv => {
            if (conv.id === conversationId) {
                return { ...conv, lastMessage: text, lastMessageTimestamp: newMessage.timestamp, unreadCount: 0 };
            }
            return conv;
        }));

        if (otherParticipantId) {
            const isChatActive = activeConversationId === conversationId;
            const otherUser = users.find(u => u.id === otherParticipantId);
             
            setConversations(prev => prev.map(conv => {
                if (conv.id === conversationId) {
                    if (!isChatActive) {
                        setToastNotification({
                            senderName: otherUser?.name || 'New Message',
                            messageText: text,
                            conversationId: conversationId,
                        });
                        return { ...conv, unreadCount: (conv.unreadCount || 0) + 1 };
                    }
                }
                return conv;
            }));
        }
    }, [conversations, activeConversationId]);
    
    const markConversationAsRead = useCallback((conversationId: string) => {
        setMessages(prev => prev.map(msg => 
            (msg.conversationId === conversationId && !msg.read) ? { ...msg, read: true } : msg
        ));
        setConversations(prev => prev.map(conv => 
            (conv.id === conversationId) ? { ...conv, unreadCount: 0 } : conv
        ));
    }, []);

    const createConversation = useCallback((participantId: number): string => {
        if (!user) throw new Error("User not authenticated");
        
        const existingConversation = conversations.find(c => 
            c.participantIds.includes(user.id) && c.participantIds.includes(participantId)
        );

        if (existingConversation) {
            return existingConversation.id;
        }

        const newConversation: Conversation = {
            id: `conv-${Date.now()}`,
            participantIds: [user.id, participantId],
            lastMessage: 'Conversation started.',
            lastMessageTimestamp: new Date().toISOString(),
            unreadCount: 0,
        };
        setConversations(prev => [newConversation, ...prev]);
        return newConversation.id;
    }, [user, conversations]);

    const addEventType = useCallback((eventType: EventType) => {
        setEventTypes(prev => [...prev, eventType]);
    }, []);

    const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
        const newEvent: CalendarEvent = {
            ...eventData,
            id: `evt-${Date.now()}`,
        };
        setEvents(prev => [...prev, newEvent]);
    }, []);

    const updateEvent = useCallback((updatedEvent: CalendarEvent) => {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    }, []);

    const deleteEvent = useCallback((eventId: string) => {
        setEvents(prev => prev.filter(e => e.id !== eventId));
    }, []);


    const value = useMemo(() => ({
        leads, clients, performanceData, notifications, requests, commissions, applications, conversations, messages, events, eventTypes, toastNotification,
        addLead, updateLead, updateClient, assignLead, updateLeadStatus, markNotificationAsRead, getUnreadNotificationCount,
        addRequest, updateRequestStatus, addApplication, updateApplicationStatus, sendMessage, dismissToastNotification,
        setActiveConversationId, markConversationAsRead, createConversation, addEvent, updateEvent, deleteEvent, addEventType,
    }), [
        leads, clients, performanceData, notifications, requests, commissions, applications, conversations, messages, events, eventTypes, toastNotification,
        addLead, updateLead, updateClient, assignLead, updateLeadStatus, markNotificationAsRead, getUnreadNotificationCount,
        addRequest, updateRequestStatus, addApplication, updateApplicationStatus, sendMessage, dismissToastNotification,
        markConversationAsRead, createConversation, addEvent, updateEvent, deleteEvent, addEventType
    ]);

    return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
};