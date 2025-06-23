import React, { useState, useRef } from 'react';
import { DataGrid } from '../../../../components/shared/DataGrid';
import { Portal } from '../../../../components/shared/Portal';
import './OrdersList.css';

// Mock data - replace with actual API data
const mockOrders = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        date: '2024-01-15',
        status: 'Pending',
        total: 299.99
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        date: '2024-01-14',
        status: 'Processing',
        total: 149.50
    },
    {
        id: 'ORD-003',
        customerName: 'Minh Nguyen',
        date: '2024-01-13',
        status: 'ReadyToShip',
        total: 199.00
    },
    {
        id: 'ORD-004',
        customerName: 'Linh Tran',
        date: '2024-01-12',
        status: 'Shipped',
        total: 99.00
    },
];

const OrdersList: React.FC = () => {
    const [orders] = useState(mockOrders);
    const [showStockModal, setShowStockModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    // Lấy status filter từ URL
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get('status');
    const filteredOrders = statusParam && statusParam !== 'all'
        ? orders.filter(o => o.status.toLowerCase() === statusParam.toLowerCase())
        : orders;
    const searchedOrders = filteredOrders.filter(order =>
        order.id.toLowerCase().includes(searchText.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
    const columns = [
        { key: 'id', title: 'Mã đơn', align: 'center' },
        { key: 'customerName', title: 'Khách hàng', align: 'center' },
        { key: 'date', title: 'Ngày đặt', align: 'center' },
        { key: 'status', title: 'Trạng thái', align: 'center' },
        {
            key: 'total', title: 'Tổng tiền', align: 'center',
            render: (value: number) => `${value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`
        },
        {
            key: 'actions', title: '', align: 'center',
            render: (_: any, record: any) => renderActions(record)
        }
    ];

    // Đóng menu khi click ngoài
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        }
        if (openMenuId) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

    // Action buttons theo trạng thái
    const renderActions = (record: any) => {
        const status = record.status.toLowerCase();
        const showMoreMenu = status === 'pending';
        return (
            <div className="actions" style={{ justifyContent: 'center' }}>
                <button className="btn-view" onClick={() => { setSelectedOrder(record); setShowOrderModal(true); }}>Xem chi tiết</button>
                {status === 'pending' && <>
                    <button className="btn-action" onClick={() => { setSelectedOrder(record); setShowStockModal(true); }}>Xem kho</button>
                    <button className="btn-action" style={{ color: '#1976d2' }}>Xác nhận</button>
                </>}
                {status === 'readytoship' && <>
                    <button className="btn-action" style={{ color: '#1976d2' }}>Bàn giao cho vận chuyển</button>
                </>}
                {/* Menu phụ chỉ hiện với pending */}
                {showMoreMenu && (
                    <div className="more-menu-wrapper" ref={menuRef}>
                        <button className="btn-more" onClick={() => setOpenMenuId(record.id)}>
                            &#x22EE;
                        </button>
                        {openMenuId === record.id && (
                            <Portal>
                                <div className="more-menu-popup" style={getMenuPopupStyle(menuRef)}>
                                    <button className="btn-danger" onClick={() => {
                                        setOpenMenuId(null);
                                        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
                                            // TODO: handle cancel order
                                        }
                                    }}>Hủy đơn hàng</button>
                                </div>
                            </Portal>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Helper to position popup absolutely in viewport
    function getMenuPopupStyle(ref: React.RefObject<HTMLDivElement>): React.CSSProperties {
        if (!ref.current) return {};
        const rect = ref.current.getBoundingClientRect();
        return {
            position: 'fixed',
            top: `${rect.bottom + 4}px`,
            left: `${rect.right - 150}px`,
            zIndex: 2000
        };
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
                </div>
                <div className="export-btn-right" style={{ marginTop: 0 }}>
                    <button className="primary-button">Xuất đơn hàng</button>
                </div>
            </div>
            <div className="orders-grid">
                <DataGrid
                    columns={columns}
                    data={searchedOrders}
                />
            </div>
            {showStockModal && (
                <div className="modal-stock-bg" onClick={() => setShowStockModal(false)}>
                    <div className="modal-stock" onClick={e => e.stopPropagation()}>
                        <h4>Tồn kho sản phẩm</h4>
                        <ul>
                            <li>Sản phẩm A: 12 cái</li>
                            <li>Sản phẩm B: 5 cái</li>
                            <li>Sản phẩm C: 0 cái (hết hàng)</li>
                        </ul>
                        <button className="btn-action" onClick={() => setShowStockModal(false)}>Đóng</button>
                    </div>
                </div>
            )}
            {showOrderModal && selectedOrder && (
                <div className="modal-stock-bg" onClick={() => setShowOrderModal(false)}>
                    <div className="modal-stock" onClick={e => e.stopPropagation()}>
                        <h4>Chi tiết đơn hàng</h4>
                        <div><b>Mã đơn:</b> {selectedOrder.id}</div>
                        <div><b>Khách hàng:</b> {selectedOrder.customerName}</div>
                        <div><b>Ngày đặt:</b> {selectedOrder.date}</div>
                        <div><b>Trạng thái:</b> {selectedOrder.status}</div>
                        <div><b>Tổng tiền:</b> {selectedOrder.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        <ul style={{ marginTop: '10px' }}>
                            <li>Sản phẩm A: 2 cái</li>
                            <li>Sản phẩm B: 1 cái</li>
                        </ul>
                        <button className="btn-action" onClick={() => setShowOrderModal(false)}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersList;
