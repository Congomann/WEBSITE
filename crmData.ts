

import type { Lead, Client, PerformanceData, AdvisorRequest, Commission, Conversation, ChatMessage, CalendarEvent, EventType } from './types';

export const crmEventTypes: EventType[] = [
    { name: 'Days Off', color: '#ef4444' }, // red-500
    { name: 'Google Meet', color: '#22c55e' }, // green-500
    { name: 'Client Call', color: '#3b82f6' }, // blue-500
    { name: 'Team Meeting', color: '#8b5cf6' }, // violet-500
    { name: 'Personal Reminder', color: '#6b7280' }, // gray-500
];

export const crmLeads: Lead[] = [
    { id: 1, name: 'John Appleseed', email: 'j.apple@example.com', phone: '555-123-4567', status: 'New', source: 'Website Form', assignedTo: null, lastContacted: '', createdAt: '2024-07-28T10:00:00Z', priority: 'High' },
    { id: 2, name: 'Jane Doe', email: 'jane.d@example.com', phone: '555-987-6543', status: 'Contacted', source: 'Referral', assignedTo: 2, lastContacted: '2024-07-29T14:30:00Z', createdAt: '2024-07-27T11:00:00Z', priority: 'Medium' },
    { id: 3, name: 'Peter Jones', email: 'p.jones@example.com', phone: '555-555-1212', status: 'Qualified', source: 'Marketing Campaign', assignedTo: 2, lastContacted: '2024-07-30T09:00:00Z', createdAt: '2024-07-26T12:00:00Z', priority: 'Medium' },
    { id: 4, name: 'Mary Garcia', email: 'm.garcia@example.com', phone: '555-222-3333', status: 'Closed - Won', source: 'Website Form', assignedTo: 3, lastContacted: '2024-07-25T16:00:00Z', createdAt: '2024-07-20T13:00:00Z' },
    { id: 5, name: 'David Smith', email: 'd.smith@example.com', phone: '555-444-5555', status: 'Closed - Lost', source: 'Referral', assignedTo: 8, lastContacted: '2024-07-22T11:00:00Z', createdAt: '2024-07-19T14:00:00Z' },
    { id: 6, name: 'Laura Williams', email: 'l.williams@example.com', phone: '555-666-7777', status: 'New', source: 'Website Form', assignedTo: null, lastContacted: '', createdAt: '2024-07-30T15:00:00Z', priority: 'Low' },
];

export const crmClients: Client[] = [
    { id: 101, name: 'Mary Garcia', email: 'm.garcia@example.com', phone: '555-222-3333', advisorId: 3, since: '2024-07-25', policies: [{ id: 'P-AUTO-001', type: 'Auto', premium: 1200, status: 'Active', renewalDate: '2025-07-25' }] },
    { id: 102, name: 'Existing Client A', email: 'client.a@example.com', phone: '555-111-1111', advisorId: 2, since: '2023-01-15', policies: [{ id: 'P-LIFE-001', type: 'Life', premium: 2500, status: 'Active', renewalDate: '2025-01-15' }, { id: 'P-HOME-001', type: 'Home', premium: 800, status: 'Active', renewalDate: '2025-01-15' }] },
    { id: 103, name: 'Existing Client B', email: 'client.b@example.com', phone: '555-222-2222', advisorId: 8, since: '2022-11-20', policies: [{ id: 'P-HEALTH-001', type: 'Health', premium: 4500, status: 'Pending', renewalDate: '2024-11-20' }] },
];

export const crmAdvisorRequests: AdvisorRequest[] = [
    {
        id: 'req-1',
        type: 'Callback',
        name: 'Michael Scott',
        phone: '555-100-1001',
        message: 'Wants to discuss life insurance options.',
        createdAt: '2024-07-30T11:00:00Z',
        status: 'New',
        advisorId: 2 // Jessica Miller
    },
    {
        id: 'req-2',
        type: 'Callback',
        name: 'Pamela Beesly',
        phone: '555-200-2002',
        message: 'Interested in property insurance.',
        createdAt: '2024-07-29T16:30:00Z',
        status: 'Contacted',
        advisorId: 3 // Brian Carter
    },
];


export const crmPerformance: PerformanceData[] = [
    {
        advisorId: 2, // Jessica Miller
        metrics: { leads: 15, conversionRate: 20, closedDeals: 3, salesVolume: 75000, commissions: 3750 }
    },
    {
        advisorId: 3, // Brian Carter
        metrics: { leads: 25, conversionRate: 24, closedDeals: 6, salesVolume: 150000, commissions: 7500 }
    },
    {
        advisorId: 8, // Samantha Chen
        metrics: { leads: 18, conversionRate: 16.67, closedDeals: 3, salesVolume: 45000, commissions: 2250 }
    }
];

export const crmCommissions: Commission[] = [
    {
        id: 'comm-1',
        clientId: 101,
        clientName: 'Mary Garcia',
        advisorId: 3,
        policyNumber: 'AU-753159',
        carrier: 'Geico',
        policyType: 'Auto',
        premium: 1200,
        commissionRate: 15,
        commissionAmount: 180,
        status: 'Paid',
        date: '2024-07-26T10:00:00Z'
    },
    {
        id: 'comm-2',
        clientId: 102,
        clientName: 'Existing Client A',
        advisorId: 2,
        policyNumber: 'LI-951753',
        carrier: 'Prudential',
        policyType: 'Life',
        premium: 2500,
        commissionRate: 50,
        commissionAmount: 1250,
        status: 'Paid',
        date: '2024-07-15T10:00:00Z'
    },
    {
        id: 'comm-3',
        clientId: 102,
        clientName: 'Existing Client A',
        advisorId: 2,
        policyNumber: 'HO-852456',
        carrier: 'The Hartford',
        policyType: 'Home',
        premium: 800,
        commissionRate: 12,
        commissionAmount: 96,
        status: 'Pending',
        date: '2024-07-18T10:00:00Z'
    },
    {
        id: 'comm-4',
        clientId: 103,
        clientName: 'Existing Client B',
        advisorId: 8,
        policyNumber: 'HE-123987',
        carrier: 'Aetna',
        policyType: 'Health',
        premium: 4500,
        commissionRate: 10,
        commissionAmount: 450,
        status: 'Pending',
        date: '2024-07-21T10:00:00Z'
    },
     {
        id: 'comm-5',
        clientId: 101, // Mary Garcia
        clientName: 'Mary Garcia',
        advisorId: 3,
        policyNumber: 'HO-369258',
        carrier: 'Foremost',
        policyType: 'Home',
        premium: 950,
        commissionRate: 12,
        commissionAmount: 114,
        status: 'Pending',
        date: '2024-08-01T10:00:00Z'
    }
];

export const crmEvents: CalendarEvent[] = [
    {
        id: 'evt-1',
        title: 'Jessica - Days Off',
        description: 'Annual vacation.',
        startDate: '2024-08-05',
        endDate: '2024-08-07',
        isPublic: true,
        creatorId: 2, // Jessica Miller
        type: 'Days Off',
        color: '#ef4444',
    },
    {
        id: 'evt-2',
        title: 'Quarterly Review - Google Meet',
        description: 'Team-wide quarterly performance review and planning session.',
        startDate: '2024-08-08',
        isPublic: true,
        creatorId: 1, // Admin
        type: 'Google Meet',
        color: '#22c55e',
    },
    {
        id: 'evt-3',
        title: 'Call Brian Carter at 4pm',
        description: 'Discuss the new commercial lead from the website.',
        startDate: '2024-08-08',
        isPublic: false,
        creatorId: 1, // Admin's private event
        type: 'Personal Reminder',
        color: '#6b7280',
    },
];

export const crmConversations: Conversation[] = [
    {
        id: 'conv-1',
        participantIds: [1, 2], // Admin and Jessica Miller
        lastMessage: "Sounds good, I'll get on it.",
        lastMessageTimestamp: '2024-07-31T11:05:00Z',
        unreadCount: 0,
    },
    {
        id: 'conv-2',
        participantIds: [5, 3], // Manager and Brian Carter
        lastMessage: 'Can you follow up on the new lead from the website?',
        lastMessageTimestamp: '2024-07-31T09:30:00Z',
        unreadCount: 1,
    },
     {
        id: 'conv-3',
        participantIds: [1, 5], // Admin and Manager
        lastMessage: 'Let’s sync up about Q3 goals tomorrow.',
        lastMessageTimestamp: '2024-07-30T17:00:00Z',
        unreadCount: 0,
    },
];

export const crmMessages: ChatMessage[] = [
    // Conversation 1
    { id: 'msg-1', conversationId: 'conv-1', senderId: 1, text: 'Hi Jessica, can you please review the latest policy application for John Appleseed?', timestamp: '2024-07-31T11:00:00Z', read: true },
    { id: 'msg-2', conversationId: 'conv-1', senderId: 2, text: 'Yes, of course. I will take a look this afternoon.', timestamp: '2024-07-31T11:02:00Z', read: true },
    { id: 'msg-3', conversationId: 'conv-1', senderId: 1, text: "Great, let me know if you need anything.", timestamp: '2024-07-31T11:03:00Z', read: true },
    { id: 'msg-4', conversationId: 'conv-1', senderId: 2, text: "Sounds good, I'll get on it.", timestamp: '2024-07-31T11:05:00Z', read: true },
    
    // Conversation 2
    { id: 'msg-5', conversationId: 'conv-2', senderId: 5, text: 'Brian, checking in on your progress this week.', timestamp: '2024-07-31T09:28:00Z', read: true },
    { id: 'msg-6', conversationId: 'conv-2', senderId: 5, text: 'Can you follow up on the new lead from the website?', timestamp: '2024-07-31T09:30:00Z', read: false },

    // Conversation 3
    { id: 'msg-7', conversationId: 'conv-3', senderId: 1, text: 'Hey, quick check-in. How are the new lead assignments going?', timestamp: '2024-07-30T16:55:00Z', read: true },
    { id: 'msg-8', conversationId: 'conv-3', senderId: 5, text: 'Going well, the team seems to be handling the new volume.', timestamp: '2024-07-30T16:58:00Z', read: true },
    { id: 'msg-9', conversationId: 'conv-3', senderId: 1, text: 'Let’s sync up about Q3 goals tomorrow.', timestamp: '2024-07-30T17:00:00Z', read: true },
];