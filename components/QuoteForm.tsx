import React, { useState, useEffect, useMemo } from 'react';
import type { Service } from '../types';
import { core_services } from '../data';

interface QuoteFormProps {
    advisorName?: string | null;
}

// FIX: Define an interface for the form state to prevent TypeScript from widening the
// type of formData, which was causing errors with dynamic property access.
interface FormDataState {
    name: string;
    email: string;
    phone: string;
    service: string;
    zipCode: string;
    dateOfBirth: string;
    maritalStatus: string;
    companyName: string;
    numEmployees: string;
    message: string;
}

// Helper component for animated field display
const ConditionalField: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="animate-fade-in" style={{ animationDuration: '500ms' }}>
        {children}
    </div>
);


const QuoteForm: React.FC<QuoteFormProps> = ({ advisorName }) => {
    const [formData, setFormData] = useState<FormDataState>({
        name: '',
        email: '',
        phone: '',
        service: '',
        zipCode: '',
        dateOfBirth: '',
        maritalStatus: '',
        companyName: '',
        numEmployees: '',
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
            case 'phone':
                if (!value.trim()) return 'Phone number is required.';
                if (!/^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(value)) {
                    return 'Please enter a valid 10-digit phone number.';
                }
                return '';
            case 'service':
                return value ? '' : 'Please select a service.';
            case 'zipCode':
                if (!value.trim()) return 'Zip code is required.';
                if (!/^\d{5}$/.test(value)) return 'Enter a valid 5-digit zip code.';
                return '';
            case 'dateOfBirth':
                return value ? '' : 'Date of birth is required.';
            case 'maritalStatus':
                return value ? '' : 'Marital status is required.';
            case 'companyName':
                return value.trim() ? '' : 'Company name is required.';
            case 'numEmployees':
                if (!value.trim()) return 'Number of employees is required.';
                if (isNaN(Number(value)) || Number(value) <= 0) return 'Please enter a valid number.';
                return '';
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
        
        if (name === 'service') {
            // Clear all errors when service changes to re-evaluate validation
            setFieldErrors({});
        } else if (fieldErrors[name]) {
            // Clear specific field error when user starts typing
            setFieldErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const getRequiredFields = (service: string): (keyof FormDataState)[] => {
        const baseFields: (keyof FormDataState)[] = ['name', 'email', 'service', 'phone'];
        switch (service) {
            case 'Life Insurance':
                return [...baseFields, 'dateOfBirth', 'maritalStatus'];
            case 'Health Insurance':
                return [...baseFields, 'zipCode', 'dateOfBirth', 'maritalStatus'];
            case 'Auto & Commercial':
            case 'Property Insurance':
                return [...baseFields, 'zipCode'];
            case 'Group Benefits':
                return [...baseFields, 'companyName', 'numEmployees'];
            default:
                return baseFields;
        }
    };

    const validateForm = (): boolean => {
        const requiredFields = getRequiredFields(formData.service);
        const newErrors: { [key: string]: string } = {};

        requiredFields.forEach(fieldName => {
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
        // Simulate API call
        setTimeout(() => {
            console.log("Form Submitted:", formData);
            setSubmitted(true);
            setIsLoading(false);
        }, 1000);
    };
    
    const isFormInvalid = useMemo(() => {
        const requiredFields = getRequiredFields(formData.service);
        return requiredFields.some(field => !formData[field]);
    }, [formData]);

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
                                <ErrorIcon />
                            </div>
                        )}
                    </div>
                    {fieldErrors.service && <p id="service-error" className="mt-1 text-sm text-red-600">{fieldErrors.service}</p>}
                </div>

                {/* --- CONDITIONAL FIELDS START --- */}

                {/* For Group Benefits */}
                {formData.service === 'Group Benefits' && (
                    <ConditionalField>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="companyName" className={labelStyles}>Company Name</label>
                                <div className="relative">
                                    <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.companyName} className={`${darkInputStyles} ${fieldErrors.companyName ? 'border-red-500 pr-10' : 'border-brand-blue'}`} />
                                    {fieldErrors.companyName && <ErrorIcon />}
                                </div>
                                {fieldErrors.companyName && <p className="mt-1 text-sm text-red-600">{fieldErrors.companyName}</p>}
                            </div>
                            <div>
                                <label htmlFor="numEmployees" className={labelStyles}>Number of Employees</label>
                                <div className="relative">
                                    <input type="number" name="numEmployees" id="numEmployees" value={formData.numEmployees} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.numEmployees} className={`${darkInputStyles} ${fieldErrors.numEmployees ? 'border-red-500 pr-10' : 'border-brand-blue'}`} />
                                    {fieldErrors.numEmployees && <ErrorIcon />}
                                </div>
                                {fieldErrors.numEmployees && <p className="mt-1 text-sm text-red-600">{fieldErrors.numEmployees}</p>}
                            </div>
                        </div>
                    </ConditionalField>
                )}

                {/* Fields for individuals */}
                {formData.service && formData.service !== 'Group Benefits' && (
                    <ConditionalField>
                         <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className={labelStyles}>Full Name</label>
                                <div className="relative">
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "name-error" : undefined} className={`${darkInputStyles} ${fieldErrors.name ? 'border-red-500 pr-10' : 'border-brand-blue'}`} />
                                    {fieldErrors.name && <ErrorIcon />}
                                </div>
                                {fieldErrors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
                            </div>
                            
                            {/* For Auto, Property, Health */}
                            {['Auto & Commercial', 'Property Insurance', 'Health Insurance'].includes(formData.service) && (
                                <ConditionalField>
                                    <div>
                                        <label htmlFor="zipCode" className={labelStyles}>Zip Code</label>
                                        <div className="relative">
                                            <input type="text" name="zipCode" id="zipCode" value={formData.zipCode} onChange={handleChange} onBlur={handleBlur} required inputMode="numeric" pattern="[0-9]*" aria-invalid={!!fieldErrors.zipCode} className={`${darkInputStyles} ${fieldErrors.zipCode ? 'border-red-500 pr-10' : 'border-brand-blue'}`} />
                                            {fieldErrors.zipCode && <ErrorIcon />}
                                        </div>
                                        {fieldErrors.zipCode && <p className="mt-1 text-sm text-red-600">{fieldErrors.zipCode}</p>}
                                    </div>
                                </ConditionalField>
                            )}
                            
                            {/* For Life, Health */}
                            {['Life Insurance', 'Health Insurance'].includes(formData.service) && (
                                <ConditionalField>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="dateOfBirth" className={labelStyles}>Date of Birth</label>
                                            <div className="relative">
                                                <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.dateOfBirth} className={`${darkInputStyles} ${fieldErrors.dateOfBirth ? 'border-red-500' : 'border-brand-blue'}`} />
                                            </div>
                                            {fieldErrors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{fieldErrors.dateOfBirth}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="maritalStatus" className={labelStyles}>Marital Status</label>
                                            <div className="relative">
                                                <select name="maritalStatus" id="maritalStatus" value={formData.maritalStatus} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.maritalStatus} className={`${lightSelectStyles} appearance-none ${fieldErrors.maritalStatus ? 'border-red-500' : 'border-gray-300'}`}>
                                                    <option value="" disabled>Select status</option>
                                                    <option value="single">Single</option>
                                                    <option value="married">Married</option>
                                                    <option value="divorced">Divorced</option>
                                                    <option value="widowed">Widowed</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                            </div>
                                            {fieldErrors.maritalStatus && <p className="mt-1 text-sm text-red-600">{fieldErrors.maritalStatus}</p>}
                                        </div>
                                    </div>
                                </ConditionalField>
                            )}
                        </div>
                    </ConditionalField>
                )}
                {/* --- CONDITIONAL FIELDS END --- */}
                
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
                    <div className="relative">
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} required aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "phone-error" : undefined} className={`${darkInputStyles} ${fieldErrors.phone ? 'border-red-500 pr-10' : 'border-brand-blue'}`} />
                        {fieldErrors.phone && <ErrorIcon />}
                    </div>
                    {fieldErrors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>}
                </div>
                <div>
                    <label htmlFor="message" className={labelStyles}>Notes / Message (Optional)</label>
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