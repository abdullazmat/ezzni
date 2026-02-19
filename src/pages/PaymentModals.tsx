import { ArrowLeft, X, Wallet } from 'lucide-react';

interface ModalProps {
    onClose: () => void;
    transaction: any;
    onProcessRefund?: () => void;
    onViewHistory?: () => void;
    onBack?: () => void;
}

const ModalOverlay = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
    <div 
        style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
    >
        {children}
    </div>
);

const InfoItem = ({ label, value, isStatus }: { label: string, value: string | React.ReactNode, isStatus?: boolean }) => (
    <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>{label}</div>
        {isStatus ? (
            <div style={{ 
                backgroundColor: '#dcfce7', color: '#166534', 
                padding: '0.2rem 0.6rem', borderRadius: '0.4rem', 
                fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block' 
            }}>
                {value}
            </div>
        ) : (
            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#111827' }}>{value}</div>
        )}
    </div>
);

// --- Transaction Details Modal ---
export const TransactionDetailsModal = ({ onClose, transaction, onProcessRefund, onViewHistory }: ModalProps) => {
    return (
        <ModalOverlay onClose={onClose}>
            <div className="card" style={{ width: '640px', backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <button onClick={onClose} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={24} color="#111827" strokeWidth={3} />
                </button>

                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>Transaction Details - {transaction.id}</h2>
                <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>Review payment transaction details and manage refunds.</p>

                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '1rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr', gap: '0.5rem', marginBottom: '2rem' }}>
                    <InfoItem label="Transaction ID" value={transaction.id} />
                    <InfoItem label="Rider" value={transaction.rider} />
                    <InfoItem label="Trip ID" value={transaction.tripId} />
                    <InfoItem label="Amount" value={`${transaction.amount.replace(' MAD', '')}.00 MAD`} />
                    
                    <InfoItem label="Payment Method" value={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                             <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1a1f71', fontStyle: 'italic' }}>{transaction.paymentMethod}</span>
                        </div>
                    } />
                    <InfoItem label="Date" value={transaction.date} />
                    <InfoItem label="Current Status" value={transaction.status === 'Completed' ? 'Complete' : transaction.status} isStatus />
                    <InfoItem label="Phone" value="+212 6 12 34 56" />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button 
                        onClick={onViewHistory}
                        style={{ flex: 1, padding: '0.85rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        Transaction History
                    </button>
                    <button 
                        onClick={onProcessRefund}
                        style={{ flex: 1, padding: '0.85rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        Process Refund
                    </button>
                    <button 
                        style={{ flex: 1, padding: '0.85rem', borderRadius: '2rem', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        Download Receipt
                    </button>
                </div>
            </div>
        </ModalOverlay>
    );
};

// --- Transaction History Modal ---
export const TransactionHistoryModal = ({ onClose, transaction, onProcessRefund }: ModalProps) => {
    const historyItems = [
        { method: 'Mastercard', last4: '4532', date: '03 Jun, 2025 at 12:00 PM', amount: '+ 55.66 MAD', icon: '💳' },
        { method: 'Visa Card', last4: '4532', date: '03 Jun, 2025 at 12:00 PM', amount: '+ 55.66 MAD', icon: '💳' },
        { method: 'Cashplus', last4: '', date: '03 Jun, 2025 at 12:00 PM', amount: '+ 55.66 MAD', icon: '🟢' },
        { method: 'Wafacash', last4: '', date: '03 Jun, 2025 at 12:00 PM', amount: '+ 55.66 MAD', icon: '🟡' },
    ];

    return (
        <ModalOverlay onClose={onClose}>
            <div className="card" style={{ width: '640px', backgroundColor: 'white', borderRadius: '1.5rem', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
                <div style={{ padding: '2rem' }}>
                    <button onClick={onClose} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} color="#111827" strokeWidth={3} />
                    </button>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 1.5rem 0' }}>Transaction History</h2>

                    <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: '0 0 1rem 0' }}>User Information</h3>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '1rem' }}>
                         <div style={{ position: 'relative' }}>
                             <img src={transaction.riderAvatar} alt={transaction.rider} style={{ width: 64, height: 64, borderRadius: '50%' }} />
                             <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.4rem', borderRadius: '0.5rem', fontSize: '0.65rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', border: '1px solid #e5e7eb' }}>
                                 <span style={{color:'#fbbf24'}}>★</span> 4.8
                             </div>
                         </div>
                         <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Full Name</div>
                                <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{transaction.rider}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Phone</div>
                                <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>+212 6 12 34 56</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Account ID</div>
                                <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>R-00045</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>User Type</div>
                                <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Driver</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>City</div>
                                <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Casablanca</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Email</div>
                                <div style={{ fontWeight: '700', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>Mohamedalaoui@email.com</div>
                            </div>
                         </div>
                    </div>

                    <div style={{ 
                        backgroundImage: 'linear-gradient(to right, #22c55e, #10b981)', 
                        padding: '1.5rem', borderRadius: '1rem', color: 'white', 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '1.5rem', position: 'relative', overflow: 'hidden'
                    }}>
                        <div>
                             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                                 <ArrowLeft size={10} style={{ transform: 'rotate(90deg)' }} /> Top up
                             </div>
                             <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Wallet Balance</div>
                             <div style={{ fontSize: '1.8rem', fontWeight: '800' }}>55.66 MAD</div>
                             <div style={{ fontSize: '0.65rem', opacity: 0.8, maxWidth: '200px', marginTop: '0.5rem' }}>
                                 Virtual balance is non-redeemable and can only be used for Hezzni services.
                             </div>
                        </div>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '1rem' }}>
                             <Wallet size={32} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                        {historyItems.map((item, idx) => (
                            <div key={idx} style={{ padding: '0.85rem', borderRadius: '1rem', border: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontSize: '1.2rem' }}>{item.icon}</div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Wallet Top-Up</div>
                                        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>via {item.method} {item.last4 && `**** ${item.last4}`}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>{item.date}</div>
                                    </div>
                                </div>
                                <div style={{ color: '#22c55e', fontWeight: '700', fontSize: '0.9rem' }}>{item.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ padding: '2rem', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '1rem' }}>
                    <button style={{ flex: 1, padding: '0.85rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>Transaction History</button>
                    <button onClick={onProcessRefund} style={{ flex: 1, padding: '0.85rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>Process Refund</button>
                    <button style={{ flex: 1, padding: '0.85rem', borderRadius: '2rem', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>Download Receipt</button>
                </div>
            </div>
        </ModalOverlay>
    );
}

// --- Process Refund Modal ---
export const ProcessRefundModal = ({ onClose, transaction }: ModalProps) => {
    return (
        <ModalOverlay onClose={onClose}>
            <div className="card" style={{ width: '720px', backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', position: 'relative', maxHeight: '95vh', overflowY: 'auto' }}>
                <button onClick={onClose} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={24} color="#111827" strokeWidth={3} />
                </button>

                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>Process Refund</h2>
                <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>Process refund for payment {transaction.id}</p>

                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Payment ID:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>PAY001</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Customer:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Nadia Lahlou</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Original Amount:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>75.50 MAD</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Payment Method:</div>
                        <div style={{ fontWeight: '700', fontSize: '1rem', color: '#1a1f71', fontStyle: 'italic' }}>VISA</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Transaction Date & Time:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>2025-01-10 09:30</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>+212 6 12 34 56</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Account Name:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Youssef</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>IBAN:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>8921 8921 8921</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Bank Code (optional):</div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>BCMAMAMC</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Transaction ID:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#6b7280' }}>TXN_1751555882063</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Transaction Date & Time:</div>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#6b7280' }}>03 Jun, 2025 · 01:01 AM</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Status:</div>
                        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.7rem', fontWeight: 'bold', display: 'inline-block' }}>Expired</div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '0.75rem', padding: '1rem', marginBottom: '2rem' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#92400e', marginBottom: '0.25rem' }}>Refund Eligibility Notice</div>
                    <div style={{ fontSize: '0.8rem', color: '#92400e', opacity: 0.8 }}>Cash refunds require driver confirmation and manual processing before approval.</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem' }}>Refund Amount</label>
                        <input type="text" placeholder="Type Here" style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', fontSize: '0.9rem' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem' }}>Refund Reason</label>
                        <select style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', fontSize: '0.9rem', appearance: 'none' }}>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem' }}>Status</label>
                        <select style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', fontSize: '0.9rem', appearance: 'none' }}>
                            <option>Active</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem' }}>Admin Notes</label>
                    <textarea placeholder="Type Here" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', fontSize: '0.9rem', minHeight: '100px', resize: 'none', fontFamily: 'inherit' }} />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button style={{ flex: 1, padding: '1rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>Update Status</button>
                    <button onClick={onClose} style={{ flex: 1, padding: '1rem', borderRadius: '2rem', border: 'none', backgroundColor: 'black', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>Process Refund</button>
                    <button style={{ flex: 1, padding: '1rem', borderRadius: '2rem', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>Download Receipt</button>
                </div>
            </div>
        </ModalOverlay>
    );
};
