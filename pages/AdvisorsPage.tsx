
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdvisorCard from '../components/AdvisorCard';
import SEO from '../components/SEO';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';

const AdvisorsPage: React.FC = () => {
    const { advisors, loading } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAdvisors = useMemo(() => {
        if (!searchTerm) {
            return advisors;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return advisors.filter(advisor => {
            // Combine all searchable text fields into one string for easy searching
            const searchableText = [
                advisor.name,
                advisor.title,
                ...advisor.specialties,
                ...(advisor.languages || []) // Include languages if they exist
            ].join(' ').toLowerCase();
            
            return searchableText.includes(lowerCaseSearchTerm);
        });
    }, [advisors, searchTerm]);

    return (
        <div className="bg-brand-light">
            <SEO
                title="Our Expert Advisors | New Holland Financial Group | Des Moines, IA"
                description="Meet the team of expert financial advisors and insurance agents at New Holland Financial Group in Des Moines, IA. Find a licensed professional to help you build long-term financial security."
                keywords="financial advisors Des Moines, insurance agents Iowa, meet the team, licensed financial professionals, New Holland Financial advisors"
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Meet Our Expert Advisors</h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Our dedicated professionals are here to guide you toward the best insurance solutions.
                    </p>
                </div>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                        <Link to="/" className="inline-flex items-center text-brand-blue hover:text-brand-gold transition-colors duration-300 group font-semibold flex-shrink-0">
                            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Home
                        </Link>

                        <div className="w-full md:max-w-md">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                                <input
                                    type="search"
                                    placeholder="Search by name, specialty, title..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                    aria-label="Search advisors"
                                />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center"><LoadingSpinner /></div>
                    ) : filteredAdvisors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredAdvisors.map(advisor => (
                                <AdvisorCard key={advisor.id} advisor={advisor} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16">
                            <p className="text-xl text-gray-600 mb-6">
                                No advisors found matching your search for "{searchTerm}".
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdvisorsPage;
