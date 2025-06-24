import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard.css';

interface Product {
    id: string;
    image: string;
    name: string;
    color: string;
    size: string;
    sku: string;
    quantity: number;
    location: string;
    warning: string;
}

const mockProducts: Product[] = [
    {
        id: '1',
        image: 'https://via.placeholder.com/48x48',
        name: 'Áo thun nam basic',
        color: 'Trắng',
        size: 'L',
        sku: 'TSHIRT-001',
        quantity: 120,
        location: 'Kệ A1',
        warning: '',
    },
    {
        id: '2',
        image: 'https://via.placeholder.com/48x48',
        name: 'Quần short kaki',
        color: 'Be',
        size: 'M',
        sku: 'SHORT-002',
        quantity: 8,
        location: 'Kệ B2',
        warning: 'Sắp hết',
    },
    {
        id: '3',
        image: 'https://via.placeholder.com/48x48',
        name: 'Áo sơ mi linen',
        color: 'Xanh navy',
        size: 'XL',
        sku: 'SHIRT-003',
        quantity: 0,
        location: 'Kệ C3',
        warning: 'Hết hàng',
    },
];

const Inventory: React.FC = () => {
    console.log('Inventory component rendered');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [reportFilter, setReportFilter] = useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('day');

    useEffect(() => {
        setTimeout(() => {
            setProducts(mockProducts);
            setLoading(false);
        }, 500);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div className="loading">Đang tải dữ liệu kho hàng...</div>;
    }

    return (
        <div className="staff-page">
            <div style={{ margin: '8px 0 0 0', display: 'flex', gap: 12, alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <select value={reportFilter} onChange={e => setReportFilter(e.target.value as any)} style={{ height: 36, borderRadius: 8, border: '1px solid #e5e7eb', padding: '0 12px' }}>
                    <option value="day">Theo ngày</option>
                    <option value="week">Theo tuần</option>
                    <option value="month">Theo tháng</option>
                    <option value="quarter">Theo quý</option>
                    <option value="year">Theo năm</option>
                </select>
            </div>
            <div className="table-container" style={{ marginTop: 8 }}>
                <table className="data-table">
                    <thead>
                        <tr style={{ background: '#fafafa' }}>
                            {/* <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>Ảnh</th> */}
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>Tên sản phẩm</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>Màu</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>Size</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>SKU</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'center' }}>Số lượng</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>Vị trí</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'center' }}>Cảnh báo</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'center' }}>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: 'center', padding: 32, color: '#888' }}>Không có sản phẩm nào phù hợp.</td>
                            </tr>
                        ) : (
                            filteredProducts.map(item => (
                                <tr key={item.id}>
                                    {/* <td style={{ padding: '12px 8px' }}><img src={item.image} alt={item.name} /> */}
                                    <td style={{ padding: '12px 8px' }}>{item.name}</td>
                                    <td style={{ padding: '12px 8px' }}>{item.color}</td>
                                    <td style={{ padding: '12px 8px' }}>{item.size}</td>
                                    <td style={{ padding: '12px 8px' }}>{item.sku}</td>
                                    <td style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</td>
                                    <td style={{ padding: '12px 8px' }}>{item.location}</td>
                                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                                        {item.warning ? (
                                            <span style={{
                                                display: 'inline-block',
                                                background: item.warning === 'Hết hàng' ? '#fee2e2' : '#fef9c3',
                                                color: item.warning === 'Hết hàng' ? '#b91c1c' : '#b45309',
                                                borderRadius: 8,
                                                padding: '2px 12px',
                                                fontWeight: 500,
                                                fontSize: 14
                                            }}>{item.warning.toUpperCase()}</span>
                                        ) : '—'}
                                    </td>
                                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                            <button
                                                style={{
                                                    background: '#fff',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: 8,
                                                    padding: '6px 18px',
                                                    fontWeight: 500,
                                                    fontSize: 15,
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s',
                                                    color: '#222',
                                                    boxShadow: 'none',
                                                }}
                                                onMouseOver={e => (e.currentTarget.style.background = '#f3f4f6')}
                                                onMouseOut={e => (e.currentTarget.style.background = '#fff')}
                                            >Xem chi tiết</button>
                                            <button
                                                style={{
                                                    background: '#fff',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: 8,
                                                    padding: '6px 18px',
                                                    fontWeight: 500,
                                                    fontSize: 15,
                                                    color: '#222',
                                                    boxShadow: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s',
                                                }}
                                                onMouseOver={e => (e.currentTarget.style.background = '#f3f4f6')}
                                                onMouseOut={e => (e.currentTarget.style.background = '#fff')}
                                            >Cập nhật</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
