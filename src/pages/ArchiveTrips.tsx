import { useState, useRef, useEffect } from 'react';
import { 
    Search, Eye, X, ArrowLeft, 
    MapPin, Car, Check, ChevronDown, Archive, 
    AlertCircle, DollarSign, Percent, ArrowUpRight
} from 'lucide-react';

interface Trip {
    id: string;
    serviceType: string;
    serviceColor: string;
    serviceTextColor: string;
    rider: {
        name: string;
        id: string;
        img: string;
        rating: number;
        email: string;
        phone: string;
        gender: string;
        category: string;
        city: string;
    };
    driver: {
        name: string;
        id: string;
        img: string;
        rating: number;
        phone: string;
        email: string;
        gender: string;
        city: string;
        driverId: string;
        vehicleType: string;
        vehicleColor: string;
        plateNumber: string;
        makeModel: string;
        year: string;
        joinDate: string;
    };
    vehicle: {
        type: string;
        icon: any;
    };
    time: string;
    duration: string;
    status: string;
    fare: string;
    paymentMethod: 'visa' | 'mastercard' | 'cash';
    
    // Detailed fields for modal
    startTime: string;
    endTime: string;
    distance: string;
    route: { from: string; to: string };
    payment: {
        tva: string;
        serviceFee: string;
        discount: string;
        total: string;
    };
    archiveInfo: {
        date: string;
        reason: string;
    };
}

export const ArchiveTrips = () => {
    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [cityFilter, setCityFilter] = useState('All');
    const [methodFilter, setMethodFilter] = useState('All');
    const [periodFilter, setPeriodFilter] = useState('All');
    const [activeStat, setActiveStat] = useState<string | null>(null);

    // Modal State
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    // Mock Data
    const trips: Trip[] = [
        {
            id: 'T-00123',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', img: 'https://i.pravatar.cc/150?u=12', rating: 4.8, email: 'ahmed.hassan@gmail.com', phone: '+212 6 12 34 56', gender: 'Male', category: 'Taxi', city: 'Casablanca' },
            driver: { name: 'Youssef Ali', id: 'C-00001', img: 'https://i.pravatar.cc/150?u=23', rating: 4.8, phone: '+212 6 12 34 56', email: 'youssef@gmail.com', gender: 'Male', city: 'Casablanca', driverId: 'D-00045', vehicleType: 'Taxi', vehicleColor: 'White', plateNumber: '8 | I | 26363', makeModel: 'Dacia Logan', year: '2020', joinDate: '2023-01-15' },
            vehicle: { type: 'Motorcycle', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Searching',
            fare: '45.50 MAD',
            paymentMethod: 'visa',
            startTime: '14:30',
            endTime: '14:55',
            distance: '45km',
            route: { from: 'Current Location, Marrakech', to: 'Current Location, Marrakech' },
            payment: { tva: '1%', serviceFee: '0.00 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00124',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Sarah Mohamed', id: 'R-00046', img: 'https://i.pravatar.cc/150?u=15', rating: 4.9, email: 'sarah@gmail.com', phone: '+212 6 00 00 00', gender: 'Female', category: 'Standard', city: 'Rabat' },
            driver: { name: 'Karim Ben', id: 'C-00002', img: 'https://i.pravatar.cc/150?u=33', rating: 4.7, phone: '+212 6 11 11 11', email: 'karim@gmail.com', gender: 'Male', city: 'Rabat', driverId: 'D-00050', vehicleType: 'Moto', vehicleColor: 'Black', plateNumber: '12 | A | 11111', makeModel: 'Honda SH', year: '2021', joinDate: '2023-02-10' },
            vehicle: { type: 'Motorcycle', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Accepted',
            fare: '45.50 MAD',
            paymentMethod: 'mastercard',
            startTime: '14:30',
            endTime: '14:55',
            distance: '15km',
            route: { from: 'Rabat Agdal', to: 'Medina' },
            payment: { tva: '1%', serviceFee: '2.00 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00125',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Omar Little', id: 'R-00047', img: 'https://i.pravatar.cc/150?u=99', rating: 4.5, email: 'omar@gmail.com', phone: '+212 6 22 22 22', gender: 'Male', category: 'Lux', city: 'Tangier' },
            driver: { name: 'Nadia Fassi', id: 'C-00003', img: 'https://i.pravatar.cc/150?u=44', rating: 4.9, phone: '+212 6 33 33 33', email: 'nadia@gmail.com', gender: 'Female', city: 'Tangier', driverId: 'D-00060', vehicleType: 'Car', vehicleColor: 'Red', plateNumber: '34 | B | 33333', makeModel: 'Toyota Corolla', year: '2022', joinDate: '2023-03-05' },
            vehicle: { type: 'Car', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Arriving',
            fare: '45.50 MAD',
            paymentMethod: 'visa',
            startTime: '14:30',
            endTime: '14:55',
            distance: '8km',
            route: { from: 'Tangier Port', to: 'City Center' },
            payment: { tva: '1%', serviceFee: '5.00 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00126',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Laila Alami', id: 'R-00048', img: 'https://i.pravatar.cc/150?u=55', rating: 4.8, email: 'laila@gmail.com', phone: '+212 6 44 44 44', gender: 'Female', category: 'Standard', city: 'Fes' },
            driver: { name: 'Hassan Amrani', id: 'C-00004', img: 'https://i.pravatar.cc/150?u=66', rating: 4.6, phone: '+212 6 55 55 55', email: 'hassan@gmail.com', gender: 'Male', city: 'Fes', driverId: 'D-00070', vehicleType: 'Taxi', vehicleColor: 'Yellow', plateNumber: '56 | D | 55555', makeModel: 'Fiat Uno', year: '2019', joinDate: '2023-04-12' },
            vehicle: { type: 'Motorcycle', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Arrived',
            fare: '45.50 MAD',
            paymentMethod: 'cash',
            startTime: '14:30',
            endTime: '14:55',
            distance: '10km',
            route: { from: 'Fes Medina', to: 'Train Station' },
            payment: { tva: '1%', serviceFee: '1.00 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00127',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Khalid Ben', id: 'R-00049', img: 'https://i.pravatar.cc/150?u=77', rating: 4.6, email: 'khalid@gmail.com', phone: '+212 6 66 66 66', gender: 'Male', category: 'Hezzni XL', city: 'Agadir' },
            driver: { name: 'Mina Tazi', id: 'C-00005', img: 'https://i.pravatar.cc/150?u=88', rating: 4.8, phone: '+212 6 77 77 77', email: 'mina@gmail.com', gender: 'Female', city: 'Agadir', driverId: 'D-00080', vehicleType: 'Van', vehicleColor: 'Silver', plateNumber: '78 | E | 77777', makeModel: 'Mercedes Vito', year: '2023', joinDate: '2023-05-20' },
            vehicle: { type: 'Taxi', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Started',
            fare: '45.50 MAD',
            paymentMethod: 'visa',
            startTime: '14:30',
            endTime: '14:55',
            distance: '20km',
            route: { from: 'Agadir Breach', to: 'Airport' },
            payment: { tva: '1%', serviceFee: '3.00 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00128',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Samira Zaki', id: 'R-00050', img: 'https://i.pravatar.cc/150?u=21', rating: 4.9, email: 'samira@gmail.com', phone: '+212 6 88 88 88', gender: 'Female', category: 'Standard', city: 'Oujda' },
            driver: { name: 'Rachid El', id: 'C-00006', img: 'https://i.pravatar.cc/150?u=10', rating: 4.5, phone: '+212 6 99 99 99', email: 'rachid@gmail.com', gender: 'Male', city: 'Oujda', driverId: 'D-00090', vehicleType: 'Moto', vehicleColor: 'Blue', plateNumber: '90 | F | 99999', makeModel: 'Yamaha TMAX', year: '2022', joinDate: '2023-06-15' },
            vehicle: { type: 'Motorcycle', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'In_progress',
            fare: '45.50 MAD',
            paymentMethod: 'mastercard',
            startTime: '14:30',
            endTime: '14:55',
            distance: '12km',
            route: { from: 'Oujda Center', to: 'University' },
            payment: { tva: '1%', serviceFee: '0.50 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00129',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Yassir Bakkali', id: 'R-00051', img: 'https://i.pravatar.cc/150?u=34', rating: 4.7, email: 'yassir@gmail.com', phone: '+212 6 10 10 10', gender: 'Male', category: 'Lux', city: 'Meknes' },
            driver: { name: 'Sofia Rami', id: 'C-00007', img: 'https://i.pravatar.cc/150?u=56', rating: 4.8, phone: '+212 6 20 20 20', email: 'sofia@gmail.com', gender: 'Female', city: 'Meknes', driverId: 'D-00100', vehicleType: 'Car', vehicleColor: 'Black', plateNumber: '45 | G | 45454', makeModel: 'Audi A4', year: '2021', joinDate: '2023-07-01' },
            vehicle: { type: 'Taxi', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Completed',
            fare: '45.50 MAD',
            paymentMethod: 'visa',
            startTime: '14:30',
            endTime: '14:55',
            distance: '5km',
            route: { from: 'Meknes Ville', to: 'Lahdim Square' },
            payment: { tva: '1%', serviceFee: '4.00 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00130',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Adam Nour', id: 'R-00052', img: 'https://i.pravatar.cc/150?u=78', rating: 4.4, email: 'adam@gmail.com', phone: '+212 6 30 30 30', gender: 'Male', category: 'Standard', city: 'Kenitra' },
            driver: { name: 'Zineb Daoudi', id: 'C-00008', img: 'https://i.pravatar.cc/150?u=90', rating: 4.7, phone: '+212 6 40 40 40', email: 'zineb@gmail.com', gender: 'Female', city: 'Kenitra', driverId: 'D-00110', vehicleType: 'Taxi', vehicleColor: 'White', plateNumber: '67 | H | 67676', makeModel: 'Dacia Sandero', year: '2022', joinDate: '2023-08-10' },
            vehicle: { type: 'Motorcycle', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Cancelled',
            fare: '45.50 MAD',
            paymentMethod: 'mastercard',
            startTime: '14:30',
            endTime: '14:55',
            distance: '10km',
            route: { from: 'Kenitra Center', to: 'Mehdia' },
            payment: { tva: '1%', serviceFee: '0.00 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00131',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Hicham Idrissi', id: 'R-00053', img: 'https://i.pravatar.cc/150?u=19', rating: 4.8, email: 'hicham@gmail.com', phone: '+212 6 50 50 50', gender: 'Male', category: 'Standard', city: 'Tetouan' },
            driver: { name: 'Leila Mansouri', id: 'C-00009', img: 'https://i.pravatar.cc/150?u=28', rating: 4.6, phone: '+212 6 60 60 60', email: 'leila@gmail.com', gender: 'Female', city: 'Tetouan', driverId: 'D-00120', vehicleType: 'Moto', vehicleColor: 'Red', plateNumber: '23 | I | 23232', makeModel: 'Sym Symphony', year: '2020', joinDate: '2023-09-05' },
            vehicle: { type: 'Taxi', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Completed',
            fare: '45.50 MAD',
            paymentMethod: 'visa',
            startTime: '14:30',
            endTime: '14:55',
            distance: '15km',
            route: { from: 'Tetouan Center', to: 'Martil' },
            payment: { tva: '1%', serviceFee: '2.50 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        },
        {
            id: 'T-00132',
            serviceType: 'Regular Ride',
            serviceColor: '#dcfce7',
            serviceTextColor: '#166534',
            rider: { name: 'Nora Bel', id: 'R-00054', img: 'https://i.pravatar.cc/150?u=37', rating: 4.9, email: 'nora@gmail.com', phone: '+212 6 70 70 70', gender: 'Female', category: 'Lux', city: 'Safi' },
            driver: { name: 'Ali Kabbaj', id: 'C-00010', img: 'https://i.pravatar.cc/150?u=48', rating: 4.7, phone: '+212 6 80 80 80', email: 'ali@gmail.com', gender: 'Male', city: 'Safi', driverId: 'D-00130', vehicleType: 'Car', vehicleColor: 'Grey', plateNumber: '89 | J | 89898', makeModel: 'Ford Focus', year: '2018', joinDate: '2023-10-12' },
            vehicle: { type: 'Motorcycle', icon: Car },
            time: '14:30',
            duration: '25 min',
            status: 'Cancelled',
            fare: '45.50 MAD',
            paymentMethod: 'mastercard',
            startTime: '14:30',
            endTime: '14:55',
            distance: '5km',
            route: { from: 'Safi Port', to: 'Medina' },
            payment: { tva: '1%', serviceFee: '1.50 MAD', discount: '0%', total: '45.50 MAD' },
            archiveInfo: { date: '2025-01-15 00:00', reason: 'Auto-archived after 3 months' }
        }
    ];

    const stats = [
        { id: 'total', label: 'Total Archived', value: '01', icon: Archive, activeColor: '#22c55e' },
        { id: 'completed', label: 'Completed', value: '01', icon: Check, activeColor: '#22c55e' },
        { id: 'cancelled', label: 'Cancelled', value: '01', icon: X, activeColor: '#22c55e' },
        { id: 'disputed', label: 'Disputed', value: '01', icon: AlertCircle, activeColor: '#22c55e' },
    ];

    const uniqueCities = ['All', ...Array.from(new Set(trips.map(t => t.rider.city)))];
    const uniqueServices = ['All', ...Array.from(new Set(trips.map(t => t.serviceType)))];
    const uniqueMethods = ['All', 'Visa', 'Mastercard', 'Cash'];
    const uniqueStatuses = ['All', 'Searching', 'Accepted', 'Arriving', 'Arrived', 'Started', 'In_progress', 'Completed', 'Cancelled'];

    // Filter Logic
    const filteredTrips = trips.filter(trip => {
        const matchesSearch = trip.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              trip.rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              trip.driver.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || trip.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesService = serviceFilter === 'All' || trip.serviceType === serviceFilter;
        const matchesCity = cityFilter === 'All' || trip.rider.city === cityFilter;
        const matchesMethod = methodFilter === 'All' || trip.paymentMethod.toLowerCase() === methodFilter.toLowerCase();
        
        // Stat Card Filtering integration
        if (activeStat === 'completed' && trip.status !== 'Completed') return false;
        if (activeStat === 'cancelled' && trip.status !== 'Cancelled') return false;
        if (activeStat === 'disputed' && trip.status !== 'Disputed') return false; // assuming Disputed status exists or logic needed

        return matchesSearch && matchesStatus && matchesService && matchesCity && matchesMethod;
    });

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {        
            case 'completed': return { bg: '#dcfce7', text: '#166534' };
            case 'cancelled': return { bg: '#fee2e2', text: '#dc2626' };
            case 'in_progress':
            case 'started': return { bg: '#f3e8ff', text: '#7e22ce' };
            case 'arrived': return { bg: '#dcfce7', text: '#166534' }; // Assuming green for arrived
            case 'accepted': return { bg: '#dcfce7', text: '#166534' }; // Assuming green for accepted
            case 'arriving':
            case 'searching': return { bg: '#eff6ff', text: '#1e40af' };
            default: return { bg: '#f3f4f6', text: '#374151' };
        }
    };

    const getPaymentIcon = (method: string) => {
        if (method === 'visa') return <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#1d4ed8', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0 4px' }}>VISA</div>;
        if (method === 'mastercard') return <div style={{ display: 'flex' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', marginLeft: '-4px' }}></div></div>;
        return <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#166534' }}>Cash</div>;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Archive Trips</h1>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor all trip types across Hezzni's transportation services</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                {stats.map((stat) => {
                    const isActive = activeStat === stat.id;
                    return (
                        <div 
                            key={stat.id}
                            onClick={() => setActiveStat(isActive ? null : stat.id)}
                            style={{ 
                                padding: '1.5rem', 
                                borderRadius: '1.5rem', 
                                backgroundColor: isActive ? '#22c55e' : 'white', 
                                color: isActive ? 'white' : 'var(--text-primary)', 
                                position: 'relative', 
                                boxShadow: isActive ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                transform: isActive ? 'translateY(-2px)' : 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '140px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <stat.icon size={20} color={isActive ? 'white' : '#6b7280'} />
                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.value}</div>
                            <div style={{ alignSelf: 'flex-end', backgroundColor: isActive ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.4rem', color: isActive ? '#22c55e' : 'white', display: 'flex' }}>
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    );
                })}
                 <div style={{ padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={20} color="#6b7280" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Revenue</span>
                    </div>
                    <div>
                         <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>610.50</div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>MAD</div>
                    </div>
                     <div style={{ alignSelf: 'flex-end', backgroundColor: '#22c55e', borderRadius: '50%', padding: '0.4rem', color: 'white', display: 'flex' }}>
                         <ArrowUpRight size={16} />
                     </div>
                </div>
                 <div style={{ padding: '1.5rem', borderRadius: '1.5rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Percent size={20} color="#6b7280" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Commission</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>5%</div>
                     <div style={{ alignSelf: 'flex-end', backgroundColor: '#22c55e', borderRadius: '50%', padding: '0.4rem', color: 'white', display: 'flex' }}>
                         <ArrowUpRight size={16} />
                     </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
                 <Dropdown label="Service Type" value={serviceFilter} options={uniqueServices} onChange={setServiceFilter} />
                 <Dropdown label="City" value={cityFilter} options={uniqueCities} onChange={setCityFilter} />
                 <Dropdown label="Method" value={methodFilter} options={uniqueMethods} onChange={setMethodFilter} />
                 <Dropdown label="Periods" value={periodFilter} options={['All', 'Today', 'This Week', 'This Month']} onChange={setPeriodFilter} />
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#22c55e', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', borderRadius: '1rem 0 0 0' }}>Trip ID</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Service</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Rider</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Driver</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Vehicle</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Time</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Fare</th>
                            <th style={{ padding: '1rem', fontWeight: '600', borderRadius: '0 1rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrips.map((trip, idx) => (
                             <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: 'white' }}>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>{trip.id}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ backgroundColor: trip.serviceColor, color: trip.serviceTextColor, padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.85rem' }}>{trip.serviceType}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <img src={trip.rider.img} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{trip.rider.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{trip.rider.id}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#fbbf24', marginTop: '0.2rem' }}>★ {trip.rider.rating}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <img src={trip.driver.img} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{trip.driver.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{trip.driver.id}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#fbbf24', marginTop: '0.2rem' }}>★ {trip.driver.rating}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                                        <Car size={16} /> {trip.vehicle.type}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '600' }}>{trip.time}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{trip.duration}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                     <span style={{ ...getStatusStyle(trip.status), padding: '0.3rem 0.8rem', borderRadius: '0.3rem', fontSize: '0.85rem', fontWeight: '500' }}>{trip.status}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '600' }}>{trip.fare}</div>
                                    <div style={{ marginTop: '0.2rem' }}>{getPaymentIcon(trip.paymentMethod)}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                     <button 
                                        onClick={() => setSelectedTrip(trip)}
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

            {/* Detail Modal */}
            {selectedTrip && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <div className="card" style={{ width: '550px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', borderRadius: '1.5rem', position: 'relative', backgroundColor: '#fdfdfd' }}>
                          {/* Header */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <button 
                                    onClick={() => setSelectedTrip(null)} 
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'black' }}
                                >
                                    <ArrowLeft size={24} strokeWidth={2.5} />
                                </button>
                                <div>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>Archived Trip Details - {selectedTrip.id}</h2>
                                    <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem' }}>Information about this service assignment</p>
                                </div>
                            </div>

                            {/* Status Bar */}
                             <div style={{ backgroundColor: 'white', padding: '1rem 1.5rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                                 <div>
                                     <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Start Time</div>
                                     <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{selectedTrip.startTime}</div>
                                 </div>
                                 <div>
                                     <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>End Time</div>
                                     <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{selectedTrip.endTime}</div>
                                 </div>
                                 <div>
                                     <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Distance</div>
                                     <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{selectedTrip.distance}</div>
                                 </div>
                                 <span style={{ ...getStatusStyle(selectedTrip.status), padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>{selectedTrip.status}</span>
                            </div>

                             {/* Passenger Information */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Passenger Information</h3>
                                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ position: 'relative' }}>
                                            <img src={selectedTrip.rider.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                                            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {selectedTrip.rider.rating}</div>
                                            </div>
                                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'min-content 1fr', columnGap: '2rem', rowGap: '0.5rem' }}>
                                                <div style={{ whiteSpace: 'nowrap' }}>
                                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{selectedTrip.rider.name}</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Customer ID</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{selectedTrip.rider.id}</div>
                                                </div>
                                            </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Category</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.rider.category}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Gender</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>♂ {selectedTrip.rider.gender}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Email</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem', wordBreak: 'break-all' }}>{selectedTrip.rider.email}</div>
                                        </div>
                                            <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Phone</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.rider.phone}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>City</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.rider.city}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Driver Information */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Driver Information</h3>
                                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ position: 'relative' }}>
                                            <img src={selectedTrip.driver.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                                            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {selectedTrip.driver.rating}</div>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name</div>
                                                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{selectedTrip.driver.name}</div>
                                                </div>
                                            </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Vehicle Type</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                                <Car size={16} /> {selectedTrip.driver.vehicleType}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Phone</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.phone}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Email</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem', wordBreak: 'break-all' }}>{selectedTrip.driver.email}</div>
                                        </div>
                                            <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Driver ID</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.driverId}</div>
                                        </div>
                                            <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>City</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.city}</div>
                                        </div>
                                            <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Gender</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>♂ {selectedTrip.driver.gender}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Information */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Vehicle Information</h3>
                                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                                            <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Driver ID</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.driverId}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Vehicle Colour</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedTrip.driver.vehicleColor.toLowerCase(), border: '1px solid #e5e7eb' }}></span> {selectedTrip.driver.vehicleColor}
                                            </div>
                                        </div>
                                            <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Licence Plate Num</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.plateNumber}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Year</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.year}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Join Date</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.joinDate}</div>
                                        </div>
                                            <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Make & Mode</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{selectedTrip.driver.makeModel}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Route Information */}
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span> Pickup
                                        </div>
                                        <div style={{ fontWeight: '600', fontSize: '1rem', marginLeft: '1rem' }}>{selectedTrip.route.from}</div>
                                    </div>
                                    
                                    {/* Connector */}
                                    <div style={{ position: 'absolute', left: '3px', top: '20px', bottom: '20px', width: '2px', backgroundColor: '#e5e7eb', zIndex: 0 }}></div>
                                    <div style={{ position: 'absolute', left: '-12px', top: '45%', backgroundColor: 'white', borderRadius: '50%', padding: '4px', border: '1px solid #e5e7eb', zIndex: 1 }}>
                                        <ArrowUpRight size={14} color="#22c55e" />
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                            <MapPin size={12} color="#22c55e" /> Destination
                                        </div>
                                        <div style={{ fontWeight: '600', fontSize: '1rem', marginLeft: '1rem' }}>{selectedTrip.route.to}</div>
                                    </div>
                                </div>
                            </div>

                             {/* Payment Information */}
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Payment Information</h3>
                                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', marginBottom: '1.5rem' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <img src={selectedTrip.driver.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                                                <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'black', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {selectedTrip.driver.rating}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', textAlign: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>TVA</div>
                                            <div style={{ fontWeight: 'bold' }}>{selectedTrip.payment.tva}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Service fee</div>
                                            <div style={{ fontWeight: 'bold' }}>{selectedTrip.payment.serviceFee}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Payment Method</div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b', marginLeft: '-5px' }}></div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Discount</div>
                                            <div style={{ fontWeight: 'bold' }}>{selectedTrip.payment.discount}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Total Amount</div>
                                            <div style={{ fontWeight: 'bold' }}>{selectedTrip.payment.total}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                             {/* Archive Information */}
                             <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Archive Information</h3>
                                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Archived Date:</div>
                                            <div style={{ fontWeight: '600' }}>{selectedTrip.archiveInfo.date}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Archive Reason:</div>
                                            <div style={{ fontWeight: '600' }}>{selectedTrip.archiveInfo.reason}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer / Download */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button 
                                    style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '1rem 3rem', borderRadius: '2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', width: '100%' }}
                                >
                                    Download
                                </button>
                            </div>
                     </div>
                </div>
            )}
        </div>
    );
};

// Reusable Dropdown Component
interface DropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange: (val: string) => void;
}

const Dropdown = ({ label, value, options, onChange }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    padding: '0.7rem 1.5rem', 
                    borderRadius: '2rem', 
                    border: '1px solid #e5e7eb', 
                    backgroundColor: 'white', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    fontSize: '0.9rem',
                    minWidth: '120px',
                    justifyContent: 'space-between'
                }}
            >
                <span style={{ color: value === 'All' ? '#6b7280' : 'black' }}>{value === 'All' ? label : value}</span>
                <ChevronDown size={14} color="#9ca3af" />
            </button>
            
            {isOpen && (
                <div style={{ position: 'absolute', top: '120%', left: 0, minWidth: '100%', width: 'max-content', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '0.5rem', zIndex: 50, border: '1px solid #f3f4f6' }}>
                    {options.map((opt) => (
                        <div 
                           key={opt}
                           onClick={() => { onChange(opt); setIsOpen(false); }}
                           style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '0.5rem', backgroundColor: value === opt ? '#f0fdf4' : 'transparent', color: value === opt ? '#166534' : 'inherit' }}
                        >
                            {opt}
                            {value === opt && <Check size={14} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
