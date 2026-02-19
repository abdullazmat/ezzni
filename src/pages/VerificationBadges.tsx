import { useState, useRef, useEffect } from 'react';
import { 
    Search, Eye, X, Users, ArrowLeft, 
    Check, ChevronDown, ShieldCheck, 
    User, CheckCircle, AlertCircle, ArrowUpRight
} from 'lucide-react';

// --- Types ---

interface UserData {
    id: string; // Internal ID like U-001
    displayId: string; // displayed ID like R-00045
    name: string;
    avatar: string;
    rating: number;
    phone: string;
    city: string;
    totalTrips: number;
    userType: 'Driver' | 'Passenger';
    isVerified: boolean;
    verifiedDate?: string;
    email: string;
    joinDate: string;
    
    // Driver specific
    vehicleType?: string;
    vehicleId?: string;
    licensePlate?: string;
    makeModel?: string;
    year?: string;
    transmission?: string;
    color?: string;
    onBoardingDate?: string;
    acceptanceRate?: string;
    completionRate?: string;
}

interface BadgeSettings {
    driver: {
        minTrips: number;
        minRating: number;
        minAcceptance: number;
    };
    passenger: {
        minTrips: number;
        minRating: number;
    };
}

// --- Icons / Sub-components ---

const VerifiedBadge = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
        <span>Verified</span>
    </div>
);

const UnverifiedBadge = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
        <span>Unverified</span>
    </div>
);

const UserTypeBadge = ({ type }: { type: 'Driver' | 'Passenger' }) => (
    <div style={{ 
        backgroundColor: type === 'Driver' ? '#dcfce7' : '#f0fdf4', 
        color: '#166534', 
        padding: '0.25rem 0.75rem', 
        borderRadius: '1rem', 
        fontSize: '0.75rem', 
        fontWeight: '600',
        border: '1px solid #bbf7d0',
        display: 'inline-block'
    }}>
        {type}
    </div>
);

// --- Custom Dropdown Component ---
const Dropdown = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative' }} ref={ref}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    padding: '0.7rem 1.5rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', minWidth: '120px', justifyContent: 'space-between' 
                }}
            >
                <span style={{ color: value === 'All' ? '#6b7280' : 'black' }}>{value === 'All' ? label : value}</span>
                <ChevronDown size={14} color="#9ca3af" />
            </button>
            {isOpen && (
                <div style={{ position: 'absolute', top: '120%', left: 0, minWidth: '100%', width: 'max-content', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '0.5rem', zIndex: 50, border: '1px solid #f3f4f6' }}>
                    {options.map(opt => (
                        <div key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '0.5rem', backgroundColor: value === opt ? '#f0fdf4' : 'transparent', color: value === opt ? '#166534' : 'inherit' }} className="hover:bg-gray-50">
                            {opt}
                            {value === opt && <Check size={14} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Component ---

export const VerificationBadges = () => {
    // Top Level State
    const [statusFilter, setStatusFilter] = useState('All');
    const [userTypeFilter, setUserTypeFilter] = useState('All');
    const [cityFilter, setCityFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeStat, setActiveStat] = useState<string | null>(null);
    
    // Modal States
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    // Settings Data State
    const [badgeSettings] = useState<BadgeSettings>({
        driver: { minTrips: 100, minRating: 4.5, minAcceptance: 85 },
        passenger: { minTrips: 100, minRating: 4.5 }
    });

    // Mock Data -> State
    const [users, setUsers] = useState<UserData[]>([
        {
            id: 'U-001', displayId: 'R-00045', name: 'Youssef Ali', avatar: 'https://i.pravatar.cc/150?u=1', rating: 4.8,
            phone: '+212 6 12 34 56 78', city: 'Casablanca', totalTrips: 1247, userType: 'Driver', isVerified: true, verifiedDate: '2024-10-20',
            email: 'youssef.ali@gmail.com', joinDate: '2023-06-12',
            vehicleType: 'Motorcycle', vehicleId: 'M-00023', licensePlate: '12345-A-6', makeModel: 'Dacia Logan', year: '2020', transmission: 'Manual', color: 'White', onBoardingDate: '12 Mar 2026', acceptanceRate: '97%', completionRate: '99%'
        },
        {
            id: 'U-002', displayId: 'R-00046', name: 'Sara Ahmed', avatar: 'https://i.pravatar.cc/150?u=2', rating: 4.9,
            phone: '+212 6 00 00 00 00', city: 'Casablanca', totalTrips: 850, userType: 'Passenger', isVerified: true, verifiedDate: '2024-11-15',
            email: 'sara.ahmed@gmail.com', joinDate: '2023-08-01'
        },
        {
            id: 'U-003', displayId: 'R-00047', name: 'Karim Ben', avatar: 'https://i.pravatar.cc/150?u=3', rating: 4.5,
            phone: '+212 6 11 11 11 11', city: 'Rabat', totalTrips: 450, userType: 'Driver', isVerified: true, verifiedDate: '2024-09-10',
            email: 'karim.ben@gmail.com', joinDate: '2023-05-15',
            vehicleType: 'Car', vehicleId: 'C-00100', licensePlate: '99999-B-1', makeModel: 'Peugeot 208', year: '2021', transmission: 'Automatic', color: 'Grey', onBoardingDate: '15 May 2023', acceptanceRate: '92%', completionRate: '98%'
        },
        {
            id: 'U-004', displayId: 'R-00048', name: 'Laila Tazi', avatar: 'https://i.pravatar.cc/150?u=4', rating: 4.2,
            phone: '+212 6 22 22 22 22', city: 'Marrakech', totalTrips: 120, userType: 'Passenger', isVerified: false,
            email: 'laila.tazi@gmail.com', joinDate: '2024-01-20'
        },
        {
            id: 'U-005', displayId: 'R-00049', name: 'Omar Fassi', avatar: 'https://i.pravatar.cc/150?u=5', rating: 4.6,
            phone: '+212 6 33 33 33 33', city: 'Casablanca', totalTrips: 1500, userType: 'Driver', isVerified: true, verifiedDate: '2024-01-05',
            email: 'omar.fassi@gmail.com', joinDate: '2022-12-01',
            vehicleType: 'Taxi', vehicleId: 'T-00555', licensePlate: '55555-C-5', makeModel: 'Fiat Doblo', year: '2019', transmission: 'Manual', color: 'Red', onBoardingDate: '01 Dec 2022', acceptanceRate: '99%', completionRate: '95%'
        },
        {
            id: 'U-006', displayId: 'R-00050', name: 'Nadia Mansour', avatar: 'https://i.pravatar.cc/150?u=6', rating: 5.0,
            phone: '+212 6 44 44 44 44', city: 'Tangier', totalTrips: 300, userType: 'Passenger', isVerified: true, verifiedDate: '2024-12-12',
            email: 'nadia.m@gmail.com', joinDate: '2023-11-11'
        },
        {
            id: 'U-007', displayId: 'R-00051', name: 'Hassan Amrani', avatar: 'https://i.pravatar.cc/150?u=7', rating: 4.1,
            phone: '+212 6 55 55 55 55', city: 'Casablanca', totalTrips: 50, userType: 'Passenger', isVerified: false,
            email: 'hassan.am@gmail.com', joinDate: '2024-02-15'
        },
        {
            id: 'U-008', displayId: 'R-00052', name: 'Samir Kabbaj', avatar: 'https://i.pravatar.cc/150?u=8', rating: 4.7,
            phone: '+212 6 66 66 66 66', city: 'Marrakech', totalTrips: 2000, userType: 'Driver', isVerified: true, verifiedDate: '2023-10-10',
            email: 'samir.k@gmail.com', joinDate: '2022-01-10',
            vehicleType: 'Motorcycle', vehicleId: 'M-00888', licensePlate: '88888-D-8', makeModel: 'Sym', year: '2022', transmission: 'CVT', color: 'Black', onBoardingDate: '10 Jan 2022', acceptanceRate: '95%', completionRate: '97%'
        }
    ]);

    const uniqueCities = ['All', ...Array.from(new Set(users.map(u => u.city)))];

    // Filter Logic
    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.displayId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = cityFilter === 'All' || u.city === cityFilter;
        
        let matchesStatus = statusFilter === 'All' ? true : (statusFilter === 'Verified' ? u.isVerified : !u.isVerified);
        let matchesType = userTypeFilter === 'All' || u.userType === userTypeFilter;

        // Apply Stats Cards Filters
        if (activeStat === 'TotalVerified') {
            if (!u.isVerified) return false;
        } else if (activeStat === 'VerifiedDrivers') {
            if (!u.isVerified || u.userType !== 'Driver') return false;
        } else if (activeStat === 'VerifiedPassengers') {
             if (!u.isVerified || u.userType !== 'Passenger') return false;
        }

        return matchesSearch && matchesStatus && matchesType && matchesCity;
    });

    // Handlers
    const handleToggleBadge = (userId: string) => {
        const updatedUsers = users.map(u => {
            if (u.id === userId) {
                const newStatus = !u.isVerified;
                // If verifying, set today's date if not present (mocking logic)
                const newDate = newStatus ? new Date().toISOString().split('T')[0] : u.verifiedDate;
                return { ...u, isVerified: newStatus, verifiedDate: newDate };
            }
            return u;
        });
        setUsers(updatedUsers);
        
        // Update selected user as well to reflect change in modal immediately
        if (selectedUser && selectedUser.id === userId) {
            const updatedUser = updatedUsers.find(u => u.id === userId);
            if (updatedUser) setSelectedUser(updatedUser);
        }
    };

    const handleStatClick = (stat: string) => {
        if (activeStat === stat) {
            setActiveStat(null); // Toggle off
        } else {
            setActiveStat(stat);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Verification badges</h1>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor all trip types across Hezzni's transportation services</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <div 
                    onClick={() => setActiveStat(null)} // Reset
                    style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: !activeStat ? '#f0fdf4' : 'white', 
                        position: 'relative', boxShadow: !activeStat ? 'inset 0 0 0 2px #22c55e' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px',
                        cursor: 'pointer', transition: 'all 0.2s'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={20} color="#6b7280" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Total Riders / Drivers</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.length.toString().padStart(3, '0')}</div>
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: '#22c55e', borderRadius: '50%', padding: '0.4rem', color: 'white', display: 'flex' }}>
                        <ArrowUpRight size={16} /> 
                    </div>
                </div>

                <div 
                    onClick={() => handleStatClick('TotalVerified')}
                    style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', 
                        backgroundColor: activeStat === 'TotalVerified' ? '#22c55e' : 'white', 
                        color: activeStat === 'TotalVerified' ? 'white' : 'black',
                        position: 'relative', boxShadow: activeStat === 'TotalVerified' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px',
                        cursor: 'pointer', transition: 'all 0.2s', transform: activeStat === 'TotalVerified' ? 'translateY(-2px)' : 'none'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={20} color={activeStat === 'TotalVerified' ? 'white' : '#6b7280'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Total Verified</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.filter(u => u.isVerified).length.toString().padStart(3, '0')}</div>
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeStat === 'TotalVerified' ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: activeStat === 'TotalVerified' ? '#22c55e' : 'white', display: 'flex' }}>
                         <ArrowUpRight size={16} />
                    </div>
                </div>

                <div 
                    onClick={() => handleStatClick('VerifiedDrivers')}
                    style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', 
                        backgroundColor: activeStat === 'VerifiedDrivers' ? '#22c55e' : 'white', 
                        color: activeStat === 'VerifiedDrivers' ? 'white' : 'black',
                        position: 'relative', boxShadow: activeStat === 'VerifiedDrivers' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px',
                        cursor: 'pointer', transition: 'all 0.2s', transform: activeStat === 'VerifiedDrivers' ? 'translateY(-2px)' : 'none'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShieldCheck size={20} color={activeStat === 'VerifiedDrivers' ? 'white' : '#6b7280'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Verified Drivers</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.filter(u => u.isVerified && u.userType === 'Driver').length.toString().padStart(3, '0')}</div>
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeStat === 'VerifiedDrivers' ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: activeStat === 'VerifiedDrivers' ? '#22c55e' : 'white', display: 'flex' }}>
                        <ArrowUpRight size={16} />
                    </div>
                </div>

                <div 
                     onClick={() => handleStatClick('VerifiedPassengers')}
                     style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', 
                        backgroundColor: activeStat === 'VerifiedPassengers' ? '#22c55e' : 'white', 
                        color: activeStat === 'VerifiedPassengers' ? 'white' : 'black',
                        position: 'relative', boxShadow: activeStat === 'VerifiedPassengers' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px',
                        cursor: 'pointer', transition: 'all 0.2s', transform: activeStat === 'VerifiedPassengers' ? 'translateY(-2px)' : 'none'
                    }}
                >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShieldCheck size={20} color={activeStat === 'VerifiedPassengers' ? 'white' : '#6b7280'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Verified Passengers</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.filter(u => u.isVerified && u.userType === 'Passenger').length.toString().padStart(3, '0')}</div>
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeStat === 'VerifiedPassengers' ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: activeStat === 'VerifiedPassengers' ? '#22c55e' : 'white', display: 'flex' }}>
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1 }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '2rem', border: '1px solid #e5e7eb', outline: 'none' }} 
                        />
                    </div>
                    <Dropdown label="User" value={userTypeFilter} options={['All', 'Driver', 'Passenger']} onChange={setUserTypeFilter} />
                    <Dropdown label="Status" value={statusFilter} options={['All', 'Verified', 'Unverified']} onChange={setStatusFilter} />
                    <Dropdown label="City" value={cityFilter} options={uniqueCities} onChange={setCityFilter} />
                </div>
                
                <button 
                    onClick={() => setShowSettingsModal(true)}
                    style={{ 
                        backgroundColor: '#22c55e', color: 'white', padding: '0.8rem 2rem', borderRadius: '2rem', 
                        fontSize: '0.9rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s' 
                    }}
                >
                    Setting
                </button>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#22c55e', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', borderRadius: '1rem 0 0 0' }}>User Type</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Name ID</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Phone</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>City</th>
                            <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'center' }}>Total Trips</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Badge Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600', borderRadius: '0 1rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: 'white' }}>
                                <td style={{ padding: '1rem' }}>
                                    <UserTypeBadge type={user.userType} />
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={user.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {user.rating}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{user.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{user.displayId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', fontWeight: '500', fontSize: '0.9rem' }}>{user.phone}</td>
                                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{user.city}</td>
                                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{user.totalTrips}</td>
                                <td style={{ padding: '1rem' }}>
                                    {user.isVerified ? <VerifiedBadge /> : <UnverifiedBadge />}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button 
                                        onClick={() => setSelectedUser(user)}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.8rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.85rem' }}
                                    >
                                        <Eye size={14} /> Preview
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Badge Requirements Settings Modal */}
            {showSettingsModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="card" style={{ width: '600px', backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <button onClick={() => setShowSettingsModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={24} /></button>
                            <div>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>Badge Requirements Settings</h2>
                                <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Configure the criteria for granting verified badges</p>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Driver Requirements</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.3rem' }}>Minimum trips completed:</label>
                                    <div style={{ padding: '0.8rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontWeight: '600' }}>{badgeSettings.driver.minTrips}</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.3rem' }}>Minimum rating:</label>
                                    <div style={{ padding: '0.8rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontWeight: '600' }}>{badgeSettings.driver.minRating}</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.3rem' }}>Min acceptance rate (%):</label>
                                    <div style={{ padding: '0.8rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontWeight: '600' }}>{badgeSettings.driver.minAcceptance}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Passenger Requirements</h3>
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.3rem' }}>Minimum trips completed:</label>
                                    <div style={{ padding: '0.8rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontWeight: '600' }}>{badgeSettings.passenger.minTrips}</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.3rem' }}>Minimum rating:</label>
                                    <div style={{ padding: '0.8rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontWeight: '600' }}>{badgeSettings.passenger.minRating}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button 
                                onClick={() => setShowSettingsModal(false)}
                                style={{ padding: '0.8rem 2.5rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '600', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => setShowSettingsModal(false)}
                                style={{ padding: '0.8rem 2.5rem', borderRadius: '2rem', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: '600', cursor: 'pointer' }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Badge Management Modal (Preview) */}
            {selectedUser && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="card" style={{ width: '600px', backgroundColor: '#fdfdfd', borderRadius: '1.5rem', padding: '2rem', maxHeight: '95vh', overflowY: 'auto', position: 'relative' }}>
                        <button 
                            onClick={() => setSelectedUser(null)} 
                            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>
                        
                        <div style={{ marginBottom: '2rem' }}>
                             <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Badge Management - {selectedUser.vehicleId || 'N/A'}</h2>
                             <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Review user details and manage verified badge status</p>
                        </div>
                        
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>{selectedUser.userType} Information</h3>
                        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ position: 'relative', height: 'fit-content' }}>
                                    <img src={selectedUser.avatar} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {selectedUser.rating}</div>
                                </div>
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem 1rem' }}>
                                     <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>User ID</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.id}</div></div>
                                     <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name:</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.name}</div></div>
                                     <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>User Type</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.userType}</div></div>
                                     <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Phone</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.phone}</div></div>
                                     <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>City</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.city}</div></div>
                                     <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Join Date</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.joinDate}</div></div>
                                     <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Email</div><div style={{ fontWeight: '600', fontSize: '0.9rem', wordBreak: 'break-all' }}>{selectedUser.email}</div></div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Info - Show only for drivers */}
                        {selectedUser.userType === 'Driver' && (
                        <>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Vehicle Information</h3>
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.5rem 1rem' }}>
                                    <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>License Plate</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.licensePlate}</div></div>
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Make & Model</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.makeModel}</div></div>
                                    <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Transmission</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.transmission}</div></div>
                                    <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Year</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.year}</div></div>
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>On boarding date</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedUser.onBoardingDate}</div></div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Colour</div>
                                        <div style={{ fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: selectedUser.color?.toLowerCase(), border: '1px solid #ddd' }}></span>
                                            {selectedUser.color}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Performance Metrics</h3>
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                     <div style={{ position: 'relative' }}>
                                        <img src={selectedUser.avatar} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                        <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {selectedUser.rating}</div>
                                     </div>
                                     <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', textAlign: 'center' }}>
                                         <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Trip Count</div><div style={{ fontWeight: 'bold' }}>{selectedUser.totalTrips}+</div></div>
                                         <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Vehicle Type</div><div style={{ fontWeight: 'bold' }}>{selectedUser.vehicleType}</div></div>
                                         <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Vehicle ID</div><div style={{ fontWeight: 'bold' }}>{selectedUser.vehicleId}</div></div>
                                         <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Acceptance Rate</div><div style={{ fontWeight: 'bold' }}>{selectedUser.acceptanceRate}</div></div>
                                         <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Completion Rate</div><div style={{ fontWeight: 'bold' }}>{selectedUser.completionRate}</div></div>
                                     </div>
                                </div>
                            </div>
                        </>
                        )}

                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Current Badge Status</h3>
                        <div style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #dcfce7', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {selectedUser.isVerified ? (
                                    <>
                                        <CheckCircle size={20} color="#166534" />
                                        <span style={{ fontWeight: '500', color: '#166534' }}>This user has a verified badge</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle size={20} color="#9ca3af" />
                                        <span style={{ fontWeight: '500', color: '#4b5563' }}>This user does not have a verified badge</span>
                                    </>
                                )}
                            </div>
                            {selectedUser.isVerified && (
                                <span style={{ fontSize: '0.85rem', color: '#22c55e' }}>Verified on {selectedUser.verifiedDate}</span>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button 
                                onClick={() => setSelectedUser(null)}
                                style={{ padding: '0.8rem 2.5rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '600', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleToggleBadge(selectedUser.id)}
                                style={{ 
                                    padding: '0.8rem 2.5rem', borderRadius: '2rem', border: 'none', 
                                    backgroundColor: selectedUser.isVerified ? '#dc2626' : '#22c55e', 
                                    color: 'white', fontWeight: '600', cursor: 'pointer' 
                                }}
                            >
                                {selectedUser.isVerified ? 'Remove Verified Badge' : 'Grant Verified Badge'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
