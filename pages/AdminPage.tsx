import React, { useState, useMemo } from 'react';
import { ADVISORS, YOUTUBE_VIDEOS, DOCUMENT_RESOURCES } from '../constants';
import type { Advisor, YouTubeVideo, DocumentResource } from '../types';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';

// Helper component for code snippets
const GeneratedCodeBlock: React.FC<{ title: string; code: string }> = ({ title, code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-white">{title}</h4>
                <button
                    onClick={handleCopy}
                    className="bg-brand-gold text-brand-blue text-sm font-bold py-1 px-3 rounded-md hover:bg-yellow-400 transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="text-sm text-gray-300 bg-black bg-opacity-25 p-3 rounded-md overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
};

// FIX: Define a type for documents managed in the admin state, ensuring 'id' is required.
// This resolves a TypeScript error where the generic `handleDeleteItem` function
// expected a type with a required `id` property.
type ManagedDocumentResource = DocumentResource & { id: string };

const AdminPage: React.FC = () => {
    // States for existing content
    const [advisors, setAdvisors] = useState<Advisor[]>(ADVISORS);
    const [videos, setVideos] = useState<YouTubeVideo[]>(YOUTUBE_VIDEOS);
    const [documents, setDocuments] = useState<ManagedDocumentResource[]>(() =>
        DOCUMENT_RESOURCES.map(doc => ({ ...doc, id: crypto.randomUUID() }))
    );

    // States for form visibility
    const [showAdvisorForm, setShowAdvisorForm] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);
    
    // States for new items
    const [newAdvisor, setNewAdvisor] = useState({ name: '', title: '', imageUrl: '', specialties: '', bio: '' });
    const [newVideo, setNewVideo] = useState({ id: '', title: '', description: '' });
    const [newDocument, setNewDocument] = useState({ title: '', description: '', filePath: '' });

    const [openSection, setOpenSection] = useState<string | null>(null);

    // Memoized generated code
    const generatedAdvisorsCode = useMemo(() => `export const ADVISORS: Advisor[] = ${JSON.stringify(advisors, null, 2)};`, [advisors]);
    const generatedVideosCode = useMemo(() => `export const YOUTUBE_VIDEOS: YouTubeVideo[] = ${JSON.stringify(videos, null, 2)};`, [videos]);
    const generatedDocumentsCode = useMemo(() => {
         const docsToExport = documents.map(({ id, ...rest }) => rest);
         return `export const DOCUMENT_RESOURCES: DocumentResource[] = ${JSON.stringify(docsToExport, null, 2)};`;
    }, [documents]);

    // Delete handler
    const handleDeleteItem = <T extends { id: any }>(setter: React.Dispatch<React.SetStateAction<T[]>>, id: any) => {
        setter(prev => prev.filter(item => item.id !== id));
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
        };
        setAdvisors(prev => {
            const newId = prev.length > 0 ? prev.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1 : 1;
            return [...prev, { ...advisorData, id: newId }];
        });
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '' });
        setShowAdvisorForm(false);
    };

    const handleAddVideo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideo.id || !newVideo.title) {
            alert("YouTube ID and Title are required.");
            return;
        }
        setVideos(prev => [...prev, newVideo]);
        setNewVideo({ id: '', title: '', description: '' });
        setShowVideoForm(false);
    };

    const handleAddDocument = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDocument.title || !newDocument.filePath) {
            alert("Title and File Path are required.");
            return;
        }
        setDocuments(prev => [...prev, { ...newDocument, id: crypto.randomUUID() }]);
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
                    <p className="font-bold">How to Update Your Site</p>
                    <p>1. Make your changes to the content below using the forms.</p>
                    <p>2. The "Generated Code" section at the bottom will update automatically.</p>
                    <p>3. Click "Copy" for each code block you've changed.</p>
                    <p>4. Paste the copied code into your `src/constants.tsx` file, replacing the old content.</p>
                    <p>5. Redeploy your application to see the changes live.</p>
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
                                    <button onClick={() => handleDeleteItem(setAdvisors, adv.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
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
                                     <button onClick={() => handleDeleteItem(setVideos, vid.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
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
                                    <button onClick={() => handleDeleteItem(setDocuments, doc.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
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


                {/* Generated Code Section */}
                <section id="generated-code">
                    <h2 className="text-3xl font-bold text-brand-blue mb-6 border-t pt-8">Generated Code for `constants.tsx`</h2>
                    <p className="mb-6 text-gray-600">Copy the blocks below and paste them into your `src/constants.tsx` file to update your site's content.</p>
                    <GeneratedCodeBlock title="ADVISORS" code={generatedAdvisorsCode} />
                    <GeneratedCodeBlock title="YOUTUBE_VIDEOS" code={generatedVideosCode} />
                    <GeneratedCodeBlock title="DOCUMENT_RESOURCES" code={generatedDocumentsCode} />
                </section>

            </div>
        </div>
    );
};

export default AdminPage;