
import React, { useState } from 'react';
import SEO from '../components/SEO';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { trusted_carriers } from '../data';

// A helper component to render logos with a fallback for clarity and reuse.
const CarrierLogo: React.FC<{ name: string; url: string | null; customLogo?: React.ReactNode }> = ({ name, url, customLogo }) => {
    const [error, setError] = useState(false);

    if (customLogo) {
        return <>{customLogo}</>;
    }

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
    const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.05 });

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "New Holland Financial Group",
        "image": "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
        "url": "https://newhollandfinancial.com/",
        "telephone": "(515) 555-0123",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Des Moines",
          "addressRegion": "IA",
          "addressCountry": "US"
        },
        "description": "Learn about New Holland Financial Group in Des Moines, IA. Discover our history, mission, and our commitment to providing tailored insurance solutions with integrity."
    };
    
    return (
        <div className="bg-white">
            <SEO
                title="About Our Des Moines Insurance Agency | New Holland Financial Group"
                description="Discover the mission and values of New Holland Financial Group. Learn why we are a leading insurance agency in Des Moines, IA, dedicated to our community and clients."
                keywords="about New Holland Financial Group, insurance agency Des Moines, our mission, financial advisors Iowa, company history"
                structuredData={structuredData}
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
                        <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop" alt="Professional team meeting" className="w-full h-full object-cover" />
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
                        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" alt="Community involvement" className="w-full h-full object-cover" />
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
                    <div
                        ref={containerRef}
                        className="w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                    >
                        {trusted_carriers.map((carrier, index) => (
                            <div
                                key={carrier.name}
                                title={carrier.name}
                                className={`aspect-square flex justify-center items-center p-4 bg-white rounded-lg shadow-md transition-all duration-500 ease-in-out transform filter grayscale hover:grayscale-0 hover:scale-105 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <CarrierLogo
                                    name={carrier.name}
                                    url={carrier.domain ? `https://logo.clearbit.com/${carrier.domain}` : null}
                                    customLogo={carrier.customLogo}
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
