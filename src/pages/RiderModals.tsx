
import { useState } from 'react';
import { 
    Star, 
    CheckCircle2, X
} from 'lucide-react';
import { UserAvatar } from '../components/UserAvatar';

// --- Shared Styles for Modals ---
const modalStyles = {
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    accountGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    },
    flexResponsive: {
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: '12px',
        color: '#9ca3af',
        marginBottom: '4px',
    },
    value: {
        fontWeight: '600' as const,
        fontSize: '14px',
        color: '#1f2937',
    },
    card: {
        border: '1px solid #f3f4f6',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
    }
};

// --- Status Badge ---
const StatusBadge = ({ status }: { status: string }) => {
    const s = String(status || 'Active').toLowerCase();
    const isActive = s === 'active';
    
    return (
        <span style={{ 
            backgroundColor: isActive ? '#eef7f0' : '#fee2e2', 
            color: isActive ? '#38AC57' : '#ef4444', 
            padding: '4px 12px', 
            borderRadius: '6px', 
            fontSize: '12px', 
            fontWeight: '600'
        }}>
            {status || 'Active'}
        </span>
    );
};

// ============================================================
// Rider Details Modal Content
// ============================================================
interface Rider {
    id: string;
    name: string;
    avatar?: string;
    rating?: number | string;
    totalTrips?: number | string;
    email: string;
    phone?: string;
    totalSpent?: string;
    joinDate?: string;
    status: string;
    region?: string;
    location?: string;
    type?: string;
}

interface RiderDetailsContentProps {
    rider: Rider;
    onViewSpending: () => void;
    onViewHistory: () => void;
    onSuspend: () => void;
    onActivate: () => void;
    onEdit: () => void;
}

export const RiderDetailsContent = ({ rider, onViewSpending, onViewHistory, onSuspend, onActivate, onEdit }: RiderDetailsContentProps) => {
    if (!rider) return null;

    const statusStr = String(rider.status).toLowerCase();
    const isSuspended = statusStr === 'suspended' || statusStr === 'blocked' || statusStr === 'inactive';

    return (
        <div style={{ textAlign: 'left' }}>
            <style>{`
                @media (max-width: 640px) {
                    .rm-modal-grid-3 { grid-template-columns: 1fr !important; }
                    .rm-flex-res { flex-direction: column !important; align-items: flex-start !important; text-align: left !important; }
                }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                        Rider - {rider.id}
                    </h2>
                    <StatusBadge status={rider.status} />
                </div>
                <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
                    Complete rider profile and activity information
                </p>
            </div>

            {/* Customer Information Card */}
            <div style={modalStyles.card}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', margin: '0 0 20px 0' }}>Customer Information</h3>
                <div className="rm-flex-res" style={modalStyles.flexResponsive}>
                    <UserAvatar 
                        src={rider.avatar || ''} 
                        rating={Number(rider.rating)} 
                        size={80} 
                        showBadge={true} 
                    />
                    <div className="rm-modal-grid-3" style={{ ...modalStyles.infoGrid, flex: 1 }}>
                        <div>
                            <div style={modalStyles.label}>Name</div>
                            <div style={modalStyles.value}>{rider.name}</div>
                        </div>
                        <div>
                            <div style={modalStyles.label}>Customer ID</div>
                            <div style={modalStyles.value}>{rider.id}</div>
                        </div>
                        <div>
                            <div style={modalStyles.label}>Total Trips</div>
                            <div style={modalStyles.value}>{rider.totalTrips}</div>
                        </div>
                        <div>
                            <div style={modalStyles.label}>Email</div>
                            <div style={{ ...modalStyles.value, wordBreak: 'break-all' }}>{rider.email}</div>
                        </div>
                        <div>
                            <div style={modalStyles.label}>Phone</div>
                            <div style={modalStyles.value}>{rider.phone}</div>
                        </div>
                        <div>
                            <div style={modalStyles.label}>Total Spent</div>
                            <div style={modalStyles.value}>{rider.totalSpent} MAD</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Large Stats */}
            <div className="rm-flex-res" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: '32px', borderBottom: '1px solid #f3f4f6', paddingBottom: '24px' }}>
                <div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>{rider.totalTrips}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Trips</div>
                </div>
                <div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937' }}>{rider.totalSpent}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Spending (MAD)</div>
                </div>
            </div>

            {/* Account Information Card */}
            <div style={modalStyles.card}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', margin: '0 0 20px 0' }}>Account Information</h4>
                <div className="rm-modal-grid-3" style={modalStyles.accountGrid}>
                    <div>
                        <div style={modalStyles.label}>Join Date</div>
                        <div style={modalStyles.value}>{rider.joinDate ? new Date(rider.joinDate).toLocaleDateString() : 'N/A'}</div>
                    </div>
                    <div>
                        <div style={modalStyles.label}>Last Trips</div>
                        <div style={modalStyles.value}>2 hrs ago</div>
                    </div>
                    <div>
                        <div style={modalStyles.label}>Account Status</div>
                        <StatusBadge status={rider.status} />
                    </div>
                    <div>
                        <div style={modalStyles.label}>Verification</div>
                        <div style={modalStyles.value}>{isSuspended ? 'Not Verified' : 'Verified'}</div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={onEdit} style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '24px', border: '1px solid #e5e7eb', background: 'white', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                <button onClick={onViewSpending} style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '24px', border: 'none', background: '#000', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Spending</button>
                <button onClick={onViewHistory} style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '24px', border: 'none', background: '#38AC57', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>History</button>
                {isSuspended ? (
                    <button onClick={onActivate} style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '24px', border: 'none', background: '#38AC57', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Activate</button>
                ) : (
                    <button onClick={onSuspend} style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '24px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Suspend</button>
                )}
            </div>
        </div>
    );
};

// ============================================================
// Spending Content
// ============================================================
export const SpendingContent = () => {
    const [activePeriod, setActivePeriod] = useState('Monthly');
    
    const spendingData: Record<string, { total: string; bars: number[]; highlight: number; highlightVal: string; onlineTime: string; trips: string }> = {
        'Today': { total: '312.50 MAD', bars: [0,0,0,0,0,0,0,0,40,60,80,30], highlight: 10, highlightVal: '80.00', onlineTime: '6h 12m', trips: '3' },
        'Weekly': { total: '2,145.30 MAD', bars: [30,50,70,40,60,80,45,0,0,0,0,0], highlight: 5, highlightVal: '512.30', onlineTime: '32h 15m', trips: '8' },
        'Monthly': { total: '9,411.91 MAD', bars: [20,40,60,45,25,55,30,15,60,90,20,55], highlight: 9, highlightVal: '1,101.44', onlineTime: '89h 38m', trips: '14' },
    };

    const data = spendingData[activePeriod];
    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Spending</h2>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: '#f3f4f6', padding: '4px', borderRadius: '12px' }}>
                {['Today', 'Weekly', 'Monthly'].map(p => (
                    <button key={p} onClick={() => setActivePeriod(p)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: activePeriod === p ? 'white' : 'transparent', fontWeight: '600', cursor: 'pointer', boxShadow: activePeriod === p ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>{p}</button>
                ))}
            </div>
            <div style={modalStyles.card}>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Total Spending</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{data.total}</div>
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '32px', gap: '8px' }}>
                    {data.bars.map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, background: i === data.highlight ? '#38AC57' : '#eef7f0', borderRadius: '4px' }}></div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ ...modalStyles.card, flex: 1 }}>
                    <div style={modalStyles.label}>Online Time</div>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{data.onlineTime}</div>
                </div>
                <div style={{ ...modalStyles.card, flex: 1 }}>
                    <div style={modalStyles.label}>Total Trips</div>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{data.trips}</div>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Trips History Content
// ============================================================
export const TripsHistoryContent = ({ onViewSummary }: { onViewSummary: (tripId: number) => void }) => {
    const trips = [
        { id: 1, driver: 'Ahmed Hassan', date: '3 Jun, 2025 at 12:00 PM', rating: 5.0, price: '24 MAD', status: 'Completed' },
        { id: 2, driver: 'Ahmed Hassan', date: '3 Jun, 2025 at 12:00 PM', rating: null as number | null, price: '24 MAD', status: 'Cancelled' },
    ];

    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Trips History</h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Review the trip history</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {trips.map(trip => (
                    <div key={trip.id} onClick={() => onViewSummary(trip.id)} style={{ ...modalStyles.card, cursor: 'pointer', marginBottom: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={trip.rating && i <= trip.rating ? "#fbbf24" : "#e5e7eb"} stroke="none" />)}
                                <span style={{ fontWeight: 'bold', marginLeft: '4px' }}>{trip.rating || '0.0'}</span>
                            </div>
                            <span style={{ background: trip.status === 'Completed' ? '#38AC57' : '#ef4444', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>{trip.status.toUpperCase()}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <UserAvatar src={`https://i.pravatar.cc/150?u=d${trip.id}`} size={40} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold' }}>{trip.driver}</div>
                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{trip.date}</div>
                            </div>
                            <div style={{ fontWeight: 'bold', color: '#38AC57' }}>{trip.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ============================================================
// Trip Summary Content
// ============================================================
export const TripSummaryContent = () => {
    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Trip Summary</h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>3 Jun, 2025 at 12:00 PM</p>
            <div style={{ ...modalStyles.card, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <UserAvatar src="" size={50} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>Ahmed Hassan <CheckCircle2 size={14} color="#3b82f6" fill="#3b82f6" stroke="#fff" /></div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>2847 trips</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', color: '#9ca3af' }}>Price</div>
                    <div style={{ fontWeight: 'bold', color: '#38AC57' }}>74 MAD</div>
                </div>
            </div>
            <div style={modalStyles.card}>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>8 | I | 26363</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>Toyota HR-V • White</div>
            </div>
            <button style={{ width: '100%', padding: '16px', borderRadius: '32px', border: 'none', background: '#38AC57', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Download Receipt</button>
        </div>
    );
};

// ============================================================
// Edit Rider Content
// ============================================================
export const EditRiderContent = ({ rider, onSave }: { rider: Rider, onSave: () => void }) => {
    return (
        <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Edit Rider</h2>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Update rider profile information</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Full Name</label>
                        <input style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#f9fafb' }} defaultValue={rider.name} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Phone</label>
                        <input style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#f9fafb' }} defaultValue={rider.phone} />
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Email</label>
                    <input style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#f9fafb' }} defaultValue={rider.email} />
                </div>
            </div>
            <button onClick={onSave} style={{ width: '100%', padding: '16px', borderRadius: '32px', border: 'none', background: '#38AC57', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Save Changes</button>
        </div>
    );
};

// ============================================================
// Suspend Rider Modal Overlay
// ============================================================
export const SuspendRiderModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px', padding: '32px', position: 'relative', textAlign: 'left' }}>
                <button onClick={onClose} style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>Suspend Rider</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Please provide a reason for suspension.</p>
                <textarea style={{ width: '100%', height: '100px', padding: '16px', borderRadius: '12px', border: 'none', background: '#f9fafb', marginBottom: '24px', resize: 'none' }} placeholder="Reason here..."></textarea>
                <button onClick={onConfirm} style={{ width: '100%', padding: '16px', borderRadius: '32px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Suspension</button>
            </div>
        </div>
    );
};

// --- Banners ---
export const SuspensionBanner = ({ onClose }: { onClose: () => void }) => (
    <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#ef4444', color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 1200, display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <span>Rider has been suspended successfully.</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={18} /></button>
    </div>
);

export const ActivationBanner = ({ onClose }: { onClose: () => void }) => (
    <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#38AC57', color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 1200, display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <span>Rider account has been activated.</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={18} /></button>
    </div>
);
