
import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-brand-blue"></div>
    </div>
);

export default LoadingSpinner;
