
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { advisors } from '../data'; // For advisor names
import { core_services } from '../data'; // For service names

// A map for friendly names of static routes
const breadcrumbNameMap: { [key: string]: string } = {
    'about': 'About Us',
    'advisors': 'Advisors',
    'resources': 'Resources',
    'products': 'Shop',
    'cart': 'Shopping Cart',
    'checkout': 'Checkout',
    'order-success': 'Order Confirmation',
    'contact': 'Contact Us',
    'admin': 'Admin',
    'privacy-policy': 'Privacy Policy',
    'services': 'Services'
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // Don't show on homepage
    if (pathnames.length === 0) {
        return null;
    }
    
    // Custom logic to get dynamic names
    const getFriendlyName = (segment: string, index: number, segments: string[]): string => {
        // Check for advisor profile page: /advisors/:id
        if (segments[index - 1] === 'advisors' && !isNaN(parseInt(segment, 10))) {
            const advisor = advisors.find(a => a.id === parseInt(segment, 10));
            return advisor ? advisor.name : segment;
        }

        // Check for service page: /services/:service-path
        if (segments[index - 1] === 'services') {
             const service = core_services.find(s => s.path === `/services/${segment}`);
             return service ? service.name : segment;
        }

        return breadcrumbNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    };

    return (
        <nav aria-label="breadcrumb" className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-6 py-3">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    <li>
                        <Link to="/" className="text-brand-blue hover:text-brand-gold transition-colors duration-300">
                            Home
                        </Link>
                    </li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        const friendlyName = getFriendlyName(value, index, pathnames);

                        return (
                            <li key={to} className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                {isLast ? (
                                    <span className="font-semibold text-gray-800" aria-current="page">
                                        {friendlyName}
                                    </span>
                                ) : (
                                    <Link to={to} className="text-brand-blue hover:text-brand-gold transition-colors duration-300">
                                        {friendlyName}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumbs;
