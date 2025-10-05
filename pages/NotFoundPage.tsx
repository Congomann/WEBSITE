
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center bg-white py-40 px-6">
            <SEO
                title="Page Not Found (404)"
                description="The page you are looking for does not exist."
                noIndex={true}
            />
            <h1 className="text-8xl font-extrabold text-brand-blue">404</h1>
            <h2 className="text-3xl font-bold text-brand-blue mt-4 mb-2">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                We're sorry, but the page you were looking for could not be found. It might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg transform hover:scale-105"
            >
                Return to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
