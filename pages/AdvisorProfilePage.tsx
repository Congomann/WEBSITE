import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import BookingModal from '../components/BookingModal';
import CallbackForm from '../components/CallbackForm';
import { useAdvisors } from '../contexts/AdvisorContext';

const LinkedInIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> );
const FacebookIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg> );
const TwitterIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.238-2.08.188.608 1.923 2.373 3.256 4.478 3.3-1.625 1.27-3.673 2.023-5.892 2.023-.38 0-.755-.022-1.124-.067 2.099 1.343 4.6 2.123 7.332 2.123 8.793 0 13.5-7.29 13.5-13.5 0-.204-.005-.407-.014-.61.932-.67 1.743-1.51 2.388-2.478z"/></svg> );

const socialIconMap: { [key: string]: React.ReactNode } = {
    'LinkedIn': <LinkedInIcon />,
    'Facebook': <FacebookIcon />,
    'Twitter': <TwitterIcon />,
};

const AdvisorProfilePage: React.FC = () => {
    const { advisorId } = useParams<{ advisorId: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { advisors } = useAdvisors();
    const advisor = advisors.find(a => a.id === parseInt(advisorId || ''));

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
                                        socialIconMap[link.name] ? (
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