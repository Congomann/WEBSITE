
import React from 'react';
import { Link } from 'react-router-dom';
import type { Advisor } from '../types';

interface AdvisorCardProps {
    advisor: Advisor;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor }) => {
    return (
        <Link 
            to={`/advisors/${advisor.id}`} 
            className="block group bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
        >
            <img src={advisor.imageUrl} alt={advisor.name} className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-gold transition-colors duration-300">{advisor.name}</h3>
                <p className="text-brand-gold font-semibold mb-3">{advisor.title}</p>
                <div className="mb-4">
                    <h4 className="font-bold text-gray-700">Specialties:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {advisor.specialties.map(spec => (
                            <span key={spec} className="bg-brand-light text-brand-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">{spec}</span>
                        ))}
                    </div>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">{advisor.bio.substring(0, 100)}...</p>
                <span className="mt-auto text-brand-gold font-bold self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Profile &rarr;
                </span>
            </div>
        </Link>
    );
};

export default AdvisorCard;