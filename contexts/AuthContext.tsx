import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { User, Role } from '../types';
import { users as mockUsers } from '../data';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    canAccessAdmin: boolean;
    canAccessCrm: boolean;
    isAdmin: boolean;
    isAdvisor: boolean;
    primaryDashboardPath: string | null;
    login: (email: string) => Promise<User | null>;
    logout: () => void;
    switchRole: (role: Role, navigate: (path: string, options?: { replace?: boolean }) => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('nhf-user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });

    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem('nhf-user', JSON.stringify(user));
            } else {
                localStorage.removeItem('nhf-user');
            }
        } catch (error) {
            console.error("Failed to save user to localStorage", error);
        }
    }, [user]);

    const login = useCallback(async (email: string): Promise<User | null> => {
        // Find user synchronously without simulated delay
        const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
            setUser(foundUser);
            return foundUser;
        } else {
            throw new Error("User not found");
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);
    
    const switchRole = useCallback((role: Role, navigate: (path: string, options?: { replace?: boolean }) => void) => {
        const userForRole = mockUsers.find(u => u.role === role);
        if (userForRole) {
            setUser(userForRole);
            const crmRoles = [Role.Admin, Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor];
            if (crmRoles.includes(userForRole.role)) {
                navigate('/crm', { replace: true });
            } else {
                // Fallback for non-crm roles like 'user'
                navigate('/', { replace: true });
            }
        } else {
            console.warn(`No mock user found for role "${role}".`);
            // Fallback to logout if no user for that role exists
            setUser(null);
            navigate('/', { replace: true });
        }
    }, []);

    const canAccessAdmin = useMemo(() => user?.role === Role.Admin, [user]);

    const canAccessCrm = useMemo(() => {
        const crmRoles = [Role.Admin, Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor];
        return user ? crmRoles.includes(user.role) : false;
    }, [user]);

    const isAdmin = useMemo(() => user?.role === Role.Admin, [user]);

    const primaryDashboardPath = useMemo(() => {
        if (!user) return null;
        if (user.role === Role.Admin) {
            return '/crm';
        }
        if ([Role.Manager, Role.SubAdmin, Role.Underwriter, Role.Advisor].includes(user.role)) {
            return '/crm';
        }
        return null;
    }, [user]);

    const value = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        canAccessAdmin,
        canAccessCrm,
        isAdmin,
        isAdvisor: user?.role === Role.Advisor,
        primaryDashboardPath,
        login,
        logout,
        switchRole,
    }), [user, login, logout, canAccessAdmin, canAccessCrm, isAdmin, primaryDashboardPath, switchRole]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};