import React, { useState, useEffect } from 'react';
import './Reports.css';

// Define types for our reports data
interface SalesData {
    period: string;
    revenue: number;
    orders: number;
    averageOrderValue: number;
}

interface ProductPerformance {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    stock: number;
}

interface CustomerMetric {
    metric: string;
    value: number | string;
    change: number;
}

const Reports: React.FC = () => {
    const [timeFrame, setTimeFrame] = useState('month');
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [topProducts, setTopProducts] = useState<ProductPerformance[]>([]);
    const [customerMetrics, setCustomerMetrics] = useState<CustomerMetric[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // In a real application, this would be API calls to fetch the report data
        // Simulating API calls with setTimeout
        setIsLoading(true);

        // Mock data generation based on selected timeframe
        setTimeout(() => {
            // Generate sales data
            const mockSalesData: SalesData[] = [];

            if (timeFrame === 'week') {
                // Last 7 days data
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    mockSalesData.push({
                        period: date.toLocaleDateString('en-US', { weekday: 'short' }),
                        revenue: Math.floor(Math.random() * 5000) + 1000,
                        orders: Math.floor(Math.random() * 50) + 10,
                        averageOrderValue: Math.floor(Math.random() * 100) + 50
                    });
                }
            } else if (timeFrame === 'month') {
                // Last 4 weeks data
                for (let i = 0; i < 4; i++) {
                    mockSalesData.push({
                        period: `Week ${i + 1}`,
                        revenue: Math.floor(Math.random() * 25000) + 10000,
                        orders: Math.floor(Math.random() * 200) + 50,
                        averageOrderValue: Math.floor(Math.random() * 100) + 60
                    });
                }
            } else {
                // Last 12 months data
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                for (let i = 0; i < 12; i++) {
                    mockSalesData.push({
                        period: monthNames[i],
                        revenue: Math.floor(Math.random() * 100000) + 50000,
                        orders: Math.floor(Math.random() * 1000) + 200,
                        averageOrderValue: Math.floor(Math.random() * 120) + 70
                    });
                }
            }

            // Top products
            const mockTopProducts: ProductPerformance[] = [
                {
                    id: '1',
                    name: 'Wireless Headphones',
                    sales: 145,
                    revenue: 14500,
                    stock: 32
                },
                {
                    id: '2',
                    name: 'Smartphone Pro Max',
                    sales: 98,
                    revenue: 58800,
                    stock: 15
                },
                {
                    id: '3',
                    name: 'Ultra HD Smart TV',
                    sales: 67,
                    revenue: 53600,
                    stock: 8
                },
                {
                    id: '4',
                    name: 'Fitness Tracker',
                    sales: 120,
                    revenue: 9600,
                    stock: 45
                },
                {
                    id: '5',
                    name: 'Portable Bluetooth Speaker',
                    sales: 110,
                    revenue: 8800,
                    stock: 28
                }
            ];

            // Customer metrics
            const mockCustomerMetrics: CustomerMetric[] = [
                {
                    metric: 'New Customers',
                    value: 256,
                    change: 12.5
                },
                {
                    metric: 'Returning Customers',
                    value: 178,
                    change: 8.3
                },
                {
                    metric: 'Average Customer Lifetime Value',
                    value: '$312.45',
                    change: 5.2
                },
                {
                    metric: 'Customer Retention Rate',
                    value: '68%',
                    change: -2.1
                },
                {
                    metric: 'Cart Abandonment Rate',
                    value: '23.5%',
                    change: -1.7
                }
            ];

            setSalesData(mockSalesData);
            setTopProducts(mockTopProducts);
            setCustomerMetrics(mockCustomerMetrics);
            setIsLoading(false);
        }, 1000);
    }, [timeFrame]);

    const handleTimeFrameChange = (newTimeFrame: string) => {
        setTimeFrame(newTimeFrame);
    };

    const calculateTotalRevenue = (): number => {
        return salesData.reduce((total, data) => total + data.revenue, 0);
    };

    const calculateTotalOrders = (): number => {
        return salesData.reduce((total, data) => total + data.orders, 0);
    };

    if (isLoading) {
        return <div className="loading-container">Loading reports data...</div>;
    }

    return (
        <div className="reports-container">
            <div className="reports-header">
                <h1>Sales &amp; Performance Reports</h1>
                <div className="time-filter">
                    <button
                        className={`filter-button ${timeFrame === 'week' ? 'active' : ''}`}
                        onClick={() => handleTimeFrameChange('week')}
                    >
                        Weekly
                    </button>
                    <button
                        className={`filter-button ${timeFrame === 'month' ? 'active' : ''}`}
                        onClick={() => handleTimeFrameChange('month')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`filter-button ${timeFrame === 'year' ? 'active' : ''}`}
                        onClick={() => handleTimeFrameChange('year')}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="reports-summary">
                <div className="summary-card">
                    <h3>Total Revenue</h3>
                    <p className="summary-value">${calculateTotalRevenue().toLocaleString()}</p>
                </div>
                <div className="summary-card">
                    <h3>Total Orders</h3>
                    <p className="summary-value">{calculateTotalOrders()}</p>
                </div>
                <div className="summary-card">
                    <h3>Avg. Order Value</h3>
                    <p className="summary-value">
                        ${(calculateTotalRevenue() / calculateTotalOrders()).toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="reports-section">
                <h2>Sales Overview</h2>
                <div className="sales-chart">
                    {/* Simplified chart visualization */}
                    <div className="chart-bars">
                        {salesData.map((data, index) => (
                            <div className="chart-bar-container" key={index}>
                                <div
                                    className="chart-bar"
                                    style={{ height: `${(data.revenue / 1000)}px` }}
                                    title={`$${data.revenue}`}
                                />
                                <div className="chart-label">{data.period}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="sales-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Revenue</th>
                                <th>Orders</th>
                                <th>Avg. Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.period}</td>
                                    <td>${data.revenue.toLocaleString()}</td>
                                    <td>{data.orders}</td>
                                    <td>${(data.revenue / data.orders).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="reports-section">
                <h2>Top Performing Products</h2>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Units Sold</th>
                            <th>Revenue</th>
                            <th>Current Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.sales}</td>
                                <td>${product.revenue.toLocaleString()}</td>
                                <td className={product.stock < 20 ? 'low-stock' : ''}>
                                    {product.stock}
                                    {product.stock < 20 && <span className="warning-text"> (Low)</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="reports-section">
                <h2>Customer Insights</h2>
                <div className="metrics-grid">
                    {customerMetrics.map((metric, index) => (
                        <div className="metric-card" key={index}>
                            <h3>{metric.metric}</h3>
                            <p className="metric-value">{metric.value}</p>
                            <p className={`metric-change ${metric.change >= 0 ? 'positive' : 'negative'}`}>
                                {metric.change >= 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="reports-actions">
                <button className="export-button">Export as PDF</button>
                <button className="export-button">Export as CSV</button>
            </div>
        </div>
    );
};

export default Reports;
