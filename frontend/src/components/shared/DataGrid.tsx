import React from 'react';
import './SharedComponents.css';

interface DataGridProps {
    columns: {
        key: string;
        title: string;
        render?: (value: any, record: any) => React.ReactNode;
    }[];
    data: any[];
    actions?: (record: any) => React.ReactNode;
}

export const DataGrid: React.FC<DataGridProps> = ({ columns, data, actions }) => {
    return (
        <div className="data-grid">
            <table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.key}>{column.title}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((record, index) => (
                        <tr key={index}>
                            {columns.map(column => (
                                <td key={`${index}-${column.key}`}>
                                    {column.render
                                        ? column.render(record[column.key], record)
                                        : record[column.key]
                                    }
                                </td>
                            ))}
                            {actions && (
                                <td className="actions-cell">
                                    {actions(record)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
