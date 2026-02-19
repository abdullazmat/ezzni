import { useState } from 'react';
import { 
    Search, Eye, ArrowLeft, 
    Check, X, Clock, 
    ArrowUpRight, Car, 
    Filter, ChevronDown
} from 'lucide-react';

// --- Types ---

interface UserInfo {
    name: string;
    id: string;
    avatar: string;
    rating: number;
    phone: string;
    email: string;
    city: string;
    gender: 'Male' | 'Female';
    category?: string; // e.g. 'Hezzni Standard'
}

interface Delivery {
    id: string; // T-00123
    serviceType: string; // 'Regular Ride'
    rider: UserInfo;
    driver: UserInfo;
    vehicleType: string; // 'Delivery'
    status: 'Scheduled' | 'Accepted' | 'Pending' | 'Arriving' | 'Arrived' | 'Started' | 'In_progress' | 'Completed' | 'Cancelled';
    fare: number;
    currency: string;
    paymentMethod: 'Visa' | 'Mastercard' | 'Cash';
    
    // Detailed Info
    deliveryId: string; // DEL-00123
    sendingDescription: string;
    weight: string;
    
    vehicleInfo: {
        brand: string; // 'Hezzni Standard'
        plate: string;
        transmission: string;
        model: string; // 'Dacia Logan'
        color: string;
        year: string;
        joinDate: string;
    };

    pickup: string;
    destination: string;

    tva: string;
    serviceFee: number;
    discount: string;
    
    startTime: string;
    endTime: string;
    distance: string;
    scheduleDate: string;
    scheduleTime: string;
}

interface DriverRiderCard {
    id: string;
    name: string;
    location: string;
    trips: number;
    avatar: string;
    rating: number;
    type: 'Driver' | 'Rider';
    vehicleIcon?: boolean; // For drivers
}

// --- Mock Data ---

const mockDeliveries: Delivery[] = Array(8).fill(null).map((_, i) => ({
    id: 'T-00123',
    serviceType: 'Regular Ride',
    rider: { name: 'Ahmed Hassan', id: 'R-00045', avatar: `https://i.pravatar.cc/150?u=${i + 10}`, rating: 4.8, phone: '+212 6 12 34 56', email: 'ahmed@example.com', city: 'Casablanca', gender: 'Male', category: 'Hezzni Standard' },
    driver: { name: 'Youssef Ali', id: 'D-00046', avatar: `https://i.pravatar.cc/150?u=${i + 20}`, rating: 4.9, phone: '+212 6 12 34 56', email: 'ali@example.com', city: 'Casablanca', gender: 'Male' },
    vehicleType: 'Delivery',
    status: ['Scheduled', 'Accepted', 'Pending', 'Arriving', 'Arrived', 'Started', 'In_progress', 'Completed'][i % 8] as any,
    fare: 45.50, currency: 'MAD',
    paymentMethod: i % 2 === 0 ? 'Visa' : 'Mastercard',
    
    deliveryId: 'DEL-00123',
    sendingDescription: 'Important business contracts',
    weight: '0.5 kg',
    
    vehicleInfo: {
        brand: 'Hezzni Standard',
        plate: '12345-A-6',
        transmission: 'Manual',
        model: 'Dacia Logan',
        color: 'White',
        year: '2020',
        joinDate: '2023-01-15'
    },

    pickup: 'Current Location, Marrakech',
    destination: 'Current Location, Marrakech',

    tva: '1%',
    serviceFee: 0.00,
    discount: '0%',

    startTime: '14:30',
    endTime: '14:55',
    distance: '45km',
    scheduleDate: '2024-10-15',
    scheduleTime: '14:30'
}));

const mockDriverRiders: DriverRiderCard[] = Array(12).fill(null).map((_, i) => ({
    id: `T-00089`,
    name: 'Mohamed Berrada',
    location: 'Bab Fès',
    trips: 167,
    avatar: `https://i.pravatar.cc/150?u=${i + 50}`,
    rating: 4.9,
    type: i % 2 === 0 ? 'Driver' : 'Rider',
    vehicleIcon: i % 2 === 0
}));

// --- Helper Components ---

const StatusBadge = ({ status }: { status: string }) => {
    let bg = '#e5e7eb';
    let color = '#374151';

    switch (status) {
        case 'Scheduled': bg = '#dbeafe'; color = '#1d4ed8'; break;
        case 'Accepted': bg = '#ccfbf1'; color = '#0f766e'; break;
        case 'Pending': bg = '#fef3c7'; color = '#b45309'; break; 
        case 'Arriving': bg = '#e0f2fe'; color = '#0369a1'; break;
        case 'Arrived': bg = '#dcfce7'; color = '#15803d'; break; 
        case 'Started': bg = '#ede9fe'; color = '#7e22ce'; break; 
        case 'In_progress': bg = '#f3e8ff'; color = '#6d28d9'; break; 
        case 'Completed': bg = '#dcfce7'; color = '#15803d'; break; 
        case 'Cancelled': bg = '#fee2e2'; color = '#b91c1c'; break;
    }

    return (
        <span style={{ backgroundColor: bg, color: color, padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block', minWidth: '80px', textAlign: 'center' }}>
            {status}
        </span>
    );
};

const Dropdown = ({ label, options, activeValue, onSelect }: { label: string, options: string[], activeValue: string, onSelect: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ padding: '0.6rem 1rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: activeValue !== 'All' && activeValue !== label ? '#dcfce7' : 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: activeValue !== 'All' && activeValue !== label ? '#166534' : '#374151', cursor: 'pointer' }}
            >
                {activeValue === 'All' ? label : activeValue}
                <ChevronDown size={14} />
            </button>
            {isOpen && (
                <div style={{ position: 'absolute', top: '120%', left: 0, minWidth: '150px', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '0.5rem', zIndex: 50, border: '1px solid #f3f4f6' }}>
                    <div onClick={() => { onSelect('All'); setIsOpen(false); }} style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '0.5rem', fontWeight: activeValue === 'All' ? 'bold' : 'normal' }} className="hover:bg-gray-50">
                        All
                    </div>
                    {options.length > 0 ? options.map(opt => (
                        <div key={opt} onClick={() => { onSelect(opt); setIsOpen(false); }} style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '0.5rem', fontWeight: activeValue === opt ? 'bold' : 'normal' }} className="hover:bg-gray-50">
                            {opt}
                        </div>
                    )) : <div style={{ padding: '0.5rem', color: '#9ca3af', fontSize: '0.8rem' }}>No options</div>}
                </div>
            )}
        </div>
    );
};

// --- Main Page Component ---

export const DeliveryServices = () => {
    const [activeStat, setActiveStat] = useState<string | null>('Pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
    const [viewMode, setViewMode] = useState<'Drivers' | 'Riders'>('Drivers');

    // Filters State
    const [statusFilter, setStatusFilter] = useState('All');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [methodFilter, setMethodFilter] = useState('All');
    const [periodFilter, setPeriodFilter] = useState('All');
    const [cityFilter, setCityFilter] = useState('All');

    const filteredDeliveries = mockDeliveries.filter(d => {
        // Stats Filter
        if (activeStat === 'Pending' && d.status !== 'Pending') return false; 
        if (activeStat === 'Accepted' && d.status !== 'Accepted') return false; 
        if (activeStat === 'Cancelled' && d.status !== 'Cancelled') return false; 

        // Search Filter (ID, Rider Name, Driver Name)
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            d.id.toLowerCase().includes(searchLower) ||
            d.rider.name.toLowerCase().includes(searchLower) ||
            d.driver.name.toLowerCase().includes(searchLower) ||
            d.deliveryId.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;

        // Dropdown Filters
        if (statusFilter !== 'All' && d.status !== statusFilter) return false;
        // Note: Mock data only has 'Regular Ride', so 'Express' would filter all out.
        // Assuming 'Regular' maps to 'Regular Ride' in Service Type. 
        if (serviceFilter !== 'All' && !d.serviceType.includes(serviceFilter)) return false;
        if (methodFilter !== 'All' && activeStat !== 'Cancelled' &&  !d.paymentMethod.includes(methodFilter)) return false; // Basic check
        if (cityFilter !== 'All' && d.rider.city !== cityFilter) return false;
        // Period filter logic omitted for simplicity with static dates, can add if needed.

        return true;
    });

    const filteredDriverRiders = mockDriverRiders.filter(
        person => viewMode === 'Drivers' ? person.type === 'Driver' : person.type === 'Rider'
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Delivery Service</h1>
                <p style={{ color: '#6b7280', margin: 0 }}>Monitor all trip types across Hezzni's transportation services</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {[
                    { label: 'Total Deliveries', count: '068', icon: <Car size={20} />, activeName: 'Total Deliveries' },
                    { label: 'Pending', count: '045', icon: <Clock size={20} />, activeName: 'Pending' },
                    { label: 'Accepted', count: '036', icon: <Check size={20} />, activeName: 'Accepted' },
                    { label: 'Cancelled', count: '075', icon: <X size={20} />, activeName: 'Cancelled' },
                ].map((stat) => {
                    const isActive = activeStat === stat.activeName;
                    return (
                        <div 
                            key={stat.activeName}
                            onClick={() => setActiveStat(stat.activeName)}
                            style={{ 
                                padding: '1.5rem', borderRadius: '1.5rem', 
                                backgroundColor: isActive ? '#22c55e' : 'white', 
                                color: isActive ? 'white' : 'black',
                                position: 'relative', 
                                boxShadow: isActive ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px', cursor: 'pointer',
                                transition: 'all 0.2s', transform: isActive ? 'translateY(-2px)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {isActive ? <div style={{color: 'white'}}>{stat.icon}</div> : <div style={{color: '#6b7280'}}>{stat.icon}</div>}
                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.count}</div>
                            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: isActive ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: isActive ? '#22c55e' : 'white', display: 'flex' }}>
                                <ArrowUpRight size={16} /> 
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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
                <Dropdown label="Status" options={['Pending', 'Accepted', 'Scheduled', 'Cancelled']} activeValue={statusFilter} onSelect={setStatusFilter} />
                <Dropdown label="Service Type" options={['Regular', 'Express']} activeValue={serviceFilter} onSelect={setServiceFilter} />
                <Dropdown label="Method" options={['Cash', 'Visa', 'Mastercard']} activeValue={methodFilter} onSelect={setMethodFilter} />
                <Dropdown label="Periods" options={['Today', 'This Week']} activeValue={periodFilter} onSelect={setPeriodFilter} />
                <Dropdown label="City" options={['Casablanca', 'Marrakech', 'Rabat']} activeValue={cityFilter} onSelect={setCityFilter} />
                <button 
                    onClick={() => {
                        setStatusFilter('All'); setServiceFilter('All'); setMethodFilter('All'); 
                        setPeriodFilter('All'); setCityFilter('All'); setSearchTerm('');
                    }}
                    style={{ padding: '0.7rem 1rem', borderRadius: '2rem', border: 'none', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}
                >
                    <Filter size={16} /> Filters
                </button>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
                {/* Header Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1fr 2fr 2fr 1fr 1fr 1fr 1fr', backgroundColor: '#22c55e', color: 'white', padding: '1rem', borderRadius: '1rem', alignItems: 'center', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <div>Trip ID</div>
                    <div>Service</div>
                    <div>Rider</div>
                    <div>Driver</div>
                    <div>Vehicle</div>
                    <div>Status</div>
                    <div>Fare</div>
                    <div style={{ textAlign: 'center' }}>Action</div>
                </div>

                {/* Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {filteredDeliveries.map((item, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '0.8fr 1fr 2fr 2fr 1fr 1fr 1fr 1fr', backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontWeight: '600' }}>{item.id}</div>
                            <div>
                                <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: '600' }}>
                                    {item.serviceType}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={item.rider.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: 'white', fontSize: '0.6rem', padding: '0 0.2rem', borderRadius: '0.2rem' }}>★{item.rider.rating}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.rider.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.rider.id}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={item.driver.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: 'white', fontSize: '0.6rem', padding: '0 0.2rem', borderRadius: '0.2rem' }}>★{item.driver.rating}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.driver.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{item.driver.id}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                                <Car size={18} /> {item.vehicleType}
                            </div>
                            <div>
                                <StatusBadge status={item.status} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.fare.toFixed(2)} {item.currency}</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: item.paymentMethod === 'Visa' ? '#1d4ed8' : '#ea580c' }}>
                                    {item.paymentMethod.toUpperCase()}
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button 
                                    onClick={() => setSelectedDelivery(item)}
                                    style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '2rem', padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}
                                >
                                    <Eye size={14} /> Preview
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Drivers/Riders Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
               <div style={{ backgroundColor: '#e5e7eb', padding: '0.3rem', borderRadius: '2rem', display: 'flex' }}>
                   <button 
                        onClick={() => setViewMode('Drivers')}
                        style={{ 
                            padding: '0.5rem 1.5rem', borderRadius: '1.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
                            backgroundColor: viewMode === 'Drivers' ? '#22c55e' : 'transparent', color: viewMode === 'Drivers' ? 'white' : '#6b7280'
                        }}
                   >
                       Drivers
                   </button>
                   <button 
                        onClick={() => setViewMode('Riders')}
                        style={{ 
                            padding: '0.5rem 1.5rem', borderRadius: '1.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem',
                            backgroundColor: viewMode === 'Riders' ? '#22c55e' : 'transparent', color: viewMode === 'Riders' ? 'white' : '#6b7280'
                        }}
                   >
                       Rider
                   </button>
               </div>
               <a href="#" style={{ color: '#22c55e', fontWeight: '600', textDecoration: 'underline', fontSize: '0.9rem' }}>View All</a>
            </div>

            {/* Driver/Rider Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {filteredDriverRiders.map((person, idx) => (
                   <div key={idx} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <div style={{ position: 'relative' }}>
                            <img src={person.avatar} alt="" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white', whiteSpace: 'nowrap' }}>★ {person.rating}</div>
                       </div>
                       <div style={{ flex: 1 }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                               <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{person.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{person.id} • {person.location}</div>
                               </div>
                               <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>• {person.trips} Trips</div>
                           </div>
                       </div>
                       {person.vehicleIcon && (
                           <Car size={20} color="#374151" />
                       )}
                   </div>
                ))}
            </div>

            {/* Modal */}
            {selectedDelivery && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div className="card" style={{ width: '650px', backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', maxHeight: '95vh', overflowY: 'auto', position: 'relative' }}>
                        
                        {/* Header */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <button onClick={() => setSelectedDelivery(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={24} /></button>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>Delivery Details - {selectedDelivery.deliveryId}</h2>
                            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Complete delivery information based on Hezzni mobile app</p>
                        </div>

                        {/* Customer Info */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Customer Information</h3>
                        <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <img src={selectedDelivery.rider.avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white' }}>★ {selectedDelivery.rider.rating}</div>
                                </div>
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '1rem', rowGap: '0.5rem' }}>
                                    <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Full Name</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.rider.name}</div></div>
                                    <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Customer ID</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.rider.id}</div></div>
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Category</div><div style={{ fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Car size={14}/> {selectedDelivery.rider.category}</div></div>
                                    
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Email</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.rider.email}</div></div>
                                    <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Phone</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.rider.phone.replace(/\s/g, '')}</div></div>
                                    <div>
                                         <div style={{ display: 'flex', gap: '1rem' }}>
                                            <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>city</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.rider.city}</div></div>
                                            <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Gender</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>♂ {selectedDelivery.rider.gender}</div></div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Driver Info */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Driver Information</h3>
                         <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <img src={selectedDelivery.driver.avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white' }}>★ {selectedDelivery.driver.rating}</div>
                                </div>
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '1rem', rowGap: '0.5rem' }}>
                                    <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Name</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.driver.name}</div></div>
                                    <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Vehicle Type</div><div style={{ fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Car size={14}/> Taxi</div></div>
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Phone</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.driver.phone.replace(/\s/g, ' ')}</div></div>
                                    
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Email</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.driver.email}</div></div>
                                    <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Driver ID</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.driver.id}</div></div>
                                     <div>
                                         <div style={{ display: 'flex', gap: '1rem' }}>
                                            <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>city</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.driver.city}</div></div>
                                            <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Gender</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>♂ {selectedDelivery.driver.gender}</div></div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What are you sending */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>What are you sending?</div>
                            <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                                <span>{selectedDelivery.sendingDescription}</span>
                                <span style={{ color: '#9ca3af' }}>Weight: {selectedDelivery.weight}</span>
                            </div>
                        </div>

                        {/* Vehicle Info */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Vehicle Information</h3>
                         <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                 <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Vehicle</div><div style={{ fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Car size={14}/> {selectedDelivery.vehicleInfo.brand}</div></div>
                                 <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>License Plate</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.vehicleInfo.plate}</div></div>
                                 <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Transmission</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.vehicleInfo.transmission}</div></div>
                                 <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Make & Model</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.vehicleInfo.model}</div></div>

                                 <div>
                                     <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>On boarding date</div>
                                     <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>12 Mar 2026</div> {/* Hardcoded from screenshot or mock if desired */}
                                 </div>
                                 <div style={{ gridColumn: 'span 2' }}>
                                      <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Colour</div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>
                                          <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1px solid #ccc', backgroundColor: 'white' }}></div>
                                          {selectedDelivery.vehicleInfo.color}
                                      </div>
                                 </div>
                                  <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Year</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.vehicleInfo.year}</div></div>
                             </div>
                         </div>
                        
                        {/* Route Details */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Route Details</h3>
                        <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', border: '4px solid #dcfce7', backgroundColor: '#22c55e', flexShrink: 0 }}></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Pickup</div><div style={{ fontWeight: '600' }}>{selectedDelivery.pickup}</div></div>
                            </div>
                            
                            <div style={{ paddingLeft: 18 }}>
                                <div style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>⇅</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #22c55e', flexShrink: 0 }}></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Destination</div><div style={{ fontWeight: '600' }}>{selectedDelivery.destination}</div></div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Payment Information</h3>
                        <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={selectedDelivery.rider.avatar} alt="" style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {selectedDelivery.rider.rating}</div>
                                </div>
                             </div>

                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', textAlign: 'center' }}>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>TVA</div><div style={{ fontWeight: '600' }}>{selectedDelivery.tva}</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Service fee</div><div style={{ fontWeight: '600' }}>{selectedDelivery.serviceFee.toFixed(2)} MAD</div></div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Payment Method</div>
                                    <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                                        <div style={{ width: 24, height: 16, backgroundColor: '#ea580c', borderRadius: 2 }}></div>
                                    </div>
                                </div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Discount</div><div style={{ fontWeight: '600' }}>{selectedDelivery.discount}</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Total Amount</div><div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{selectedDelivery.fare.toFixed(2)} <span style={{ fontSize: '0.7rem', fontWeight: 'normal' }}>MAD</span></div></div>
                             </div>
                        </div>
                        
                        {/* Trip Summary */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Trip Summay</h3>
                        <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                             <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Start Time</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.startTime}</div></div>
                             <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>End Time</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.endTime}</div></div>
                             <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Distance</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.distance}</div></div>
                             <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Schedule Date</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.scheduleDate}</div></div>
                             <div><div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Schedule Time</div><div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{selectedDelivery.scheduleTime}</div></div>
                        </div>

                     </div>
                </div>
            )}
        </div>
    );
};
