
import React, { useState, useEffect, useCallback } from 'react';
import type { Advisor, YouTubeVideo, DocumentResource } from '../types';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_BASE_URL } from '../constants';

const AdminPage: React.FC = () => {
    // States for existing content
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [documents, setDocuments] = useState<DocumentResource[]>([]);
    const [isLoading, setIsLoading] = useState({advisors: false, videos: false, documents: false});

    // States for form visibility
    const [showAdvisorForm, setShowAdvisorForm] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);
    
    // States for new items
    const [newAdvisor, setNewAdvisor] = useState({ name: '', title: '', imageUrl: '', specialties: '', bio: '' });
    const [newVideo, setNewVideo] = useState({ id: '', title: '', description: '' });
    const [newDocument, setNewDocument] = useState({ title: '', description: '', filePath: '' });

    const [openSection, setOpenSection] = useState<string | null>(null);

    // --- Data Fetching ---
    const fetchAdvisors = useCallback(async () => {
        setIsLoading(prev => ({...prev, advisors: true}));
        const res = await fetch(`${API_BASE_URL}/api/advisors`);
        const data = await res.json();
        setAdvisors(data);
        setIsLoading(prev => ({...prev, advisors: false}));
    }, []);

    const fetchVideos = useCallback(async () => {
        setIsLoading(prev => ({...prev, videos: true}));
        const res = await fetch(`${API_BASE_URL}/api/resources/videos`);
        const data = await res.json();
        setVideos(data);
        setIsLoading(prev => ({...prev, videos: false}));
    }, []);

    const fetchDocuments = useCallback(async () => {
        setIsLoading(prev => ({...prev, documents: true}));
        const res = await fetch(`${API_BASE_URL}/api/resources/documents`);
        const data = await res.json();
        setDocuments(data);
        setIsLoading(prev => ({...prev, documents: false}));
    }, []);

    useEffect(() => {
        fetchAdvisors();
        fetchVideos();
        fetchDocuments();
    }, [fetchAdvisors, fetchVideos, fetchDocuments]);

    // --- API Handlers ---
    const handleDeleteItem = async (type: 'advisors' | 'videos' | 'documents', id: any) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        let url = '';
        if (type === 'advisors') url = `${API_BASE_URL}/api/advisors/${id}`;
        if (type === 'videos') url = `${API_BASE_URL}/api/resources/videos/${id}`;
        if (type === 'documents') url = `${API_BASE_URL}/api/resources/documents/${id}`;

        await fetch(url, { method: 'DELETE' });

        // Refetch data after delete
        if (type === 'advisors') fetchAdvisors();
        if (type === 'videos') fetchVideos();
        if (type === 'documents') fetchDocuments();
    };

    // Generic form input change handler
    const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    // Add handlers for each content type
    const handleAddAdvisor = async (e: React.FormEvent) => {
        e.preventDefault();
        const advisorData = {
            ...newAdvisor,
            specialties: newAdvisor.specialties.split(',').map(s => s.trim()).filter(Boolean),
        };
        await fetch(`${API_BASE_URL}/api/advisors`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(advisorData) });
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '' });
        setShowAdvisorForm(false);
        fetchAdvisors();
    };

    const handleAddVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideo.id || !newVideo.title) return alert("YouTube ID and Title are required.");
        await fetch(`${API_BASE_URL}/api/resources/videos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newVideo) });
        setNewVideo({ id: '', title: '', description: '' });
        setShowVideoForm(false);
        fetchVideos();
    };

    const handleAddDocument = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDocument.title || !newDocument.filePath) return alert("Title and File Path are required.");
        await fetch(`${API_BASE_URL}/api/resources/documents`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newDocument) });
        setNewDocument({ title: '', description: '', filePath: '' });
        setShowDocumentForm(false);
        fetchDocuments();
    };

    const toggleSection = (sectionId: string) => {
        setOpenSection(prev => (prev === sectionId ? null : sectionId));
    };
    
    const formInputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white text-gray-900";
    const formLabelClass = "block text-sm font-medium text-gray-700";
    
    const renderLoading = () => <div className="flex justify-center p-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div></div>;

    return (
        <div className="bg-white">
            <SEO
                title="Admin | Content Management"
                description="Manage website content for New Holland Financial Group."
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Content Management</h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Use this page to update your website's content live.
                    </p>
                </div>
            </section>
            <div className="container mx-auto px-6 py-16">
                 <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-12" role="alert">
                    <p className="font-bold">Live Content Management</p>
                    <p>Changes made on this page will be saved to the database and reflected on the website immediately.</p>
                </div>

                <h2 className="text-3xl font-bold text-brand-blue mb-6">Manage Content Sections</h2>
                <div className="rounded-lg shadow-lg overflow-hidden mb-12">
                    {/* MANAGE ADVISORS */}
                    <Accordion
                        title="Manage Advisors"
                        isOpen={openSection === 'manage-advisors'}
                        onToggle={() => toggleSection('manage-advisors')}
                    >
                        {isLoading.advisors ? renderLoading() : (
                            <div className="space-y-4">
                                {advisors.map(adv => (
                                    <div key={adv.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-lg">{adv.name}</p>
                                            <p className="text-sm text-gray-600">{adv.title}</p>
                                        </div>
                                        <button onClick={() => handleDeleteItem('advisors', adv.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showAdvisorForm ? (
                            <form onSubmit={handleAddAdvisor} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">Add New Advisor</h4>
                                <div><label htmlFor="name" className={formLabelClass}>Name</label><input type="text" name="name" id="name" required value={newAdvisor.name} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="title" className={formLabelClass}>Title</label><input type="text" name="title" id="title" required value={newAdvisor.title} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="imageUrl" className={formLabelClass}>Image URL</label><input type="text" name="imageUrl" id="imageUrl" required value={newAdvisor.imageUrl} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="specialties" className={formLabelClass}>Specialties</label><input type="text" name="specialties" id="specialties" required placeholder="comma, separated, values" value={newAdvisor.specialties} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="bio" className={formLabelClass}>Bio</label><textarea name="bio" id="bio" required rows={3} value={newAdvisor.bio} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">Save Advisor</button><button type="button" onClick={() => setShowAdvisorForm(false)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button></div>
                            </form>
                        ) : (
                            <button onClick={() => setShowAdvisorForm(true)} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">Add New Advisor</button>
                        )}
                    </Accordion>

                    {/* MANAGE VIDEOS */}
                    <Accordion
                        title="Manage Videos"
                        isOpen={openSection === 'manage-videos'}
                        onToggle={() => toggleSection('manage-videos')}
                    >
                         {isLoading.videos ? renderLoading() : (
                            <div className="space-y-4">
                                {videos.map(vid => (
                                     <div key={vid.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                         <div>
                                             <p className="font-bold text-lg">{vid.title}</p>
                                             <p className="text-sm text-gray-600">YouTube ID: {vid.id}</p>
                                         </div>
                                         <button onClick={() => handleDeleteItem('videos', vid.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                     </div>
                                ))}
                            </div>
                        )}
                        {showVideoForm ? (
                             <form onSubmit={handleAddVideo} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">Add New Video</h4>
                                <div><label htmlFor="vid-id" className={formLabelClass}>YouTube Video ID</label><input type="text" name="id" id="vid-id" required value={newVideo.id} onChange={(e) => handleInputChange(setNewVideo, e)} className={formInputClass} /></div>
                                <div><label htmlFor="vid-title" className={formLabelClass}>Title</label><input type="text" name="title" id="vid-title" required value={newVideo.title} onChange={(e) => handleInputChange(setNewVideo, e)} className={formInputClass} /></div>
                                <div><label htmlFor="vid-desc" className={formLabelClass}>Description</label><textarea name="description" id="vid-desc" rows={3} value={newVideo.description} onChange={(e) => handleInputChange(setNewVideo, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">Save Video</button><button type="button" onClick={() => setShowVideoForm(false)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button></div>
                            </form>
                        ) : (
                            <button onClick={() => setShowVideoForm(true)} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">Add New Video</button>
                        )}
                    </Accordion>

                    {/* MANAGE DOCUMENTS */}
                    <Accordion
                        title="Manage Documents"
                        isOpen={openSection === 'manage-documents'}
                        onToggle={() => toggleSection('manage-documents')}
                    >
                        {isLoading.documents ? renderLoading() : (
                            <div className="space-y-4">
                                {documents.map(doc => (
                                    <div key={doc.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-lg">{doc.title}</p>
                                            <p className="text-sm text-gray-600">{doc.filePath}</p>
                                        </div>
                                        <button onClick={() => handleDeleteItem('documents', doc.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showDocumentForm ? (
                            <form onSubmit={handleAddDocument} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">Add New Document</h4>
                                <div><label htmlFor="doc-title" className={formLabelClass}>Title</label><input type="text" name="title" id="doc-title" required value={newDocument.title} onChange={(e) => handleInputChange(setNewDocument, e)} className={formInputClass} /></div>
                                <div><label htmlFor="doc-desc" className={formLabelClass}>Description</label><textarea name="description" id="doc-desc" rows={3} value={newDocument.description} onChange={(e) => handleInputChange(setNewDocument, e)} className={formInputClass}></textarea></div>
                                <div><label htmlFor="doc-path" className={formLabelClass}>File Path (URL)</label><input type="text" name="filePath" id="doc-path" required value={newDocument.filePath} onChange={(e) => handleInputChange(setNewDocument, e)} className={formInputClass} /></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">Save Document</button><button type="button" onClick={() => setShowDocumentForm(false)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button></div>
                            </form>
                        ) : (
                            <button onClick={() => setShowDocumentForm(true)} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">Add New Document</button>
                        )}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;