import React, { useMemo, useState } from 'react';
import type { Policy } from '../../types';

interface ChartDataItem {
    type: Policy['type'];
    amount: number;
    color: string;
}

interface CommissionBreakdownChartProps {
    data: ChartDataItem[];
    onSegmentClick: (type: Policy['type'] | null) => void;
    activeFilter: Policy['type'] | null;
}

const DonutSegment: React.FC<{
    radius: number;
    strokeWidth: number;
    percentage: number;
    offset: number;
    color: string;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
}> = ({ radius, strokeWidth, percentage, offset, color, isActive, onMouseEnter, onMouseLeave, onClick }) => {
    const circumference = 2 * Math.PI * radius;
    // Calculate the length of the arc for this segment
    const arcLength = (percentage / 100) * circumference;
    // The dash array creates a line of `arcLength` and then a gap for the rest of the circle
    const strokeDasharray = `${arcLength} ${circumference}`;

    return (
        <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            // The offset rotates the start of the stroke
            strokeDashoffset={-offset * circumference / 100}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            className={`cursor-pointer transition-all duration-300 ${isActive ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'}`}
            style={{ transformOrigin: 'center' }}
        />
    );
};


const CommissionBreakdownChart: React.FC<CommissionBreakdownChartProps> = ({ data, onSegmentClick, activeFilter }) => {
    const [hoveredSegment, setHoveredSegment] = useState<ChartDataItem | null>(null);

    const totalAmount = useMemo(() => data.reduce((sum, item) => sum + item.amount, 0), [data]);

    const segments = useMemo(() => {
        if (totalAmount === 0) return [];
        let cumulativePercentage = 0;
        return data.map(item => {
            const percentage = (item.amount / totalAmount) * 100;
            const segment = {
                ...item,
                percentage,
                offset: cumulativePercentage,
            };
            cumulativePercentage += percentage;
            return segment;
        });
    }, [data, totalAmount]);
    
    const displayData = hoveredSegment || (activeFilter ? data.find(d => d.type === activeFilter) : null);
    
    const radius = 75;
    const strokeWidth = 25;

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="relative w-52 h-52 flex-shrink-0">
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                    <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth={strokeWidth} />
                    {segments.map((seg) => (
                        <DonutSegment
                            key={seg.type}
                            radius={radius}
                            strokeWidth={strokeWidth}
                            percentage={seg.percentage}
                            offset={seg.offset}
                            color={seg.color}
                            isActive={activeFilter === seg.type || activeFilter === null}
                            onMouseEnter={() => setHoveredSegment(seg)}
                            onMouseLeave={() => setHoveredSegment(null)}
                            onClick={() => onSegmentClick(seg.type)}
                        />
                    ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
                    {displayData ? (
                        <>
                            <span className="text-sm font-semibold text-gray-700 break-words">{displayData.type}</span>
                            <span className="text-3xl font-bold" style={{color: displayData.color}}>
                                {(displayData.amount / totalAmount * 100).toFixed(1)}%
                            </span>
                            <span className="text-xs text-gray-500">${displayData.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </>
                    ) : (
                        <>
                            <span className="text-xs text-gray-500">Total Earned</span>
                            <span className="text-3xl font-bold text-brand-blue">
                                ${totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </span>
                        </>
                    )}
                </div>
            </div>
            
            <div className="flex-1 w-full">
                <ul className="space-y-2">
                    {data.map(item => (
                        <li 
                            key={item.type} 
                            className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${activeFilter === item.type ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                            onClick={() => onSegmentClick(item.type)}
                            onMouseEnter={() => setHoveredSegment(item)}
                            onMouseLeave={() => setHoveredSegment(null)}
                        >
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-sm mr-3 flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                                <span className="font-semibold text-gray-700">{item.type}</span>
                            </div>
                            <div className="text-right flex-shrink-0 ml-4">
                                <span className="font-bold text-gray-800">${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                {totalAmount > 0 && <span className="text-sm text-gray-500 ml-2">({(item.amount / totalAmount * 100).toFixed(1)}%)</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommissionBreakdownChart;
