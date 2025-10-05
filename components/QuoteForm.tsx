import React, { useState, useEffect } from 'react';
import type { Service } from '../types';
import { API_BASE_URL } from '../constants';

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
    const [services, setServices] = useState<Service[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/services`);
                if (!response.ok) throw new Error('Failed to fetch services');
                const data = await response.json();
                setServices(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        if (advisorName) {
            setFormData(prevState => ({
                ...prevState,
                message: `I would like to schedule a consultation with ${advisorName}.`
            }));
        }
    }, [advisorName]);

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
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.service) newErrors.service = 'Please select a service.';
        
        setFieldErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit quote. Please try again.');
            }
            
            setSubmitted(true);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(errorMessage);
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
                <h3 className="text-2xl font-bold text-green-800 mt-4">Thank You!</h3>
                <p className="text-gray-600 mt-2">Your quote request has been sent successfully. One of our advisors will contact you shortly.</p>
            </div>
        );
    }
    
    const darkInputStyles = "mt-1 block w-full px-4 py-3 border rounded-md shadow-sm bg-brand-blue text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-gold";
    const lightSelectStyles = "mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white";
    const labelStyles = "block text-sm font-medium text-brand-blue";

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className={labelStyles}>Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={`${darkInputStyles} ${fieldErrors.name ? 'border-red-500' : 'border-brand-blue'}`} />
                    {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className={labelStyles}>Email Address</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={`${darkInputStyles} ${fieldErrors.email ? 'border-red-500' : 'border-brand-blue'}`} />
                    {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className={labelStyles}>Phone Number</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={`${darkInputStyles} border-brand-blue`} />
                </div>
                <div>
                    <label htmlFor="service" className={labelStyles}>Type of Insurance</label>
                    <select name="service" id="service" value={formData.service} onChange={handleChange} required className={`${lightSelectStyles} ${fieldErrors.service ? 'border-red-500' : 'border-gray-300'}`}>
                        <option value="" disabled>Select a service</option>
                        {services.map(service => (
                            <option key={service.path} value={service.name}>{service.name}</option>
                        ))}
                    </select>
                    {fieldErrors.service && <p className="mt-1 text-sm text-red-600">{fieldErrors.service}</p>}
                </div>
                <div>
                    <label htmlFor="message" className={labelStyles}>Notes / Message</label>
                    <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className={`${darkInputStyles} border-brand-blue`}></textarea>
                </div>
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            <div className="mt-8">
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-brand-blue bg-brand-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div>
                    ) : 'Submit Request'}
                </button>
            </div>
        </form>
    );
};

export default QuoteForm;