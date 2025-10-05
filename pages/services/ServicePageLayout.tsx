
import React from 'react';
import { Link } from 'react-router-dom';
import type { ServiceDetail } from '../../types';
import SEO from '../../components/SEO';

interface ServicePageLayoutProps {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
    serviceDetails: ServiceDetail[];
    seoDescription: string;
    seoKeywords: string;
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ title, icon, subtitle, serviceDetails, seoDescription, seoKeywords }) => {
    return (
        <div className="bg-brand-light">
            <SEO
                title={title}
                description={seoDescription}
                keywords={seoKeywords}
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center mb-4">
                        {icon}
                    </div>
                    <h1 className="text-4xl font-extrabold">{title}</h1>
                    <p className="text-lg text-gray-300 mt-2">{subtitle}</p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-12">
                        <Link to="/" className="inline-flex items-center text-brand-blue hover:text-brand-gold transition-colors duration-300 group font-semibold">
                            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Home
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceDetails.map((service, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                                <h2 className="text-2xl font-bold text-brand-blue mb-3">{service.name}</h2>
                                <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                                <h3 className="font-semibold text-brand-blue mb-2">Key Benefits:</h3>
                                <ul className="space-y-2 text-gray-700">
                                    {service.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-4">Ready to Discuss Your Options?</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 mb-8">Our advisors are ready to help you find the perfect coverage. Contact us today for a free, no-obligation consultation.</p>
                    <Link to="/contact" className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg">
                        Get a Free Quote
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ServicePageLayout;