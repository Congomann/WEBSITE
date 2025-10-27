import React, { useState } from 'react';
import { useCrm } from '../../contexts/CrmContext';

interface CallbackFormProps {
    advisorName?: string;
    advisorId?: number;
}

const CallbackForm: React.FC<CallbackFormProps> = ({ advisorName, advisorId }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', time: 'Morning' });
    const [fieldErrors, setFieldErrors] = useState({ name: '', phone: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addRequest } = useCrm();

    const validateField = (name: string, value: string): string => {
        if (name === 'name') {
            return value.trim() ? '' : 'Name is required.';
        }
        if (name === 'phone') {
            if (!value.trim()) return 'Phone number is required.';
            if (!/^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(value)) {
                return 'Please enter a valid 10-digit phone number.';
            }
            return '';
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (fieldErrors[name as keyof typeof fieldErrors]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setFieldErrors(prev => ({ ...prev, [name]: error }));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nameError = validateField('name', formData.name);
        const phoneError = validateField('phone', formData.phone);

        if (nameError || phoneError) {
            setFieldErrors({ name: nameError, phone: phoneError });
            return;
        }

        setIsLoading(true);
        setError(null);

        if (advisorId) {
            // Logic for direct requests to an advisor
            try {
                addRequest({
                    type: 'Callback',
                    name: formData.name,
                    phone: formData.phone,
                    message: `Preferred time: ${formData.time}.`,
                    advisorId: advisorId,
                });
                await new Promise(res => setTimeout(res, 500));
                setSubmitted(true);
            } catch (err: any) {
                setError("Failed to submit request. Please try again.");
            } finally {
                setIsLoading(false);
            }

        } else {
            // Existing logic for general callback requests
            try {
                const response = await fetch('/api/callbacks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, advisorName }),
                });

                if (!response.ok) {
                    throw new Error('Failed to submit request. Please try again.');
                }
                setSubmitted(true);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (submitted) {
        return (
            <div className="text-center p-6 bg-green-50 rounded-lg">
                <svg className="w-12 h-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-green-800 mt-3">Request Sent!</h3>
                <p className="text-gray-600 mt-1">Thank you. An advisor will call you back shortly.</p>
            </div>
        );
    }

    const inputStyles = "mt-1 block w-full px-4 py-3 border rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue";
    const labelStyles = "block text-sm font-medium text-brand-blue";
    
    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
                <div>
                    <label htmlFor="callback-name" className={labelStyles}>Full Name</label>
                    <input type="text" name="name" id="callback-name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'}`} />
                    {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
                </div>
                 <div>
                    <label htmlFor="callback-phone" className={labelStyles}>Phone Number</label>
                    <input type="tel" name="phone" id="callback-phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} required className={`${inputStyles} ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                    {fieldErrors.phone && <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>}
                </div>
                <div>
                    <label htmlFor="callback-time" className={labelStyles}>Preferred Time</label>
                    <select name="time" id="callback-time" value={formData.time} onChange={handleChange} className={`${inputStyles} border-gray-300`}>
                        <option>Morning (9am - 12pm)</option>
                        <option>Afternoon (1pm - 5pm)</option>
                    </select>
                </div>
                 {error && <p className="mt-2 text-sm text-center text-red-600 bg-red-50 p-2 rounded-md">{error}</p>}
                 <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-brand-blue bg-brand-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-blue"></div>
                    ) : 'Request Callback'}
                </button>
            </div>
        </form>
    );
};

export default CallbackForm;