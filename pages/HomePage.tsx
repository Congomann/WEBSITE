import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import QuoteForm from '../components/QuoteForm';
import { CORE_SERVICES, WHY_CHOOSE_US } from '../constants';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
    return (
        <div>
            <SEO
                title="Protecting Your Life, Family & Future"
                description="A professional website for New Holland Financial Group, an insurance company, showcasing their services, company information, and providing a way for customers to get a quote."
                keywords="New Holland Financial, insurance, life insurance, auto insurance, home insurance, group benefits, Des Moines insurance"
            />
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center text-white py-32 md:py-48"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555431182-0c34c83e4244?q=80&w=2070&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-brand-blue bg-opacity-70"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 opacity-0 animate-fade-in-down">
                        Protect What Matters Most
                    </h1>
                    <p className="text-2xl md:text-4xl font-light mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        Your Life, Family & Future.
                    </p>
                    <div className="space-x-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <Link to="/contact" className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg transform hover:scale-105">
                            Get a Free Quote
                        </Link>
                        <Link to="/advisors" className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-brand-blue transition-all duration-300 text-lg transform hover:scale-105">
                            Speak with an Advisor
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Intro Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-4">Welcome to New Holland Financial Group</h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        At New Holland Financial Group, we are built on a foundation of integrity, experience, and personalized service. We understand that every client is unique, and we are dedicated to finding the perfect insurance solutions to meet your specific needs.
                    </p>
                    <p className="max-w-3xl mx-auto text-brand-blue font-semibold text-xl mt-6 italic bg-brand-light p-6 rounded-lg">
                        “Providing tailored insurance solutions that secure financial peace of mind for individuals, families, and businesses.”
                    </p>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">Our Core Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CORE_SERVICES.map((service, index) => (
                            <ServiceCard 
                                key={service.name} 
                                service={service} 
                                animationDelay={`${index * 150}ms`} 
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {WHY_CHOOSE_US.map(item => (
                            <div key={item.text} className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-xl font-bold text-brand-blue">{item.text}</h3>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Quote Section */}
            <section className="py-20 bg-brand-blue">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
                        <h2 className="text-3xl font-bold text-center text-brand-blue mb-8">Request Your Free Quote Today!</h2>
                        <QuoteForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;