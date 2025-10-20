import React, { useState, useEffect, useRef } from 'react';
import type { Advisor, VideoResource, DocumentResource, Product, SocialLink } from '../types';
import Accordion from '../components/Accordion';
import SEO from '../components/SEO';
import { useProducts } from '../contexts/ProductContext';
import { useAdvisors } from '../contexts/AdvisorContext';
import { useContent, ContentKey } from '../contexts/ContentContext';


const ManagementDashboardPage: React.FC = () => {
    const { products, addProduct, deleteProduct } = useProducts();
    const { advisors, addAdvisor, updateAdvisor, deleteAdvisor, advisorToEditId, setAdvisorToEditId } = useAdvisors();
    const { content, updateContent } = useContent();

    const [showAdvisorForm, setShowAdvisorForm] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    
    const [newAdvisor, setNewAdvisor] = useState({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '', email: '', phone: '' });
    const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null);
    const [newVideo, setNewVideo] = useState({ url: '', title: '', description: '' });
    const [newDocument, setNewDocument] = useState<{ title: string; description: string; file: File | null }>({ title: '', description: '', file: null });
    const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '', description: '' });
    const [productFormErrors, setProductFormErrors] = useState({ price: '', imageUrl: '' });
    
    // Local state for editing content before saving to context
    const [editableContent, setEditableContent] = useState(content);

    const [openSection, setOpenSection] = useState<string | null>(null);
    const advisorFormRef = useRef<HTMLFormElement>(null);
    
    useEffect(() => {
        // Sync local state if context changes from another source
        setEditableContent(content);
    }, [content]);

    useEffect(() => {
        if (advisorToEditId) {
            const advisorToEdit = advisors.find(a => a.id === advisorToEditId);
            if (advisorToEdit) {
                handleEditAdvisor(advisorToEdit);
                setOpenSection('manage-advisors');
                setTimeout(() => {
                    advisorFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
        }
    }, [advisorToEditId, advisors]);

    const extractVideoDetails = (url: string): { type: 'youtube' | 'tiktok' | 'direct' | null, id: string | null } => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) return { type: 'youtube', id: match[2] };
        }
        if (url.includes('tiktok.com')) {
            const match = url.match(/video\/(\d+)/);
            if (match && match[1]) return { type: 'tiktok', id: match[1] };
        }
        // Basic check for direct links
        if (/\.(mp4|webm)$/.test(new URL(url).pathname)) {
            return { type: 'direct', id: url };
        }
        return { type: null, id: null };
    };
    
    const isValidUrl = (urlString: string): boolean => {
        try {
            new URL(urlString);
            return /\.(jpeg|jpg|gif|png|svg|webp)$/.test(urlString.toLowerCase());
        } catch (e) {
            return false;
        }
    };

    const handleDeleteItem = (type: 'advisors' | 'products', id: any) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        if (type === 'advisors') deleteAdvisor(id);
        if (type === 'products') deleteProduct(id);
    };

    const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAdvisor(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdvisorFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const advisorDataFromForm = {
            name: newAdvisor.name,
            title: newAdvisor.title,
            imageUrl: newAdvisor.imageUrl,
            bio: newAdvisor.bio,
            specialties: newAdvisor.specialties.split(',').map(s => s.trim()).filter(Boolean),
            languages: newAdvisor.languages.split(',').map(s => s.trim()).filter(Boolean),
            email: newAdvisor.email,
            phone: newAdvisor.phone,
        };
        if (editingAdvisor) {
            updateAdvisor({ ...editingAdvisor, ...advisorDataFromForm });
        } else {
            addAdvisor(advisorDataFromForm);
        }
        handleAdvisorFormCancel();
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
            email: advisor.email || '',
            phone: advisor.phone || '',
        });
        setShowAdvisorForm(true);
    };
    
    const handleAddNewAdvisorClick = () => {
        setEditingAdvisor(null);
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '', email: '', phone: '' });
        setShowAdvisorForm(true);
    };

    const handleAdvisorFormCancel = () => {
        setShowAdvisorForm(false);
        setEditingAdvisor(null);
        setNewAdvisor({ name: '', title: '', imageUrl: '', specialties: '', bio: '', languages: '', email: '', phone: '' });
        setAdvisorToEditId(null);
    };

    const handleAddVideo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newVideo.url || !newVideo.title) return alert("Video URL and Title are required.");
        
        const videoDetails = extractVideoDetails(newVideo.url);
        if (!videoDetails.type || !videoDetails.id) {
            return alert("Invalid or unsupported video URL. Please use a valid YouTube, TikTok, or direct video link (.mp4, .webm).");
        }

        const videoData: VideoResource = {
            id: `vid-${Date.now()}`,
            title: newVideo.title,
            description: newVideo.description,
            type: videoDetails.type,
            source: videoDetails.id
        };

        updateContent('video_resources', [...content.video_resources, videoData]);
        setNewVideo({ url: '', title: '', description: '' });
        setShowVideoForm(false);
    };
    
    const handleDeleteVideo = (id: string) => {
        if (!window.confirm('Are you sure you want to delete this video?')) return;
        updateContent('video_resources', content.video_resources.filter(v => v.id !== id));
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewDocument(prev => ({ ...prev, file }));
        }
    };
    
    const handleAddDocument = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDocument.title || !newDocument.file) {
            alert("Title and a file are required.");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(newDocument.file);
        reader.onload = () => {
            const base64 = reader.result as string;
            const docData: DocumentResource = {
                id: `doc-${Date.now()}`,
                title: newDocument.title,
                description: newDocument.description,
                filePath: base64
            };
            updateContent('document_resources', [...content.document_resources, docData]);
            setNewDocument({ title: '', description: '', file: null });
            setShowDocumentForm(false);
        };
        reader.onerror = (error) => {
            console.error("File reading error:", error);
            alert("Failed to process file.");
        };
    };

    const handleDeleteDocument = (id: string) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        updateContent('document_resources', content.document_resources.filter(d => d.id !== id));
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
            errors.imageUrl = 'Please enter a valid URL for the image.';
            isValid = false;
        }
        setProductFormErrors(errors);
        if (!isValid) return;

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

    const handleContentChange = (key: ContentKey, value: any) => {
        setEditableContent(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveContent = (key: ContentKey) => {
        updateContent(key, editableContent[key]);
        alert(`${key.replace(/_/g, ' ')} updated successfully!`);
    };

    const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
        const updatedLinks = [...editableContent.social_links_data];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        handleContentChange('social_links_data', updatedLinks);
    };

    const toggleSection = (sectionId: string) => {
        setOpenSection(prev => (prev === sectionId ? null : sectionId));
    };
    
    const formInputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white text-gray-900";
    const formLabelClass = "block text-sm font-medium text-gray-700";
    
    return (
        <div className="bg-white">
            <SEO title="Management Dashboard" description="Manage website content." noIndex={true} />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Management Dashboard</h1>
                    <p className="text-lg text-gray-300 mt-2">Update your website's content and settings.</p>
                </div>
            </section>
            <div className="container mx-auto px-6 py-16">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-12" role="alert">
                    <p className="font-bold">Demonstration Mode</p>
                    <p>Changes are saved to your browser's local storage and will persist until the data is cleared.</p>
                </div>

                <h2 className="text-3xl font-bold text-brand-blue mb-6">Manage Content Sections</h2>
                <div className="rounded-lg shadow-lg overflow-hidden mb-12">
                    {/* MANAGE COMPANY SETTINGS */}
                    <Accordion title="Company Settings" isOpen={openSection === 'settings'} onToggle={() => toggleSection('settings')}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="company-phone" className={formLabelClass}>Company Phone</label>
                                <input type="tel" id="company-phone" value={editableContent.company_info.phone} onChange={e => handleContentChange('company_info', { ...editableContent.company_info, phone: e.target.value })} className={formInputClass} />
                            </div>
                            <div>
                                <label htmlFor="company-email" className={formLabelClass}>Company Email</label>
                                <input type="email" id="company-email" value={editableContent.company_info.email} onChange={e => handleContentChange('company_info', { ...editableContent.company_info, email: e.target.value })} className={formInputClass} />
                            </div>
                            <h4 className="text-lg font-bold text-brand-blue pt-4">Social Media Links</h4>
                            {editableContent.social_links_data.map((link, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <input type="text" value={link.name} readOnly className={`${formInputClass} bg-gray-100 w-1/4`} />
                                    <input type="url" value={link.url} onChange={e => handleSocialLinkChange(index, 'url', e.target.value)} className={`${formInputClass} w-3/4`} />
                                </div>
                            ))}
                            <button onClick={() => { handleSaveContent('company_info'); handleSaveContent('social_links_data'); }} className="mt-4 bg-brand-blue text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90">Save Settings</button>
                        </div>
                    </Accordion>

                    {/* MANAGE WEBSITE CONTENT */}
                    <Accordion title="Manage Website Content" isOpen={openSection === 'manage-content'} onToggle={() => toggleSection('manage-content')}>
                        <h3 className="text-xl font-bold text-brand-blue mb-2">Core Services</h3>
                        {editableContent.core_services.map((service, index) => (
                             <div key={service.path} className="mb-4 p-4 border rounded-md">
                                 <label htmlFor={`service-desc-${index}`} className={`${formLabelClass} font-bold`}>{service.name}</label>
                                 <textarea
                                     id={`service-desc-${index}`}
                                     value={service.description}
                                     onChange={e => {
                                         const newServices = [...editableContent.core_services];
                                         newServices[index].description = e.target.value;
                                         handleContentChange('core_services', newServices);
                                     }}
                                     className={`${formInputClass} h-24`}
                                 />
                             </div>
                         ))}
                        <button onClick={() => handleSaveContent('core_services')} className="bg-brand-blue text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90">Save Service Descriptions</button>
                    </Accordion>
                    
                    {/* MANAGE PRODUCTS */}
                    <Accordion title="Manage Products" isOpen={openSection === 'manage-products'} onToggle={() => toggleSection('manage-products')}>
                        <div className="space-y-4">
                            {products.map(prod => (
                                <div key={prod.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                    <p className="font-bold text-lg">{prod.name}</p>
                                    <button onClick={() => handleDeleteItem('products', prod.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                </div>
                            ))}
                        </div>
                        {showProductForm ? (
                            <form onSubmit={handleAddProduct} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4" noValidate>
                                <h4 className="text-lg font-bold text-brand-blue">Add New Product</h4>
                                <div><label htmlFor="prod-name" className={formLabelClass}>Product Name</label><input type="text" name="name" id="prod-name" required value={newProduct.name} onChange={(e) => handleInputChange(setNewProduct, e)} className={formInputClass} /></div>
                                <div><label htmlFor="prod-price" className={formLabelClass}>Price</label><input type="number" name="price" id="prod-price" required value={newProduct.price} onChange={(e) => handleInputChange(setNewProduct, e)} className={formInputClass} />{productFormErrors.price && <p className="mt-1 text-sm text-red-600">{productFormErrors.price}</p>}</div>
                                <div><label htmlFor="prod-imageUrl" className={formLabelClass}>Image URL</label><input type="text" name="imageUrl" id="prod-imageUrl" required value={newProduct.imageUrl} onChange={(e) => handleInputChange(setNewProduct, e)} className={formInputClass} />{productFormErrors.imageUrl && <p className="mt-1 text-sm text-red-600">{productFormErrors.imageUrl}</p>}</div>
                                <div><label htmlFor="prod-description" className={formLabelClass}>Description</label><textarea name="description" id="prod-description" required value={newProduct.description} onChange={(e) => handleInputChange(setNewProduct, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full">Save Product</button><button type="button" onClick={handleCancelProductForm} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">Cancel</button></div>
                            </form>
                        ) : <button onClick={handleShowProductForm} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full">Add New Product</button>}
                    </Accordion>
                    
                    {/* MANAGE ADVISORS */}
                    <Accordion title="Manage Advisors" isOpen={openSection === 'manage-advisors'} onToggle={() => toggleSection('manage-advisors')}>
                        <div className="space-y-4">
                            {advisors.map(adv => (
                                <div key={adv.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                    <p className="font-bold text-lg">{adv.name}</p>
                                    <div className="flex gap-4"><button onClick={() => handleEditAdvisor(adv)} className="text-brand-blue hover:text-blue-700 font-semibold">Edit</button><button onClick={() => handleDeleteItem('advisors', adv.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button></div>
                                </div>
                            ))}
                        </div>
                        {showAdvisorForm ? (
                            <form ref={advisorFormRef} onSubmit={handleAdvisorFormSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">{editingAdvisor ? 'Edit Advisor' : 'Add New Advisor'}</h4>
                                <div><label htmlFor="name" className={formLabelClass}>Name</label><input type="text" name="name" required value={newAdvisor.name} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="title" className={formLabelClass}>Title</label><input type="text" name="title" required value={newAdvisor.title} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="email" className={formLabelClass}>Email</label><input type="email" name="email" required value={newAdvisor.email} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="phone" className={formLabelClass}>Phone</label><input type="tel" name="phone" required value={newAdvisor.phone} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="imageUrl" className={formLabelClass}>Profile Picture</label><input type="file" name="imageUrl" accept="image/*" onChange={handleImageUpload} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-opacity-90"/>{newAdvisor.imageUrl && <img src={newAdvisor.imageUrl} alt="Preview" className="w-32 h-32 rounded-full object-cover mt-4" />}</div>
                                <div><label htmlFor="specialties" className={formLabelClass}>Specialties (comma-separated)</label><input type="text" name="specialties" required value={newAdvisor.specialties} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="languages" className={formLabelClass}>Languages (comma-separated)</label><input type="text" name="languages" value={newAdvisor.languages} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass} /></div>
                                <div><label htmlFor="bio" className={formLabelClass}>Bio</label><textarea name="bio" required rows={3} value={newAdvisor.bio} onChange={(e) => handleInputChange(setNewAdvisor, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full">{editingAdvisor ? 'Save Changes' : 'Save Advisor'}</button><button type="button" onClick={handleAdvisorFormCancel} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">Cancel</button></div>
                            </form>
                        ) : <button onClick={handleAddNewAdvisorClick} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full">Add New Advisor</button>}
                    </Accordion>

                    {/* MANAGE VIDEOS */}
                    <Accordion title="Manage Educational Videos" isOpen={openSection === 'manage-videos'} onToggle={() => toggleSection('manage-videos')}>
                         <div className="space-y-4">
                            {content.video_resources.map(vid => (
                                 <div key={vid.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                     <p className="font-bold text-lg">{vid.title}</p>
                                     <button onClick={() => handleDeleteVideo(vid.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                 </div>
                            ))}
                        </div>
                        {showVideoForm ? (
                             <form onSubmit={handleAddVideo} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">Add New Video</h4>
                                <div><label htmlFor="vid-url" className={formLabelClass}>YouTube, TikTok, or Direct Video URL</label><input type="text" name="url" required value={newVideo.url} onChange={(e) => handleInputChange(setNewVideo, e)} className={formInputClass} /></div>
                                <div><label htmlFor="vid-title" className={formLabelClass}>Title</label><input type="text" name="title" required value={newVideo.title} onChange={(e) => handleInputChange(setNewVideo, e)} className={formInputClass} /></div>
                                <div><label htmlFor="vid-desc" className={formLabelClass}>Description</label><textarea name="description" rows={3} value={newVideo.description} onChange={(e) => handleInputChange(setNewVideo, e)} className={formInputClass}></textarea></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full">Save Video</button><button type="button" onClick={() => setShowVideoForm(false)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">Cancel</button></div>
                            </form>
                        ) : <button onClick={() => setShowVideoForm(true)} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full">Add New Video</button>}
                    </Accordion>

                    {/* MANAGE DOCUMENTS */}
                    <Accordion title="Manage Helpful Documents" isOpen={openSection === 'manage-documents'} onToggle={() => toggleSection('manage-documents')}>
                        <div className="space-y-4">
                            {content.document_resources.map(doc => (
                                <div key={doc.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
                                    <p className="font-bold text-lg">{doc.title}</p>
                                    <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                </div>
                            ))}
                        </div>
                        {showDocumentForm ? (
                            <form onSubmit={handleAddDocument} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner space-y-4">
                                <h4 className="text-lg font-bold text-brand-blue">Add New Document</h4>
                                <div><label htmlFor="doc-title" className={formLabelClass}>Title</label><input type="text" name="title" required value={newDocument.title} onChange={(e) => handleInputChange(setNewDocument, e)} className={formInputClass} /></div>
                                <div><label htmlFor="doc-desc" className={formLabelClass}>Description</label><textarea name="description" rows={3} value={newDocument.description} onChange={(e) => handleInputChange(setNewDocument, e)} className={formInputClass}></textarea></div>
                                <div><label htmlFor="doc-file" className={formLabelClass}>Upload File</label><input type="file" name="file" required onChange={handleFileChange} className={`${formInputClass} p-0 file:mr-4 file:py-3 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-opacity-90`} accept=".pdf,.doc,.docx" /></div>
                                <div className="flex gap-4"><button type="submit" className="bg-brand-blue text-white font-bold py-2 px-4 rounded-full">Save Document</button><button type="button" onClick={() => setShowDocumentForm(false)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">Cancel</button></div>
                            </form>
                        ) : <button onClick={() => setShowDocumentForm(true)} className="mt-6 bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-full">Add New Document</button>}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default ManagementDashboardPage;
