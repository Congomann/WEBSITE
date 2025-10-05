
import React, { useState, useEffect } from 'react';
import type { Service } from '../types';
import { core_services } from '../data';

interface QuoteFormProps {
    advisorName?: string | null;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ advisorName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const services: Service[] = core_services;
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (advisorName) {
            setFormData(prevState => ({
                ...prevState,
                message: `I would like to schedule a consultation with ${advisorName}.`
            }));
        }
    }, [advisorName]);
    
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                return value.trim() ? '' : 'Name is required.';
            case 'email':
                if (!value.trim()) return 'Email is required.';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid.';
                return '';
            case 'service':
                return value ? '' : 'Please select a service.';
            default:
                return '';
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setFieldErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        // Fix: Explicitly type `fieldsToValidate` as an array of string literals.
        // This ensures `fieldName` is inferred as a string, satisfying the index signature of `newErrors`.
        const fieldsToValidate: ('name' | 'email' | 'service')[] = ['name', 'email', 'service'];
        
        fieldsToValidate.forEach(fieldName => {
            const error = validateField(fieldName, formData[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
            }
        });
        
        setFieldErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!validateForm()) return;

        setIsLoading(true);
        // Simulate API call since there is no backend
        setTimeout(() => {
            setSubmitted(true);
            setIsLoading(false);
        }, 1000);
    };
    
    const isFormInvalid = !formData.name || !formData.email || !formData.service;

    if (submitted) {
        return (
            <div className="text-center p-8 bg-green-50 rounded-lg">
                <svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-green-800 mt-4">Thank You!</h3>
                <p className="text-gray-600 mt-2">Your quote request has been sent successfully. One of our advisors will contact you shortly.</p>
            </div>
        );
    }
    
    const darkInputStyles = "mt-1 block w-full px-4 py-3 border rounded-md shadow-sm bg-brand-blue text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-gold";
    const lightSelectStyles = "mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white";
    const labelStyles = "block text-sm font-medium text-brand-blue";

    const ErrorIcon = () => (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className={labelStyles}>Full Name</label>
                    <div className="relative">
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "name-error" : undefined} className={`${darkInputStyles} ${fieldErrors.name ? 'border-red-500 pr-10' : 'border-brand-blue'}`} />
                        {fieldErrors.name && <ErrorIcon />}
                    </div>
                    {fieldErrors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className={labelStyles}>Email Address</label>
                    <div className="relative">
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "email-error" : undefined} className={`${darkInputStyles} ${fieldErrors.email ? 'border-red-500 pr-10' : 'border-brand-blue'}`} />
                        {fieldErrors.email && <ErrorIcon />}
                    </div>
                    {fieldErrors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className={labelStyles}>Phone Number</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={`${darkInputStyles} border-brand-blue`} />
                </div>
                <div>
                    <label htmlFor="service" className={labelStyles}>Type of Insurance</label>
                    <div className="relative">
                        <select name="service" id="service" value={formData.service} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.service} aria-describedby={fieldErrors.service ? "service-error" : undefined} className={`${lightSelectStyles} appearance-none ${fieldErrors.service ? 'border-red-500 pr-10' : 'border-gray-300'}`}>
                            <option value="" disabled>Select a service</option>
                            {services.map(service => (
                                <option key={service.path} value={service.name}>{service.name}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                        {fieldErrors.service && (
                             <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    {fieldErrors.service && <p id="service-error" className="mt-1 text-sm text-red-600">{fieldErrors.service}</p>}
                </div>
                <div>
                    <label htmlFor="message" className={labelStyles}>Notes / Message</label>
                    <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className={`${darkInputStyles} border-brand-blue`}></textarea>
                </div>
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            <div className="mt-8">
                <button type="submit" disabled={isLoading || isFormInvalid} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-brand-blue bg-brand-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div>
                    ) : 'Submit Request'}
                </button>
            </div>
        </form>
    );
};

export default QuoteForm;
