import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCrm } from '../../contexts/CrmContext';

const NotificationBell: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const { notifications, getUnreadNotificationCount, markNotificationAsRead } = useCrm();
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    if (!user) return null;

    const unreadCount = getUnreadNotificationCount(user.id);
    const userNotifications = notifications.filter(n => n.userId === user.id).slice(0, 10); // Show latest 10

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = (id: number) => {
        markNotificationAsRead(id);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-gray-600 hover:text-brand-blue focus:outline-none"
                aria-label={`Notifications (${unreadCount} unread)`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">{unreadCount}</span>
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border z-20">
                    <div className="p-3 font-bold border-b">Notifications</div>
                    <div className="max-h-96 overflow-y-auto">
                        {userNotifications.length > 0 ? (
                            userNotifications.map(n => (
                                <Link
                                    key={n.id}
                                    to={n.link || '#'}
                                    onClick={() => handleNotificationClick(n.id)}
                                    className={`block p-3 hover:bg-gray-100 border-b last:border-b-0 ${!n.read ? 'bg-blue-50' : ''}`}
                                >
                                    <p className="text-sm text-gray-800">{n.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="p-4 text-sm text-gray-500 text-center">No notifications yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
