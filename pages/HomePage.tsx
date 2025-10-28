

import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import QuoteForm from '../components/QuoteForm';
import type { Service } from '../types';
import SEO from '../components/SEO';
import { useContent } from '../contexts/ContentContext';
import HeroBackground from '../components/HeroBackground';

const LifeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const AutoIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 011.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-17.25-1.5a1.5 1.5 0 011.5-1.5h12.75a1.5 1.5 0 011.5 1.5m-15.75 0v-3.75a1.5 1.5 0 011.5-1.5h12.75a1.5 1.5 0 011.5 1.5V12m-15.75 0h15.75" /></svg> );
const HomeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> </svg> );
const HeartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> </svg> );
const UsersIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> </svg> );
const RealEstateIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m6 0h.008v.008H21V3z" /></svg> );

const iconMap: { [key: string]: React.ReactNode } = { 'Life Insurance': <LifeIcon />, 'Auto & Commercial': <AutoIcon />, 'Property Insurance': <HomeIcon />, 'Real Estate': <RealEstateIcon />, 'Health Insurance': <HeartIcon />, 'Group Benefits': <UsersIcon /> };

const WHY_CHOOSE_US = [
    { text: 'Trusted Carriers', description: 'We partner with top-rated insurance carriers to offer you reliable and competitive policies.' },
    { text: 'Personalized Coverage', description: 'Our agents work with you to craft a policy that fits your life and budget.' },
    { text: 'Licensed in Multiple States', description: 'Our experienced team is licensed and ready to assist clients across various states.' },
    { text: 'Fast Claims Assistance', description: 'We guide you through the claims process quickly and efficiently.' },
];

const HomePage: React.FC = () => {
    const { content } = useContent();
    const { hero_background } = content;
    const servicesWithIcons: Service[] = content.core_services.map(service => ({ ...service, icon: iconMap[service.name] || <LifeIcon /> }));

    return (
        <div>
            <SEO title="Protecting Your Life, Family & Future" description="New Holland Financial Group: Your partner in securing financial peace of mind with tailored insurance solutions." keywords="insurance, life insurance, auto insurance, home insurance, group benefits, Des Moines insurance" />
            
            {/* Hero Section */}
            <section className="relative text-white py-32 md:py-48 overflow-hidden">
                <HeroBackground background={hero_background} />
                <div className="absolute inset-0 bg-brand-blue opacity-40 z-10"></div>
                <div className="container mx-auto px-6 text-center relative z-20">
                    <h1 className="text-4xl md:text-6xl font-extrabold animate-fade-in-down">Protect What Matters Most</h1>
                    <p className="text-2xl md:text-4xl font-light mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Your Life, Family & Future.</p>
                    <div className="space-x-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <Link to="/contact" className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400">Get a Free Quote</Link>
                        <Link to="/advisors" className="inline-block bg-white bg-opacity-20 border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-brand-blue">Speak with an Advisor</Link>
                    </div>
                </div>
            </section>
            
            {/* Core Services Section */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-brand-blue mb-12">Our Core Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesWithIcons.map((service) => ( <ServiceCard key={service.name} service={service} /> ))}
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
                                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div className="ml-4"><h3 className="text-xl font-bold text-brand-blue">{item.text}</h3><p className="mt-1 text-gray-600">{item.description}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-brand-blue mb-4">Welcome to New Holland Financial Group</h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">We are built on integrity, experience, and personalized service, dedicated to finding the perfect insurance solutions for your specific needs.</p>
                </div>
            </section>

            {/* Quote Form Section */}
            <section className="py-20 bg-brand-blue">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
                        <h2 className="text-3xl font-bold text-center text-brand-blue mb-8">Request Your Free Quote!</h2>
                        <QuoteForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;