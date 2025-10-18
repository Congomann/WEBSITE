import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from "react";
// FIX: Removed unused Firebase imports that were causing errors. The application is using a mock authentication implementation.
import type { User, Role, Service, Advisor, VideoResource, DocumentResource, ServiceDetail, Notification, Commission, Lead, Client, Task } from "../types";
import {
    core_services,
    advisors,
    video_resources,
    document_resources,
    service_details,
    commissions,
    leads,
    clients,
    tasks,
} from '../data';

// --- AUTH CONTEXT ---
interface AuthContextType {
  currentUser: User | null;
  role: Role | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a "logged in" state in localStorage to persist session for demo
    try {
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse mock user from localStorage", error);
        localStorage.removeItem('mockUser');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean }> => {
    // In a real app, you would validate credentials here.
    // For this demo, any login is successful and assigns the 'Agent' role.
    const mockUser: User = {
        uid: 'mock-user-agent-123',
        email: email,
        displayName: 'Kara Thrace',
        photoURL: `https://ui-avatars.com/api/?name=Kara+Thrace&background=c4b5fd&color=4c1d95`,
        role: 'Agent',
        teamId: 'team-alpha',
    };
    setCurrentUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
      setCurrentUser(null);
      localStorage.removeItem('mockUser');
      // In a real app, you would also call signOut(auth);
  }, []);
  
  const value = useMemo(() => ({
      currentUser,
      role: currentUser?.role || null,
      loading,
      login,
      logout,
  }), [currentUser, loading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// --- THEME CONTEXT ---
type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPrefs = window.localStorage.getItem('theme');
            if (typeof storedPrefs === 'string') {
                return storedPrefs as Theme;
            }
            const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
            if (userMedia.matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);
    
    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// --- DATA CONTEXT ---
interface DataContextType {
    services: Service[];
    advisors: Advisor[];
    videos: VideoResource[];
    documents: DocumentResource[];
    serviceDetails: { [key: string]: ServiceDetail[] };
    commissions: Commission[];
    leads: Lead[];
    clients: Client[];
    tasks: Task[];
    loading: boolean;
    refetchData: () => Promise<void>;
    notifications: Notification[];
    unreadNotificationsCount: number;
    markNotificationAsRead: (id: string) => void;
    markAllNotificationsAsRead: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to parse dates from localStorage
const dateReviver = (key: string, value: any) => {
    // Matches ISO 8601 date strings
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (typeof value === 'string' && isoDateRegex.test(value)) {
        return new Date(value);
    }
    return value;
};


export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<Omit<DataContextType, 'loading' | 'refetchData' | 'notifications' | 'unreadNotificationsCount' | 'markNotificationAsRead' | 'markAllNotificationsAsRead'>>({
        services: [],
        advisors: [],
        videos: [],
        documents: [],
        serviceDetails: {},
        commissions: [],
        leads: [],
        clients: [],
        tasks: [],
    });
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 'N001', userId: 'mock-user-agent-123', message: 'New lead "Alex Johnson" has been assigned to you.', isRead: false, timestamp: new Date(Date.now() - 10 * 60 * 1000) },
        { id: 'N002', userId: 'mock-user-agent-123', message: 'Task "Follow up with Sarah Connor" is due today.', isRead: false, timestamp: new Date(Date.now() - 60 * 60 * 1000) },
        { id: 'N003', userId: 'mock-user-agent-123', message: 'Your commission statement for May 2024 is available.', isRead: true, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { id: 'N004', userId: 'another-user', message: 'This should not be visible.', isRead: false, timestamp: new Date() },
    ]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Helper to initialize localStorage from mock data if it doesn't exist
            const initializeData = (key: string, initialData: any) => {
                const storedData = localStorage.getItem(key);
                if (storedData) {
                    return JSON.parse(storedData, dateReviver);
                }
                localStorage.setItem(key, JSON.stringify(initialData));
                return initialData;
            };

            const loadedData = {
                services: initializeData('nhf-core_services', core_services),
                advisors: initializeData('nhf-advisors', advisors),
                videos: initializeData('nhf-video_resources', video_resources),
                documents: initializeData('nhf-document_resources', document_resources),
                serviceDetails: initializeData('nhf-service_details', service_details),
                commissions: initializeData('nhf-commissions', commissions).map((c: any) => ({ ...c, date: new Date(c.date) })),
                leads: initializeData('nhf-leads', leads).map((l: any) => ({ ...l, createdAt: new Date(l.createdAt), updatedAt: new Date(l.updatedAt) })),
                clients: initializeData('nhf-clients', clients).map((c: any) => ({ ...c, joinedDate: new Date(c.joinedDate) })),
                tasks: initializeData('nhf-tasks', tasks),
            };

            setData(loadedData);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Effect to check for task reminders
    useEffect(() => {
        if (data.tasks.length > 0 && currentUser) {
            const now = new Date();
            const userTasks = data.tasks.filter(t => t.assignedToId === currentUser.uid && !t.isCompleted);

            userTasks.forEach(task => {
                if (task.reminderOffset !== null) {
                    const dueDate = new Date(task.dueDate);
                    const reminderTime = new Date(dueDate.getTime() - task.reminderOffset * 60000);
                    
                    const notificationExists = notifications.some(n => n.relatedId === task.id);

                    if (now >= reminderTime && now < dueDate && !notificationExists) {
                        const newNotification: Notification = {
                            id: `N-TASK-${task.id}`,
                            userId: currentUser.uid,
                            message: `Reminder: Task "${task.title}" is due soon.`,
                            isRead: false,
                            timestamp: new Date(),
                            relatedId: task.id,
                        };
                        setNotifications(prev => [newNotification, ...prev]);
                    }
                }
            });
        }
    }, [data.tasks, currentUser, notifications]);


    const userNotifications = useMemo(() => {
        if (!currentUser) return [];
        return notifications.filter(n => n.userId === currentUser.uid);
    }, [currentUser, notifications]);

    const unreadNotificationsCount = useMemo(() => {
        return userNotifications.filter(n => !n.isRead).length;
    }, [userNotifications]);

    const markNotificationAsRead = useCallback((id: string) => {
        setNotifications(current => current.map(n => n.id === id ? { ...n, isRead: true } : n));
    }, []);

    const markAllNotificationsAsRead = useCallback(() => {
        if (!currentUser) return;
        setNotifications(current => current.map(n => n.userId === currentUser.uid ? { ...n, isRead: true } : n));
    }, [currentUser]);
    
    const value = useMemo(() => ({
        ...data,
        loading,
        refetchData: fetchData,
        notifications: userNotifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
    }), [data, loading, fetchData, userNotifications, unreadNotificationsCount, markNotificationAsRead, markAllNotificationsAsRead]);

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};