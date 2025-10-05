
import React, { useState, useEffect } from 'react';
import type { YouTubeVideo, DocumentResource } from '../types';
import YouTubeEmbed from '../components/YouTubeEmbed';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_BASE_URL } from '../constants';

const ResourcesPage: React.FC = () => {
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [documents, setDocuments] = useState<DocumentResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            setIsLoading(true);
            try {
                const [videosRes, docsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/resources/videos`),
                    fetch(`${API_BASE_URL}/api/resources/documents`)
                ]);
                if (!videosRes.ok || !docsRes.ok) {
                    throw new Error('Failed to fetch resources');
                }
                const videosData = await videosRes.json();
                const docsData = await docsRes.json();
                setVideos(videosData);
                setDocuments(docsData);
            } catch (error) {
                console.error("Error fetching resources:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchResources();
    }, []);

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
                {isLoading ? (
                    <div className="flex justify-center py-10"><LoadingSpinner /></div>
                ) : (
                    <>
                        {/* Videos Section */}
                        <section id="videos">
                            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Educational Videos</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {videos.map(video => (
                                    <div key={video.id} className="bg-white p-6 rounded-lg shadow-xl flex flex-col">
                                        <div className="mb-4 rounded-lg overflow-hidden">
                                            <YouTubeEmbed embedId={video.id} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-blue mb-2">{video.title}</h3>
                                        <p className="text-gray-600 flex-grow">{video.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Documents Section */}
                        <section id="documents" className="mt-20">
                            <h2 className="text-3xl font-bold text-brand-blue mb-8 text-center">Helpful Documents</h2>
                            <div className="max-w-4xl mx-auto space-y-6">
                                {documents.map((doc) => (
                                    <div key={doc.id} className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-brand-blue">{doc.title}</h3>
                                            <p className="text-gray-600 mt-1">{doc.description}</p>
                                        </div>
                                        <a
                                            href={doc.filePath}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                            Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResourcesPage;