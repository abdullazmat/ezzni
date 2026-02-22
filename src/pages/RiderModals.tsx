
import { useState } from 'react';
import { 
    Star, MapPin, 
    CheckCircle2, X, ChevronDown
} from 'lucide-react';

// --- Status Badge ---
const StatusBadge = ({ status }: { status: string }) => {
    const isActive = status.toLowerCase() === 'active';
    return (
        <span style={{ 
            backgroundColor: isActive ? '#eef7f0' : '#fee2e2', 
            color: isActive ? '#38AC57' : '#ef4444', 
            padding: '4px 12px', 
            borderRadius: '6px', 
            fontSize: '12px', 
            fontWeight: '600'
        }}>
            {status}
        </span>
    );
};

// ============================================================
// Rider Details Modal Content (sub-view inside main modal)
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

    const isSuspended = rider.status === 'Suspended';

    return (
        <>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <div className="rm-flex-responsive" style={{ alignItems: 'center', gap: '12px', marginBottom: '8px', justifyContent: 'flex-start' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                        Rider - {rider.id || 'T-00234'}
                    </h2>
                    <StatusBadge status={rider.status || 'Active'} />
                </div>
                <p style={{ color: '#6b7280', margin: 0, fontSize: '14px', textAlign: 'inherit' }}>
                    Complete rider profile and activity information
                </p>
            </div>

            {/* Customer Information */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Customer Information</h3>
                <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px' }}>
                    <div className="rm-flex-responsive">
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img 
                                src={rider.avatar || 'https://i.pravatar.cc/150?u=rider1'} 
                                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} 
                                alt="Rider"
                            />
                            <div style={{ 
                                position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
                                backgroundColor: 'white', border: '1px solid #f3f4f6', borderRadius: '10px',
                                padding: '2px 8px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px'
                            }}>
                                <Star size={12} fill="#fbbf24" stroke="none" /> {rider.rating || '4.8'}
                            </div>
                        </div>
                        <div className="rm-info-grid" style={{ flex: 1, textAlign: 'inherit' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Name</div>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{rider.name}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Customer ID</div>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{rider.id || 'R-00045'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Total Trips</div>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{rider.totalTrips || '356'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Email</div>
                                <div style={{ fontWeight: '600', fontSize: '14px', wordBreak: 'break-all' }}>{rider.email}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Phone</div>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{rider.phone || '+212 6 12 34 56'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Total Spent</div>
                                <div style={{ fontWeight: '600', fontSize: '14px' }}>{rider.totalSpent || '3,450'} MAD</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats: Total Trips | Earnings | Commission */}
            <div className="rm-flex-responsive" style={{ justifyContent: 'space-around', textAlign: 'center', marginBottom: '24px' }}>
                <div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{rider.totalTrips || '1247'}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Trips</div>
                </div>
                <div className="rm-divider-v"></div>
                <div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{rider.totalSpent ? rider.totalSpent.replace(',', '') : '45321'}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Spending (MAD)</div>
                </div>
            </div>

            {/* Account Information */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', margin: '0 0 16px 0', textAlign: 'inherit' }}>Account Information</h4>
                    <div className="rm-account-grid">
                        <div style={{ textAlign: 'inherit' }}>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Join Date</div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>{rider.joinDate || '2023-01-15'}</div>
                        </div>
                        <div style={{ textAlign: 'inherit' }}>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Last Trips</div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>2 hrs ago</div>
                        </div>
                        <div style={{ textAlign: 'inherit' }}>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Account Status</div>
                            <StatusBadge status={rider.status} />
                        </div>
                        <div style={{ textAlign: 'inherit' }}>
                            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Verification</div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>{isSuspended ? 'Not Verified' : 'Verified'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suspension Details (only shown when suspended) */}
            {isSuspended && (
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ 
                        backgroundColor: '#fef2f2', border: '1px solid #fecaca', 
                        borderRadius: '16px', padding: '20px' 
                    }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', margin: '0 0 12px 0', color: '#991b1b' }}>Suspension Details</h4>
                        <div className="rm-flex-responsive" style={{ gap: '32px', justifyContent: 'center' }}>
                            <div>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Reason: </span>
                                <span style={{ fontSize: '13px', fontWeight: '600' }}>Multiple payment disputes</span>
                            </div>
                            <div>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Suspended Until: </span>
                                <span style={{ fontSize: '13px', fontWeight: '600' }}>2025-02-15</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="rm-footer-actions">
                <button 
                    onClick={onEdit}
                    style={{ 
                        flex: 1, padding: '12px', borderRadius: '24px', 
                        border: '1px solid #e5e7eb', backgroundColor: 'white', 
                        fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                >
                    Edit
                </button>
                <button 
                    onClick={onViewSpending}
                    style={{ 
                        flex: 1, padding: '12px', borderRadius: '24px', 
                        border: 'none', backgroundColor: '#000', color: 'white', 
                        fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1f2937'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000'}
                >
                    Spending
                </button>
                <button 
                    onClick={onViewHistory}
                    style={{ 
                        flex: 1, padding: '12px', borderRadius: '24px', 
                        border: 'none', backgroundColor: '#38AC57', color: 'white', 
                        fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d8a46'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#38AC57'}
                >
                    Trips history
                </button>
                {isSuspended ? (
                    <button 
                        onClick={onActivate}
                        style={{ 
                            flex: 1, padding: '12px', borderRadius: '24px', 
                            border: 'none', backgroundColor: '#38AC57', color: 'white', 
                            fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d8a46'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#38AC57'}
                    >
                        Activate Rider
                    </button>
                ) : (
                    <button 
                        onClick={onSuspend}
                        style={{ 
                            flex: 1, padding: '12px', borderRadius: '24px', 
                            border: 'none', backgroundColor: '#dc2626', color: 'white', 
                            fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc2626'}
                    >
                        Suspend Rider
                    </button>
                )}
            </div>
        </>
    );
};


// ============================================================
// Spending Modal Content (sub-view inside main modal)
// ============================================================
export const SpendingContent = () => {
    const [activePeriod, setActivePeriod] = useState('Monthly');
    
    const spendingData: Record<string, { total: string; bars: number[]; highlight: number; highlightVal: string; onlineTime: string; trips: string }> = {
        'Today': { total: '312.50 MAD', bars: [0,0,0,0,0,0,0,0,40,60,80,30], highlight: 10, highlightVal: '80.00', onlineTime: '6h 12m', trips: '3' },
        'Weekly': { total: '2,145.30 MAD', bars: [30,50,70,40,60,80,45,0,0,0,0,0], highlight: 5, highlightVal: '512.30', onlineTime: '32h 15m', trips: '8' },
        'Monthly': { total: '9,411.91 MAD', bars: [20,40,60,45,25,55,30,15,60,90,20,55], highlight: 9, highlightVal: '1,101.44', onlineTime: '89h 38m', trips: '14' },
    };

    const data = spendingData[activePeriod];
    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

    return (
        <>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 24px 0' }}>Spending</h2>
            
            {/* Period Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '4px', marginBottom: '24px', gap: '4px' }}>
                {['Today', 'Weekly', 'Monthly'].map(period => (
                    <button 
                        key={period} 
                        onClick={() => setActivePeriod(period)} 
                        style={{ 
                            flex: 1, padding: '10px', borderRadius: '8px', border: 'none',
                            backgroundColor: activePeriod === period ? 'white' : 'transparent',
                            fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                            boxShadow: activePeriod === period ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s',
                            minWidth: '80px'
                        }}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Chart Area */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Total Spending</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '32px' }}>{data.total}</div>
                
                <div className="rm-chart-container">
                    <div className="rm-chart-inner">
                        {/* Y-axis labels + bars */}
                        <div style={{ display: 'flex', height: '200px' }}>
                            {/* Y-axis */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '12px', fontSize: '11px', color: '#9ca3af' }}>
                                <span>300</span>
                                <span>200</span>
                                <span>100</span>
                                <span>0</span>
                            </div>
                            {/* Bars */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', borderLeft: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', paddingLeft: '8px' }}>
                                {data.bars.map((h, i) => (
                                    <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ 
                                            width: '16px', 
                                            height: `${Math.max(h, 3)}%`, 
                                            backgroundColor: i === data.highlight ? '#38AC57' : '#eef7f0', 
                                            borderRadius: '4px 4px 0 0', 
                                            position: 'relative', 
                                            transition: 'height 0.4s ease',
                                            cursor: 'pointer'
                                        }}>
                                            {i === data.highlight && (
                                                <div style={{ 
                                                    position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)',
                                                    backgroundColor: '#1f2937', color: 'white', padding: '4px 8px', 
                                                    borderRadius: '6px', fontSize: '11px', whiteSpace: 'nowrap',
                                                    fontWeight: '600'
                                                }}>
                                                    {data.highlightVal}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Month labels */}
                        <div style={{ display: 'flex', paddingLeft: '40px', marginTop: '8px' }}>
                            {months.map((m) => (
                                <div key={m} style={{ flex: 1, textAlign: 'center', fontSize: '10px', color: '#9ca3af' }}>{m}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="rm-info-grid">
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Online Time</div>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{data.onlineTime}</div>
                </div>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Total Trips</div>
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{data.trips}</div>
                </div>
            </div>
        </>
    );
};


// ============================================================
// Trips History Content (sub-view inside main modal)
// ============================================================
export const TripsHistoryContent = ({ onViewSummary }: { onViewSummary: (tripId: number) => void }) => {
    const [activeTab, setActiveTab] = useState('All');

    const trips = [
        { id: 1, driver: 'Ahmed Hassan', date: '3 Jun, 2025 at 12:00 PM', rating: 5.0, price: '24 MAD', status: 'Completed' },
        { id: 2, driver: 'Ahmed Hassan', date: '3 Jun, 2025 at 12:00 PM', rating: null as number | null, price: '24 MAD', status: 'Cancelled' },
        { id: 3, driver: 'Ahmed Hassan', date: '3 Jun, 2025 at 12:00 PM', rating: 5.0, price: '24 MAD', status: 'Completed' },
    ];

    const filteredTrips = trips.filter(t => activeTab === 'All' || t.status === activeTab);

    return (
        <>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Trips History</h2>
                <p style={{ color: '#6b7280', margin: '4px 0 0 0', fontSize: '14px' }}>Review the trip history</p>
            </div>

            {/* Time Range */}
            <div className="rm-flex-responsive" style={{ backgroundColor: '#f9fafb', borderRadius: '12px', padding: '16px', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Start Time</div>
                    <div style={{ fontWeight: '600' }}>14:30</div>
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>End Time</div>
                    <div style={{ fontWeight: '600' }}>14:55</div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '4px', marginBottom: '24px', gap: '4px' }}>
                {['All', 'Completed', 'Cancelled'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{ 
                            flex: 1, padding: '10px', border: 'none', borderRadius: '8px',
                            backgroundColor: activeTab === tab ? 'white' : 'transparent',
                            fontWeight: '600', cursor: 'pointer', transition: '0.2s',
                            boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            minWidth: '80px'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Trip Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>
                {filteredTrips.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
                        No {activeTab.toLowerCase()} trips found.
                    </div>
                )}
                {filteredTrips.map(trip => (
                    <div 
                        key={trip.id}
                        onClick={() => onViewSummary(trip.id)}
                        style={{ 
                            border: '1px solid #f3f4f6', borderRadius: '16px', padding: '16px', 
                            cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#38AC57'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)'; }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={14} fill={trip.rating && i <= trip.rating ? "#fbbf24" : "#e5e7eb"} stroke="none" />
                                ))}
                                <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>{trip.rating || '0.0'}</span>
                            </div>
                            <span style={{ 
                                backgroundColor: trip.status === 'Completed' ? '#38AC57' : '#dc2626',
                                color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 10px', borderRadius: '10px'
                            }}>
                                {trip.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="rm-flex-responsive" style={{ alignItems: 'center', marginBottom: '16px' }}>
                            <img src={`https://i.pravatar.cc/150?u=d${trip.id}`} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="Driver" />
                            <div style={{ flex: 1, textAlign: 'inherit' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{trip.driver}</div>
                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{trip.date}</div>
                            </div>
                            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '4px 10px', fontSize: '12px', fontWeight: 'bold' }}>
                                {trip.price}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38AC5720', border: '2px solid #38AC57' }}></div>
                                <div style={{ fontSize: '12px' }}>
                                    <span style={{ color: '#9ca3af', marginRight: '4px' }}>From</span>
                                    <span style={{ fontWeight: '600' }}>Current Location, Marrakech</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #38AC57' }}></div>
                                <div style={{ fontSize: '12px' }}>
                                    <span style={{ color: '#9ca3af', marginRight: '4px' }}>To</span>
                                    <span style={{ fontWeight: '600' }}>Current Location, Marrakech</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};


// ============================================================
// Trip Summary Content (sub-view inside main modal)
// ============================================================
export const TripSummaryContent = () => {
    return (
        <>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Trip Summary</h2>
                <p style={{ color: '#6b7280', margin: '4px 0 0 0', fontSize: '14px' }}>3 Jun, 2025 at 12:00 PM</p>
            </div>

            {/* Driver Info */}
            <div className="rm-flex-responsive" style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src="https://i.pravatar.cc/150?u=ahmed" style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="Driver" />
                    <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', borderRadius: '6px', padding: '0 4px', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        ★ 4.8
                    </div>
                </div>
                <div style={{ flex: 1, textAlign: 'inherit' }}>
                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'inherit' }}>
                        Ahmed Hassan <CheckCircle2 size={14} color="#3b82f6" fill="#3b82f6" stroke="#fff" />
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>(2847 trips)</div>
                </div>
                <div className="rm-flex-responsive" style={{ textAlign: 'inherit', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Distance</div>
                        <div style={{ fontWeight: 'bold' }}>1.3 km</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Total Time</div>
                        <div style={{ fontWeight: 'bold' }}>11 min</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>Price</div>
                        <div style={{ fontWeight: 'bold', color: '#38AC57' }}>74 MAD</div>
                    </div>
                </div>
            </div>

            {/* Vehicle Info */}
            <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>8 | I | 26363</div>
                    <div style={{ color: '#6b7280', fontSize: '12px' }}>Toyota HR-V • White</div>
                    <div style={{ backgroundColor: '#000', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>
                        ID No C-0003
                    </div>
                </div>
                <div style={{ fontSize: '32px' }}>🚗</div>
            </div>

            {/* Route */}
            <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38AC5720', border: '3px solid #38AC57' }}></div>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>Current Location, Marrakech</div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>7:15 PM</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <MapPin size={18} color="#38AC57" />
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>Current Location, Marrakech</div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>8:30 PM</div>
                    </div>
                </div>
            </div>

            {/* Rating Given */}
            <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Rating Given</div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#fbbf24" stroke="none" />)}
                    <span style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>5.0</span>
                </div>
                <p style={{ fontSize: '13px', color: '#374151', marginBottom: '12px', lineHeight: '1.4', margin: '0 0 12px 0' }}>
                    The ride was smooth and comfortable. The driver was polite, the car was clean, and pickup was on time. Overall, a great experience!
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['On time pickup', 'Clean Car', 'Safe Driving'].map(tag => (
                        <span key={tag} style={{ backgroundColor: '#38AC57', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Rating Received */}
            <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Rating Received</div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#fbbf24" stroke="none" />)}
                    <span style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '4px' }}>5.0</span>
                </div>
                <p style={{ fontSize: '13px', color: '#374151', marginBottom: '12px', lineHeight: '1.4', margin: '0 0 12px 0' }}>
                    Very polite and friendly passenger. Communicated well and made the trip smooth.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['Ready on time', 'Polite & Friendly'].map(tag => (
                        <span key={tag} style={{ backgroundColor: '#38AC57', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <button 
                onClick={() => alert('Receipt downloaded!')}
                style={{ 
                    width: '100%', padding: '16px', borderRadius: '32px', border: 'none', 
                    backgroundColor: '#38AC57', color: 'white', fontWeight: 'bold', fontSize: '16px', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d8a46'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#38AC57'}
            >
                Download Receipt
            </button>
        </>
    );
};


// ============================================================
// Edit Rider Content (sub-view inside main modal)
// ============================================================
export const EditRiderContent = ({ rider, onSave }: { rider: Rider, onSave: () => void }) => {
    const [formData, setFormData] = useState({
        name: rider.name || '',
        phone: rider.phone || '',
        email: rider.email || '',
        region: rider.region || 'Casablanca',
        city: rider.location || 'Casablanca-Settat',
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        fontFamily: 'inherit',
        color: '#1f2937',
        backgroundColor: '#f9fafb',
        boxSizing: 'border-box',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '13px',
        color: '#6b7280',
        marginBottom: '6px',
        fontWeight: '600',
    };

    return (
        <>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Edit Rider</h2>
            <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px', margin: '0 0 24px 0' }}>Update rider profile information</p>

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', margin: '0 0 16px 0' }}>Personal Information</h3>
            <div className="rm-info-grid" style={{ marginBottom: '24px' }}>
                <div>
                    <label style={labelStyle}>Full Name</label>
                    <input style={inputStyle} value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                <div>
                    <label style={labelStyle}>Phone</label>
                    <input style={inputStyle} value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                </div>
                <div>
                    <label style={labelStyle}>Email</label>
                    <input style={inputStyle} value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
                <div>
                    <label style={labelStyle}>Region</label>
                    <select
                        style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer' }}
                        value={formData.region}
                        onChange={(e) => handleChange('region', e.target.value)}
                    >
                        <option>Casablanca</option>
                        <option>Rabat</option>
                        <option>Marrakech</option>
                        <option>Fès</option>
                        <option>Tanger</option>
                    </select>
                </div>
                <div>
                    <label style={labelStyle}>City</label>
                    <select
                        style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer' }}
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                    >
                        <option>Casablanca-Settat</option>
                        <option>Rabat-Salé</option>
                        <option>Marrakech-Safi</option>
                        <option>Fès-Meknès</option>
                        <option>Tanger-Tétouan</option>
                    </select>
                </div>
            </div>

            <button
                onClick={() => {
                    alert('Rider information updated successfully!');
                    onSave();
                }}
                style={{
                    width: '100%', padding: '14px', borderRadius: '32px', border: 'none',
                    backgroundColor: '#38AC57', color: 'white', fontWeight: 'bold', fontSize: '16px',
                    cursor: 'pointer', transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d8a46'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#38AC57'}
            >
                Save Changes
            </button>
        </>
    );
};


// ============================================================
// Suspend Rider Modal (separate overlay on top of main modal)
// ============================================================
export const SuspendRiderModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
    const [reason, setReason] = useState('');
    const [hours, setHours] = useState('24 Hours');

    return (
        <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{ 
                backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px',
                padding: '32px', position: 'relative'
            }}>
                <button 
                    onClick={onClose}
                    style={{ 
                        position: 'absolute', right: '24px', top: '24px', 
                        background: 'none', border: 'none', cursor: 'pointer', color: '#000' 
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Suspend Rider</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 24px 0' }}>
                    Please provide a reason for suspending this rider account.
                </p>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>Suspension Reason</label>
                    <textarea 
                        placeholder="Type Here" 
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={{ 
                            width: '100%', height: '100px', padding: '16px', 
                            borderRadius: '12px', border: 'none', backgroundColor: '#f9fafb',
                            resize: 'none', fontFamily: 'inherit', fontSize: '14px',
                            outline: 'none', boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>Suspension Hours</label>
                    <div style={{ position: 'relative' }}>
                        <select 
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            style={{ 
                                width: '100%', padding: '14px 16px', borderRadius: '12px', 
                                border: 'none', backgroundColor: '#f9fafb',
                                appearance: 'none', cursor: 'pointer', fontWeight: '500',
                                fontSize: '14px', outline: 'none', boxSizing: 'border-box'
                            }}
                        >
                            <option>24 Hours</option>
                            <option>48 Hours</option>
                            <option>72 Hours</option>
                            <option>1 Week</option>
                            <option>Indefinitely</option>
                        </select>
                        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }}>
                            <ChevronDown size={18} />
                        </div>
                    </div>
                </div>

                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px', margin: '0 0 24px 0' }}>
                    Account will be automatically reactivated after {hours === 'Indefinitely' ? 'manual reactivation' : hours.toLowerCase().replace(' hours', '') + ' hours'}.
                </p>

                <button 
                    onClick={() => onConfirm()}
                    style={{ 
                        width: '100%', padding: '14px', borderRadius: '32px', border: 'none', 
                        backgroundColor: '#b91c1c', color: 'white', fontWeight: 'bold', fontSize: '16px',
                        cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#991b1b'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
                >
                    Confirm Suspension
                </button>
            </div>
        </div>
    );
};


// ============================================================
// Suspension Banner (notification shown at top of page)
// ============================================================
export const SuspensionBanner = ({ onClose }: { onClose: () => void }) => {
    return (
        <div style={{ 
            backgroundColor: '#fef2f2', border: '1px solid #fecaca', 
            borderRadius: '12px', padding: '16px 24px', marginBottom: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            animation: 'slideDown 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                    backgroundColor: '#dc2626', color: 'white', 
                    padding: '4px 12px', borderRadius: '6px', 
                    fontSize: '12px', fontWeight: '700' 
                }}>
                    ⚠ Rider Suspended
                </span>
                <span style={{ fontSize: '14px', color: '#374151' }}>
                    This rider account has been suspended and cannot request rides until reactivated.
                </span>
            </div>
            <button 
                onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', flexShrink: 0 }}
            >
                <X size={20} />
            </button>
        </div>
    );
};


// ============================================================
// Activation Banner (notification shown at top of page)
// ============================================================
export const ActivationBanner = ({ onClose }: { onClose: () => void }) => {
    return (
        <div style={{ 
            backgroundColor: '#eef7f0', border: '1px solid #bbf7d0', 
            borderRadius: '12px', padding: '16px 24px', marginBottom: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            animation: 'slideDown 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                    backgroundColor: '#38AC57', color: 'white', 
                    padding: '4px 12px', borderRadius: '6px', 
                    fontSize: '12px', fontWeight: '700' 
                }}>
                    ✓ Rider Activated
                </span>
                <span style={{ fontSize: '14px', color: '#374151' }}>
                    This rider account has been reactivated and can now request rides.
                </span>
            </div>
            <button 
                onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', flexShrink: 0 }}
            >
                <X size={20} />
            </button>
        </div>
    );
};


// ============================================================
// Keep legacy exports for backwards compatibility (re-export)
// ============================================================
export const RiderDetailsModal = RiderDetailsContent;
export const RiderTripsHistoryModal = TripsHistoryContent;
export const RiderTripSummaryModal = TripSummaryContent;
