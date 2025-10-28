
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import BookingModal from '../components/BookingModal';
import CallbackForm from '../components/CallbackForm';
import { useAdvisors } from '../contexts/AdvisorContext';

const LinkedInIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> );
const FacebookIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg> );
const XIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg> );
const InstagramIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg> );
const TikTokIcon = () => ( <svg fill="currentColor" viewBox="0 0 16 16" className="w-6 h-6"><path d="M9 0h1.98c.144.715.54 1.414 1.114 1.963.574.549 1.306.913 2.122 1.051V5.22c-.816-.18-1.58-.56-2.207-1.065a3.14 3.14 0 0 1-1.5-2.324H9V9.25a2.5 2.5 0 1 1-5 0V0h1.98v5.524a2.5 2.5 0 1 1-2.48.024L4.52 0h1.98v5.018a4.5 4.5 0 1 0 4.5 4.455V0Z"/></svg> );
const SnapchatIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19.05 13.66v-2.31c0-3.69-3.21-6.66-7.16-6.66-3.95 0-7.16 2.97-7.16 6.66v2.31c0 1.5.63 2.87 1.63 3.86-.51 1-1.36 1.63-2.34 1.71h-.02c-.23 0-.44-.15-.51-.38-.11-.31.06-.66.39-.77.53-.18.91-.68.91-1.26 0-.74-.6-1.33-1.33-1.33s-1.33.6-1.33 1.33c0 1.25 1.02 2.26 2.29 2.26h.08c1.88-.13 3.53-1.25 4.31-2.84a5.31 5.31 0 0 0 4.67 0c.78 1.59 2.43 2.71 4.31 2.84h.08c1.27 0 2.29-1.02 2.29-2.26 0-.74-.6-1.33-1.33-1.33s-1.33.6-1.33 1.33c0 .58.38 1.08.91 1.26.33.11.5.46.39.77-.07.23-.28.38-.51.38h-.02c-.98-.08-1.83-.71-2.34-1.71 1-1 1.63-2.36 1.63-3.86Z"/></svg>);
const ThreadsIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.75c-5.1 0-9.25 4.15-9.25 9.25s4.15 9.25 9.25 9.25 9.25-4.15 9.25-9.25S17.1 2.75 12 2.75zm0 1.5c4.28 0 7.75 3.47 7.75 7.75S16.28 19.5 12 19.5 4.25 16.03 4.25 11.75 7.72 4.25 12 4.25zm-2.83 5.37c-.32 0-.58.26-.58.58s.26.58.58.58h5.66c.32 0 .58-.26.58-.58s-.26-.58-.58-.58H9.17zm0 3c-.32 0-.58.26-.58.58s.26.58.58.58h5.66c.32 0 .58-.26.58-.58s-.26-.58-.58-.58H9.17z"/></svg>);

const socialIconMap: { [key: string]: React.ReactNode } = {
    'LinkedIn': <LinkedInIcon />,
    'Facebook': <FacebookIcon />,
    'X': <XIcon />,
    'Instagram': <InstagramIcon />,
    'TikTok': <TikTokIcon />,
    'Snapchat': <SnapchatIcon />,
    'Threads': <ThreadsIcon />,
};

const AdvisorProfilePage: React.FC = () => {
    const { advisorSlug } = useParams<{ advisorSlug: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { advisors } = useAdvisors();
    const advisor = advisors.find(a => a.slug === advisorSlug);

    if (!advisor) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="bg-white">
            <SEO
                title={`${advisor.name} | Financial Advisor`}
                description={`Learn more about ${advisor.name}, a ${advisor.title} at New Holland Financial Group. Specializing in ${advisor.specialties.join(', ')}. ${advisor.bio.substring(0, 120)}...`}
                keywords={`financial advisor, insurance agent, ${advisor.name}, ${advisor.specialties.join(', ')}, New Holland Financial Group, ${advisor.languages?.join(', ')}`}
            />
            
            {advisor && (
              <BookingModal 
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  advisor={advisor}
              />
            )}


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

                        {advisor.socialLinks && advisor.socialLinks.length > 0 && (
                             <>
                                <h2 className="text-2xl font-bold text-brand-blue mt-10 mb-4 border-b pb-2">Connect Online</h2>
                                <div className="flex flex-wrap gap-4">
                                    {advisor.socialLinks.map(link => (
                                        link.url && socialIconMap[link.name] ? (
                                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-blue transition-colors" aria-label={`Connect with ${advisor.name} on ${link.name}`}>
                                                <span className="sr-only">{link.name}</span>
                                                {socialIconMap[link.name]}
                                            </a>
                                        ) : null
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Callback Section */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
                        <h2 className="text-3xl font-bold text-center text-brand-blue mb-8">Or, Request a Quick Callback</h2>
                        <CallbackForm advisorName={advisor.name} advisorId={advisor.id} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdvisorProfilePage;
