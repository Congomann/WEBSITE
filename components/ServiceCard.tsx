import React from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types';

interface ServiceCardProps {
    service: Service;
    animationDelay?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, animationDelay = '0ms' }) => {
    return (
        <Link to={service.path} className="block group">
            <div
                className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col items-center text-center transition-all duration-300 ease-out transform group-hover:-translate-y-2"
            >
                <div className="mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110">
                    {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-2 group-hover:text-brand-gold transition-colors duration-300">{service.name}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                <span className="mt-4 text-brand-gold font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">Learn More &rarr;</span>
            </div>
        </Link>
    );
};

export default ServiceCard;