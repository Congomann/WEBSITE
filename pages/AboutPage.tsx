

import React, { useState } from 'react';
import SEO from '../components/SEO';

// A helper component to render logos with a fallback for clarity and reuse.
const CarrierLogo: React.FC<{ name: string; url: string | null }> = ({ name, url }) => {
    const [error, setError] = useState(false);

    if (error || !url) {
        return (
            <div className="flex items-center justify-center w-full h-full text-center text-gray-600 font-semibold text-sm">
                {name}
            </div>
        );
    }
    
    return (
        <img
            src={url}
            alt={`${name} logo`}
            className="max-h-16 w-auto object-contain"
            onError={() => setError(true)}
            loading="lazy"
        />
    );
};


const AboutPage: React.FC = () => {
    const carriers = [
        { name: 'Aflac', domain: 'aflac.com' },
        { name: 'Americo', domain: 'americo.com' },
        { name: 'American Continental Insurance Co', domain: 'aetna.com' },
        // Fix: Use parent company domain for better logo resolution.
        { name: 'Banner Life', domain: 'lgamerica.com' },
        // Blue Ridge is part of the Donegal Insurance Group
        { name: 'Blue Ridge Ins Co.', domain: 'donegalgroup.com' },
        { name: 'Bristol West', domain: 'bristolwest.com' },
        { name: 'Combined Insurance', domain: 'combinedinsurance.com' },
        { name: 'Corebridge Financial', domain: 'corebridgefinancial.com' },
        { name: 'F&G', domain: 'fglife.com' },
        { name: 'Foremost', domain: 'foremost.com' },
        { name: 'Geico', domain: 'geico.com' },
        { name: 'Gerber Life', domain: 'gerberlife.com' },
        { name: 'Great American Insurance Group', domain: 'greatamericaninsurancegroup.com' },
        { name: 'The Hartford', domain: 'thehartford.com' },
        { name: 'Illinois Mutual', domain: 'illinoismutual.com' },
        { name: 'John Hancock', domain: 'johnhancock.com' },
        { name: 'LSW', domain: 'lsw.com' },
        // Fix: Update company name for clarity.
        { name: 'Liberty Bankers Life', domain: 'lbig.com' },
        { name: 'Lincoln Financial', domain: 'lfg.com' },
        { name: 'National Life Group', domain: 'nationallife.com' },
        { name: 'New York Life', domain: 'newyorklife.com' },
        { name: 'Next Insurance', domain: 'nextinsurance.com' },
        { name: 'Prudential', domain: 'prudential.com' },
        { name: 'Root Insurance', domain: 'joinroot.com' },
        { name: 'Symetra', domain: 'symetra.com' },
        { name: 'Transamerica', domain: 'transamerica.com' },
    ].sort((a, b) => a.name.localeCompare(b.name));
    
    return (
        <div className="bg-white">
            <SEO
                title="About Us"
                description="Learn about New Holland Financial Group's history, mission, and commitment to providing tailored insurance solutions with integrity and personalized service."
                keywords="about New Holland Financial, insurance agency, company history, financial advisors"
            />
            <div className="container mx-auto px-6 py-20">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-brand-blue mb-4">About New Holland Financial Group</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Your trusted partner in securing a sound financial future through personalized insurance solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
                    <div className="rounded-lg overflow-hidden shadow-2xl">
                        <img src="https://picsum.photos/800/600?random=1" alt="Professional team meeting" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-brand-blue mb-4">Our History & Mission</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Founded with the goal of bringing clarity and trust to the insurance industry, New Holland Financial Group has grown from a small local agency to a respected firm serving clients across multiple states. Our history is built on a commitment to professional ethics and unwavering customer support.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Our mission is simple: <strong>to provide tailored insurance solutions that secure financial peace of mind for individuals, families, and businesses.</strong> We strive to build long-lasting relationships with our clients, guiding them through every stage of life with expert advice and reliable coverage.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Vision & Values</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                           Our vision is to be the most trusted and respected insurance advisory in the communities we serve. We achieve this by adhering to our core values:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li><strong>Integrity:</strong> We operate with honesty and transparency in all our interactions.</li>
                            <li><strong>Client-Centric:</strong> Your needs are at the heart of everything we do. We listen, we understand, and we deliver.</li>
                            <li><strong>Excellence:</strong> We are committed to the highest standards of professionalism and product knowledge.</li>
                            <li><strong>Community:</strong> We believe in giving back and strengthening the communities where we live and work.</li>
                        </ul>
                    </div>
                     <div className="rounded-lg overflow-hidden shadow-2xl order-1 md:order-2">
                        <img src="https://picsum.photos/800/600?random=2" alt="Community involvement" className="w-full h-full object-cover" />
                    </div>
                </div>
                
                <div className="mt-20 text-center bg-brand-light p-12 rounded-lg">
                    <h2 className="text-3xl font-bold text-brand-blue mb-4">Meet Our Team</h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                        Our strength lies in our people. The New Holland Financial Group team is comprised of <strong>licensed professionals dedicated to helping clients build long-term financial security.</strong> With diverse expertise and a shared passion for client success, our advisors are equipped to handle all your insurance needs with the care and attention you deserve.
                    </p>
                </div>

                {/* Trusted Carriers Section */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Trusted Carrier Partners</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                        We partner with the nation's top-rated insurance carriers to provide you with reliable coverage and competitive rates.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-center max-w-6xl mx-auto">
                       {carriers.map((carrier) => (
                            <div key={carrier.name} className="p-2 flex justify-center items-center h-24 opacity-80 hover:opacity-100 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105" title={carrier.name}>
                                <CarrierLogo 
                                    name={carrier.name} 
                                    url={carrier.domain ? `https://logo.clearbit.com/${carrier.domain}` : null} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;