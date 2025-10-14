
import React, { useState } from 'react';

// FIX: Define an interface for the form state to prevent TypeScript from widening the
// type of formData, which can cause errors with dynamic property access.
interface AgentFormData {
    name: string;
    email: string;
    phone: string;
    licenseNo: string;
    city: string;
    state: string;
    experience: string;
    linkedin: string;
    message: string;
}

const AgentApplicationForm: React.FC = () => {
    const [formData, setFormData] = useState<AgentFormData>({
        name: '',
        email: '',
        phone: '',
        licenseNo: '',
        city: '',
        state: '',
        experience: '',
        linkedin: '',
        message: '',
    });
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                return value.trim() ? '' : 'Full name is required.';
            case 'email':
                if (!value.trim()) return 'Email is required.';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid.';
                return '';
            case 'phone':
                if (!value.trim()) return 'Phone number is required.';
                if (!/^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(value)) {
                    return 'Please enter a valid 10-digit phone number.';
                }
                return '';
            case 'licenseNo':
                return value.trim() ? '' : 'License number is required.';
            case 'city':
                return value.trim() ? '' : 'City is required.';
            case 'state':
                return value.trim() ? '' : 'State is required.';
            case 'experience':
                if (!value.trim()) return 'Years of experience is required.';
                if (isNaN(Number(value)) || Number(value) < 0) return 'Please enter a valid number.';
                return '';
            case 'linkedin':
                if (value.trim() && !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(value)) {
                    return 'Please enter a valid LinkedIn profile URL.';
                }
                return '';
            case 'message':
                return value.trim() ? '' : 'A message is required.';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setFieldErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = (): boolean => {
        const requiredFields: (keyof AgentFormData)[] = ['name', 'email', 'phone', 'licenseNo', 'city', 'state', 'experience', 'message'];
        const newErrors: { [key: string]: string } = {};
        let isValid = true;
        
        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        // Also validate optional fields if they have content
        const linkedinError = validateField('linkedin', formData.linkedin);
         if (linkedinError) {
            newErrors['linkedin'] = linkedinError;
            isValid = false;
        }

        setFieldErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/agent-applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    experience: Number(formData.experience)
                }),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
                throw new Error(errorData.message || 'Failed to submit application.');
            }
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center p-8 bg-green-50 rounded-lg">
                <svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-green-800 mt-4">Thank You for Applying!</h3>
                <p className="text-gray-600 mt-2">Your application has been received. We will review your information and be in touch if your qualifications meet our needs.</p>
            </div>
        );
    }
    
    const inputStyles = "mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white";
    const labelStyles = "block text-sm font-medium text-gray-700";
    const errorTextStyles = "mt-1 text-sm text-red-600";
    const errorInputStyles = "border-red-500 pr-10";

    const ErrorIcon = () => (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className={labelStyles}>Full Name</label>
                    <div className="relative">
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.name ? errorInputStyles : 'border-gray-300'}`} />
                        {fieldErrors.name && <ErrorIcon />}
                    </div>
                    {fieldErrors.name && <p className={errorTextStyles}>{fieldErrors.name}</p>}
                </div>
                 <div>
                    <label htmlFor="email" className={labelStyles}>Email Address</label>
                    <div className="relative">
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.email ? errorInputStyles : 'border-gray-300'}`} />
                        {fieldErrors.email && <ErrorIcon />}
                    </div>
                    {fieldErrors.email && <p className={errorTextStyles}>{fieldErrors.email}</p>}
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="phone" className={labelStyles}>Phone Number</label>
                    <div className="relative">
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.phone ? errorInputStyles : 'border-gray-300'}`} />
                        {fieldErrors.phone && <ErrorIcon />}
                    </div>
                    {fieldErrors.phone && <p className={errorTextStyles}>{fieldErrors.phone}</p>}
                </div>
                <div>
                    <label htmlFor="licenseNo" className={labelStyles}>License Number</label>
                    <div className="relative">
                        <input type="text" name="licenseNo" id="licenseNo" value={formData.licenseNo} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.licenseNo ? errorInputStyles : 'border-gray-300'}`} />
                        {fieldErrors.licenseNo && <ErrorIcon />}
                    </div>
                    {fieldErrors.licenseNo && <p className={errorTextStyles}>{fieldErrors.licenseNo}</p>}
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="city" className={labelStyles}>City</label>
                    <div className="relative">
                        <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.city ? errorInputStyles : 'border-gray-300'}`} />
                        {fieldErrors.city && <ErrorIcon />}
                    </div>
                    {fieldErrors.city && <p className={errorTextStyles}>{fieldErrors.city}</p>}
                </div>
                 <div>
                    <label htmlFor="state" className={labelStyles}>State</label>
                    <div className="relative">
                        <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.state ? errorInputStyles : 'border-gray-300'}`} />
                        {fieldErrors.state && <ErrorIcon />}
                    </div>
                    {fieldErrors.state && <p className={errorTextStyles}>{fieldErrors.state}</p>}
                </div>
             </div>
             <div>
                <label htmlFor="experience" className={labelStyles}>How long have you been an agent? (Years)</label>
                <div className="relative">
                    <input type="number" name="experience" id="experience" value={formData.experience} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.experience ? errorInputStyles : 'border-gray-300'}`} />
                    {fieldErrors.experience && <ErrorIcon />}
                </div>
                {fieldErrors.experience && <p className={errorTextStyles}>{fieldErrors.experience}</p>}
            </div>
             <div>
                <label htmlFor="linkedin" className={labelStyles}>LinkedIn Profile URL (Optional)</label>
                 <div className="relative">
                    <input type="url" name="linkedin" id="linkedin" value={formData.linkedin} onChange={handleChange} onBlur={handleBlur} placeholder="https://linkedin.com/in/your-profile" className={`${inputStyles} ${fieldErrors.linkedin ? errorInputStyles : 'border-gray-300'}`} />
                    {fieldErrors.linkedin && <ErrorIcon />}
                </div>
                {fieldErrors.linkedin && <p className={errorTextStyles}>{fieldErrors.linkedin}</p>}
            </div>
             <div>
                <label htmlFor="message" className={labelStyles}>Message (Required)</label>
                <div className="relative">
                    <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} onBlur={handleBlur} required placeholder="Tell us why you'd be a great fit for our team. You can also paste your resume here." className={`${inputStyles} ${fieldErrors.message ? errorInputStyles : 'border-gray-300'}`}></textarea>
                </div>
                 {fieldErrors.message && <p className={errorTextStyles}>{fieldErrors.message}</p>}
            </div>
            {error && <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            <div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-brand-blue bg-brand-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div>
                    ) : 'Submit Application'}
                </button>
            </div>
        </form>
    );
};

export default AgentApplicationForm;