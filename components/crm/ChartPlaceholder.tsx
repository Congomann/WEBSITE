import React from 'react';

const ChartPlaceholder: React.FC = () => {
    return (
        <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
                <p className="font-semibold">Chart Placeholder</p>
                <p className="text-sm">Data visualization will be displayed here.</p>
            </div>
        </div>
    );
};

export default ChartPlaceholder;
