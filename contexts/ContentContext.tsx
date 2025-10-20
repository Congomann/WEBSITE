import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { EditableContent } from '../types';
import { initialContent } from '../data';

export type ContentKey = keyof EditableContent;

interface ContentContextType {
    content: EditableContent;
    updateContent: <K extends ContentKey>(key: K, value: EditableContent[K]) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};

interface ContentProviderProps {
    children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
    const [content, setContent] = useState<EditableContent>(() => {
        try {
            const localData = localStorage.getItem('nhf-content');
            return localData ? JSON.parse(localData) : initialContent;
        } catch (error) {
            console.error("Could not parse content from localStorage", error);
            return initialContent;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('nhf-content', JSON.stringify(content));
        } catch (error) {
            console.error("Could not save content to localStorage", error);
        }
    }, [content]);

    const updateContent = useCallback(<K extends ContentKey>(key: K, value: EditableContent[K]) => {
        setContent(prevContent => ({
            ...prevContent,
            [key]: value
        }));
    }, []);

    const value = { content, updateContent };

    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
