
import React, { useMemo } from 'react';
import type { Commission } from '../../types';

interface SalesChartProps {
    data: Commission[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const months = Array.from({ length: 6 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            return {
                label: d.toLocaleString('default', { month: 'short' }),
                year: d.getFullYear(),
                month: d.getMonth(),
                total: 0,
            };
        }).reverse();

        data.forEach(commission => {
            const commissionDate = new Date(commission.date);
            const monthIndex = months.findIndex(m => m.year === commissionDate.getFullYear() && m.month === commissionDate.getMonth());
            if (monthIndex > -1) {
                months[monthIndex].total += commission.commissionAmount;
            }
        });
        return months;
    }, [data]);

    const maxCommission = useMemo(() => {
        const max = Math.max(...chartData.map(d => d.total));
        return max > 0 ? max : 1000; // Avoid division by zero and have a baseline
    }, [chartData]);

    if (data.length === 0) {
        return (
            <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <p className="font-semibold">No Sales Data Yet</p>
                    <p className="text-sm">Your sales performance will appear here as you close deals.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full h-64 bg-gray-50 p-4 rounded-lg flex items-end justify-around gap-2">
            {chartData.map(item => (
                <div key={item.label} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <div 
                        className="w-full bg-blue-200 hover:bg-brand-blue rounded-t-md transition-all duration-300 relative" 
                        style={{ height: `${(item.total / maxCommission) * 100}%` }}
                    >
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ${item.total.toFixed(2)}
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 mt-2">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default SalesChart;
