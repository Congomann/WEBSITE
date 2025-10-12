
import React, { useState } from 'react';
import SEO from '../components/SEO';

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
    // Custom AIG Logo component
    const AIGLogo = () => (
        <svg role="img" aria-label="AIG logo" viewBox="0 0 1200 630" className="max-h-12 w-auto">
            <rect width="1200" height="630" fill="#005daa"/>
            <path d="M459.1,234.3h32.2l61.3,103.5l61.3-103.5h32.2v161.4h-28.9V275.6l-57.1,96.3h-15.1l-57.1-96.3 v120.1h-28.9V234.3z M711.9,234.3h80.7c28.9,0,48.1,19.3,48.1,47.2c0,21.7-13.4,36.9-32.2,42.5l39,71.7h-35.3l-34.4-66.5 h-37.8v66.5h-28.1V234.3z M740,261.3v47.2h38.7c14.2,0,23.4-8.8,23.4-23.4c0-14.6-9.2-23.8-23.4-23.8H740z M282.8,395.7V234.3 h28.9v161.4H282.8z" fill="#FFFFFF"/>
        </svg>
    );

    interface Carrier {
        name: string;
        domain: string;
        customLogo?: React.ReactNode;
    }

    const carriers: Carrier[] = [
        { name: 'Aflac', domain: 'aflac.com' },
        { name: 'Americo', domain: 'americo.com' },
        { name: 'American Continental Insurance Co', domain: 'aetna.com' },
        { name: 'Banner Life', domain: 'lgamerica.com' },
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
        { name: 'Protective Life', domain: 'protective.com' },
        { name: 'Liberty Bankers Life', domain: 'lbig.com' },
        { name: 'Lincoln Financial', domain: 'lfg.com' },
        { name: 'National Life Group', domain: 'nationallife.com' },
        { name: 'New York Life', domain: 'newyorklife.com' },
        { name: 'Next Insurance', domain: 'nextinsurance.com' },
        { name: 'Prudential', domain: 'prudential.com' },
        { name: 'Root Insurance', domain: 'joinroot.com' },
        { name: 'Symetra', domain: 'symetra.com' },
        { name: 'Transamerica', domain: 'transamerica.com' },
        { name: 'AIG', domain: 'aig.com', customLogo: <AIGLogo /> },
        { name: 'Allianz', domain: 'allianz.com' },
        { name: 'Ameritas Life', domain: 'ameritas.com' },
        { name: 'Foresters Financial', domain: 'foresters.com' },
        { name: 'Kansas City Life', domain: 'kclife.com' },
        { name: 'Mutual of Omaha', domain: 'mutualofomaha.com' },
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 items-start max-w-6xl mx-auto">
                       {carriers.map((carrier) => (
                            <div key={carrier.name} className="text-center group transition-transform duration-300 transform hover:-translate-y-1" title={carrier.name}>
                                <div className="p-4 flex justify-center items-center h-24 bg-gray-50 rounded-lg border border-gray-200 group-hover:shadow-lg transition-shadow">
                                    <CarrierLogo 
                                        name={carrier.name} 
                                        url={carrier.domain ? `https://logo.clearbit.com/${carrier.domain}` : null} 
                                        customLogo={carrier.customLogo}
                                    />
                                </div>
                                <p className="text-sm text-gray-700 font-medium mt-3">{carrier.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;