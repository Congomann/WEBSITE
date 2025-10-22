import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon?: React.ReactNode;
    color?: string;
    description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'bg-gray-500', description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-300">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
            </div>
            {icon && (
                <div className={`p-4 rounded-full ${color}`}>
                    {icon}
                </div>
            )}
        </div>
    );
};

export default StatCard;
