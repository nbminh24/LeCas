import React, { useState } from 'react';
import { DataGrid } from '../../../../components/shared/DataGrid';
import './OrdersList.css';

interface ShippingOrder {
    id: string;
    customerName: string;
    phone: string;
    address: string;
    status: string;
    createdAt: string;
    trackingNumber?: string;
}

interface ShippingOrdersListProps {
    status: string;
}

const MOCK_ORDERS: ShippingOrder[] = [
    {
        id: 'ORD001',
        customerName: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '12 Lê Lợi, Q.1, TP.HCM',
        status: 'pending',
        createdAt: '2025-06-23 09:00',
    },
    {
        id: 'ORD002',
        customerName: 'Trần Thị B',
        phone: '0912345678',
        address: '45 Nguyễn Huệ, Q.1, TP.HCM',
        status: 'created',
        createdAt: '2025-06-23 10:00',
        trackingNumber: 'VT123456789VN',
    },
    {
        id: 'ORD003',
        customerName: 'Lê Văn C',
        phone: '0987654321',
        address: '99 Pasteur, Q.3, TP.HCM',
        status: 'delivered',
        createdAt: '2025-06-22 15:00',
        trackingNumber: 'VT987654321VN',
    },
    {
        id: 'ORD004',
        customerName: 'Phạm Thị D',
        phone: '0932123456',
        address: '88 Hai Bà Trưng, Q.1, TP.HCM',
        status: 'failed',
        createdAt: '2025-06-21 14:00',
        trackingNumber: 'VT111222333VN',
    },
    {
        id: 'ORD005',
        customerName: 'Võ Minh E',
        phone: '0977123456',
        address: '10 Lý Tự Trọng, Q.1, TP.HCM',
        status: 'cancelled',
        createdAt: '2025-06-20 11:00',
        trackingNumber: 'VT444555666VN',
    },
];

const ShippingOrdersList: React.FC<ShippingOrdersListProps> = ({ status }) => {
    const [searchText, setSearchText] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [dateError, setDateError] = useState('');
    const isPending = status === 'pending';
    const orders = MOCK_ORDERS.filter(o => {
        if (o.status !== status) return false;
        const matchText = o.id.toLowerCase().includes(searchText.toLowerCase()) ||
            o.customerName.toLowerCase().includes(searchText.toLowerCase());
        if (isPending) return matchText;
        // Lọc ngày cho các trạng thái khác
        const orderDate = new Date(o.createdAt);
        const from = dateFrom ? new Date(dateFrom) : null;
        const to = dateTo ? new Date(dateTo) : null;
        let matchDate = true;
        if (from && orderDate < from) matchDate = false;
        if (to && orderDate > to) matchDate = false;
        return matchText && matchDate;
    });

    // Validate ngày
    function handleDateChange(type: 'from' | 'to', value: string) {
        if (type === 'from') setDateFrom(value);
        if (type === 'to') setDateTo(value);
        if (type === 'from' && dateTo && value && new Date(value) > new Date(dateTo)) {
            setDateError('Ngày bắt đầu không được lớn hơn ngày kết thúc');
        } else if (type === 'to' && dateFrom && value && new Date(value) < new Date(dateFrom)) {
            setDateError('Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
        } else {
            setDateError('');
        }
    }

    const columns = [
        { key: 'id', title: 'Mã đơn', align: 'center' },
        { key: 'customerName', title: 'Khách hàng', align: 'center' },
        { key: 'phone', title: 'SĐT', align: 'center' },
        { key: 'address', title: 'Địa chỉ', align: 'center' },
        { key: 'createdAt', title: 'Ngày tạo', align: 'center' },
        !isPending ? { key: 'trackingNumber', title: 'Mã vận đơn', align: 'center' } : null,
        {
            key: 'actions', title: 'Thao tác', align: 'center',
            render: (_: any, record: ShippingOrder) => renderActions(record)
        }
    ].filter(Boolean);

    function renderActions(order: ShippingOrder) {
        return (
            <div className="actions" style={{ justifyContent: 'center', display: 'flex', gap: 8 }}>
                <button className="btn-view">Xem</button>
                {status === 'pending' && <button className="btn-action">Tạo vận đơn</button>}
                {status === 'created' && <button className="btn-action">Trạng thái</button>}
                {status === 'delivered' && <button className="btn-action">In phiếu</button>}
                {status === 'failed' && <button className="btn-action">Thử lại</button>}
                {status === 'cancelled' && <button className="btn-action">Chi tiết</button>}
            </div>
        );
    }

    return (
        <div className="orders-list-container">
            <div className="orders-header-flex" style={{ gap: 0, alignItems: 'flex-end' }}>
                <div className="orders-list-search-row" style={{ flex: 1, marginBottom: 0, marginRight: 24 }}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm đơn hàng..."
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        className="orders-list-search-input"
                    />
                    {!isPending && (
                        <>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={e => handleDateChange('from', e.target.value)}
                                style={{ marginLeft: 12, marginRight: 4 }}
                                className="orders-list-search-input"
                                placeholder="Từ ngày"
                            />
                            <span style={{ margin: '0 4px' }}>-</span>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={e => handleDateChange('to', e.target.value)}
                                style={{ marginRight: 8 }}
                                className="orders-list-search-input"
                                placeholder="Đến ngày"
                            />
                        </>
                    )}
                </div>
                <div className="export-btn-right" style={{ marginTop: 0 }}>
                    <button className="primary-button">Xuất đơn hàng</button>
                </div>
            </div>
            {dateError && <div style={{ color: 'red', marginTop: 4, marginBottom: 4 }}>{dateError}</div>}
            <div className="orders-grid">
                <DataGrid columns={columns as any} data={orders} />
            </div>
        </div>
    );
};

export default ShippingOrdersList;
