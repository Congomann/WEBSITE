
import React from 'react';
import SEO from '../components/SEO';
import AgentApplicationForm from '../components/AgentApplicationForm';

const BENEFITS = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
        title: 'Access to Top Carriers',
        description: 'Gain access to our extensive network of A-rated insurance carriers, allowing you to offer the best products and rates to your clients.',
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        title: 'Competitive Compensation',
        description: 'We offer one of the most competitive commission and compensation structures in the industry, rewarding your hard work and success.',
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
        title: 'Training & Mentorship',
        description: 'Whether you are new or experienced, our ongoing training programs and mentorship from industry veterans will help you grow.',
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
        title: 'Marketing & Lead Support',
        description: 'Leverage our proven marketing systems and qualified lead generation programs to build and expand your client base faster.',
    },
];

const JoinOurTeamPage: React.FC = () => {
    return (
        <div className="bg-white">
            <SEO
                title="Join Our Team"
                description="Start or grow your career as an insurance agent with New Holland Financial Group. We offer competitive compensation, top carriers, and unparalleled support."
                keywords="insurance agent careers, join insurance agency, insurance jobs Des Moines, become an insurance agent"
            />
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center text-white py-32"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-brand-blue bg-opacity-75"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 animate-fade-in-down">
                        Grow Your Career with New Holland Financial Group
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        We're looking for passionate and driven individuals to join our team of successful agents.
                    </p>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">Why Partner With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {BENEFITS.map((item, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div className="ml-5">
                                    <h3 className="text-xl font-bold text-brand-blue">{item.title}</h3>
                                    <p className="mt-1 text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Application Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-brand-blue mb-4">Ready to Apply?</h2>
                        <p className="text-lg text-gray-600 text-center mb-10">
                            Complete the application below to take the next step in your career. We look forward to hearing from you.
                        </p>
                        <div className="bg-gray-50 p-8 rounded-lg shadow-xl border border-gray-200">
                           <AgentApplicationForm />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JoinOurTeamPage;