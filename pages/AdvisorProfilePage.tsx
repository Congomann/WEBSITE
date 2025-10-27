
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import BookingModal from '../components/BookingModal';
import CallbackForm from '../components/CallbackForm';
import { useAdvisors } from '../contexts/AdvisorContext';

const LinkedInIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> );
const FacebookIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg> );
const TwitterIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.238-2.08.188.608 1.923 2.373 3.256 4.478 3.3-1.625 1.27-3.673 2.023-5.892 2.023-.38 0-.755-.022-1.124-.067 2.099 1.343 4.6 2.123 7.332 2.123 8.793 0 13.5-7.29 13.5-13.5 0-.204-.005-.407-.014-.61.932-.67 1.743-1.51 2.388-2.478z"/></svg> );
const InstagramIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg> );
const TikTokIcon = () => ( <svg fill="currentColor" viewBox="0 0 448 512" className="w-6 h-6"><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3v178.6a162.5 162.5 0 1 1 -162.5-162.5v100.3a74.6 74.6 0 1 0 149.2 0v-251.8a121.2 121.2 0 0 0 -242.4 0v22.2h74.5v-22.2a46.7 46.7 0 1 1 93.3 0v251.8a149.2 149.2 0 1 0 -149.2-149.2h74.5v-89.2a210.1 210.1 0 0 1 345.1 39.3z" /></svg> );
const SnapchatIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.111 4.234c.39 0 .72.115.989.345.27.23.405.532.405.907 0 .383-.135.688-.405.915-.27.227-.6.341-.99.341a.92.92 0 01-.99-.34c-.27-.228-.404-.532-.404-.916 0-.375.135-.676.404-.907.27-.23.599-.345.99-.345zm4.84 5.385c.036.324-.045.64-.225.946a1.9 1.9 0 01-.63.63l-2.736 1.84c-.234.162-.432.243-.594.243-.126 0-.252-.045-.378-.135l-1.35-1.017v3.25c0 .39-.08.69-.24.9-.16.21-.4.315-.72.315-.32 0-.56-.105-.72-.315-.16-.21-.24-.51-.24-.9V12.15l-1.35 1.017c-.126.09-.252.135-.378.135-.162 0-.36-.08-.594-.242L3.32 11.2c-.378-.27-.612-.603-.702-.999-.09-.395-.045-.756.135-1.08.18-.324.473-.563.878-.711.405-.149.81-.135 1.215.045L6.69 9.6l.306-.216c.36-.252.76-.378 1.2-.378h.414c.44 0 .84.126 1.2.378l.306.216 1.845-1.152c.405-.18.81-.194 1.215-.045.405.148.698.387.878.711.18.324.225.685.135 1.08z"/></svg>);
const ThreadsIcon = () => ( <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.75c-5.1 0-9.25 4.15-9.25 9.25s4.15 9.25 9.25 9.25 9.25-4.15 9.25-9.25S17.1 2.75 12 2.75zm0 1.5c4.28 0 7.75 3.47 7.75 7.75S16.28 19.5 12 19.5 4.25 16.03 4.25 11.75 7.72 4.25 12 4.25zm-2.83 5.37c-.32 0-.58.26-.58.58s.26.58.58.58h5.66c.32 0 .58-.26.58-.58s-.26-.58-.58-.58H9.17zm0 3c-.32 0-.58.26-.58.58s.26.58.58.58h5.66c.32 0 .58-.26.58-.58s-.26-.58-.58-.58H9.17z"/></svg>);

const socialIconMap: { [key: string]: React.ReactNode } = {
    'LinkedIn': <LinkedInIcon />,
    'Facebook': <FacebookIcon />,
    'Twitter': <TwitterIcon />,
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
