
import React, { useState, useEffect } from 'react';
import type { Advisor, VideoResource, DocumentResource, Product, AgentApplication } from '../types';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';
import { useData } from '../contexts/DataContext';
import { useProducts } from '../contexts/ProductContext';
import LoadingSpinner from '../components/LoadingSpinner';


const AdminPage: React.FC = () => {
    // Data from contexts
    const { products, addProduct, updateProduct, deleteProduct, loading: productsLoading } = useProducts();
    const { advisors, videos, documents, refetchData, loading: dataLoading } = useData();
    
    // Local state for this component
    const [applications, setApplications] = useState<AgentApplication[]>([]);
    const [appsLoading, setAppsLoading] = useState(true);

    // Persist changes to localStorage
    useEffect(() => {
        const fetchApplications = async () => {
            setAppsLoading(true);
            try {
                const response = await fetch('/api/agent-applications');
                if (!response.ok) throw new Error('Failed to fetch applications');
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error("Error fetching agent applications:", error);
            } finally {
                setAppsLoading(false);
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
    const [editingVideo, setEditingVideo] = useState<VideoResource | null>(null);
    const [newDocument, setNewDocument] = useState({ title: '', description: '', filePath: '' });
    const [editingDocument, setEditingDocument] = useState<DocumentResource | null>(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '', description: '' });
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productFormErrors, setProductFormErrors] = useState({ price: '', imageUrl: '' });
    const [documentFormError, setDocumentFormError] = useState('');


    const [openSection, setOpenSection] = useState<string | null>(null);

    const extractYouTubeID = (url: string): string | null => {
        if (!url) return null;
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isValidUrl = (urlString: string): boolean => {
        try {
            new URL(urlString);
            return /\.(jpeg|jpg|gif|png|svg|webp)$/.test(urlString.toLowerCase());
        } catch (e) { return false; }
    };

    // --- API Handlers ---
    const handleDeleteItem = async (type: 'advisors' | 'videos' | 'documents' | 'products' | 'applications', id: any) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        
        let url = '';
        switch (type) {
            case 'advisors': url = `/api/advisors/${id}`; break;
            case 'videos': url = `/api/resources/videos/${id}`; break;
            case 'documents': url = `/api/resources/documents/${id}`; break;
            case 'applications': url = `/api/agent-applications/${id}`; break;
            case 'products':
                await deleteProduct(id);
                return; // Product context handles its own state
        }
        
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Failed to delete ${type}`);
            
            if (type === 'applications') {
                setApplications(prev => prev.filter(a => a.id !== id));
            } else {
                await refetchData(); // Refetch data for other types
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            alert(`Could not delete item. Please try again.`);
        }
    };
    
    // Generic form input change handler
    const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    // --- Advisor Handlers ---
    const handleAdvisorFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const advisorData = {
            name: newAdvisor.name,
            title: newAdvisor.title,
            imageUrl: newAdvisor.imageUrl,
            bio: newAdvisor.bio,
            specialties: newAdvisor.specialties.split(',').map(s => s.trim()).filter(Boolean),
            languages: newAdvisor.languages.split(',').map(s => s.trim()).filter(Boolean),
        };

        const url = editingAdvisor ? `/api/advisors/${editingAdvisor.id}` : '/api/advisors';
        const method = editingAdvisor ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(advisorData),
            });
            if (!response.ok) throw new Error('Failed to save advisor');
            await refetchData();
            handleAdvisorFormCancel();
        } catch (error) {
            console.error(error);
            alert('Failed to save advisor.');
        }
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
        setEditingAdvisor(null);
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '' });
        setShowAdvisorForm(true);
    };
    const handleAdvisorFormCancel = () => {
        setShowAdvisorForm(false);
        setEditingAdvisor(null);
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '' });
    };

    // --- Video Handlers ---
    const handleVideoFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideo.url || !newVideo.title) return alert("Video URL and Title are required.");

        let source = newVideo.url;
        if (newVideo.type === 'youtube') {
            const youtubeId = extractYouTubeID(newVideo.url);
            if (!youtubeId) return alert("Invalid YouTube URL. Please provide a valid video link or ID.");
            source = youtubeId;
        }
        
        const videoData = { title: newVideo.title, description: newVideo.description, type: newVideo.type, source };
        const url = editingVideo ? `/api/resources/videos/${editingVideo.id}` : '/api/resources/videos';
        const method = editingVideo ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoData),
            });
            if (!response.ok) throw new Error('Failed to save video');
            await refetchData();
            handleVideoFormCancel();
        } catch (error) {
            console.error(error);
            alert('Failed to save video.');
        }
    };
    const handleAddNewVideoClick = () => {
        setEditingVideo(null);
        setNewVideo({ url: '', title: '', description: '', type: 'youtube' });
        setShowVideoForm(true);
    };
    const handleEditVideo = (video: VideoResource) => {
        setEditingVideo(video);
        const url = video.type === 'youtube' ? `https://www.youtube.com/watch?v=${video.source}` : video.source;
        setNewVideo({ url, title: video.title, description: video.description, type: video.type });
        setShowVideoForm(true);
    };
    const handleVideoFormCancel = () => {
        setShowVideoForm(false);
        setEditingVideo(null);
        setNewVideo({ url: '', title: '', description: '', type: 'youtube' });
    };

    // --- Document Handlers ---
    const handleDocumentFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDocumentFormError('');
        if (!newDocument.title || !newDocument.filePath) {
            setDocumentFormError("Title and File Path are required.");
            return;
        }
        
        const url = editingDocument ? `/api/resources/documents/${editingDocument.id}` : '/api/resources/documents';
        const method = editingDocument ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDocument),
            });
            if (!response.ok) throw new Error('Failed to save document');
            await refetchData();
            handleDocumentFormCancel();
        } catch (error) {
            console.error(error);
            alert('Failed to save document.');
        }
    };
    const handleAddNewDocumentClick = () => {
        setEditingDocument(null);
        setNewDocument({ title: '', description: '', filePath: '' });
        setShowDocumentForm(true);
    };
    const handleEditDocument = (doc: DocumentResource) => {
        setEditingDocument(doc);
        setNewDocument({ title: doc.title, description: doc.description, filePath: doc.filePath });
        setShowDocumentForm(true);
        setDocumentFormError('');
    };
    const handleDocumentFormCancel = () => {
        setShowDocumentForm(false);
        setEditingDocument(null);
        setNewDocument({ title: '', description: '', filePath: '' });
        setDocumentFormError('');
    };
    
    // --- Product Handlers ---
    const handleProductFormSubmit = async (e: React.FormEvent) => {
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
        if (!isValid) return;

        const productData = {
            name: newProduct.name,
            price: price,
            imageUrl: newProduct.imageUrl,
            description: newProduct.description,
        };

        if (editingProduct) {
            await updateProduct({ ...productData, id: editingProduct.id });
        } else {
            await addProduct(productData);
        }
        handleCancelProductForm();
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setNewProduct({
            name: product.name,
            price: String(product.price),
            imageUrl: product.imageUrl,
            description: product.description,
        });
        setShowProductForm(true);
        setProductFormErrors({ price: '', imageUrl: '' });
    };

    const handleShowProductForm = () => {
        setEditingProduct(null);
        setShowProductForm(true);
        setProductFormErrors({ price: '', imageUrl: '' });
    };
    const handleCancelProductForm = () => {
        setShowProductForm(false);
        setEditingProduct(null);
        setNewProduct({ name: '', price: '', imageUrl: '', description: '' });
        setProductFormErrors({ price: '', imageUrl: '' });
    };


    const toggleSection = (sectionId: string) => {
        setOpenSection(prev => (prev === sectionId ? null : sectionId));
    };
    
    if (dataLoading || productsLoading) {
        return <LoadingSpinner />;
    }
    
    const formInputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white text-gray-900";
    const formLabelClass = "block text-sm font-medium text-gray-700";
    const iconWrapper = "flex-shrink-0 w-5 h-5 text-gray-500 mr-2";
    const appDetailItem = "flex items-center";
    const appDetailLabel = "font-semibold text-gray-600 mr-1";
    
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
                        Use this page to update your website's content. Changes are saved to the server.
                    </p>
                </div>
            </section>
            <div className="container mx-auto px-6 py-16">
                 <h2 className="text-3xl font-bold text-brand-blue mb-6">Manage Content Sections</h2>
                <div className="rounded-lg shadow-lg overflow-hidden mb-12">
                    {/* MANAGE AGENT APPLICATIONS */}
                    <Accordion
                        title={`Manage Agent Applications (${applications.length})`}
                        isOpen={openSection === 'manage-applications'}
                        onToggle={() => toggleSection('manage-applications')}
                    >
                         {appsLoading ? <LoadingSpinner /> : (
                            <div className="space-y-4">
                                {applications.length > 0 ? (
                                    applications.map(app => (
                                        <div key={app.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                            <div className="flex justify-between items-start flex-wrap gap-y-2">
                                                <div>
                                                    <p className="font-bold text-lg text-brand-blue">{app.name}</p>
                                                    <p className="text-sm text-gray-600">Submitted: {new Date(app.submittedAt).toLocaleString()}</p>
                                                </div>
                                                <button onClick={() => handleDeleteItem('applications', app.id)} className="text-red-500 hover:text-red-700 font-semibold flex-shrink-0 ml-4">Delete</button>
                                            </div>
                                            <div className="mt-4 border-t pt-4 text-sm text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                                <div className={appDetailItem}><svg className={iconWrapper} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><span className={appDetailLabel}>Email:</span><a href={`mailto:${app.email}`} className="text-brand-blue hover:underline truncate">{app.email}</a></div>
                                                <div className={appDetailItem}><svg className={iconWrapper} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><span className={appDetailLabel}>Phone:</span><a href={`tel:${app.phone}`} className="text-brand-blue hover:underline">{app.phone}</a></div>
                                                <div className={appDetailItem}><svg className={iconWrapper} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span className={appDetailLabel}>Location:</span><span>{app.city}, {app.state}</span></div>
                                                <div className={appDetailItem}><svg className={iconWrapper} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg><span className={appDetailLabel}>Experience:</span><span>{app.experience} years</span></div>
                                                <div className={appDetailItem}><svg className={iconWrapper} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className={appDetailLabel}>License:</span><span>{app.licenseNo}</span></div>
                                                {app.linkedin && (<div className={appDetailItem}><svg className={iconWrapper} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg><span className={appDetailLabel}>LinkedIn:</span><a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline truncate">View Profile</a></div>)}
                                            </div>
                                            {app.message && <div className="mt-3 col-span-1 md:col-span-2"><p className={appDetailLabel}>Message:</p><p className="whitespace-pre-wrap bg-white p-2 border rounded text-sm">{app.message}</p></div>}
                                        </div>
                                    ))
                                ) : <p className="text-gray-500 text-center py-4">No agent applications found.</p>}
                            </div>
                         )}
                    </Accordion>

                    {/* MANAGE PRODUCTS */}
                    <Accordion title="Manage Products" isOpen={openSection === 'manage-products'} onToggle={() => toggleSection('manage-products')}>
                        <div className="space-y-4">
                            {products.map(prod => (
                                <div key={prod.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-2">
                                    <div><p className="font-bold text-lg">{prod.name}</p><p className="text-sm text-gray-600">${prod.price.toFixed(2)}</p></div>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleEditProduct(prod)} className="text-brand-blue hover:text-blue-700 font-semibold">Edit</button>
                                        <button onClick={() => handleDeleteItem('products', prod.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {showProductForm ? (
                            <form onSubmit={handleProductFormSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4" noValidate>
                                <h4 className="text-lg font-bold text-brand-blue">{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
                                <div><label htmlFor="prod-name" className={formLabelClass}>Product Name</label><input type="text" name="name" id="prod-name" required value={newProduct.name} onChange={e => handleInputChange(setNewProduct, e)} className={formInputClass} placeholder="e.g., Financial Peace Mug" /></div>
                                <div><label htmlFor="prod-price" className={formLabelClass}>Price</label><input type="number" name="price" id="prod-price" required step="0.01" value={newProduct.price} onChange={e => handleInputChange(setNewProduct, e)} className={`${formInputClass} ${productFormErrors.price ? 'border-red-500' : ''}`} placeholder="e.g., 15.99" />{productFormErrors.price && <p className="mt-1 text-sm text-red-600">{productFormErrors.price}</p>}</div>
                                <div><label htmlFor="prod-imageUrl" className={formLabelClass}>Image URL</label><input type="text" name="imageUrl" id="prod-imageUrl" required value={newProduct.imageUrl} onChange={e => handleInputChange(setNewProduct, e)} className={`${formInputClass} ${productFormErrors.imageUrl ? 'border-red-500' : ''}`} placeholder="e.g., https://example.com/image.png" />{productFormErrors.imageUrl && <p className="mt-1 text-sm text-red-600">{productFormErrors.imageUrl}</p>}</div>
                                <div><label htmlFor="prod-description" className={formLabelClass}>Description</label><textarea name="description" id="prod-description" required rows={3} value={newProduct.description} onChange={e => handleInputChange(setNewProduct, e)} className={formInputClass} placeholder="e.g., A sturdy ceramic mug..."></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">{editingProduct ? 'Save Changes' : 'Save Product'}</button><button type="button" onClick={handleCancelProductForm} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button></div>
                            </form>
                        ) : <button onClick={handleShowProductForm} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400">Add New Product</button>}
                    </Accordion>
                    
                    {/* MANAGE ADVISORS */}
                    <Accordion title="Manage Advisors" isOpen={openSection === 'manage-advisors'} onToggle={() => toggleSection('manage-advisors')}>
                        <div className="space-y-4">
                            {advisors.map(adv => (
                                <div key={adv.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-2">
                                    <div><p className="font-bold text-lg">{adv.name}</p><p className="text-sm text-gray-600">{adv.title}</p></div>
                                    <div className="flex gap-4"><button onClick={() => handleEditAdvisor(adv)} className="text-brand-blue hover:text-blue-700 font-semibold">Edit</button><button onClick={() => handleDeleteItem('advisors', adv.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button></div>
                                </div>
                            ))}
                        </div>
                        {showAdvisorForm ? (
                            <form onSubmit={handleAdvisorFormSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">{editingAdvisor ? 'Edit Advisor' : 'Add New Advisor'}</h4>
                                <div><label htmlFor="name" className={formLabelClass}>Name</label><input type="text" name="name" id="name" required value={newAdvisor.name} onChange={e => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="title" className={formLabelClass}>Title</label><input type="text" name="title" id="title" required value={newAdvisor.title} onChange={e => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="imageUrl" className={formLabelClass}>Image URL</label><input type="text" name="imageUrl" id="imageUrl" required value={newAdvisor.imageUrl} onChange={e => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="specialties" className={formLabelClass}>Specialties</label><input type="text" name="specialties" id="specialties" required placeholder="comma, separated, values" value={newAdvisor.specialties} onChange={e => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="languages" className={formLabelClass}>Languages</label><input type="text" name="languages" id="languages" placeholder="English, Spanish, French" value={newAdvisor.languages} onChange={e => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="bio" className={formLabelClass}>Bio</label><textarea name="bio" id="bio" required rows={3} value={newAdvisor.bio} onChange={e => handleInputChange(setNewAdvisor, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">{editingAdvisor ? 'Save Changes' : 'Save Advisor'}</button><button type="button" onClick={handleAdvisorFormCancel} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button></div>
                            </form>
                        ) : <button onClick={handleAddNewAdvisorClick} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400">Add New Advisor</button>}
                    </Accordion>

                    {/* MANAGE VIDEOS */}
                    <Accordion title="Manage Videos" isOpen={openSection === 'manage-videos'} onToggle={() => toggleSection('manage-videos')}>
                        <div className="space-y-4">
                            {videos.map(vid => (
                                 <div key={vid.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-2">
                                     <div><p className="font-bold text-lg">{vid.title}</p><p className="text-sm text-gray-600 capitalize">Type: {vid.type}</p></div>
                                     <div className="flex gap-4"><button onClick={() => handleEditVideo(vid)} className="text-brand-blue hover:text-blue-700 font-semibold">Edit</button><button onClick={() => handleDeleteItem('videos', vid.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button></div>
                                 </div>
                            ))}
                        </div>
                        {showVideoForm ? (
                             <form onSubmit={handleVideoFormSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">{editingVideo ? 'Edit Video' : 'Add New Video'}</h4>
                                <div>
                                    <label className={formLabelClass}>Video Type</label>
                                    <div className="mt-2 flex gap-x-6"><label className="flex items-center"><input type="radio" name="type" value="youtube" checked={newVideo.type === 'youtube'} onChange={() => setNewVideo(prev => ({...prev, type: 'youtube'}))} className="focus:ring-brand-blue h-4 w-4 text-brand-blue border-gray-300" /><span className="ml-2 text-gray-700">YouTube</span></label><label className="flex items-center"><input type="radio" name="type" value="direct" checked={newVideo.type === 'direct'} onChange={() => setNewVideo(prev => ({...prev, type: 'direct'}))} className="focus:ring-brand-blue h-4 w-4 text-brand-blue border-gray-300" /><span className="ml-2 text-gray-700">Direct Link</span></label></div>
                                </div>
                                <div><label htmlFor="vid-url" className={formLabelClass}>{newVideo.type === 'youtube' ? 'YouTube URL or Video ID' : 'Direct Video URL (.mp4, .webm)'}</label><input type="text" name="url" id="vid-url" required value={newVideo.url} onChange={e => handleInputChange(setNewVideo, e)} className={formInputClass} /></div>
                                <div><label htmlFor="vid-title" className={formLabelClass}>Title</label><input type="text" name="title" id="vid-title" required value={newVideo.title} onChange={e => handleInputChange(setNewVideo, e)} className={formInputClass} /></div>
                                <div><label htmlFor="vid-desc" className={formLabelClass}>Description</label><textarea name="description" id="vid-desc" rows={3} value={newVideo.description} onChange={e => handleInputChange(setNewVideo, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">{editingVideo ? 'Save Changes' : 'Save Video'}</button><button type="button" onClick={handleVideoFormCancel} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button></div>
                            </form>
                        ) : <button onClick={handleAddNewVideoClick} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400">Add New Video</button>}
                    </Accordion>

                    {/* MANAGE DOCUMENTS */}
                    <Accordion title="Manage Documents" isOpen={openSection === 'manage-documents'} onToggle={() => toggleSection('manage-documents')}>
                        <div className="space-y-4">
                            {documents.map(doc => (
                                <div key={doc.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center flex-wrap gap-2">
                                    <div><p className="font-bold text-lg">{doc.title}</p><p className="text-sm text-gray-600">{doc.filePath}</p></div>
                                    <div className="flex gap-4"><button onClick={() => handleEditDocument(doc)} className="text-brand-blue hover:text-blue-700 font-semibold">Edit</button><button onClick={() => handleDeleteItem('documents', doc.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button></div>
                                </div>
                            ))}
                        </div>
                        {showDocumentForm ? (
                            <form onSubmit={handleDocumentFormSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">{editingDocument ? 'Edit Document' : 'Add New Document'}</h4>
                                {documentFormError && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md">{documentFormError}</p>}
                                <div><label htmlFor="doc-title" className={formLabelClass}>Title</label><input type="text" name="title" id="doc-title" required value={newDocument.title} onChange={e => { handleInputChange(setNewDocument, e); setDocumentFormError(''); }} className={formInputClass} /></div>
                                <div><label htmlFor="doc-desc" className={formLabelClass}>Description</label><textarea name="description" id="doc-desc" rows={3} value={newDocument.description} onChange={e => handleInputChange(setNewDocument, e)} className={formInputClass}></textarea></div>
                                <div><label htmlFor="doc-path" className={formLabelClass}>File Path (URL)</label><input type="text" name="filePath" id="doc-path" required value={newDocument.filePath} onChange={e => { handleInputChange(setNewDocument, e); setDocumentFormError(''); }} className={formInputClass} /></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90">{editingDocument ? 'Save Changes' : 'Save Document'}</button><button type="button" onClick={handleDocumentFormCancel} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-gray-400">Cancel</button></div>
                            </form>
                        ) : <button onClick={handleAddNewDocumentClick} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-400">Add New Document</button>}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
