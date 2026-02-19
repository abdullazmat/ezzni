
import { useState, useRef, useEffect } from 'react';
import { 
    Search, Filter, ChevronDown, 
    ArrowUpRight, XCircle, Clock,
    CreditCard, Download, ExternalLink, CheckCircle
} from 'lucide-react';
import { TransactionDetailsModal, TransactionHistoryModal, ProcessRefundModal } from './PaymentModals';

// --- Types ---

interface Transaction {
    id: string;
    tripId: string;
    rider: string;
    riderAvatar: string;
    amount: string;
    paymentMethod: 'VISA' | 'Mastercard' | 'Hezzni Wallet' | 'Cash';
    status: 'Completed' | 'Failed' | 'Pending' | 'Cancelled';
    refundStatus: 'No Refund' | 'Refunded' | 'Refund Pending' | 'Refund Failed' | 'Under Review';
    date: string;
}

// --- Mock Data ---

const mockTransactions: Transaction[] = [
    { id: 'PAY001', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=1', amount: '75.50 MAD', paymentMethod: 'VISA', status: 'Completed', refundStatus: 'No Refund', date: '2025-01-10 14:30' },
    { id: 'PAY002', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=2', amount: '75.50 MAD', paymentMethod: 'Hezzni Wallet', status: 'Completed', refundStatus: 'Refund Pending', date: '2025-01-10 14:30' },
    { id: 'PAY003', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=3', amount: '75.50 MAD', paymentMethod: 'Mastercard', status: 'Completed', refundStatus: 'Refunded', date: '2025-01-10 14:30' },
    { id: 'PAY004', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=4', amount: '75.50 MAD', paymentMethod: 'Cash', status: 'Cancelled', refundStatus: 'Refund Failed', date: '2025-01-10 14:30' },
    { id: 'PAY005', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=5', amount: '75.50 MAD', paymentMethod: 'VISA', status: 'Failed', refundStatus: 'Under Review', date: '2025-01-10 14:30' },
    { id: 'PAY006', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=6', amount: '75.50 MAD', paymentMethod: 'Mastercard', status: 'Completed', refundStatus: 'Refund Pending', date: '2025-01-10 14:30' },
    { id: 'PAY007', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=7', amount: '75.50 MAD', paymentMethod: 'Mastercard', status: 'Completed', refundStatus: 'Refund Pending', date: '2025-01-10 14:30' },
    { id: 'PAY008', tripId: 'TR001', rider: 'Youssef Benali', riderAvatar: 'https://i.pravatar.cc/150?u=8', amount: '75.50 MAD', paymentMethod: 'Mastercard', status: 'Completed', refundStatus: 'Refund Pending', date: '2025-01-10 14:30' },
];

// --- Helper Components ---

const StatusBadge = ({ status, type }: { status: string, type: 'payment' | 'refund' }) => {
    let bgColor = '#f3f4f6';
    let textColor = '#374151';

    if (type === 'payment') {
        switch (status) {
            case 'Completed': bgColor = '#dcfce7'; textColor = '#166534'; break;
            case 'Failed': bgColor = '#fee2e2'; textColor = '#991b1b'; break;
            case 'Pending': bgColor = '#fef3c7'; textColor = '#92400e'; break;
            case 'Cancelled': bgColor = '#fef08a'; textColor = '#854d0e'; break;
        }
    } else {
        switch (status) {
            case 'Refunded': bgColor = '#dcfce7'; textColor = '#166534'; break;
            case 'Refund Failed': bgColor = '#fee2e2'; textColor = '#991b1b'; break;
            case 'Refund Pending': bgColor = '#f3f4f6'; textColor = '#4b5563'; break;
            case 'Under Review': bgColor = '#e0e7ff'; textColor = '#3730a3'; break;
            case 'No Refund': bgColor = 'white'; textColor = '#374151'; break;
        }
    }

    return (
        <span style={{ 
            backgroundColor: bgColor, 
            color: textColor, 
            padding: '0.4rem 0.8rem', 
            borderRadius: '0.5rem', 
            fontSize: '0.75rem', 
            fontWeight: '600', 
            display: 'inline-block',
            minWidth: '80px',
            textAlign: 'center',
            border: status === 'No Refund' ? '1px solid #e5e7eb' : 'none'
        }}>
            {status}
        </span>
    );
};

const PaymentIcon = ({ method }: { method: string }) => {
    if (method === 'VISA') return <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1a1f71', fontStyle: 'italic' }}>VISA</span>;
    if (method === 'Mastercard') return <div style={{ display: 'flex' }}><div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#eb001b' }}></div><div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#f79e1b', marginLeft: '-6px' }}></div></div>;
    if (method === 'Cash') return <span style={{ backgroundColor: '#22c55e', color: 'white', padding: '2px 4px', borderRadius: '4px', fontSize: '0.7rem' }}>Cash</span>;
    return <span>💳</span>;
}

const DropdownItem = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                fontWeight: isActive ? 'bold' : 'normal',
                backgroundColor: hovered ? '#f3f4f6' : isActive ? '#f0fdf4' : 'transparent',
                color: isActive ? '#166534' : '#374151',
                fontSize: '0.85rem',
                transition: 'background-color 0.15s',
            }}
        >
            {label}
        </div>
    );
};

const Dropdown = ({ label, options, activeValue, onSelect }: { label: string, options: string[], activeValue: string, onSelect: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    padding: '0.6rem 1rem', borderRadius: '2rem', 
                    border: activeValue !== 'All' ? '1px solid #22c55e' : '1px solid #e5e7eb', 
                    backgroundColor: activeValue !== 'All' ? '#dcfce7' : 'white', 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', 
                    fontSize: '0.85rem', 
                    color: activeValue !== 'All' ? '#166534' : '#374151', 
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                }}
            >
                {activeValue === 'All' ? label : activeValue}
                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            {isOpen && (
                <div style={{ position: 'absolute', top: '120%', left: 0, minWidth: '180px', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)', padding: '0.5rem', zIndex: 50, border: '1px solid #e5e7eb' }}>
                    <DropdownItem label="All" isActive={activeValue === 'All'} onClick={() => { onSelect('All'); setIsOpen(false); }} />
                    {options.map(opt => (
                        <DropdownItem key={opt} label={opt} isActive={activeValue === opt} onClick={() => { onSelect(opt); setIsOpen(false); }} />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Component ---

export const Payment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [refundStatusFilter, setRefundStatusFilter] = useState('All');
    const [showFilters, setShowFilters] = useState(true);
    const [activeView, setActiveView] = useState<'Trip Payments' | 'Wallet Recharges' | 'Refund Management'>('Trip Payments');
    const [activeStat, setActiveStat] = useState('All');

    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [activeModal, setActiveModal] = useState<'details' | 'history' | 'refund' | null>(null);

    // Filter Logic
    const filteredTransactions = mockTransactions.filter(tx => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matches = 
                tx.id.toLowerCase().includes(term) || 
                tx.rider.toLowerCase().includes(term) ||
                tx.tripId.toLowerCase().includes(term);
            if (!matches) return false;
        }

        if (activeStat === 'Successful' && tx.status !== 'Completed') return false;
        if (activeStat === 'Failed' && tx.status !== 'Failed') return false;
        if (activeStat === 'Pending Refunds' && tx.refundStatus !== 'Refund Pending') return false;

        if (paymentMethodFilter !== 'All' && tx.paymentMethod !== paymentMethodFilter) return false;
        if (statusFilter !== 'All' && tx.status !== statusFilter) return false;
        if (refundStatusFilter !== 'All' && tx.refundStatus !== refundStatusFilter) return false;
        
        return true;
    });

    const activeFilterCount = [paymentMethodFilter, statusFilter, refundStatusFilter].filter(f => f !== 'All').length;

    const clearAllFilters = () => {
        setPaymentMethodFilter('All');
        setStatusFilter('All');
        setRefundStatusFilter('All');
        setActiveStat('All');
        setSearchTerm('');
    };

    const handleViewTransaction = (tx: Transaction) => {
        setSelectedTransaction(tx);
        setActiveModal('details');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                     <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Payments & Refunds</h1>
                     <p style={{ color: '#6b7280', margin: 0 }}>Monitor payment transactions, wallet recharges, and manage refunds</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '2rem', backgroundColor: '#22c55e', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                        <Download size={18} /> Export CSV
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', borderRadius: '2rem', backgroundColor: 'white', color: '#374151', border: '1px solid #e5e7eb', fontWeight: '600', cursor: 'pointer' }}>
                        Export Excel
                    </button>
                </div>
            </div>

            {/* Sub-Nav / Tabs */}
            <div style={{ display: 'flex', backgroundColor: '#f3f4f6', padding: '0.3rem', borderRadius: '2rem', width: 'fit-content' }}>
                {(['Trip Payments', 'Wallet Recharges', 'Refund Management'] as const).map((view) => (
                    <button 
                        key={view}
                        onClick={() => setActiveView(view)}
                        style={{ 
                            padding: '0.6rem 2rem', 
                            borderRadius: '2rem', 
                            border: 'none', 
                            backgroundColor: activeView === view ? '#22c55e' : 'transparent', 
                            color: activeView === view ? 'white' : '#6b7280', 
                            fontWeight: '600', 
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {view}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                    { id: 'All', label: 'Total Transactions', count: '0100', icon: <CreditCard size={20} /> },
                    { id: 'Successful', label: 'Successful', count: '005', icon: <CheckCircle size={20} /> },
                    { id: 'Failed', label: 'Failed', count: '0250', icon: <XCircle size={20} /> },
                    { id: 'Pending Refunds', label: 'Pending Refunds', count: '0250', icon: <Clock size={20} /> },
                ].map((stat) => {
                    const isActive = activeStat === stat.id;
                    return (
                        <div 
                            key={stat.id}
                            onClick={() => setActiveStat(isActive ? 'All' : stat.id)}
                            className="card" 
                            style={{ 
                                padding: '1.5rem', 
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px',
                                backgroundColor: isActive ? '#22c55e' : 'white',
                                color: isActive ? 'white' : 'inherit',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                transform: isActive ? 'translateY(-4px)' : 'none',
                                boxShadow: isActive ? '0 10px 15px -3px rgba(34, 197, 94, 0.3)' : 'var(--shadow-sm)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isActive ? 'white' : '#6b7280', fontWeight: '600' }}>
                                {stat.icon} {stat.label}
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.count}</div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', padding: '0.3rem', borderRadius: '50%', backgroundColor: isActive ? 'black' : '#22c55e', color: 'white' }}>
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                     <div style={{ position: 'relative', width: '250px', flexShrink: 0 }}>
                        <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                        <input 
                            type="text" 
                            placeholder="Search transaction..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '2rem', border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.85rem', color: '#1f2937', backgroundColor: 'white', boxSizing: 'border-box' }} 
                        />
                    </div>
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ 
                            padding: '0.6rem 1.2rem', borderRadius: '2rem', 
                            border: activeFilterCount > 0 ? '1px solid #22c55e' : '1px solid #e5e7eb', 
                            backgroundColor: activeFilterCount > 0 ? '#dcfce7' : showFilters ? '#f3f4f6' : 'white', 
                            display: 'flex', alignItems: 'center', gap: '0.5rem', 
                            fontSize: '0.85rem', color: activeFilterCount > 0 ? '#166534' : '#374151', 
                            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                            transition: 'all 0.2s'
                        }}
                    >
                        <Filter size={14} /> Filters
                        {activeFilterCount > 0 && (
                            <span style={{ backgroundColor: '#22c55e', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                    {showFilters && (
                        <>
                            <Dropdown label="Payment Method" options={['VISA', 'Mastercard', 'Hezzni Wallet', 'Cash']} activeValue={paymentMethodFilter} onSelect={setPaymentMethodFilter} />
                            <Dropdown label="Status" options={['Completed', 'Failed', 'Cancelled']} activeValue={statusFilter} onSelect={setStatusFilter} />
                            <Dropdown label="Refund Status" options={['No Refund', 'Refunded', 'Refund Pending', 'Refund Failed', 'Under Review']} activeValue={refundStatusFilter} onSelect={setRefundStatusFilter} />
                        </>
                    )}
                    {activeFilterCount > 0 && (
                        <button 
                            onClick={clearAllFilters}
                            style={{ padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none', backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: activeView === 'Trip Payments' 
                        ? '0.8fr 0.8fr 1.5fr 1.2fr 1.3fr 1fr 1.2fr 1fr 0.5fr'
                        : activeView === 'Wallet Recharges'
                        ? '0.8fr 1.5fr 1fr 1.2fr 1.2fr 1fr 1.2fr 1fr 0.5fr'
                        : '0.8fr 1fr 0.8fr 1fr 1fr 0.8fr 1fr 1fr 0.5fr',
                    backgroundColor: '#22c55e', color: 'white', padding: '1rem', borderRadius: '1rem', fontWeight: 'bold', fontSize: '0.85rem', alignItems: 'center', marginBottom: '1rem' 
                }}>
                    {activeView === 'Trip Payments' ? (
                        <>
                            <div>Transaction ID</div>
                            <div>Trip ID</div>
                            <div>Rider</div>
                            <div>Amount</div>
                            <div>Payment Method</div>
                            <div style={{textAlign:'center'}}>Status</div>
                            <div style={{textAlign:'center'}}>Refund Status</div>
                            <div style={{textAlign:'center'}}>Date</div>
                            <div style={{textAlign:'right'}}>Actions</div>
                        </>
                    ) : (
                        <>
                            <div>ID</div>
                            <div>User</div>
                            <div>Amount</div>
                            <div>Method</div>
                            <div>Code</div>
                            <div style={{textAlign:'center'}}>Status</div>
                            <div style={{textAlign:'center'}}>Refund</div>
                            <div style={{textAlign:'center'}}>Date</div>
                            <div style={{textAlign:'right'}}>Actions</div>
                        </>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredTransactions.map((tx) => (
                        <div key={tx.id} style={{ 
                            display: 'grid', 
                            gridTemplateColumns: activeView === 'Trip Payments' 
                                ? '0.8fr 0.8fr 1.5fr 1.2fr 1.3fr 1fr 1.2fr 1fr 0.5fr'
                                : activeView === 'Wallet Recharges'
                                ? '0.8fr 1.5fr 1fr 1.2fr 1.2fr 1fr 1.2fr 1fr 0.5fr'
                                : '0.8fr 1fr 0.8fr 1fr 1fr 0.8fr 1fr 1fr 0.5fr',
                            backgroundColor: 'white', padding: '1.2rem 1rem', borderRadius: '1.2rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', fontSize: '0.9rem' 
                        }}>
                            <div style={{ fontWeight: '800' }}>{tx.id}</div>
                            {activeView === 'Trip Payments' && <div style={{ fontWeight: '600', color: '#6b7280' }}>{tx.tripId}</div>}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <img src={tx.riderAvatar} alt={tx.rider} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                                <div style={{ fontWeight: '700' }}>{tx.rider}</div>
                            </div>
                            <div style={{ fontWeight: '800' }}>{tx.amount}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <PaymentIcon method={tx.paymentMethod} />
                                <span style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: '600' }}>{tx.paymentMethod}</span>
                            </div>
                            {activeView !== 'Trip Payments' && <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>CP123456789</div>}
                            <div style={{ textAlign: 'center' }}>
                                <StatusBadge status={tx.status} type="payment" />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <StatusBadge status={tx.refundStatus} type="refund" />
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                                {tx.date.split(' ')[0]}<br/>
                                {tx.date.split(' ')[1]}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <button 
                                    onClick={() => handleViewTransaction(tx)}
                                    style={{ background: '#f3f4f6', border: 'none', borderRadius: '2rem', padding: '0.5rem 1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: '700' }}
                                >
                                    <ExternalLink size={14} /> View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'details' && selectedTransaction && (
                <TransactionDetailsModal 
                    transaction={selectedTransaction} 
                    onClose={() => setActiveModal(null)}
                    onProcessRefund={() => setActiveModal('refund')}
                    onViewHistory={() => setActiveModal('history')}
                />
            )}

            {activeModal === 'history' && selectedTransaction && (
                <TransactionHistoryModal 
                    transaction={selectedTransaction} 
                    onClose={() => setActiveModal(null)}
                    onProcessRefund={() => setActiveModal('refund')}
                    onBack={() => setActiveModal('details')}
                />
            )}

            {activeModal === 'refund' && selectedTransaction && (
                <ProcessRefundModal 
                    transaction={selectedTransaction} 
                    onClose={() => setActiveModal(null)}
                    onBack={() => setActiveModal('details')}
                />
            )}
        </div>
    );
};
