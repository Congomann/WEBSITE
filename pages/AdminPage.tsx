
import React, { useState } from 'react';
import type { Advisor, YouTubeVideo, DocumentResource } from '../types';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';
import { advisors as initialAdvisors, youtube_videos as initialVideos, document_resources as initialDocuments } from '../data';

const AdminPage: React.FC = () => {
    // States for existing content, initialized with static data
    const [advisors, setAdvisors] = useState<Advisor[]>(initialAdvisors);
    const [videos, setVideos] = useState<YouTubeVideo[]>(initialVideos);
    const [documents, setDocuments] = useState<DocumentResource[]>(initialDocuments);

    // States for form visibility
    const [showAdvisorForm, setShowAdvisorForm] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);
    
    // States for new items
    const [newAdvisor, setNewAdvisor] = useState({ name: '', title: '', imageUrl: '', specialties: '', bio: '' });
    const [newVideo, setNewVideo] = useState({ id: '', title: '', description: '' });
    const [newDocument, setNewDocument] = useState({ title: '', description: '', filePath: '' });

    const [openSection, setOpenSection] = useState<string | null>(null);

    // --- State Management Handlers (simulating API) ---
    const handleDeleteItem = (type: 'advisors' | 'videos' | 'documents', id: any) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        if (type === 'advisors') setAdvisors(advisors.filter(a => a.id !== id));
        if (type === 'videos') setVideos(videos.filter(v => v.id !== id));
        if (type === 'documents') setDocuments(documents.filter(d => d.id !== id));
    };

    // Generic form input change handler
    const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    // Add handlers for each content type
    const handleAddAdvisor = (e: React.FormEvent) => {
        e.preventDefault();
        const advisorData = {
            ...newAdvisor,
            specialties: newAdvisor.specialties.split(',').map(s => s.trim()).filter(Boolean),
            id: Date.now() // Simulate new ID
        };
        setAdvisors(prev => [...prev, advisorData]);
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '' });
        setShowAdvisorForm(false);
    };

    const handleAddVideo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideo.id || !newVideo.title) return alert("YouTube ID and Title are required.");
        setVideos(prev => [...prev, newVideo]);
        setNewVideo({ id: '', title: '', description: '' });
        setShowVideoForm(false);
    };

    const handleAddDocument = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDocument.title || !newDocument.filePath) return alert("Title and File Path are required.");
        const docData = { ...newDocument, id: `doc-${Date.now()}` };
        setDocuments(prev => [...prev, docData]);
        setNewDocument({ title: '', description: '', filePath: '' });
        setShowDocumentForm(false);
    };

    const toggleSection = (sectionId: string) => {
        setOpenSection(prev => (prev === sectionId ? null : sectionId));
    };
    
    const formInputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white text-gray-900";
    const formLabelClass = "block text-sm font-medium text-gray-700";
    
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
                        Use this page to update your website's content.
                    </p>
                </div>
            </section>
            <div className="container mx-auto px-6 py-16">
                 <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-12" role="alert">
                    <p className="font-bold">Demonstration Mode</p>
                    <p>This is a demonstration of the admin panel. Changes made here will not be saved permanently.</p>
                </div>

                <h2 className="text-3xl font-bold text-brand-blue mb-6">Manage Content Sections</h2>
                <div className="rounded-lg shadow-lg overflow-hidden mb-12">
                    {/* MANAGE ADVISORS */}
                    <Accordion
                        title="Manage Advisors"
                        isOpen={openSection === 'manage-advisors'}
                        onToggle={() => toggleSection('manage-advisors')}
                    >
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
