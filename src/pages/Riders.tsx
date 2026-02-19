
import { useState, useRef, useEffect } from 'react';
import { 
    Search, Eye, ArrowUpRight, 
    Star, ChevronDown, User, ArrowLeft, X
} from 'lucide-react';
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

// --- Mock Data ---
const mockRiders: Rider[] = [
    { id: 'T-00234', name: 'Livia Carder', phone: '+212 6 12 34 56 78', email: 'LiviaCarder@email.com', location: 'Casablanca-Settat', status: 'Active', totalTrips: 748, totalSpent: '3,450', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=1', joinDate: '2023-01-15', type: 'Retail', region: 'Casablanca' },
    { id: 'T-00235', name: 'Adison Westervelt', phone: '+212 6 12 34 56 78', email: 'AdisonWestervelt@email.com', location: 'Casablanca-Settat', status: 'Suspended', totalTrips: 748, totalSpent: '3,450', rating: 4.5, avatar: 'https://i.pravatar.cc/150?u=2', joinDate: '2023-02-10', type: 'Corporate', region: 'Rabat' },
    { id: 'T-00236', name: 'Abram Vaccaro', phone: '+212 6 12 34 56 78', email: 'AbramVaccaro@email.com', location: 'Casablanca-Settat', status: 'Active', totalTrips: 748, totalSpent: '3,450', rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=3', joinDate: '2023-03-05', type: 'Retail', region: 'Marrakech' },
    { id: 'T-00237', name: 'Chance Vetrovs', phone: '+212 6 12 34 56 78', email: 'ChanceVetrovs@email.com', location: 'Casablanca-Settat', status: 'Suspended', totalTrips: 748, totalSpent: '3,450', rating: 4.2, avatar: 'https://i.pravatar.cc/150?u=4', joinDate: '2023-04-12', type: 'Corporate', region: 'Casablanca' },
    { id: 'T-00238', name: 'Leo Rosser', phone: '+212 6 12 34 56 78', email: 'LeoRosser@email.com', location: 'Casablanca-Settat', status: 'Active', totalTrips: 748, totalSpent: '3,450', rating: 4.7, avatar: 'https://i.pravatar.cc/150?u=5', joinDate: '2023-05-20', type: 'Retail', region: 'Rabat' },
    { id: 'T-00239', name: 'Desirae Schleifer', phone: '+212 6 12 34 56 78', email: 'DesiraeSchleifer@email.com', location: 'Casablanca-Settat', status: 'Active', totalTrips: 748, totalSpent: '3,450', rating: 4.6, avatar: 'https://i.pravatar.cc/150?u=6', joinDate: '2023-06-15', type: 'Corporate', region: 'Marrakech' },
    { id: 'T-00240', name: 'Chance Vetrovs', phone: '+212 6 12 34 56 78', email: 'ChanceVetrovs2@email.com', location: 'Casablanca-Settat', status: 'Suspended', totalTrips: 748, totalSpent: '3,450', rating: 4.5, avatar: 'https://i.pravatar.cc/150?u=7', joinDate: '2023-07-01', type: 'Retail', region: 'Casablanca' },
    { id: 'T-00241', name: 'Leo Rosser', phone: '+212 6 12 34 56 78', email: 'LeoRosser2@email.com', location: 'Casablanca-Settat', status: 'Active', totalTrips: 748, totalSpent: '3,450', rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=8', joinDate: '2023-07-20', type: 'Corporate', region: 'Rabat' },
];

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
                backgroundColor: hovered ? '#f3f4f6' : isActive ? '#f0fdf4' : 'transparent',
                color: isActive ? '#166534' : '#374151',
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
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', 
                    borderRadius: '24px', 
                    border: activeValue !== 'All' ? '1px solid #22c55e' : '1px solid #e5e7eb', 
                    backgroundColor: activeValue !== 'All' ? '#dcfce7' : 'white',
                    fontSize: '14px', 
                    color: activeValue !== 'All' ? '#166534' : '#374151',
                    cursor: 'pointer', 
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
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
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [regionFilter, setRegionFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [activeStat, setActiveStat] = useState('Total Riders');
    
    // Modal state - single modal with sub-views (like Drivers page)
    const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
    const [modalSubView, setModalSubView] = useState<'Details' | 'Spending' | 'History' | 'TripSummary' | 'Edit'>('Details');
    
    // Suspend modal overlay
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    
    // Banner notifications
    const [showSuspensionBanner, setShowSuspensionBanner] = useState(false);
    const [showActivationBanner, setShowActivationBanner] = useState(false);

    // Computed stats
    const totalRiders = mockRiders.length;
    const activeRiders = mockRiders.filter(r => r.status === 'Active').length;
    const avgRating = (mockRiders.reduce((sum, r) => sum + r.rating, 0) / mockRiders.length).toFixed(1);
    const totalSpent = mockRiders.reduce((sum, r) => sum + parseInt(r.totalSpent.replace(',', '')), 0).toLocaleString();

    const activeFilterCount = [statusFilter, regionFilter, typeFilter].filter(f => f !== 'All').length + (searchTerm ? 1 : 0);

    const clearAllFilters = () => {
        setStatusFilter('All');
        setRegionFilter('All');
        setTypeFilter('All');
        setSearchTerm('');
        setActiveStat('Total Riders');
    };

    const filteredRiders = mockRiders.filter(rider => {
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

    // Handler: open rider modal
    const openRiderModal = (rider: Rider) => {
        setSelectedRider(rider);
        setModalSubView('Details');
    };

    // Handler: close modal
    const closeModal = () => {
        setSelectedRider(null);
        setModalSubView('Details');
    };

    // Handler: navigate back in modal
    const handleModalBack = () => {
        if (modalSubView === 'TripSummary') {
            setModalSubView('History');
        } else {
            setModalSubView('Details');
        }
    };

    // Handler: suspend rider
    const handleSuspendConfirm = (_reason: string, _hours: string) => {
        setShowSuspendModal(false);
        closeModal();
        setShowSuspensionBanner(true);
        // Auto-dismiss banner after 5 seconds
        setTimeout(() => setShowSuspensionBanner(false), 5000);
    };

    // Handler: activate rider
    const handleActivateRider = () => {
        closeModal();
        setShowActivationBanner(true);
        setTimeout(() => setShowActivationBanner(false), 5000);
    };

    // Stats card definitions
    const statCards = [
        { 
            key: 'Total Riders', label: 'Total Riders', 
            value: String(totalRiders).padStart(4, '0'), suffix: '',
            icon: <User size={20} />, bgDefault: 'white', colorDefault: 'black',
        },
        { 
            key: 'Avg Rating', label: 'Avg Rating', 
            value: avgRating, suffix: '',
            icon: <Star size={20} fill="white" stroke="white" />,
            bgDefault: 'var(--primary-color)', colorDefault: 'white', isAlwaysGreen: true,
        },
        { 
            key: 'Active Now', label: 'Active Now', 
            value: String(activeRiders).padStart(4, '0'), suffix: '',
            icon: <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--primary-color)', borderRadius: '50%' }}></div>,
            bgDefault: 'white', colorDefault: 'black',
        },
        { 
            key: 'Total Spent', label: 'Total Spent', 
            value: String(totalSpent).padStart(4, '0'), suffix: 'MAD',
            icon: <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>$</div>,
            bgDefault: 'white', colorDefault: 'black',
        },
    ];

    return (
        <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            
            {/* Suspension Banner */}
            {showSuspensionBanner && (
                <SuspensionBanner onClose={() => setShowSuspensionBanner(false)} />
            )}

            {/* Activation Banner */}
            {showActivationBanner && (
                <ActivationBanner onClose={() => setShowActivationBanner(false)} />
            )}

            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Riders</h1>
                <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Manage rider accounts and preferences</p>
            </div>

            {/* Stats Cards - Interactive */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {statCards.map((stat) => {
                    const isActive = activeStat === stat.key;
                    const isGreenCard = stat.isAlwaysGreen;
                    const bg = isActive && !isGreenCard ? 'var(--primary-color)' : stat.bgDefault;
                    const color = isActive && !isGreenCard ? 'white' : stat.colorDefault;
                    const shadow = (isActive || isGreenCard) 
                        ? '0 10px 15px -3px rgba(34, 197, 94, 0.3)' 
                        : 'var(--shadow-sm)';

                    return (
                        <div 
                            key={stat.key}
                            onClick={() => setActiveStat(isActive ? 'Total Riders' : stat.key)}
                            style={{ 
                                backgroundColor: bg, padding: '24px', borderRadius: '24px', 
                                boxShadow: shadow, position: 'relative', color: color,
                                cursor: 'pointer', transition: 'all 0.3s ease',
                                transform: isActive ? 'translateY(-2px)' : 'none',
                                overflow: 'hidden',
                                border: isActive && !isGreenCard ? '2px solid var(--primary-color)' : '2px solid transparent',
                            }}
                        >
                            {(isActive || isGreenCard) && (
                                <>
                                    <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1, pointerEvents: 'none' }}>
                                        <svg width="150" height="150" viewBox="0 0 100 100">
                                             <circle cx="100" cy="0" r="80" fill="white" />
                                        </svg>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', opacity: 0.1, pointerEvents: 'none' }}>
                                        <svg viewBox="0 0 1440 320" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
                                            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                        </svg>
                                    </div>
                                </>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', position: 'relative' }}>
                                <div style={{ 
                                    backgroundColor: (isActive || isGreenCard) ? 'rgba(255,255,255,0.2)' : '#f3f4f6', 
                                    padding: '8px', borderRadius: '8px' 
                                }}>
                                    {isGreenCard ? stat.icon : (
                                        isActive ? 
                                            <User size={20} color="white" /> : 
                                            (stat.key === 'Active Now' ? stat.icon : 
                                             stat.key === 'Total Spent' ? stat.icon :
                                             <User size={20} color="var(--primary-color)" />)
                                    )}
                                </div>
                                <span style={{ fontWeight: '600', color: (isActive || isGreenCard) ? 'white' : 'var(--text-secondary)' }}>
                                    {stat.label}
                                </span>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', position: 'relative' }}>
                                <div style={{ fontSize: '40px', fontWeight: 'bold' }}>{stat.value}</div>
                                {stat.suffix && (
                                    <div style={{ fontSize: '14px', color: (isActive || isGreenCard) ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                                        {stat.suffix}
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ 
                                position: 'absolute', bottom: '24px', right: '24px', 
                                backgroundColor: (isActive || isGreenCard) ? 'rgba(0,0,0,0.3)' : 'var(--primary-color)', 
                                color: 'white', borderRadius: '50%', padding: '6px', transition: 'transform 0.2s',
                            }}>
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '350px' }}>
                        <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input 
                            type="text" 
                            placeholder="Search riders..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '100%', padding: '10px 16px 10px 48px', borderRadius: '24px', 
                                border: '1px solid #e5e7eb', outline: 'none', fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <Dropdown label="Status" options={['Active', 'Suspended']} activeValue={statusFilter} onSelect={setStatusFilter} />
                    <Dropdown label="Regions" options={['Casablanca', 'Rabat', 'Marrakech']} activeValue={regionFilter} onSelect={setRegionFilter} />
                    <Dropdown label="Types" options={['Retail', 'Corporate']} activeValue={typeFilter} onSelect={setTypeFilter} />
                    {(activeFilterCount > 0 || activeStat !== 'Total Riders') && (
                        <button 
                            onClick={clearAllFilters}
                            style={{ 
                                padding: '8px 16px', borderRadius: '24px', border: 'none', 
                                backgroundColor: '#fee2e2', color: '#b91c1c', 
                                fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
                                transition: 'all 0.2s'
                            }}
                        >
                            Clear All
                        </button>
                    )}
                </div>
                {(activeFilterCount > 0 || activeStat !== 'Total Riders') && (
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        Showing <strong style={{ color: '#1f2937' }}>{filteredRiders.length}</strong> of <strong style={{ color: '#1f2937' }}>{mockRiders.length}</strong> riders
                        {activeStat !== 'Total Riders' && (
                            <span style={{ marginLeft: '8px', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>
                                {activeStat}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Table */}
            <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Rider Management Overview</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>Manage driver accounts and generate IDs by vehicle type</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1.5fr 1fr 1fr 1fr 1fr', padding: '16px 24px', backgroundColor: '#10b981', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', marginBottom: '16px' }}>
                    <div>Riders</div>
                    <div>Contact</div>
                    <div style={{ textAlign: 'center' }}>Status</div>
                    <div style={{ textAlign: 'center' }}>Total Trips</div>
                    <div style={{ textAlign: 'center' }}>Total Spent</div>
                    <div style={{ textAlign: 'center' }}>Action</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredRiders.length === 0 ? (
                        <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>No riders found</h3>
                            <p style={{ color: '#6b7280', margin: '0 0 16px 0' }}>Try adjusting your search or filter criteria</p>
                            <button 
                                onClick={clearAllFilters} 
                                style={{ 
                                    padding: '10px 24px', borderRadius: '24px', border: 'none', 
                                    backgroundColor: '#22c55e', color: 'white', fontWeight: '600', 
                                    cursor: 'pointer', fontSize: '14px' 
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : filteredRiders.map((rider) => (
                        <div key={rider.id + rider.email} style={{ 
                            display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1.5fr 1fr 1fr 1fr 1fr', 
                            padding: '16px 24px', backgroundColor: 'white', borderRadius: '16px', 
                            alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            transition: 'box-shadow 0.2s, transform 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={rider.avatar} style={{ width: '48px', height: '48px', borderRadius: '50%' }} alt="" />
                                    <div style={{ 
                                        position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
                                        backgroundColor: 'white', border: '1px solid #f3f4f6', borderRadius: '8px',
                                        padding: '0 4px', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center'
                                    }}>
                                        <Star size={10} fill="#fbbf24" stroke="none" /> {rider.rating}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{rider.name}</div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>{rider.location}</div>
                                    <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>ID {rider.id}</div>
                                </div>
                            </div>

                            <div style={{ fontSize: '14px' }}>
                                <div style={{ fontWeight: '600' }}>{rider.phone}</div>
                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{rider.email}</div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <span style={{ 
                                    padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                                    backgroundColor: rider.status === 'Active' ? '#f0fdf4' : '#fef2f2',
                                    color: rider.status === 'Active' ? '#10b981' : '#dc2626',
                                    border: `1px solid ${rider.status === 'Active' ? '#10b98120' : '#dc262620'}`
                                }}>
                                    {rider.status}
                                </span>
                            </div>

                            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                                {rider.totalTrips}
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{rider.totalSpent}</div>
                                <div style={{ fontSize: '10px', color: '#9ca3af' }}>MAD</div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <button 
                                    onClick={() => openRiderModal(rider)}
                                    style={{ 
                                        display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', 
                                        borderRadius: '20px', border: '1px solid #e5e7eb', backgroundColor: 'white',
                                        fontSize: '13px', cursor: 'pointer', fontWeight: '600',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f0fdf4'; e.currentTarget.style.borderColor = '#22c55e'; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                                >
                                    <Eye size={14} /> Preview
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ MAIN MODAL ============ */}
            {selectedRider && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                    backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{ 
                        backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '650px',
                        maxHeight: '90vh', overflowY: 'auto', position: 'relative', padding: '32px'
                    }}>
                        {/* Modal Header Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            {modalSubView !== 'Details' ? (
                                <button 
                                    onClick={handleModalBack}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                >
                                    <ArrowLeft size={24} />
                                </button>
                            ) : (
                                <div></div>
                            )}
                            <button 
                                onClick={closeModal}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000', padding: 0 }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content - Switch between sub-views */}
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
                            <SpendingContent />
                        )}

                        {modalSubView === 'History' && (
                            <TripsHistoryContent 
                                onViewSummary={() => setModalSubView('TripSummary')} 
                            />
                        )}

                        {modalSubView === 'TripSummary' && (
                            <TripSummaryContent />
                        )}

                        {modalSubView === 'Edit' && (
                            <EditRiderContent 
                                rider={selectedRider} 
                                onSave={() => setModalSubView('Details')} 
                            />
                        )}
                    </div>
                </div>
            )}

            {/* ============ SUSPEND RIDER OVERLAY MODAL ============ */}
            {showSuspendModal && (
                <SuspendRiderModal 
                    onClose={() => setShowSuspendModal(false)}
                    onConfirm={handleSuspendConfirm}
                />
            )}
        </div>
    );
};
