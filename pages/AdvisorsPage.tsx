import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdvisorCard from '../components/AdvisorCard';
import SEO from '../components/SEO';
import { useAdvisors } from '../contexts/AdvisorContext';
import { useAuth } from '../contexts/AuthContext';

const AdvisorsPage: React.FC = () => {
    const { advisors, deleteAdvisor, setAdvisorToEditId } = useAdvisors();
    const { canAccessAdmin } = useAuth();
    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        setAdvisorToEditId(id);
        navigate('/management-dashboard');
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this advisor? This action cannot be undone.')) {
            deleteAdvisor(id);
        }
    };

    return (
        <div className="bg-brand-light">
            <SEO
                title="Our Advisors"
                description="Meet the expert financial advisors at New Holland Financial Group. Our licensed professionals are dedicated to helping you build long-term financial security."
                keywords="financial advisors, insurance agents, meet the team, expert advisors"
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Meet Our Expert Advisors</h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Our dedicated professionals are here to guide you toward the best insurance solutions.
                    </p>
                </div>
            </section>
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-12">
                        <Link to="/" className="inline-flex items-center text-brand-blue hover:text-brand-gold transition-colors duration-300 group font-semibold">
                            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Back to Home
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {advisors.map(advisor => (
                            <AdvisorCard 
                                key={advisor.id} 
                                advisor={advisor}
                                canManage={canAccessAdmin}
                                onEdit={() => handleEdit(advisor.id)}
                                onDelete={() => handleDelete(advisor.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdvisorsPage;