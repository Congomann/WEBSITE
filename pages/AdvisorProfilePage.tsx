import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { advisors } from '../data';

const SchedulingModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    advisorName: string;
    googleMeetLink: string;
}> = ({ isOpen, onClose, advisorName, googleMeetLink }) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in" 
            style={{animationDuration: '300ms'}}
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheduling-modal-title"
        >
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative transform animate-fade-in-up" style={{animationDuration: '400ms'}}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close scheduling modal">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 id="scheduling-modal-title" className="text-2xl font-bold text-brand-blue text-center mb-6">Schedule with {advisorName}</h2>
                <div className="space-y-4">
                     <a
                        href={googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full text-center bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 text-lg"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Book a Google Meet
                    </a>
                     <Link
                        to={`/contact?advisor=${encodeURIComponent(advisorName)}`}
                        className="block w-full text-center bg-transparent border-2 border-brand-blue text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-300 text-lg"
                    >
                        Send a Message Instead
                    </Link>
                </div>
            </div>
        </div>
    );
};


const AdvisorProfilePage: React.FC = () => {
    const { advisorId } = useParams<{ advisorId: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const advisor = advisors.find(a => a.id === parseInt(advisorId || ''));

    if (!advisor) {
        return <Navigate to="/404" replace />;
    }
    
    const googleMeetLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Consultation with ${advisor.name}`)}&details=${encodeURIComponent(`Financial consultation regarding services from New Holland Financial Group.`)}&location=Google%20Meet&add=${encodeURIComponent(advisor.email || '')}`;


    return (
        <div className="bg-white">
            <SEO
                title={`${advisor.name} | Financial Advisor`}
                description={`Learn more about ${advisor.name}, a ${advisor.title} at New Holland Financial Group. Specializing in ${advisor.specialties.join(', ')}. ${advisor.bio.substring(0, 120)}...`}
                keywords={`financial advisor, insurance agent, ${advisor.name}, ${advisor.specialties.join(', ')}, New Holland Financial Group, ${advisor.languages?.join(', ')}`}
            />
            
            <SchedulingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                advisorName={advisor.name}
                googleMeetLink={googleMeetLink}
            />

            <section className="bg-brand-blue text-white py-12">
                <div className="container mx-auto px-6">
                     <Link to="/advisors" className="inline-flex items-center text-white hover:text-brand-gold transition-colors duration-300 group font-semibold">
                        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to All Advisors
                    </Link>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Left Column: Image and Contact */}
                    <div className="md:col-span-1">
                        <img src={advisor.imageUrl} alt={advisor.name} className="w-full rounded-lg shadow-2xl mb-6" />
                        <h1 className="text-3xl font-extrabold text-brand-blue">{advisor.name}</h1>
                        <p className="text-xl text-brand-gold font-semibold mb-6">{advisor.title}</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="block w-full text-center bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 text-lg"
                        >
                            Schedule a Consultation
                        </button>
                    </div>

                    {/* Right Column: Bio and Specialties */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-brand-blue mb-4 border-b pb-2">About {advisor.name.split(' ')[0]}</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{advisor.bio}</p>

                        <h2 className="text-2xl font-bold text-brand-blue mt-10 mb-4 border-b pb-2">Areas of Expertise</h2>
                        <div className="flex flex-wrap gap-3">
                            {advisor.specialties.map(spec => (
                                <span key={spec} className="bg-brand-light text-brand-blue text-md font-semibold px-4 py-2 rounded-full">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        {advisor.languages && advisor.languages.length > 0 && (
                            <>
                                <h2 className="text-2xl font-bold text-brand-blue mt-10 mb-4 border-b pb-2">Languages Spoken</h2>
                                <div className="flex flex-wrap gap-3">
                                    {advisor.languages.map(lang => (
                                        <span key={lang} className="bg-gray-200 text-gray-800 text-md font-semibold px-4 py-2 rounded-full">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisorProfilePage;