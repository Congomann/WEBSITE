

import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';
import { Role } from '../../types';

const DashboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
const LeadsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const ClientsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4" /></svg>);
const LeaderboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-3.562a4.981 4.981 0 00-4.093-4.948 4 4 0 00-1.813 5.39" /></svg>);
const UnderwritingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-15.904z" /></svg>);
const MessagingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
const ContentIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536l10.732-10.732z" /></svg>);
const DistributionIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>);
const MyProfileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);
const CommissionsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v-1m0-1V4m0 2.01M12 14v4m0 2v-2m0-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>);
const ApplicationsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const RequestsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const AgentsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);


const CrmSidebar: React.FC = () => {
    const { user } = useAuth();
    const { requests } = useCrm();

    const newRequestCount = useMemo(() => {
        if (user && user.role === Role.Advisor) {
            return requests.filter(r => r.advisorId === user.id && r.status === 'New').length;
        }
        return 0;
    }, [requests, user]);

    if (!user) return null;
    
    const { role } = user;

    const navItems = [
        { name: 'Dashboard', path: '/crm', icon: <DashboardIcon />, roles: [Role.Admin, Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor] },
        { name: 'Calendar', path: '/crm/calendar', icon: <CalendarIcon />, roles: [Role.Admin, Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor] },
        { name: 'My Profile', path: '/crm/my-profile', icon: <MyProfileIcon />, roles: [Role.Advisor] },
        { name: 'Client Requests', path: '/crm/requests', icon: <RequestsIcon />, roles: [Role.Advisor], badge: newRequestCount },
        { name: 'Applications', path: '/crm/applications', icon: <ApplicationsIcon />, roles: [Role.Admin, Role.Manager] },
        { name: 'Leads', path: '/crm/leads', icon: <LeadsIcon />, roles: [Role.Admin, Role.SubAdmin, Role.Advisor] },
        { name: 'Lead Distribution', path: '/crm/lead-distribution', icon: <DistributionIcon />, roles: [Role.SubAdmin] },
        { name: 'Clients', path: '/crm/clients', icon: <ClientsIcon />, roles: [Role.Admin, Role.Advisor] },
        { name: 'Leaderboard', path: '/crm/leaderboard', icon: <LeaderboardIcon />, roles: [Role.Admin, Role.Manager, Role.Advisor] },
        { name: 'Agents', path: '/crm/agents', icon: <AgentsIcon />, roles: [Role.Admin, Role.Manager] },
        { name: 'Commissions', path: '/crm/commissions', icon: <CommissionsIcon />, roles: [Role.Admin, Role.Manager, Role.Advisor] },
        { name: 'Underwriting', path: '/crm/underwriting', icon: <UnderwritingIcon />, roles: [Role.Admin, Role.Underwriter] },
        { name: 'Messaging', path: '/crm/messaging', icon: <MessagingIcon />, roles: [Role.Admin, Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor] },
        { name: 'User Management', path: '/crm/users', icon: <UsersIcon />, roles: [Role.Admin] },
        { name: 'Content Mgt.', path: '/crm/content-management', icon: <ContentIcon />, roles: [Role.Admin] },
    ];

    const accessibleNavItems = navItems.filter(item => item.roles.includes(role));
    
    const linkClasses = "flex items-center px-4 py-3 text-gray-200 hover:bg-brand-blue/60 hover:text-white rounded-md transition-colors duration-200";
    const activeLinkClasses = "bg-brand-blue/80 text-white font-bold shadow-inner";

    return (
        <aside className="w-64 bg-brand-blue/90 text-white flex flex-col flex-shrink-0 hidden md:block shadow-lg">
            <div className="p-4 border-b border-white/10 flex-shrink-0">
                <h2 className="text-xl font-bold text-center">NHFG CRM</h2>
            </div>
            <nav className="p-4 space-y-2 overflow-y-auto flex-grow">
                {accessibleNavItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === '/crm'}
                        className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span className="flex-grow">{item.name}</span>
                        {item.badge && item.badge > 0 && (
                            <span className="bg-brand-gold text-brand-blue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {item.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default CrmSidebar;