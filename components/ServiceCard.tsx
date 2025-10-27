
import React from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types';

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    return (
        <Link to={service.path} className="block h-full group">
            <div
                className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
                <div className="mb-4 text-brand-gold transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-2 transition-colors duration-300 group-hover:text-brand-gold">{service.name}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                <span className="mt-4 text-brand-blue font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn More &rarr;</span>
            </div>
        </Link>
    );
};

export default ServiceCard;
