
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import type { Service, ServiceDetail, Advisor, VideoResource, DocumentResource } from '../types';

interface SiteData {
    core_services: Omit<Service, 'icon'>[];
    service_details: { [key: string]: ServiceDetail[] };
    advisors: Advisor[];
    video_resources: VideoResource[];
    document_resources: DocumentResource[];
}

interface DataContextType {
    services: Omit<Service, 'icon'>[];
    serviceDetails: { [key: string]: ServiceDetail[] };
    advisors: Advisor[];
    videos: VideoResource[];
    documents: DocumentResource[];
    loading: boolean;
    error: string | null;
    refetchData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<SiteData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/all-data');
            if (!response.ok) {
                throw new Error('Failed to fetch site data');
            }
            const siteData: SiteData = await response.json();
            setData(siteData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const value = useMemo(() => ({
        services: data?.core_services || [],
        serviceDetails: data?.service_details || {},
        advisors: data?.advisors || [],
        videos: data?.video_resources || [],
        documents: data?.document_resources || [],
        loading,
        error,
        refetchData: fetchData,
    }), [data, loading, error, fetchData]);

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
