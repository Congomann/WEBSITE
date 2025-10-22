import type { Lead, Client, PerformanceData } from './types';

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
