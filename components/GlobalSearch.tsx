import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// FIX: Removed import from static data file and replaced with useData hook to fetch live data.
import { useData } from '../contexts/DataContext';

interface SearchResult {
    type: 'Page' | 'Service' | 'Advisor' | 'Resource';
    title: string;
    path: string;
    context: string;
}

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    // FIX: Get data from context.
    const { services, advisors, videos, documents } = useData();

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            // Delay focus to allow for modal animation
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isOpen]);
    
    // Search logic with debouncing
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const handler = setTimeout(() => {
            const lowerCaseQuery = query.toLowerCase();
            const allResults: SearchResult[] = [];

            // 1. Search Static Pages
            const staticPages = [
                { title: 'About Us', path: '/about', context: 'Learn about our history, mission, and values.' },
                { title: 'Our Advisors', path: '/advisors', context: 'Meet our team of expert financial advisors.' },
                { title: 'Resources', path: '/resources', context: 'Explore educational videos and helpful documents.' },
                { title: 'Shop', path: '/products', context: 'Browse our merchandise and financial resources.' },
                { title: 'Contact Us', path: '/contact', context: 'Get in touch with us for a free quote or consultation.' },
                { title: 'Privacy Policy', path: '/privacy-policy', context: 'Read our privacy policy to understand how we handle your data.' },
            ];

            staticPages.forEach(page => {
                if (page.title.toLowerCase().includes(lowerCaseQuery) || page.context.toLowerCase().includes(lowerCaseQuery)) {
                    allResults.push({ type: 'Page', ...page });
                }
            });

            // 2. Search Services
            // FIX: Use 'services' from context instead of static 'core_services'.
            services.forEach(service => {
                if (service.name.toLowerCase().includes(lowerCaseQuery) || service.description.toLowerCase().includes(lowerCaseQuery)) {
                    allResults.push({ type: 'Service', title: service.name, path: service.path, context: service.description });
                }
            });

            // 3. Search Advisors
            advisors.forEach(advisor => {
                const searchableText = `${advisor.name} ${advisor.title} ${advisor.bio} ${advisor.specialties.join(' ')}`.toLowerCase();
                if (searchableText.includes(lowerCaseQuery)) {
                    allResults.push({ type: 'Advisor', title: advisor.name, path: `/advisors/${advisor.id}`, context: advisor.title });
                }
            });

            // 4. Search Resources
            // FIX: Use 'videos' and 'documents' from context instead of static resources.
            [...videos, ...documents].forEach(resource => {
                const searchableText = `${resource.title} ${resource.description}`.toLowerCase();
                if (searchableText.includes(lowerCaseQuery)) {
                    allResults.push({
                        type: 'Resource',
                        title: resource.title,
                        path: '/resources',
                        context: resource.description,
                    });
                }
            });
            
            setResults(allResults);
        }, 200); // 200ms debounce

        return () => {
            clearTimeout(handler);
        };
    // FIX: Added context data to dependency array to ensure search re-runs when data is loaded.
    }, [query, services, advisors, videos, documents]);
    
    const handleResultClick = () => {
        setQuery('');
        setResults([]);
        onClose();
    };
    
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    const groupedResults = results.reduce((acc, result) => {
        (acc[result.type] = acc[result.type] || []).push(result);
        return acc;
    }, {} as Record<SearchResult['type'], SearchResult[]>);

    const resultOrder: SearchResult['type'][] = ['Page', 'Service', 'Advisor', 'Resource'];
    
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center p-4 pt-[15vh] animate-fade-in" 
            style={{animationDuration: '300ms'}}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-full max-h-[70vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200 relative">
                    <svg className="w-6 h-6 text-gray-400 absolute left-7 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                        ref={searchInputRef}
                        type="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search for services, advisors, resources..."
                        className="w-full py-3 pl-12 pr-12 text-lg bg-transparent border-none focus:outline-none focus:ring-0"
                        aria-label="Search website"
                    />
                     <button onClick={onClose} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100" aria-label="Close search">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {/* Results */}
                <div className="overflow-y-auto flex-grow p-4">
                    {query.length < 2 ? (
                         <div className="text-center text-gray-500 py-8">Type at least 2 characters to search.</div>
                    ) : results.length > 0 ? (
                        <ul className="space-y-4">
                            {resultOrder.map(groupName => {
                                const items = groupedResults[groupName];
                                if (!items || items.length === 0) return null;
                                return (
                                    <li key={groupName}>
                                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider px-2 mb-2">{groupName}s</h3>
                                        <ul className="space-y-1">
                                            {items.map((result, index) => (
                                                <li key={`${groupName}-${index}`}>
                                                    <Link to={result.path} onClick={handleResultClick} className="block p-3 rounded-md hover:bg-brand-light transition-colors">
                                                        <p className="font-semibold text-brand-blue">{result.title}</p>
                                                        <p className="text-sm text-gray-600 line-clamp-1">{result.context}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            <p className="font-semibold">No results found for "{query}"</p>
                            <p className="text-sm mt-1">Try searching for something else.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;