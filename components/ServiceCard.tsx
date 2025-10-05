import React from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface ServiceCardProps {
    service: Service;
    animationDelay?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, animationDelay = '0ms' }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <Link to={service.path} className="block group">
            <div
                ref={ref}
                className={`bg-white rounded-lg shadow-lg p-8 h-full flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                } group-hover:-translate-y-2`}
                style={{ transitionDelay: isVisible ? animationDelay : '0ms' }}
            >
                <div className="mb-4">
                    {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-2 group-hover:text-brand-gold transition-colors">{service.name}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                <span className="mt-4 text-brand-gold font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn More &rarr;</span>
            </div>
        </Link>
    );
};

export default ServiceCard;