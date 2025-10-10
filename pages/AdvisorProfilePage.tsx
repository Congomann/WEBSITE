import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { advisors } from '../data';

const AdvisorProfilePage: React.FC = () => {
    const { advisorId } = useParams<{ advisorId: string }>();
    const advisor = advisors.find(a => a.id === parseInt(advisorId || ''));

    if (!advisor) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="bg-white">
            <SEO
                title={`${advisor.name} | Financial Advisor`}
                description={`Learn more about ${advisor.name}, a ${advisor.title} at New Holland Financial Group. Specializing in ${advisor.specialties.join(', ')}. ${advisor.bio.substring(0, 120)}...`}
                keywords={`financial advisor, insurance agent, ${advisor.name}, ${advisor.specialties.join(', ')}, New Holland Financial Group`}
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
                        <Link
                            to={`/contact?advisor=${encodeURIComponent(advisor.name)}`}
                            className="block w-full text-center bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 text-lg"
                        >
                            Schedule a Consultation
                        </Link>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisorProfilePage;