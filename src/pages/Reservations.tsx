import { useState, useRef, useEffect } from 'react';
import { 
    Search, Eye, ArrowLeft, 
    Calendar, Check, ChevronDown, 
    ArrowUpRight, Car, Download
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
    category?: string; // For passenger, e.g. 'Taxi'
}

interface Reservation {
    id: string; // HZ646069
    customer: UserInfo;
    driver: UserInfo;
    serviceType: 'Airport' | 'Car Ride' | 'City to City' | 'Delivery';
    vehicleType: string; // Motorcycle, Reservation, Delivery, Taxi, Group Ride, Airport Ride
    status: 'Scheduled' | 'Accepted' | 'Pending' | 'Arriving' | 'Arrived' | 'Started' | 'In_progress' | 'Completed' | 'Missed';
    fare: number;
    currency: string;
    
    // Details for modal
    startTime: string;
    endTime: string;
    distance: string;
    scheduleDate: string; // 2024-10-15
    scheduleTime: string; // 14:30
    pickup: string;
    destination: string;
    paymentMethod: 'Mastercard' | 'Cash' | 'Visa';
    tva: string;
    serviceFee: number;
    discount: string;
    archivedDate?: string;
    archiveReason?: string;
}

// --- Icons & Helpers ---

const StatusBadge = ({ status }: { status: string }) => {
    let bg = '#e5e7eb';
    let color = '#374151';

    switch (status) {
        case 'Scheduled': bg = '#dbeafe'; color = '#1d4ed8'; break; // Blue
        case 'Accepted': bg = '#cffafe'; color = '#0e7490'; break; // Cyan
        case 'Pending': bg = '#fef3c7'; color = '#b45309'; break; // Yellow
        case 'Arriving': bg = '#e0f2fe'; color = '#0369a1'; break; // Light Blue
        case 'Arrived': bg = '#dcfce7'; color = '#15803d'; break; // Green
        case 'Started': bg = '#f3e8ff'; color = '#7e22ce'; break; // Purple
        case 'In_progress': bg = '#ede9fe'; color = '#6d28d9'; break; // Violet
        case 'Completed': bg = '#dcfce7'; color = '#15803d'; break; // Green
        case 'Missed': bg = '#fee2e2'; color = '#b91c1c'; break; // Red
    }

    return (
        <span style={{ backgroundColor: bg, color: color, padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>
            {status}
        </span>
    );
};

const ServiceBadge = ({ service }: { service: string }) => {
    let bg = '#f3f4f6';
    let color = '#374151';
    
    // Simple color logic based on screenshots
    if (service === 'Airport') { bg = '#dcfce7'; color = '#166534'; }
    else if (service === 'Car Ride') { bg = '#dcfce7'; color = '#166534'; }
    else if (service === 'City to City') { bg = '#dcfce7'; color = '#166534'; }
    else if (service === 'Delivery' || service === 'Deliverya') { bg = '#dcfce7'; color = '#166534'; }

    return (
        <span style={{ backgroundColor: bg, color: color, padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>
            {service}
        </span>
    );
}

// Reuse Dropdown
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

export const Reservations = () => {
    // States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('All');
    const [cityFilter, setCityFilter] = useState('All');
    
    const [activeStat, setActiveStat] = useState<string | null>(null); // 'Total', 'Scheduled', 'Confirmed', 'Today'
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

    // Mock Data
    const reservations: Reservation[] = [
        {
            id: 'HZ646069',
            customer: { name: 'Ahmed Hassan', id: 'R-00045', avatar: 'https://i.pravatar.cc/150?u=1', rating: 4.8, phone: '+212 6 12 34 56', email: 'ahmed@example.com', city: 'Casablanca', gender: 'Male', category: 'Taxi' },
            driver: { name: 'Youssef Ali', id: 'D-00045', avatar: 'https://i.pravatar.cc/150?u=5', rating: 4.8, phone: '+212 6 12 34 56', email: 'youssef@example.com', city: 'Casablanca', gender: 'Male' },
            serviceType: 'Airport',
            vehicleType: 'Motorcycle',
            status: 'Scheduled',
            fare: 610.50, currency: 'MAD',
            startTime: '14:30', endTime: '14:55', distance: '45km', scheduleDate: '2024-10-15', scheduleTime: '14:30',
            pickup: 'Current Location, Marrakech', destination: 'Menara Airport, Marrakech',
            paymentMethod: 'Mastercard', tva: '1%', serviceFee: 0.00, discount: '0%', archivedDate: '2025-01-15 00:00', archiveReason: 'Auto-archived after 3 months'
        },
        {
            id: 'HZ646068',
            customer: { name: 'Sara Ahmed', id: 'R-00046', avatar: 'https://i.pravatar.cc/150?u=2', rating: 4.9, phone: '+212 6 00 00 00', email: 'sara@example.com', city: 'Casablanca', gender: 'Female' },
            driver: { name: 'Youssef Ali', id: 'D-00046', avatar: 'https://i.pravatar.cc/150?u=6', rating: 4.9, phone: '+212 6 11 11 11', email: 'ali@example.com', city: 'Casablanca', gender: 'Male' },
            serviceType: 'Car Ride',
            vehicleType: 'Reservation',
            status: 'Accepted',
            fare: 610.50, currency: 'MAD',
            startTime: '10:00', endTime: '10:30', distance: '12km', scheduleDate: '2024-10-16', scheduleTime: '10:00',
            pickup: 'Hotel Royal, Casablanca', destination: 'Morocco Mall, Casablanca',
            paymentMethod: 'Cash', tva: '1%', serviceFee: 0.00, discount: '0%', archivedDate: '', archiveReason: ''
        },
        {
            id: 'HZ646067',
            customer: { name: 'Omar Fassi', id: 'R-00047', avatar: 'https://i.pravatar.cc/150?u=3', rating: 4.5, phone: '+212 6 33 33 33', email: 'omar@example.com', city: 'Rabat', gender: 'Male' },
            driver: { name: 'Karim Ben', id: 'D-00047', avatar: 'https://i.pravatar.cc/150?u=7', rating: 4.5, phone: '+212 6 44 44 44', email: 'karim@example.com', city: 'Rabat', gender: 'Male' },
            serviceType: 'City to City',
            vehicleType: 'Delivery',
            status: 'Pending',
            fare: 610.50, currency: 'MAD',
            startTime: '09:00', endTime: '11:00', distance: '90km', scheduleDate: '2024-10-17', scheduleTime: '09:00',
            pickup: 'Rabat Ville Station', destination: 'Casablanca Port',
            paymentMethod: 'Visa', tva: '1%', serviceFee: 10.00, discount: '5%', archivedDate: '', archiveReason: ''
        },
        {
            id: 'HZ646066',
            customer: { name: 'Laila Tazi', id: 'R-00048', avatar: 'https://i.pravatar.cc/150?u=4', rating: 4.2, phone: '+212 6 55 55 55', email: 'laila@example.com', city: 'Marrakech', gender: 'Female' },
            driver: { name: 'Samir Kabbaj', id: 'D-00048', avatar: 'https://i.pravatar.cc/150?u=8', rating: 4.7, phone: '+212 6 66 66 66', email: 'samir@example.com', city: 'Marrakech', gender: 'Male' },
            serviceType: 'Delivery',
            vehicleType: 'City to City',
            status: 'Arriving',
            fare: 610.50, currency: 'MAD',
            startTime: '16:00', endTime: '16:45', distance: '20km', scheduleDate: '2024-10-18', scheduleTime: '16:00',
            pickup: 'Jemaa el-Fnaa', destination: 'Majorelle Garden',
            paymentMethod: 'Cash', tva: '1%', serviceFee: 5.00, discount: '0%', archivedDate: '', archiveReason: ''
        },
        {
            id: 'HZ646065',
            customer: { name: 'Hassan Amrani', id: 'R-00049', avatar: 'https://i.pravatar.cc/150?u=9', rating: 4.6, phone: '+212 6 77 77 77', email: 'hassan@example.com', city: 'Casablanca', gender: 'Male' },
            driver: { name: 'Nadia Mansour', id: 'D-00049', avatar: 'https://i.pravatar.cc/150?u=10', rating: 5.0, phone: '+212 6 88 88 88', email: 'nadia@example.com', city: 'Casablanca', gender: 'Female' },
            serviceType: 'Airport',
            vehicleType: 'Taxi',
            status: 'Arrived',
            fare: 610.50, currency: 'MAD',
            startTime: '13:00', endTime: '13:30', distance: '15km', scheduleDate: '2024-10-19', scheduleTime: '13:00',
            pickup: 'Casa Voyageurs', destination: 'Ain Diab',
            paymentMethod: 'Mastercard', tva: '1%', serviceFee: 0.00, discount: '10%', archivedDate: '', archiveReason: ''
        },
        {
            id: 'HZ646068_dup',
            customer: { name: 'Youssef Ali', id: 'R-00045', avatar: 'https://i.pravatar.cc/150?u=1', rating: 4.8, phone: '+212 6 12 34 56', email: 'youssef@example.com', city: 'Casablanca', gender: 'Male' },
            driver: { name: 'Youssef Ali', id: 'D-00045', avatar: 'https://i.pravatar.cc/150?u=5', rating: 4.8, phone: '+212 6 12 34 56', email: 'ahmed@example.com', city: 'Casablanca', gender: 'Male' },
            serviceType: 'Car Ride',
            vehicleType: 'Group Ride',
            status: 'Started',
            fare: 610.50, currency: 'MAD',
            startTime: '18:00', endTime: '18:45', distance: '25km', scheduleDate: '2024-10-20', scheduleTime: '18:00',
            pickup: 'Technopolis', destination: 'Rabat Agdal',
            paymentMethod: 'Cash', tva: '1%', serviceFee: 0.00, discount: '0%', archivedDate: '', archiveReason: ''
        },
        {
            id: 'HZ646067_dup',
            customer: { name: 'Sara Ahmed', id: 'R-00046', avatar: 'https://i.pravatar.cc/150?u=2', rating: 4.9, phone: '+212 6 00 00 00', email: 'sara@example.com', city: 'Casablanca', gender: 'Female' },
            driver: { name: ' Ahmed Hassan', id: 'D-00045', avatar: 'https://i.pravatar.cc/150?u=5', rating: 4.8, phone: '+212 6 12 34 56', email: 'ahmed@example.com', city: 'Casablanca', gender: 'Male' },
            serviceType: 'City to City',
            vehicleType: 'Car Ride',
            status: 'In_progress',
            fare: 610.50, currency: 'MAD',
            startTime: '07:00', endTime: '09:00', distance: '120km', scheduleDate: '2024-10-21', scheduleTime: '07:00',
            pickup: 'Tangier', destination: 'Tetouan',
            paymentMethod: 'Visa', tva: '1%', serviceFee: 15.00, discount: '0%', archivedDate: '', archiveReason: ''
        },
        {
            id: 'HZ646066_dup',
            customer: { name: 'Youssef Ali', id: 'R-00045', avatar: 'https://i.pravatar.cc/150?u=1', rating: 4.8, phone: '+212 6 12 34 56', email: 'youssef@example.com', city: 'Casablanca', gender: 'Male' },
            driver: { name: 'Youssef Ali', id: 'D-00045', avatar: 'https://i.pravatar.cc/150?u=5', rating: 4.8, phone: '+212 6 12 34 56', email: 'ahmed@example.com', city: 'Casablanca', gender: 'Male' },
            serviceType: 'City to City',
            vehicleType: 'Airport Ride',
            status: 'Completed',
            fare: 610.50, currency: 'MAD',
            startTime: '14:30', endTime: '14:55', distance: '45km', scheduleDate: '2024-10-15', scheduleTime: '14:30',
            pickup: 'Current Location, Marrakech', destination: 'Current Location, Marrakech',
            paymentMethod: 'Mastercard', tva: '1%', serviceFee: 0.00, discount: '0%', archivedDate: '2025-01-15 00:00', archiveReason: 'Auto-archived after 3 months'
        },
        {
            id: 'HZ646065_dup',
            customer: { name: 'Youssef Ali', id: 'R-00045', avatar: 'https://i.pravatar.cc/150?u=1', rating: 4.8, phone: '+212 6 12 34 56', email: 'youssef@example.com', city: 'Casablanca', gender: 'Male' },
            driver: { name: 'Youssef Ali', id: 'D-00045', avatar: 'https://i.pravatar.cc/150?u=5', rating: 4.8, phone: '+212 6 12 34 56', email: 'ahmed@example.com', city: 'Casablanca', gender: 'Male' },
            serviceType: 'Airport',
            vehicleType: 'Taxi',
            status: 'Missed',
            fare: 610.50, currency: 'MAD',
            startTime: '10:00', endTime: '10:15', distance: '5km', scheduleDate: '2024-10-22', scheduleTime: '10:00',
            pickup: 'Hotel X', destination: 'City Center',
            paymentMethod: 'Cash', tva: '1%', serviceFee: 0.00, discount: '0%', archivedDate: '', archiveReason: ''
        },
    ];

    const uniqueCities = ['All', ...Array.from(new Set(reservations.map(r => r.customer.city)))];
    const uniqueServices = ['All', ...Array.from(new Set(reservations.map(r => r.serviceType)))];
    const uniqueStatuses = ['All', 'Scheduled', 'Accepted', 'Pending', 'Arriving', 'Arrived', 'Started', 'In_progress', 'Completed', 'Missed'];

    // Filtering
    const filteredReservations = reservations.filter(r => {
        const matchesSearch = r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              r.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              r.driver.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
        const matchesService = serviceFilter === 'All' || r.serviceType === serviceFilter;
        const matchesCity = cityFilter === 'All' || r.customer.city === cityFilter;
        
        let matchesStat = true;
        if (activeStat === 'Scheduled') matchesStat = r.status === 'Scheduled';
        else if (activeStat === 'Confirmed') matchesStat = r.status === 'Accepted' || r.status === 'Completed';
        else if (activeStat === 'Today') matchesStat = r.scheduleDate === '2024-10-15'; // Mocked "Today"

        return matchesSearch && matchesStatus && matchesService && matchesCity && matchesStat;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Reservations</h1>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage pre-scheduled rides and bookings</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <div 
                    onClick={() => setActiveStat(null)}
                    style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', 
                        backgroundColor: activeStat === null ? '#22c55e' : 'white', 
                        color: activeStat === null ? 'white' : 'black',
                        position: 'relative', 
                        boxShadow: activeStat === null ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px', cursor: 'pointer',
                        transition: 'all 0.2s', transform: activeStat === null ? 'translateY(-2px)' : 'none'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} color={activeStat === null ? 'white' : '#6b7280'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Total Reservations</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{reservations.length.toString().padStart(3, '0')}</div>
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeStat === null ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: activeStat === null ? '#22c55e' : 'white', display: 'flex' }}>
                        <ArrowUpRight size={16} /> 
                    </div>
                </div>

                <div 
                    onClick={() => setActiveStat('Scheduled')}
                    style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: activeStat === 'Scheduled' ? '#22c55e' : 'white', 
                        color: activeStat === 'Scheduled' ? 'white' : 'black',
                        position: 'relative', boxShadow: activeStat === 'Scheduled' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px', cursor: 'pointer', transition: 'all 0.2s',
                        transform: activeStat === 'Scheduled' ? 'translateY(-2px)' : 'none'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <Calendar size={20} color={activeStat === 'Scheduled' ? 'white' : '#6b7280'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Scheduled</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{reservations.filter(r => r.status === 'Scheduled').length.toString().padStart(3, '0')}</div>
                     <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeStat === 'Scheduled' ? 'white' : '#111827', borderRadius: '50%', padding: '0.4rem', color: activeStat === 'Scheduled' ? '#22c55e' : 'white', display: 'flex' }}>
                         <ArrowUpRight size={16} />
                    </div>
                </div>

                <div 
                    onClick={() => setActiveStat('Confirmed')}
                    style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: activeStat === 'Confirmed' ? '#22c55e' : 'white', 
                        color: activeStat === 'Confirmed' ? 'white' : 'black',
                        position: 'relative', boxShadow: activeStat === 'Confirmed' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px', cursor: 'pointer', transition: 'all 0.2s',
                        transform: activeStat === 'Confirmed' ? 'translateY(-2px)' : 'none'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={20} color={activeStat === 'Confirmed' ? 'white' : '#6b7280'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Confirmed</span>
                    </div>
                    {/* Mocking Confirmed as Accepted + Completed for demo */}
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{reservations.filter(r => r.status === 'Accepted' || r.status === 'Completed').length.toString().padStart(3, '0')}</div>
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeStat === 'Confirmed' ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: activeStat === 'Confirmed' ? '#22c55e' : 'white', display: 'flex' }}>
                       <ArrowUpRight size={16} />
                    </div>
                </div>

                <div 
                    onClick={() => setActiveStat('Today')}
                    style={{ 
                        padding: '1.5rem', borderRadius: '1.5rem', 
                        backgroundColor: activeStat === 'Today' ? '#22c55e' : 'white', 
                        color: activeStat === 'Today' ? 'white' : 'black',
                        position: 'relative', 
                        boxShadow: activeStat === 'Today' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px',
                        cursor: 'pointer', transition: 'all 0.2s', transform: activeStat === 'Today' ? 'translateY(-2px)' : 'none'
                    }}
                >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} color={activeStat === 'Today' ? 'white' : '#6b7280'} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Today's Bookings</span>
                    </div>
                    {/* Mock count for "Today" (matching 2024-10-15) */}
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{reservations.filter(r => r.scheduleDate === '2024-10-15').length.toString().padStart(3, '0')}</div> 
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeStat === 'Today' ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: activeStat === 'Today' ? '#22c55e' : 'white', display: 'flex' }}>
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
                <Dropdown label="Status" value={statusFilter} options={uniqueStatuses} onChange={setStatusFilter} />
                <Dropdown label="Services" value={serviceFilter} options={uniqueServices} onChange={setServiceFilter} />
                <Dropdown label="Dates" value={dateFilter} options={['All', 'Today', 'Tomorrow', 'This Week']} onChange={setDateFilter} />
                <Dropdown label="City" value={cityFilter} options={uniqueCities} onChange={setCityFilter} />
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                         <tr style={{ backgroundColor: '#22c55e', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', borderRadius: '1rem 0 0 0' }}>Reservation ID</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Customer</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Driver</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Service</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Vehicle</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Fare</th>
                            <th style={{ padding: '1rem', fontWeight: '600', borderRadius: '0 1rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.map((r, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: 'white' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{r.id}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ position: 'relative' }}>
                                             <img src={r.customer.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                             <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0 0.2rem', borderRadius: '0.2rem', fontSize: '0.6rem', color: 'white', whiteSpace: 'nowrap' }}>★{r.customer.rating}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{r.customer.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{r.customer.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                         <div style={{ position: 'relative' }}>
                                             <img src={r.driver.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                             <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0 0.2rem', borderRadius: '0.2rem', fontSize: '0.6rem', color: 'white', whiteSpace: 'nowrap' }}>★{r.driver.rating}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{r.driver.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{r.driver.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}><ServiceBadge service={r.serviceType} /></td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>
                                        {/* Simplified Icon logic */}
                                        <Car size={16} />
                                        {r.vehicleType}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}><StatusBadge status={r.status} /></td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                                    {r.fare.toFixed(2)} <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{r.currency}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <button 
                                        onClick={() => setSelectedReservation(r)}
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

            {/* Modal */}
            {selectedReservation && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div className="card" style={{ width: '600px', backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', maxHeight: '95vh', overflowY: 'auto', position: 'relative' }}>
                        {/* Modal Header */}
                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button onClick={() => setSelectedReservation(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={24} /></button>
                            <div>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>Reservation Details</h2>
                                <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>Information about this Reservation</p>
                            </div>
                        </div>

                        {/* Top Info Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                            <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Start Time</div><div style={{ fontWeight: '600' }}>{selectedReservation.startTime}</div></div>
                            <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>End Time</div><div style={{ fontWeight: '600' }}>{selectedReservation.endTime}</div></div>
                            <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Distance</div><div style={{ fontWeight: '600' }}>{selectedReservation.distance}</div></div>
                            <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Schedule Date</div><div style={{ fontWeight: '600' }}>{selectedReservation.scheduleDate}</div></div>
                            <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Schedule Time</div><div style={{ fontWeight: '600' }}>{selectedReservation.scheduleTime}</div></div>
                            <StatusBadge status={selectedReservation.status} />
                        </div>

                        {/* Passenger Info */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Passenger Information</h3>
                        <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={selectedReservation.customer.avatar} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white', whiteSpace: 'nowrap' }}>★ {selectedReservation.customer.rating}</div>
                                </div>
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.customer.name}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Customer ID</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.customer.id}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Category</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.customer.category || 'N/A'}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Gender</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.customer.gender}</div></div>
                                    
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Email</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.customer.email}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Phone</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.customer.phone}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>City</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.customer.city}</div></div>
                                </div>
                            </div>
                        </div>

                        {/* Driver Info */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Driver Information</h3>
                        <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                 <div style={{ position: 'relative' }}>
                                    <img src={selectedReservation.driver.avatar} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white', whiteSpace: 'nowrap' }}>★ {selectedReservation.driver.rating}</div>
                                </div>
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.driver.name}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Vehicle Type</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.vehicleType}</div></div>
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Phone</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.driver.phone}</div></div>
                                    
                                    <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Email</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.driver.email}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Driver ID</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.driver.id}</div></div>
                                    <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>City</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.driver.city}</div></div>
                                </div>
                            </div>
                        </div>

                         {/* Vehicle Info */}
                         <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Vehicle Information</h3>
                         <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Driver ID</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedReservation.driver.id}</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Vehicle Colour</div><div style={{ fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: 10, height: 10, background: 'white', borderRadius: '50%', border: '1px solid #ccc' }}></div> White</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Licence Plate Num</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>8 | i | 26363</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Make & Mode</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Dacia Logan</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Year</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>2020</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Join Date</div><div style={{ fontWeight: '600', fontSize: '0.9rem' }}>2023-01-15</div></div>
                            </div>
                         </div>
                        
                         {/* Pickup/Dest */}
                         <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }}></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Pickup</div><div style={{ fontWeight: '600' }}>{selectedReservation.pickup}</div></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #22c55e', flexShrink: 0 }}></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Destination</div><div style={{ fontWeight: '600' }}>{selectedReservation.destination}</div></div>
                            </div>
                         </div>

                        {/* Payment Info */}
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Payment Information</h3>
                        <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                             {/* Central Avatar */}
                             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={selectedReservation.customer.avatar} alt="" style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {selectedReservation.customer.rating}</div>
                                </div>
                             </div>

                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', textAlign: 'center' }}>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>TVA</div><div style={{ fontWeight: '600' }}>{selectedReservation.tva}</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Service fee</div><div style={{ fontWeight: '600' }}>{selectedReservation.serviceFee.toFixed(2)} {selectedReservation.currency}</div></div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Payment Method</div>
                                    <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                                        <div style={{ width: 20, height: 14, backgroundColor: '#ea580c', borderRadius: 2 }}></div> {/* Fake Mastercard */}
                                    </div>
                                </div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Discount</div><div style={{ fontWeight: '600' }}>{selectedReservation.discount}</div></div>
                                <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Total Amount</div><div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{selectedReservation.fare.toFixed(2)} <span style={{ fontSize: '0.7rem', fontWeight: 'normal' }}>{selectedReservation.currency}</span></div></div>
                             </div>
                        </div>

                         {/* Archive Info - Only show if archived */}
                         {/* Archive Information */}
                         <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Archive Information</h3>
                         <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
                                 <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Archived Date:</div><div style={{ fontWeight: '600' }}>{selectedReservation.archivedDate || 'N/A'}</div></div>
                                 <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Archive Reason:</div><div style={{ fontWeight: '600' }}>{selectedReservation.archiveReason || 'N/A'}</div></div>
                             </div>
                         </div>
                        
                         <button 
                            style={{ 
                                width: '100%', padding: '1rem', borderRadius: '2rem', backgroundColor: '#22c55e', color: 'white', 
                                border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' 
                            }}
                         >
                            <Download size={20} /> Download
                         </button>

                     </div>
                </div>
            )}
        </div>
    );
};
