
import type { Lead, Client, PerformanceData, AdvisorRequest, Commission } from './types';

export const crmLeads: Lead[] = [
    { id: 1, name: 'John Appleseed', email: 'j.apple@example.com', phone: '555-123-4567', status: 'New', source: 'Website Form', assignedTo: null, lastContacted: '', createdAt: '2024-07-28T10:00:00Z' },
    { id: 2, name: 'Jane Doe', email: 'jane.d@example.com', phone: '555-987-6543', status: 'Contacted', source: 'Referral', assignedTo: 1, lastContacted: '2024-07-29T14:30:00Z', createdAt: '2024-07-27T11:00:00Z' },
    { id: 3, name: 'Peter Jones', email: 'p.jones@example.com', phone: '555-555-1212', status: 'Qualified', source: 'Marketing Campaign', assignedTo: 1, lastContacted: '2024-07-30T09:00:00Z', createdAt: '2024-07-26T12:00:00Z' },
    { id: 4, name: 'Mary Garcia', email: 'm.garcia@example.com', phone: '555-222-3333', status: 'Closed - Won', source: 'Website Form', assignedTo: 2, lastContacted: '2024-07-25T16:00:00Z', createdAt: '2024-07-20T13:00:00Z' },
    { id: 5, name: 'David Smith', email: 'd.smith@example.com', phone: '555-444-5555', status: 'Closed - Lost', source: 'Referral', assignedTo: 3, lastContacted: '2024-07-22T11:00:00Z', createdAt: '2024-07-19T14:00:00Z' },
    { id: 6, name: 'Laura Williams', email: 'l.williams@example.com', phone: '555-666-7777', status: 'New', source: 'Website Form', assignedTo: null, lastContacted: '', createdAt: '2024-07-30T15:00:00Z' },
];

export const crmClients: Client[] = [
    { id: 101, name: 'Mary Garcia', email: 'm.garcia@example.com', phone: '555-222-3333', advisorId: 2, since: '2024-07-25', policies: [{ id: 'P-AUTO-001', type: 'Auto', premium: 1200, status: 'Active', renewalDate: '2025-07-25' }] },
    { id: 102, name: 'Existing Client A', email: 'client.a@example.com', phone: '555-111-1111', advisorId: 1, since: '2023-01-15', policies: [{ id: 'P-LIFE-001', type: 'Life', premium: 2500, status: 'Active', renewalDate: '2025-01-15' }, { id: 'P-HOME-001', type: 'Home', premium: 800, status: 'Active', renewalDate: '2025-01-15' }] },
    { id: 103, name: 'Existing Client B', email: 'client.b@example.com', phone: '555-222-2222', advisorId: 3, since: '2022-11-20', policies: [{ id: 'P-HEALTH-001', type: 'Health', premium: 4500, status: 'Pending', renewalDate: '2024-11-20' }] },
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
        advisorId: 1 // Jessica Miller
    },
    {
        id: 'req-2',
        type: 'Callback',
        name: 'Pamela Beesly',
        phone: '555-200-2002',
        message: 'Interested in property insurance.',
        createdAt: '2024-07-29T16:30:00Z',
        status: 'Contacted',
        advisorId: 2 // Brian Carter
    },
];


export const crmPerformance: PerformanceData[] = [
    {
        advisorId: 1, // Jessica Miller
        metrics: { leads: 15, conversionRate: 20, closedDeals: 3, salesVolume: 75000, commissions: 3750 }
    },
    {
        advisorId: 2, // Brian Carter
        metrics: { leads: 25, conversionRate: 24, closedDeals: 6, salesVolume: 150000, commissions: 7500 }
    },
    {
        advisorId: 3, // Samantha Chen
        metrics: { leads: 18, conversionRate: 16.67, closedDeals: 3, salesVolume: 45000, commissions: 2250 }
    }
];

export const crmCommissions: Commission[] = [
    {
        id: 'comm-1',
        clientId: 101,
        clientName: 'Mary Garcia',
        advisorId: 2,
        policyId: 'P-AUTO-001',
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
        advisorId: 1,
        policyId: 'P-LIFE-001',
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
        advisorId: 1,
        policyId: 'P-HOME-001',
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
        advisorId: 3,
        policyId: 'P-HEALTH-001',
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
        advisorId: 2,
        policyId: 'P-HOME-002', // a new policy
        policyType: 'Home',
        premium: 950,
        commissionRate: 12,
        commissionAmount: 114,
        status: 'Pending',
        date: '2024-08-01T10:00:00Z'
    }
];
