import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import QuoteForm from '../components/QuoteForm';
import CallbackForm from '../components/CallbackForm';
import SEO from '../components/SEO';
import { useContent } from '../contexts/ContentContext';

const ContactPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const advisorName = queryParams.get('advisor');
    const { content } = useContent();
    const { company_info } = content;

    return (
        <div className="bg-white py-20">
            <SEO
                title="Contact Us"
                description="Get a free insurance quote or contact New Holland Financial Group. Our expert advisors in Des Moines, IA are ready to help with your insurance needs."
                keywords="contact insurance agency, get a quote, insurance quote, free quote, financial advisor contact"
            />
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    {advisorName ? (
                        <Link to="/advisors" className="inline-flex items-center text-brand-blue hover:text-brand-gold transition-colors duration-300 group font-semibold">
                            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Advisors
                        </Link>
                    ) : (
                        <Link to="/" className="inline-flex items-center text-brand-blue hover:text-brand-gold transition-colors duration-300 group font-semibold">
                            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Home
                        </Link>
                    )}
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-brand-blue mb-4">Get in Touch</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Whether you need a quote, have a question, or want to speak with an advisor, we're here to help.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="lg:col-span-1 bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-3xl font-bold text-brand-blue text-center mb-6">Request Your Free Quote Today!</h2>
                        {advisorName && (
                            <p className="text-center text-gray-700 mb-6 bg-brand-light p-3 rounded-md">
                                You are scheduling a consultation with <strong>{advisorName}</strong>.
                            </p>
                        )}
                        <QuoteForm advisorName={advisorName} />
                    </div>
                    <div className="lg:col-span-1 space-y-10">
                        <div className="bg-brand-blue text-white p-8 rounded-lg shadow-xl flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-brand-gold mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                 <div className="flex items-start">
                                    <svg className="w-7 h-7 mr-4 mt-1 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <div>
                                        <h3 className="font-semibold">Headquarters</h3>
                                        <p className="text-gray-300">Des Moines, IA</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-7 h-7 mr-4 mt-1 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <a href={`tel:${company_info.phone.replace(/\D/g, '')}`} className="text-gray-300 hover:text-brand-gold">{company_info.phone}</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-7 h-7 mr-4 mt-1 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <a href={`mailto:${company_info.email}`} className="text-gray-300 hover:text-brand-gold transition-colors duration-300">{company_info.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-xl">
                            <h2 className="text-2xl font-bold text-brand-blue text-center mb-6">Request a Callback</h2>
                            <p className="text-center text-gray-600 mb-6">In a hurry? Just leave your name and number, and we'll call you back.</p>
                            <CallbackForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
