import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import QuoteForm from '../components/QuoteForm';
import type { Service } from '../types';
import SEO from '../components/SEO';
import { API_BASE_URL } from '../constants';

// Icons need to be defined in the component since they are JSX, not simple data.
const ShieldIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-15.904z" /> </svg> );
const CarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M9 22l-4-4 1.5-1.5L9 18l4.5-4.5L19 18l-4 4-2.5-2.5L9 22zM12 12v.01" /> </svg> );
const HomeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> </svg> );
const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> </svg> );
const UsersIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> </svg> );

const iconMap: { [key: string]: React.ReactNode } = {
    'Life Insurance': <ShieldIcon />,
    'Auto & Commercial': <CarIcon />,
    'Property Insurance': <HomeIcon />,
    'Health Insurance': <HeartIcon />,
    'Group Benefits': <UsersIcon />,
};

const WHY_CHOOSE_US = [
    { text: 'Trusted Carriers', description: 'We partner with top-rated insurance carriers to offer you reliable and competitive policies.' },
    { text: 'Personalized Coverage', description: 'Our agents work with you to understand your needs and craft a policy that fits your life and budget.' },
    { text: 'Licensed Agents in Multiple States', description: 'Our experienced team is licensed and ready to assist clients across various states.' },
    { text: 'Fast Claims Assistance', description: 'When you need to make a claim, we are here to guide you through the process quickly and efficiently.' },
];

const HomePage: React.FC = () => {
    const [coreServices, setCoreServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/services`);
                if (!response.ok) throw new Error('Failed to fetch services');
                const data: Service[] = await response.json();
                const servicesWithIcons = data.map(service => ({
                    ...service,
                    icon: iconMap[service.name] || <ShieldIcon /> // Default icon
                }));
                setCoreServices(servicesWithIcons);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, []);

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
                        {coreServices.map((service, index) => (
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