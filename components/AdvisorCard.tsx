import React from 'react';
import { Link } from 'react-router-dom';
import type { Advisor } from '../types';

interface AdvisorCardProps {
    advisor: Advisor;
    canManage?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor, canManage, onEdit, onDelete }) => {
    
    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit?.();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete?.();
    };

    return (
        <div className="relative group h-full">
            {canManage && (
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleEditClick} className="p-2 bg-brand-blue text-white rounded-full shadow-lg hover:bg-opacity-80 transition-colors" aria-label={`Edit ${advisor.name}`}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    </button>
                     <button onClick={handleDeleteClick} className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors" aria-label={`Delete ${advisor.name}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            )}
            <Link 
                to={`/advisors/${advisor.id}`} 
                className="block bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full transform group-hover:-translate-y-1 transition-transform duration-300"
            >
                <img src={advisor.imageUrl} alt={advisor.name} className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-gold transition-colors duration-300">{advisor.name}</h3>
                    <p className="text-brand-gold font-semibold mb-3">{advisor.title}</p>
                    
                    <div className="space-y-3 mb-4 text-sm">
                        {advisor.email && (
                            <a href={`mailto:${advisor.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center text-gray-700 hover:text-brand-blue group transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-brand-blue transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>{advisor.email}</span>
                            </a>
                        )}
                        {advisor.phone && (
                            <a href={`tel:${advisor.phone.replace(/\D/g, '')}`} onClick={(e) => e.stopPropagation()} className="flex items-center text-gray-700 hover:text-brand-blue group transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-brand-blue transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span>{advisor.phone}</span>
                            </a>
                        )}
                    </div>

                    <p className="text-gray-600 mb-6 flex-grow">{advisor.bio.substring(0, 100)}...</p>

                    <span className="mt-auto text-brand-gold font-bold self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Profile &rarr;
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default AdvisorCard;