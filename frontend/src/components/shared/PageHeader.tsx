import React from 'react';
import './SharedComponents.css';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
    return (
        <div className="page-header">
            <div className="page-header-content">
                <div className="page-header-title">
                    <h1>{title}</h1>
                    {subtitle && <p className="page-subtitle">{subtitle}</p>}
                </div>
                {actions && <div className="page-header-actions">{actions}</div>}
            </div>
        </div>
    );
};
