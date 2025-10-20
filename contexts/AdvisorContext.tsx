import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { Advisor } from '../types';
import { advisors as initialAdvisors } from '../data';

interface AdvisorContextType {
    advisors: Advisor[];
    addAdvisor: (advisor: Omit<Advisor, 'id'>) => void;
    updateAdvisor: (advisor: Advisor) => void;
    deleteAdvisor: (advisorId: number) => void;
    advisorToEditId: number | null;
    setAdvisorToEditId: (id: number | null) => void;
}

const AdvisorContext = createContext<AdvisorContextType | undefined>(undefined);

export const useAdvisors = () => {
    const context = useContext(AdvisorContext);
    if (!context) {
        throw new Error('useAdvisors must be used within an AdvisorProvider');
    }
    return context;
};

interface AdvisorProviderProps {
    children: ReactNode;
}

export const AdvisorProvider: React.FC<AdvisorProviderProps> = ({ children }) => {
    const [advisors, setAdvisors] = useState<Advisor[]>(() => {
        try {
            const localData = localStorage.getItem('nhf-advisors');
            // If there's data in localStorage, use it. Otherwise, seed with initial data.
            return localData ? JSON.parse(localData) : initialAdvisors;
        } catch (error) {
            console.error("Could not parse advisors data from localStorage", error);
            return initialAdvisors;
        }
    });

    // State to trigger the edit flow on the AdminPage
    const [advisorToEditId, setAdvisorToEditId] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem('nhf-advisors', JSON.stringify(advisors));
    }, [advisors]);

    const addAdvisor = useCallback((advisorData: Omit<Advisor, 'id'>) => {
        setAdvisors(prev => {
            const newAdvisor = {
                ...advisorData,
                id: Date.now(), // Simple unique ID
            };
            return [...prev, newAdvisor];
        });
    }, []);

    const updateAdvisor = useCallback((updatedAdvisor: Advisor) => {
        setAdvisors(prev => prev.map(advisor => advisor.id === updatedAdvisor.id ? updatedAdvisor : advisor));
    }, []);

    const deleteAdvisor = useCallback((advisorId: number) => {
        setAdvisors(prev => prev.filter(advisor => advisor.id !== advisorId));
    }, []);

    const value = useMemo(() => ({
        advisors,
        addAdvisor,
        updateAdvisor,
        deleteAdvisor,
        advisorToEditId,
        setAdvisorToEditId
    }), [advisors, addAdvisor, updateAdvisor, deleteAdvisor, advisorToEditId]);

    return <AdvisorContext.Provider value={value}>{children}</AdvisorContext.Provider>;
};
