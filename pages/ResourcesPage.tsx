
import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import SEO from '../components/SEO';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ResourcesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'videos' | 'documents'>('videos');
    const { videos: video_resources, documents: document_resources, loading } = useData();

    const commonTabStyles = "px-6 py-3 font-semibold text-lg rounded-t-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2";
    const activeTabStyles = "bg-white text-brand-blue";
    const inactiveTabStyles = "bg-brand-blue/80 text-white hover:bg-brand-blue";

    const DocumentIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
    
    const renderContent = () => {
        if (loading) {
            return <div className="flex justify-center py-10"><LoadingSpinner /></div>;
        }

        if (activeTab === 'videos') {
            return (
                <section id="videos" className="animate-fade-in" role="tabpanel">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {video_resources.map(video => (
                            <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg flex flex-col group">
                                <div className="mb-4 rounded-t-lg overflow-hidden">
                                    <VideoPlayer video={video} />
                                </div>
                                <div className="p-6 pt-0 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-brand-blue mb-2 group-hover:text-brand-gold transition-colors duration-300">{video.title}</h3>
                                    <p className="text-gray-600 flex-grow">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            );
        }

        if (activeTab === 'documents') {
            return (
                 <section id="documents" className="animate-fade-in" role="tabpanel">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {document_resources.map((doc) => (
                            <div key={doc.id} className="bg-brand-light p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 group">
                                <DocumentIcon />
                                <h3 className="text-xl font-bold text-brand-blue flex-grow group-hover:text-brand-gold transition-colors duration-300">{doc.title}</h3>
                                <p className="text-gray-600 my-4 h-20">{doc.description}</p>
                                <a
                                    href={doc.filePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto inline-flex items-center bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    Download PDF
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            );
        }

        return null;
    }


    return (
        <div className="bg-brand-light">
            <SEO
                title="Resources & Media"
                description="Explore educational videos and helpful documents from New Holland Financial Group to learn more about insurance and financial planning."
                keywords="insurance resources, financial planning documents, life insurance videos, annuities guide"
            />
            {/* Header Section */}
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Resources & Media Hub</h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Stay informed with our collection of educational videos and helpful documents.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-20">
                {/* Tab Navigation */}
                <div className="border-b-2 border-white mb-[-2px] flex justify-center">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`${commonTabStyles} ${activeTab === 'videos' ? activeTabStyles : inactiveTabStyles}`}
                        aria-selected={activeTab === 'videos'}
                        role="tab"
                    >
                        Educational Videos
                    </button>
                    <button
                        onClick={() => setActiveTab('documents')}
                        className={`${commonTabStyles} ${activeTab === 'documents' ? activeTabStyles : inactiveTabStyles}`}
                        aria-selected={activeTab === 'documents'}
                        role="tab"
                    >
                        Helpful Documents
                    </button>
                </div>

                <div className="bg-white p-6 sm:p-10 rounded-b-lg shadow-xl">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;
