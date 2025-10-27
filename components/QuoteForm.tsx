import React, { useState, useEffect, useMemo } from 'react';
import type { Service } from '../types';
import { useContent } from '../contexts/ContentContext';

interface QuoteFormProps {
    advisorName?: string | null;
}

interface FormDataState { name: string; email: string; phone: string; service: string; zipCode: string; dateOfBirth: string; maritalStatus: string; companyName: string; numEmployees: string; message: string; }

const ConditionalField: React.FC<{ children: React.ReactNode }> = ({ children }) => ( <div className="animate-fade-in">{children}</div> );

const QuoteForm: React.FC<QuoteFormProps> = ({ advisorName }) => {
    const [formData, setFormData] = useState<FormDataState>({ name: '', email: '', phone: '', service: '', zipCode: '', dateOfBirth: '', maritalStatus: '', companyName: '', numEmployees: '', message: '' });
    const { content } = useContent();
    const services: Omit<Service, 'icon'>[] = content.core_services;
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (advisorName) setFormData(p => ({ ...p, message: `Consultation with ${advisorName}.` }));
    }, [advisorName]);
    
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name': return value.trim() ? '' : 'Name is required.';
            case 'email': return !value.trim() ? 'Email is required.' : !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid.' : '';
            case 'phone': return !value.trim() ? 'Phone number is required.' : !/^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(value) ? 'Invalid phone number.' : '';
            case 'service': return value ? '' : 'Please select a service.';
            case 'zipCode': return !value.trim() ? 'Zip code is required.' : !/^\d{5}$/.test(value) ? 'Invalid zip code.' : '';
            case 'dateOfBirth': return value ? '' : 'Date of birth is required.';
            case 'maritalStatus': return value ? '' : 'Marital status is required.';
            case 'companyName': return value.trim() ? '' : 'Company name is required.';
            case 'numEmployees': return !value.trim() ? 'Number of employees is required.' : (isNaN(Number(value)) || Number(value) <= 0) ? 'Invalid number.' : '';
            default: return '';
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) setFieldErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
        if (name === 'service') setFieldErrors({});
        else if (fieldErrors[name]) setFieldErrors(p => { const n = { ...p }; delete n[name]; return n; });
    };

    const getRequiredFields = (service: string): (keyof FormDataState)[] => {
        const base: (keyof FormDataState)[] = ['name', 'email', 'service', 'phone'];
        switch (service) {
            case 'Life Insurance': return [...base, 'dateOfBirth', 'maritalStatus'];
            case 'Health Insurance': return [...base, 'zipCode', 'dateOfBirth', 'maritalStatus'];
            case 'Auto & Commercial': case 'Property Insurance': return [...base, 'zipCode'];
            case 'Group Benefits': return [...base, 'companyName', 'numEmployees'];
            default: return base;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const required = getRequiredFields(formData.service);
        const newErrors: { [key: string]: string } = {};
        required.forEach(f => { const err = validateField(f, formData[f]); if (err) newErrors[f] = err; });
        setFieldErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setIsLoading(true);
        try {
            const res = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            if (!res.ok) throw new Error((await res.json().catch(() => ({ message: 'Failed to submit.' }))).message);
            setSubmitted(true);
        } catch (err: any) { setError(err.message); } finally { setIsLoading(false); }
    };
    
    const isFormInvalid = useMemo(() => getRequiredFields(formData.service).some(f => !formData[f]), [formData]);

    if (submitted) return <div className="text-center p-8 bg-green-50 rounded-lg"><svg className="w-16 h-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><h3 className="text-2xl font-bold mt-4">Thank You!</h3><p className="mt-2">Your quote request has been sent. An advisor will contact you shortly.</p></div>;
    
    const inputStyles = "mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-gray-900 placeholder-gray-500";
    const labelStyles = "block text-sm font-medium text-brand-blue";
    const ErrorIcon = () => ( <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" /></svg></div> );

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-6">
                 <div>
                    <label htmlFor="service" className={labelStyles}>Type of Insurance</label>
                    <div className="relative">
                        <select name="service" id="service" value={formData.service} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} appearance-none ${fieldErrors.service ? 'border-red-500 pr-10' : 'border-gray-300'}`}>
                            <option value="" disabled>Select a service</option>
                            {services.map(s => (<option key={s.path} value={s.name}>{s.name}</option>))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"><svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
                        {fieldErrors.service && <div className="absolute inset-y-0 right-0 pr-8 flex items-center"><ErrorIcon /></div>}
                    </div>
                    {fieldErrors.service && <p className="mt-1 text-sm text-red-600">{fieldErrors.service}</p>}
                </div>
                {formData.service === 'Group Benefits' && ( <ConditionalField><div className="space-y-6"><div><label htmlFor="companyName" className={labelStyles}>Company Name</label><div className="relative"><input type="text" name="companyName" value={formData.companyName} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.companyName ? 'border-red-500' : 'border-brand-blue'}`} />{fieldErrors.companyName && <ErrorIcon />}</div>{fieldErrors.companyName && <p className="mt-1 text-sm text-red-600">{fieldErrors.companyName}</p>}</div><div><label htmlFor="numEmployees" className={labelStyles}>Number of Employees</label><div className="relative"><input type="number" name="numEmployees" value={formData.numEmployees} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.numEmployees ? 'border-red-500' : 'border-brand-blue'}`} />{fieldErrors.numEmployees && <ErrorIcon />}</div>{fieldErrors.numEmployees && <p className="mt-1 text-sm text-red-600">{fieldErrors.numEmployees}</p>}</div></div></ConditionalField> )}
                {formData.service && formData.service !== 'Group Benefits' && ( <ConditionalField><div className="space-y-6"><div><label htmlFor="name" className={labelStyles}>Full Name</label><div className="relative"><input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.name ? 'border-red-500' : 'border-brand-blue'}`} />{fieldErrors.name && <ErrorIcon />}</div>{fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}</div>{['Auto & Commercial', 'Property Insurance', 'Health Insurance'].includes(formData.service) && ( <ConditionalField><div><label htmlFor="zipCode" className={labelStyles}>Zip Code</label><div className="relative"><input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} onBlur={handleBlur} required inputMode="numeric" className={`${inputStyles} ${fieldErrors.zipCode ? 'border-red-500' : 'border-brand-blue'}`} />{fieldErrors.zipCode && <ErrorIcon />}</div>{fieldErrors.zipCode && <p className="mt-1 text-sm text-red-600">{fieldErrors.zipCode}</p>}</div></ConditionalField> )}{['Life Insurance', 'Health Insurance'].includes(formData.service) && ( <ConditionalField><div className="grid md:grid-cols-2 gap-6"><div><label htmlFor="dateOfBirth" className={labelStyles}>Date of Birth</label><div className="relative"><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.dateOfBirth ? 'border-red-500' : 'border-brand-blue'}`} /></div>{fieldErrors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{fieldErrors.dateOfBirth}</p>}</div><div><label htmlFor="maritalStatus" className={labelStyles}>Marital Status</label><div className="relative"><select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} appearance-none ${fieldErrors.maritalStatus ? 'border-red-500' : 'border-gray-300'}`}><option value="" disabled>Select status</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option></select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"><svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div></div>{fieldErrors.maritalStatus && <p className="mt-1 text-sm text-red-600">{fieldErrors.maritalStatus}</p>}</div></div></ConditionalField> )}</div></ConditionalField> )}
                <div><label htmlFor="email" className={labelStyles}>Email</label><div className="relative"><input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.email ? 'border-red-500' : 'border-brand-blue'}`} />{fieldErrors.email && <ErrorIcon />}</div>{fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}</div>
                <div><label htmlFor="phone" className={labelStyles}>Phone</label><div className="relative"><input type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.phone ? 'border-red-500' : 'border-brand-blue'}`} />{fieldErrors.phone && <ErrorIcon />}</div>{fieldErrors.phone && <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>}</div>
                <div><label htmlFor="message" className={labelStyles}>Notes (Optional)</label><textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputStyles} border-brand-blue`}></textarea></div>
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            <div className="mt-8"><button type="submit" disabled={isLoading || isFormInvalid} className="w-full flex justify-center py-3 px-4 border rounded-full shadow-sm text-lg font-bold text-brand-blue bg-brand-gold hover:bg-yellow-400 disabled:bg-gray-400">{isLoading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div> : 'Submit Request'}</button></div>
        </form>
    );
};

export default QuoteForm;