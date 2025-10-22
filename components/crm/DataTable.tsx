import React from 'react';

interface Column {
    header: string;
    accessor: string;
    isDate?: boolean;
}

interface Action {
    label: string;
    onClick: (item: any) => void;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    actions?: Action[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, actions }) => {
    if (!data || data.length === 0) {
        return <p className="text-gray-500 text-center py-8">No data available.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(col => (
                            <th key={col.accessor} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-gray-50">
                            {columns.map(col => (
                                <td key={col.accessor} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {col.isDate ? new Date(item[col.accessor]).toLocaleDateString() : item[col.accessor]}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    {actions.map(action => (
                                        <button
                                            key={action.label}
                                            onClick={() => action.onClick(item)}
                                            className="text-brand-blue hover:text-brand-gold font-semibold"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
