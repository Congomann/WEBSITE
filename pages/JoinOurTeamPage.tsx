
import React, { useState } from 'react';
import SEO from '../components/SEO';

const JoinOurTeamPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        licenseNumber: '',
        experience: '',
        resume: null as File | null,
    });
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Full name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
        if (!formData.phone) newErrors.phone = 'Phone number is required.';
        else if (!/^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid.';
        if (!formData.address) newErrors.address = 'Home address is required.';
        if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required.';
        if (!formData.experience) newErrors.experience = 'Please tell us about your experience.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
            console.log("Application submitted:", formData);
        }, 1500);
    };

    const inputStyles = "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white text-gray-900 placeholder-gray-500";
    const labelStyles = "block text-sm font-medium text-brand-blue";

    return (
        <div className="bg-white">
            <SEO
                title="Join Our Team"
                description="Start a rewarding career with New Holland Financial Group. We're looking for passionate and licensed agents to join our growing team."
                keywords="insurance agent careers, financial advisor jobs, work in insurance, New Holland Financial jobs"
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Join Our Team</h1>
                    <p className="text-lg text-gray-300 mt-2 max-w-3xl mx-auto">
                        Build a rewarding career helping individuals, families, and businesses achieve financial security.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                        <h2 className="text-3xl font-bold text-brand-blue mb-4">Why New Holland Financial Group?</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            We are more than just an insurance agency; we are a team of dedicated professionals committed to excellence, integrity, and community. We believe in empowering our agents with the tools, training, and support they need to succeed.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <svg className="h-7 w-7 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <h3 className="text-lg font-semibold text-brand-blue">Uncapped Earning Potential</h3>
                                    <p className="text-gray-600">Our competitive commission structure rewards your hard work and dedication.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg className="h-7 w-7 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <h3 className="text-lg font-semibold text-brand-blue">Access to Top Carriers</h3>
                                    <p className="text-gray-600">Offer your clients the best products from a wide range of A-rated insurance carriers.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg className="h-7 w-7 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <h3 className="text-lg font-semibold text-brand-blue">Continuous Training & Support</h3>
                                    <p className="text-gray-600">We invest in your growth with ongoing professional development and mentorship.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-brand-light p-8 rounded-lg shadow-xl">
                            {submitted ? (
                                <div className="text-center">
                                    <svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-2xl font-bold text-green-800 mt-4">Application Received!</h3>
                                    <p className="text-gray-600 mt-2">Thank you for your interest. If your qualifications meet our needs, we will be in touch soon.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-bold text-brand-blue text-center mb-6">Apply Now</h2>
                                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className={labelStyles}>Full Name</label>
                                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={`${inputStyles} ${errors.name ? 'border-red-500' : ''}`} />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className={labelStyles}>Email</label>
                                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={`${inputStyles} ${errors.email ? 'border-red-500' : ''}`} />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className={labelStyles}>Phone</label>
                                            <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className={`${inputStyles} ${errors.phone ? 'border-red-500' : ''}`} />
                                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="address" className={labelStyles}>Home Address</label>
                                            <input type="text" name="address" id="address" required value={formData.address} onChange={handleChange} className={`${inputStyles} ${errors.address ? 'border-red-500' : ''}`} />
                                            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="licenseNumber" className={labelStyles}>License Number</label>
                                            <input type="text" name="licenseNumber" id="licenseNumber" required value={formData.licenseNumber} onChange={handleChange} className={`${inputStyles} ${errors.licenseNumber ? 'border-red-500' : ''}`} />
                                            {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="experience" className={labelStyles}>Tell us about your experience</label>
                                            <textarea name="experience" id="experience" rows={4} required value={formData.experience} onChange={handleChange} className={`${inputStyles} ${errors.experience ? 'border-red-500' : ''}`}></textarea>
                                            {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="resume" className={labelStyles}>Upload Resume (Optional)</label>
                                            <input type="file" name="resume" id="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" className={`${inputStyles} p-0 file:mr-4 file:py-3 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-opacity-90`} />
                                        </div>
                                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-brand-blue bg-brand-gold hover:bg-yellow-400 disabled:bg-gray-400">
                                            {isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div> : 'Submit Application'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinOurTeamPage;