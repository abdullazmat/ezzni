
import { useState, useRef, useEffect } from 'react';
import { 
    Search, Eye, 
    ChevronDown, ArrowLeft, X
} from 'lucide-react';



import { UserAvatar } from '../components/UserAvatar';
import { getRidersApi } from '../services/api';


// Specialized Icons
import totalRidersIcon from '../assets/icons/total riders.png';
import avgRatingIcon from '../assets/icons/avg rating.png';
import activeNowIcon from '../assets/icons/active now.png';
import totalSpentIcon from '../assets/icons/Total Earnings.png';
import { 
    RiderDetailsContent, 
    SpendingContent,
    TripsHistoryContent, 
    TripSummaryContent,
    EditRiderContent,
    SuspendRiderModal,
    SuspensionBanner,
    ActivationBanner
} from './RiderModals';

// --- Types ---
interface Rider {
    id: string;
    name: string;
    phone: string;
    email: string;
    location: string;
    status: 'Active' | 'Suspended';
    totalTrips: number;
    totalSpent: string;
    rating: number;
    avatar: string;
    joinDate: string;
    type: 'Retail' | 'Corporate';
    region: string;
}

// --- Improved Dropdown Component with click-outside ---
const DropdownItem = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '8px',
                fontWeight: isActive ? 'bold' : 'normal',
                backgroundColor: hovered ? '#f3f4f6' : isActive ? '#eef7f0' : 'transparent',
                color: isActive ? '#2d8a46' : '#374151',
                fontSize: '14px',
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
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', 
                    borderRadius: '24px', 
                    border: activeValue !== 'All' ? '1px solid #38AC57' : '1px solid #e5e7eb', 
                    backgroundColor: activeValue !== 'All' ? '#eef7f0' : 'white',
                    fontSize: '14px', 
                    color: activeValue !== 'All' ? '#2d8a46' : '#374151',
                    cursor: 'pointer', 
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    justifyContent: 'space-between'
                }}
            >
                {activeValue === 'All' ? label : activeValue}
                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>
            {isOpen && (
                <div style={{ 
                    position: 'absolute', top: '120%', left: 0, marginTop: '4px', 
                    backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)', zIndex: 50, minWidth: '180px',
                    padding: '6px'
                }}>
                    <DropdownItem label="All" isActive={activeValue === 'All'} onClick={() => { onSelect('All'); setIsOpen(false); }} />
                    {options.map((opt: string) => (
                        <DropdownItem key={opt} label={opt} isActive={activeValue === opt} onClick={() => { onSelect(opt); setIsOpen(false); }} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const Riders = () => {
    const [riders, setRiders] = useState<Rider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRiders = async () => {
            setLoading(true);
            try {
                const response = await getRidersApi();
                if (response.ok) {
                    const mapped: Rider[] = (response.data as any[]).map((r: any) => ({
                        id: r.idNumber || `T-${r.id}`,
                        name: r.name,
                        phone: r.phone || '+212 600-00000',
                        email: r.email || `${r.name.replace(' ', '.')}@email.com`,
                        location: r.location || 'Casablanca',
                        status: (r.status && r.status.charAt(0).toUpperCase() + r.status.slice(1)) || 'Active',
                        totalTrips: r.total_trips || r.trips || 0,
                        totalSpent: String(Math.round(Number(r.total_spent || r.totalSpent || 0) * 10) / 10),

                        rating: r.rating || 5.0,
                        avatar: r.image_url || r.avatar || `https://i.pravatar.cc/150?u=${r.id}`,
                        joinDate: r.joined_date || r.joinDate || '2023-01-15',
                        type: 'Retail',
                        region: r.location || 'Casablanca'
                    }));
                    setRiders(mapped);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRiders();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [regionFilter, setRegionFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [activeStat, setActiveStat] = useState('Total Riders');
    
    const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
    const [modalSubView, setModalSubView] = useState<'Details' | 'Spending' | 'History' | 'TripSummary' | 'Edit'>('Details');
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [showSuspensionBanner, setShowSuspensionBanner] = useState(false);
    const [showActivationBanner, setShowActivationBanner] = useState(false);

    // Computed stats
    const totalRidersCount = riders.length;
    const activeRidersCount = riders.filter(r => r.status === 'Active').length;
    const avgRatingValue = riders.length > 0 
        ? (riders.reduce((sum, r) => sum + r.rating, 0) / riders.length).toFixed(1)
        : '0.0';
    const totalSpentValue = riders.reduce((sum, r) => sum + parseInt(String(r.totalSpent).replace(',', '') || '0'), 0).toLocaleString();

    const activeFilterCount = [statusFilter, regionFilter, typeFilter].filter(f => f !== 'All').length + (searchTerm ? 1 : 0);

    const clearAllFilters = () => {
        setStatusFilter('All');
        setRegionFilter('All');
        setTypeFilter('All');
        setSearchTerm('');
        setActiveStat('Total Riders');
    };

    const filteredRidersList = riders.filter(rider => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchesSearch = rider.name.toLowerCase().includes(term) || 
                                 rider.id.toLowerCase().includes(term) ||
                                 rider.email.toLowerCase().includes(term) ||
                                 rider.phone.includes(term);
            if (!matchesSearch) return false;
        }
        if (activeStat === 'Active Now' && rider.status !== 'Active') return false;
        if (statusFilter !== 'All' && rider.status !== statusFilter) return false;
        if (regionFilter !== 'All' && rider.region !== regionFilter) return false;
        if (typeFilter !== 'All' && rider.type !== typeFilter) return false;
        return true;
    });

    const openRiderModal = (rider: Rider) => {
        setSelectedRider(rider);
        setModalSubView('Details');
    };

    const closeModal = () => {
        setSelectedRider(null);
        setModalSubView('Details');
    };

    const handleModalBack = () => {
        if (modalSubView === 'TripSummary') {
            setModalSubView('History');
        } else {
            setModalSubView('Details');
        }
    };

    const handleSuspendConfirm = () => {
        setShowSuspendModal(false);
        closeModal();
        setShowSuspensionBanner(true);
        setTimeout(() => setShowSuspensionBanner(false), 5000);
    };

    const handleActivateRider = () => {
        closeModal();
        setShowActivationBanner(true);
        setTimeout(() => setShowActivationBanner(false), 5000);
    };

    const statCards = [
        { 
            key: 'Total Riders', label: 'Total Riders', 
            value: String(totalRidersCount).padStart(4, '0'), suffix: '',
            icon: totalRidersIcon, bgDefault: 'white', colorDefault: 'black',
        },
        { 
            key: 'Avg Rating', label: 'Avg Rating', 
            value: avgRatingValue, suffix: '',
            icon: avgRatingIcon,
            bgDefault: 'var(--primary-color)', colorDefault: 'white', isAlwaysGreen: true,
        },
        { 
            key: 'Active Now', label: 'Active Now', 
            value: String(activeRidersCount).padStart(4, '0'), suffix: '',
            icon: activeNowIcon,
            bgDefault: 'white', colorDefault: 'black',
        },
        { 
            key: 'Total Spent', label: 'Total Spent', 
            value: totalSpentValue, suffix: 'MAD',
            icon: totalSpentIcon,
            bgDefault: 'white', colorDefault: 'black',
        },
    ];

    if (loading) {
        return (
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading riders...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <style>{`
                .rm-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
                .rm-controls-container { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
                .rm-table-container { width: 100%; overflow-x: auto; border-radius: 12px; }
                .rm-table-header { display: grid; grid-template-columns: minmax(200px, 1.5fr) 1.5fr 1fr 1fr 1fr 1fr; padding: 16px 24px; background-color: #38AC57; color: white; border-radius: 12px; font-weight: bold; font-size: 14px; margin-bottom: 16px; min-width: 900px; }
                .rm-table-row { display: grid; grid-template-columns: minmax(200px, 1.5fr) 1.5fr 1fr 1fr 1fr 1fr; padding: 16px 24px; background-color: white; border-radius: 16px; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); margin-bottom: 12px; min-width: 900px; transition: all 0.2s; }
                .rm-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: flex-start; justify-content: center; padding: 20px; overflow-y: auto; }
                .rm-modal-content { background-color: white; border-radius: 24px; width: 100%; max-width: 750px; margin-top: 20px; margin-bottom: 20px; position: relative; padding: 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
                @media (max-width: 1024px) { .rm-stats-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 768px) { .rm-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } .rm-controls-container { flex-direction: column; } }
            `}</style>
            
            {showSuspensionBanner && <SuspensionBanner onClose={() => setShowSuspensionBanner(false)} />}
            {showActivationBanner && <ActivationBanner onClose={() => setShowActivationBanner(false)} />}

            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Riders</h1>
                    <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Manage rider accounts and preferences</p>
                </div>
                {activeFilterCount > 0 && (
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        Showing <strong>{filteredRidersList.length}</strong> of <strong>{riders.length}</strong>
                    </div>
                )}
            </div>


            <div className="rm-stats-grid">
                {statCards.map((stat) => {
                    const isActive = activeStat === stat.key;
                    return (
                        <div 
                            key={stat.key}
                            onClick={() => setActiveStat(isActive ? 'Total Riders' : stat.key)}
                            style={{ 
                                backgroundColor: isActive ? 'var(--primary-color)' : stat.bgDefault, 
                                padding: '24px', borderRadius: '24px', color: isActive ? 'white' : 'black',
                                cursor: 'pointer', transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <img src={stat.icon} alt="" style={{ height: '32px', filter: isActive ? 'brightness(0) invert(1)' : 'none' }} />
                                <span style={{ fontWeight: '600' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: '40px', fontWeight: 'bold' }}>{stat.value}</div>
                        </div>
                    );
                })}
            </div>

            <div className="rm-controls-container" style={{ marginBottom: '32px' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '350px' }}>
                    <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="Search riders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '10px 48px', borderRadius: '24px', border: '1px solid #e5e7eb' }} />
                </div>
                <Dropdown label="Status" options={['Active', 'Suspended']} activeValue={statusFilter} onSelect={setStatusFilter} />
            </div>

            <div className="rm-table-container">
                <div className="rm-table-header">
                    <div>Riders</div>
                    <div>Contact</div>
                    <div style={{ textAlign: 'center' }}>Status</div>
                    <div style={{ textAlign: 'center' }}>Total Trips</div>
                    <div style={{ textAlign: 'center' }}>Total Spent</div>
                    <div style={{ textAlign: 'center' }}>Action</div>
                </div>
                {filteredRidersList.length === 0 ? (
                    <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '16px', textAlign: 'center', marginTop: '12px' }}>
                        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>No riders found</h3>
                        <p style={{ color: '#6b7280', margin: '0 0 16px 0' }}>Try adjusting your search or filter criteria</p>
                        <button 
                            onClick={clearAllFilters} 
                            style={{ 
                                padding: '10px 24px', borderRadius: '24px', border: 'none', 
                                backgroundColor: '#38AC57', color: 'white', fontWeight: '600', 
                                cursor: 'pointer', fontSize: '14px' 
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : filteredRidersList.map((rider) => (
                    <div key={rider.id} className="rm-table-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <UserAvatar src={rider.avatar} rating={rider.rating} size={48} />
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{rider.name}</div>
                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>ID {rider.id}</div>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontWeight: '600' }}>{rider.phone}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{rider.email}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', backgroundColor: rider.status === 'Active' ? '#eef7f0' : '#fef2f2', color: rider.status === 'Active' ? '#38AC57' : '#dc2626' }}>{rider.status}</span>
                        </div>
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{rider.totalTrips}</div>
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{rider.totalSpent} <span style={{ fontSize: '10px', color: '#9ca3af' }}>MAD</span></div>
                        <div style={{ textAlign: 'center' }}>
                            <button onClick={() => openRiderModal(rider)} style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' }}><Eye size={14} /> Preview</button>
                        </div>
                    </div>
                ))}

            </div>

            {selectedRider && (
                <div className="rm-modal-overlay" onClick={closeModal}>
                    <div className="rm-modal-content" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                            <button 
                                onClick={closeModal}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000', padding: '8px' }}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        {modalSubView === 'Details' && (
                            <RiderDetailsContent
                                rider={selectedRider}
                                onViewSpending={() => setModalSubView('Spending')}
                                onViewHistory={() => setModalSubView('History')}
                                onSuspend={() => setShowSuspendModal(true)}
                                onActivate={handleActivateRider}
                                onEdit={() => setModalSubView('Edit')}
                            />
                        )}

                        {modalSubView === 'Spending' && (
                            <>
                                <button onClick={handleModalBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 'bold' }}><ArrowLeft size={20} /> Back</button>
                                <SpendingContent />
                            </>
                        )}

                        {modalSubView === 'History' && (
                            <>
                                <button onClick={handleModalBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 'bold' }}><ArrowLeft size={20} /> Back</button>
                                <TripsHistoryContent 
                                    onViewSummary={() => setModalSubView('TripSummary')} 
                                />
                            </>
                        )}

                        {modalSubView === 'TripSummary' && (
                            <>
                                <button onClick={handleModalBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 'bold' }}><ArrowLeft size={20} /> Back</button>
                                <TripSummaryContent />
                            </>
                        )}

                        {modalSubView === 'Edit' && (
                            <>
                                <button onClick={handleModalBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontWeight: 'bold' }}><ArrowLeft size={20} /> Back</button>
                                <EditRiderContent 
                                    rider={selectedRider} 
                                    onSave={() => setModalSubView('Details')} 
                                />
                            </>
                        )}
                    </div>
                </div>
            )}


            {showSuspendModal && <SuspendRiderModal onClose={() => setShowSuspendModal(false)} onConfirm={handleSuspendConfirm} />}
        </div>
    );
};
