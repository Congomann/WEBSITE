
import React, { useState, useEffect } from 'react';
import type { Advisor, VideoResource, DocumentResource, Product, AgentApplication } from '../types';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';
import { advisors as initialAdvisors, video_resources as initialVideos, document_resources as initialDocuments } from '../data';
import { useProducts } from '../contexts/ProductContext';


const AdminPage: React.FC = () => {
    // Products are now managed via context
    const { products, addProduct, deleteProduct } = useProducts();

    // States for existing content, initialized with static data
    const [advisors, setAdvisors] = useState<Advisor[]>(initialAdvisors);
    const [videos, setVideos] = useState<VideoResource[]>(initialVideos);
    const [documents, setDocuments] = useState<DocumentResource[]>(initialDocuments);
    const [applications, setApplications] = useState<AgentApplication[]>([]);

    useEffect(() => {
        // Fetch applications from the backend
        const fetchApplications = async () => {
            try {
                const response = await fetch('/api/agent-applications');
                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error("Error fetching agent applications:", error);
            }
        };
        fetchApplications();
    }, []);

    // States for form visibility
    const [showAdvisorForm, setShowAdvisorForm] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    
    // States for new/editing items
    const [newAdvisor, setNewAdvisor] = useState({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '' });
    const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null);
    const [newVideo, setNewVideo] = useState({ url: '', title: '', description: '', type: 'youtube' as 'youtube' | 'direct' });
    const [newDocument, setNewDocument] = useState({ title: '', description: '', filePath: '' });
    const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '', description: '' });
    const [productFormErrors, setProductFormErrors] = useState({ price: '', imageUrl: '' });


    const [openSection, setOpenSection] = useState<string | null>(null);

    const extractYouTubeID = (url: string): string | null => {
        if (!url) return null;
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
            return url;
        }
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        }
        return null;
    };

    const isValidUrl = (urlString: string): boolean => {
        try {
            new URL(urlString);
            // Check for common image extensions for better validation, though not foolproof
            return /\.(jpeg|jpg|gif|png|svg|webp)$/.test(urlString.toLowerCase());
        } catch (e) {
            return false;
        }
    };


    // --- State Management Handlers (simulating API) ---
    const handleDeleteItem = async (type: 'advisors' | 'videos' | 'documents' | 'products' | 'applications', id: any) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        if (type === 'advisors') setAdvisors(advisors.filter(a => a.id !== id));
        if (type === 'videos') setVideos(videos.filter(v => v.id !== id));
        if (type === 'documents') setDocuments(documents.filter(d => d.id !== id));
        if (type === 'products') deleteProduct(id);
        if (type === 'applications') {
            try {
                const response = await fetch(`/api/agent-applications/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Failed to delete application');
                }
                setApplications(applications.filter(a => a.id !== id));
            } catch (error) {
                 console.error("Error deleting application:", error);
                 alert('Could not delete application. Please try again.');
            }
        }
    };

    // Generic form input change handler
    const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    // --- Advisor Handlers ---
    const handleAdvisorFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const advisorDataFromForm = {
            name: newAdvisor.name,
            title: newAdvisor.title,
            imageUrl: newAdvisor.imageUrl,
            bio: newAdvisor.bio,
            specialties: newAdvisor.specialties.split(',').map(s => s.trim()).filter(Boolean),
            languages: newAdvisor.languages.split(',').map(s => s.trim()).filter(Boolean),
        };

        if (editingAdvisor) {
            // Update existing advisor
            const updatedAdvisor = { ...editingAdvisor, ...advisorDataFromForm };
            setAdvisors(advisors.map(a => a.id === editingAdvisor.id ? updatedAdvisor : a));
        } else {
            // Add new advisor
            const newAdvisorWithId = { ...advisorDataFromForm, id: Date.now() };
            setAdvisors(prev => [...prev, newAdvisorWithId]);
        }
        
        // Reset form and state
        setShowAdvisorForm(false);
        setEditingAdvisor(null);
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '' });
    };

    const handleEditAdvisor = (advisor: Advisor) => {
        setEditingAdvisor(advisor);
        setNewAdvisor({
            name: advisor.name,
            title: advisor.title,
            imageUrl: advisor.imageUrl,
            bio: advisor.bio,
            specialties: advisor.specialties.join(', '),
            languages: advisor.languages ? advisor.languages.join(', ') : '',
        });
        setShowAdvisorForm(true);
    };
    
    const handleAddNewAdvisorClick = () => {
        setEditingAdvisor(null); // Ensure we are in "add" mode
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '' });
        setShowAdvisorForm(true);
    };

    const handleAdvisorFormCancel = () => {
        setShowAdvisorForm(false);
        setEditingAdvisor(null);
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '' });
    };

    // --- Other Content Handlers ---
    const handleAddVideo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideo.url || !newVideo.title) return alert("Video URL and Title are required.");

        let source = newVideo.url;
        if (newVideo.type === 'youtube') {
            const youtubeId = extractYouTubeID(newVideo.url);
            if (!youtubeId) {
                return alert("Invalid YouTube URL. Please provide a valid video link or ID.");
            }
            source = youtubeId;
        }
        
        const videoData: VideoResource = {
            id: `vid-${Date.now()}`,
            title: newVideo.title,
            description: newVideo.description,
            type: newVideo.type,
            source: source
        };

        setVideos(prev => [...prev, videoData]);
        setNewVideo({ url: '', title: '', description: '', type: 'youtube' });
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
    
    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = { price: '', imageUrl: '' };
        let isValid = true;

        const price = parseFloat(newProduct.price);
        if (isNaN(price) || price <= 0) {
            errors.price = 'Please enter a valid positive number for the price.';
            isValid = false;
        }

        if (!isValidUrl(newProduct.imageUrl)) {
            errors.imageUrl = 'Please enter a valid URL for the image (e.g., https://.../image.png).';
            isValid = false;
        }
        
        setProductFormErrors(errors);

        if (!isValid) {
            return;
        }

        addProduct({ ...newProduct, price });
        setNewProduct({ name: '', price: '', imageUrl: '', description: '' });
        setShowProductForm(false);
    };

    const handleShowProductForm = () => {
        setShowProductForm(true);
        setProductFormErrors({ price: '', imageUrl: '' });
    };

    const handleCancelProductForm = () => {
        setShowProductForm(false);
        setNewProduct({ name: '', price: '', imageUrl: '', description: '' });
        setProductFormErrors({ price: '', imageUrl: '' });
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
                    <p>This is a demonstration of the admin panel. Changes are saved to your browser's local storage and will be visible on the site until the data is cleared.</p>
                </div>

                <h2 className="text-3xl font-bold text-brand-blue mb-6">Manage Content Sections</h2>
                <div className="rounded-lg shadow-lg overflow-hidden mb-12">
                    {/* MANAGE AGENT APPLICATIONS */}
                    <Accordion
                        title={`Manage Agent Applications (${applications.length})`}
                        isOpen={openSection === 'manage-applications'}
                        onToggle={() => toggleSection('manage-applications')}
                    >
                        <div className="space-y-4">
                            {applications.length > 0 ? (
                                applications.map(app => (
                                    <div key={app.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-lg">{app.name}</p>
                                                <p className="text-sm text-gray-600">Submitted: {new Date(app.submittedAt).toLocaleString()}</p>
                                            </div>
                                            <button onClick={() => handleDeleteItem('applications', app.id)} className="text-red-500 hover:text-red-700 font-semibold flex-shrink-0 ml-4">Delete</button>
                                        </div>
                                        <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-2">
                                            <p><strong>Email:</strong> <a href={`mailto:${app.email}`} className="text-brand-blue hover:underline">{app.email}</a></p>
                                            <p><strong>Phone:</strong> <a href={`tel:${app.phone}`} className="text-brand-blue hover:underline">{app.phone}</a></p>
                                            <p><strong>Location:</strong> {app.city}, {app.state}</p>
                                            <p><strong>License No:</strong> {app.licenseNo}</p>
                                            <p><strong>Experience:</strong> {app.experience} years</p>
                                            {app.linkedin && <p><strong>LinkedIn:</strong> <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">View Profile</a></p>}
                                            {app.message && <div className="mt-2"><p><strong>Message:</strong></p><p className="whitespace-pre-wrap bg-white p-2 border rounded">{app.message}</p></div>}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No agent applications found.</p>
                            )}
                        </div>
                    </Accordion>

                    {/* MANAGE PRODUCTS */}
                    <Accordion
                        title="Manage Products"
                        isOpen={openSection === 'manage-products'}
                        onToggle={() => toggleSection('manage-products')}
                    >
                        <div className="space-y-4">
                            {products.length > 0 ? (
                                products.map(prod => (
                                    <div key={prod.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-lg">{prod.name}</p>
                                            <p className="text-sm text-gray-600">${prod.price.toFixed(2)}</p>
                                        </div>
                                        <button onClick={() => handleDeleteItem('products', prod.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No products found. Add a new product to get started.</p>
                            )}
                        </div>
                        {showProductForm ? (
                            <form onSubmit={handleAddProduct} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4" noValidate>
                                <h4 className="text-lg font-bold text-brand-blue">Add New Product</h4>
                                <div>
                                    <label htmlFor="prod-name" className={formLabelClass}>Product Name</label>
                                    <input type="text" name="name" id="prod-name" required value={newProduct.name} onChange={(e) => handleInputChange(setNewProduct, e)} className={formInputClass} placeholder="e.g., Financial Peace Mug" />
                                </div>
                                <div>
                                    <label htmlFor="prod-price" className={formLabelClass}>Price</label>
                                    <input type="number" name="price" id="prod-price" required step="0.01" value={newProduct.price} onChange={(e) => handleInputChange(setNewProduct, e)} className={`${formInputClass} ${productFormErrors.price ? 'border-red-500' : ''}`} placeholder="e.g., 15.99" />
                                    {productFormErrors.price && <p className="mt-1 text-sm text-red-600">{productFormErrors.price}</p>}
                                </div>
                                <div>
                                    <label htmlFor="prod-imageUrl" className={formLabelClass}>Image URL</label>
                                    <input type="text" name="imageUrl" id="prod-imageUrl" required value={newProduct.imageUrl} onChange={(e) => handleInputChange(setNewProduct, e)} className={`${formInputClass} ${productFormErrors.imageUrl ? 'border-red-500' : ''}`} placeholder="e.g., https://example.com/image.png" />
                                    {productFormErrors.imageUrl && <p className="mt-1 text-sm text-red-600">{productFormErrors.imageUrl}</p>}
                                </div>
                                <div>
                                    <label htmlFor="prod-description" className={formLabelClass}>Description</label>
                                    <textarea name="description" id="prod-description" required rows={3} value={newProduct.description} onChange={(e) => handleInputChange(setNewProduct, e)} className={formInputClass} placeholder="e.g., A sturdy ceramic mug for your morning coffee."></textarea>
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">Save Product</button>
                                    <button type="button" onClick={handleCancelProductForm} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button>
                                </div>
                            </form>
                        ) : (
                             <button onClick={handleShowProductForm} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">Add New Product</button>
                        )}
                    </Accordion>
                    
                    {/* MANAGE ADVISORS */}
                    <Accordion
                        title="Manage Advisors"
                        isOpen={openSection === 'manage-advisors'}
                        onToggle={() => toggleSection('manage-advisors')}
                    >
                        <div className="space-y-4">
                            {advisors.map(adv => (
                                <div key={adv.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-2">
                                    <div>
                                        <p className="font-bold text-lg">{adv.name}</p>
                                        <p className="text-sm text-gray-600">{adv.title}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleEditAdvisor(adv)} className="text-brand-blue hover:text-blue-700 font-semibold">Edit</button>
                                        <button onClick={() => handleDeleteItem('advisors', adv.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {showAdvisorForm ? (
                            <form onSubmit={handleAdvisorFormSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">{editingAdvisor ? 'Edit Advisor' : 'Add New Advisor'}</h4>
                                <div><label htmlFor="name" className={formLabelClass}>Name</label><input type="text" name="name" id="name" required value={newAdvisor.name} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="title" className={formLabelClass}>Title</label><input type="text" name="title" id="title" required value={newAdvisor.title} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="imageUrl" className={formLabelClass}>Image URL</label><input type="text" name="imageUrl" id="imageUrl" required value={newAdvisor.imageUrl} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="specialties" className={formLabelClass}>Specialties</label><input type="text" name="specialties" id="specialties" required placeholder="comma, separated, values" value={newAdvisor.specialties} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="languages" className={formLabelClass}>Languages</label><input type="text" name="languages" id="languages" placeholder="English, Spanish, French" value={newAdvisor.languages} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="bio" className={formLabelClass}>Bio</label><textarea name="bio" id="bio" required rows={3} value={newAdvisor.bio} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4">
                                    <button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">{editingAdvisor ? 'Save Changes' : 'Save Advisor'}</button>
                                    <button type="button" onClick={handleAdvisorFormCancel} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <button onClick={handleAddNewAdvisorClick} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">Add New Advisor</button>
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
                                         <p className="text-sm text-gray-600 capitalize">Type: {vid.type}</p>
                                     </div>
                                     <button onClick={() => handleDeleteItem('videos', vid.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                 </div>
                            ))}
                        </div>
                        {showVideoForm ? (
                             <form onSubmit={handleAddVideo} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">Add New Video</h4>
                                
                                <div>
                                    <label className={formLabelClass}>Video Type</label>
                                    <div className="mt-2 flex gap-x-6">
                                        <label className="flex items-center">
                                            <input type="radio" name="type" value="youtube" checked={newVideo.type === 'youtube'} onChange={(e) => setNewVideo(prev => ({...prev, type: 'youtube'}))} className="focus:ring-brand-blue h-4 w-4 text-brand-blue border-gray-300" />
                                            <span className="ml-2 text-gray-700">YouTube</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="type" value="direct" checked={newVideo.type === 'direct'} onChange={(e) => setNewVideo(prev => ({...prev, type: 'direct'}))} className="focus:ring-brand-blue h-4 w-4 text-brand-blue border-gray-300" />
                                            <span className="ml-2 text-gray-700">Direct Link</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div>
                                  <label htmlFor="vid-url" className={formLabelClass}>
                                    {newVideo.type === 'youtube' ? 'YouTube URL or Video ID' : 'Direct Video URL (.mp4, .webm)'}
                                  </label>
                                  <input type="text" name="url" id="vid-url" required value={newVideo.url} onChange={(e) => handleInputChange(setNewVideo, e)} className={formInputClass} />
                                </div>
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