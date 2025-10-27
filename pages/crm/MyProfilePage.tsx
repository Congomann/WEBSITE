
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAdvisors } from '../../contexts/AdvisorContext';
import type { Advisor, SocialLink } from '../../types';
import SEO from '../../components/SEO';

const MyProfilePage: React.FC = () => {
    const { user } = useAuth();
    const { advisors, updateAdvisor } = useAdvisors();

    const [editableAdvisor, setEditableAdvisor] = useState<Partial<Advisor>>({});
    const [copyButtonText, setCopyButtonText] = useState('Copy Link');

    const currentAdvisor = useMemo(() => advisors.find(a => a.id === user?.id), [advisors, user]);

    useEffect(() => {
        if (currentAdvisor) {
            setEditableAdvisor({
                ...currentAdvisor,
                socialLinks: currentAdvisor.socialLinks || [
                    { name: 'LinkedIn', url: '' },
                    { name: 'Facebook', url: '' },
                    { name: 'Twitter', url: '' },
                ]
            });
        }
    }, [currentAdvisor]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditableAdvisor(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditableAdvisor(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSocialLinkChange = (index: number, url: string) => {
        const newSocialLinks = [...(editableAdvisor.socialLinks || [])];
        newSocialLinks[index].url = url;
        setEditableAdvisor(prev => ({ ...prev, socialLinks: newSocialLinks }));
    };

    const handleSaveChanges = () => {
        if (editableAdvisor.id) {
            // FIX: The `specialties` and `languages` properties are typed as string arrays but are temporarily
            // converted to strings by the form input. This causes a type mismatch. Using local `any` variables
            // allows for a runtime type check to correctly process the string back into an array without TypeScript errors.
            const specs: any = editableAdvisor.specialties;
            const langs: any = editableAdvisor.languages;
            const finalAdvisor = {
                ...editableAdvisor,
                specialties: typeof specs === 'string' ? specs.split(',').map((s: string) => s.trim()) : specs,
                languages: typeof langs === 'string' ? langs.split(',').map((s: string) => s.trim()) : langs,
                socialLinks: editableAdvisor.socialLinks?.filter(link => link.url.trim() !== ''),
            } as Advisor;
            updateAdvisor(finalAdvisor);
            alert('Profile updated successfully!');
        }
    };
    
    const copyShareableLink = () => {
        const link = `${window.location.origin}/#/advisors/${currentAdvisor?.id}`;
        navigator.clipboard.writeText(link).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy Link'), 2000);
        });
    };

    if (!currentAdvisor) {
        return <div>Loading advisor profile...</div>;
    }

    const formInputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue sm:text-sm bg-white text-gray-900";
    const formLabelClass = "block text-sm font-medium text-gray-700";

    return (
        <div className="animate-fade-in">
            <SEO title="My Profile Settings" description="Manage your public advisor profile." noIndex={true} />
            <h1 className="text-3xl font-bold text-brand-blue mb-6">My Profile Settings</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <label className={formLabelClass}>Profile Picture</label>
                        <img src={editableAdvisor.imageUrl} alt="Profile" className="w-48 h-48 rounded-full object-cover my-2 shadow-md" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-brand-blue focus:border-brand-blue file:bg-brand-blue file:text-white file:font-semibold file:py-2 file:px-4 file:border-0 file:mr-4 hover:file:bg-opacity-90" />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div><label className={formLabelClass}>Full Name</label><input type="text" name="name" value={editableAdvisor.name || ''} onChange={handleInputChange} className={formInputClass} /></div>
                        <div><label className={formLabelClass}>Title</label><input type="text" name="title" value={editableAdvisor.title || ''} onChange={handleInputChange} className={formInputClass} /></div>
                        <div><label className={formLabelClass}>Email</label><input type="email" name="email" value={editableAdvisor.email || ''} onChange={handleInputChange} className={formInputClass} /></div>
                        <div><label className={formLabelClass}>Phone</label><input type="tel" name="phone" value={editableAdvisor.phone || ''} onChange={handleInputChange} className={formInputClass} /></div>
                    </div>
                </div>
                <div><label className={formLabelClass}>Bio</label><textarea name="bio" rows={5} value={editableAdvisor.bio || ''} onChange={handleInputChange} className={formInputClass}></textarea></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* FIX: The input value was being cleared on edit due to a type mismatch. It now correctly displays the string value during editing. */}
                    <div><label className={formLabelClass}>Specialties (comma-separated)</label><input type="text" name="specialties" value={Array.isArray(editableAdvisor.specialties) ? editableAdvisor.specialties.join(', ') : (editableAdvisor.specialties as any) || ''} onChange={handleInputChange} className={formInputClass} /></div>
                    <div><label className={formLabelClass}>Languages (comma-separated)</label><input type="text" name="languages" value={Array.isArray(editableAdvisor.languages) ? editableAdvisor.languages.join(', ') : (editableAdvisor.languages as any) || ''} onChange={handleInputChange} className={formInputClass} /></div>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-lg font-bold text-brand-blue mb-2">Social Media</h3>
                    <div className="space-y-3">
                        {editableAdvisor.socialLinks?.map((link, index) => (
                            <div key={link.name} className="flex items-center gap-3">
                                <label className="w-24 text-sm font-medium">{link.name}</label>
                                <input type="url" value={link.url} onChange={(e) => handleSocialLinkChange(index, e.target.value)} className={formInputClass} placeholder={`https://www.${link.name.toLowerCase()}.com/...`} />
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Shareable Link */}
                <div>
                    <h3 className="text-lg font-bold text-brand-blue mb-2">My Sharable Link</h3>
                    <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-md">
                        <input type="text" readOnly value={`${window.location.origin}/#/advisors/${currentAdvisor.id}`} className="flex-grow bg-transparent text-sm text-gray-600 focus:outline-none" />
                        <button onClick={copyShareableLink} className="bg-brand-gold text-brand-blue text-sm font-semibold py-1 px-3 rounded hover:bg-yellow-400">{copyButtonText}</button>
                    </div>
                </div>
                
                <div className="text-right">
                    <button onClick={handleSaveChanges} className="bg-brand-blue text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
