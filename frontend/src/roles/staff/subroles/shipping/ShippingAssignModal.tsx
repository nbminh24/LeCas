import React, { useState } from 'react';

interface ShippingAssignModalProps {
    orderId: string;
    onClose: () => void;
    onCreateViettelPost: (trackingCode: string) => void;
}

const ShippingAssignModal: React.FC<ShippingAssignModalProps> = ({ orderId, onClose, onCreateViettelPost }) => {
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [note, setNote] = useState('');
    const [creating, setCreating] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');

    const handleCreate = () => {
        setCreating(true);
        // Giả lập tạo vận đơn, thực tế sẽ gọi API backend tạo vận đơn Viettel Post
        setTimeout(() => {
            const code = 'VT' + Math.floor(Math.random() * 1000000);
            setTrackingCode(code);
            setCreating(false);
            onCreateViettelPost(code);
        }, 1200);
    };

    return (
        <div className="modal-stock-bg" onClick={onClose}>
            <div className="modal-stock" onClick={e => e.stopPropagation()} style={{ minWidth: 340 }}>
                <h4>Tạo vận đơn Viettel Post</h4>
                <div style={{ marginBottom: 10 }}>
                    <label>Tên người nhận:</label>
                    <input value={receiverName} onChange={e => setReceiverName(e.target.value)} className="orders-list-search-input" />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>SĐT người nhận:</label>
                    <input value={receiverPhone} onChange={e => setReceiverPhone(e.target.value)} className="orders-list-search-input" />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>Địa chỉ nhận:</label>
                    <input value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)} className="orders-list-search-input" />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>Ghi chú:</label>
                    <input value={note} onChange={e => setNote(e.target.value)} className="orders-list-search-input" />
                </div>
                <button className="btn-action" onClick={handleCreate} disabled={creating}>
                    {creating ? 'Đang tạo...' : 'Tạo vận đơn'}
                </button>
                {trackingCode && (
                    <div style={{ marginTop: 12, color: '#1976d2' }}>
                        <b>Mã vận đơn:</b> {trackingCode} <br />
                        <a href={`https://viettelpost.com.vn/Tracking?KEY=${trackingCode}`} target="_blank" rel="noopener noreferrer">Theo dõi đơn hàng</a>
                    </div>
                )}
                <button className="btn-action" style={{ marginTop: 10 }} onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default ShippingAssignModal;
