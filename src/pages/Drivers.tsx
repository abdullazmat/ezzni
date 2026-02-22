import { useState, useRef, useEffect } from 'react';
import { 
    Search, Eye, ArrowLeft, 
    ArrowUpRight, 
    Filter, ChevronDown,
    Star, Plus
} from 'lucide-react';

// Vehicle Icons
import carIcon from '../assets/icons/car.png';
import taxiIcon from '../assets/icons/taxi.png';
import bikeIcon from '../assets/icons/bike.png';


import { ChangeCategoryModal, RidePreferencesModal, SuspendDriverModal, TripSummaryModal } from './DriverModals';
// We'll mock the chart if library not installed, or use simple div bars

// --- Types ---

interface Driver {
    id: string; // C-00001
    driverId: string; // D-00045, used in modal
    name: string; // Livia Carder
    email: string;
    phone: string;
    avatar: string;
    rating: number;
    location: string; // Casablanca-Settat
    
    vehicleType: 'Motorcycle' | 'Car' | 'Taxi';
    vehicleDetails: {
        brand: string; // Hezzni Standard
        color: string; // White
        plate: string; // 8 | A | 26363
        model: string; // Dacia Logan
        year: string;
    };
    
    totalTrips: number;
    status: 'Active' | 'Suspended';
    suspension?: {
        reason: string;
        until: string;
    };
    
    joinDate: string;
    documentStatus: 'Verified' | 'Pending' | 'Rejected';
    
    city: string; // Anakra (from screenshot)
    region: string; // Casablanca-Settat
    
    stats: {
        cancelationRate: string; // 15%
        acceptanceRate: string; // 10%
        onlineTime: string; // 89h 38m
    };
}



// --- Mock Data ---

const mockDrivers: Driver[] = [
    { id: 'C-00001', driverId: 'D-00045', name: 'Livia Carder', email: 'livia@email.com', phone: '+212 6 12 34 56 78', avatar: 'https://i.pravatar.cc/150?u=100', rating: 4.8, location: 'Casablanca-Settat', vehicleType: 'Car', vehicleDetails: { brand: 'Hezzni Standard', color: 'White', plate: '8 | I | 26363', model: 'Dacia Logan', year: '2020' }, totalTrips: 748, status: 'Active', joinDate: '2023-01-15', documentStatus: 'Verified', city: 'Casablanca', region: 'Casablanca-Settat', stats: { cancelationRate: '15%', acceptanceRate: '90%', onlineTime: '89h 38m' } },
    { id: 'C-00002', driverId: 'D-00046', name: 'Adison Westervelt', email: 'adison@email.com', phone: '+212 6 22 44 66 88', avatar: 'https://i.pravatar.cc/150?u=101', rating: 4.5, location: 'Casablanca-Settat', vehicleType: 'Motorcycle', vehicleDetails: { brand: 'Hezzni Moto', color: 'Black', plate: '3 | M | 44521', model: 'Honda CB500', year: '2022' }, totalTrips: 312, status: 'Suspended', suspension: { reason: 'Multiple customer complaints about reckless driving', until: '2025-02-15' }, joinDate: '2023-05-20', documentStatus: 'Verified', city: 'Casablanca', region: 'Casablanca-Settat', stats: { cancelationRate: '25%', acceptanceRate: '65%', onlineTime: '45h 12m' } },
    { id: 'C-00003', driverId: 'D-00047', name: 'Abram Vaccaro', email: 'abram@email.com', phone: '+212 6 33 55 77 99', avatar: 'https://i.pravatar.cc/150?u=102', rating: 4.9, location: 'Rabat-Salé', vehicleType: 'Car', vehicleDetails: { brand: 'Hezzni Comfort', color: 'Silver', plate: '12 | R | 78901', model: 'Toyota Corolla', year: '2023' }, totalTrips: 1024, status: 'Active', joinDate: '2022-08-10', documentStatus: 'Verified', city: 'Rabat', region: 'Rabat-Salé', stats: { cancelationRate: '5%', acceptanceRate: '95%', onlineTime: '120h 15m' } },
    { id: 'C-00004', driverId: 'D-00048', name: 'Chance Vetrovs', email: 'chance@email.com', phone: '+212 6 44 66 88 00', avatar: 'https://i.pravatar.cc/150?u=103', rating: 4.2, location: 'Marrakech-Safi', vehicleType: 'Motorcycle', vehicleDetails: { brand: 'Hezzni Moto', color: 'Red', plate: '7 | K | 55432', model: 'Yamaha MT-07', year: '2021' }, totalTrips: 156, status: 'Suspended', suspension: { reason: 'Failed document verification', until: '2025-03-01' }, joinDate: '2024-01-05', documentStatus: 'Pending', city: 'Marrakech', region: 'Marrakech-Safi', stats: { cancelationRate: '30%', acceptanceRate: '55%', onlineTime: '22h 45m' } },
    { id: 'C-00005', driverId: 'D-00049', name: 'Leo Rosser', email: 'leo@email.com', phone: '+212 6 55 77 99 11', avatar: 'https://i.pravatar.cc/150?u=104', rating: 4.7, location: 'Casablanca-Settat', vehicleType: 'Taxi', vehicleDetails: { brand: 'Hezzni Taxi', color: 'White', plate: '5 | T | 99887', model: 'Fiat Tipo', year: '2019' }, totalTrips: 2103, status: 'Active', joinDate: '2021-11-20', documentStatus: 'Verified', city: 'Anakra', region: 'Casablanca-Settat', stats: { cancelationRate: '8%', acceptanceRate: '92%', onlineTime: '200h 30m' } },
    { id: 'C-00006', driverId: 'D-00050', name: 'Desirae Schleifer', email: 'desirae@email.com', phone: '+212 6 66 88 00 22', avatar: 'https://i.pravatar.cc/150?u=105', rating: 4.6, location: 'Rabat-Salé', vehicleType: 'Motorcycle', vehicleDetails: { brand: 'Hezzni Moto', color: 'Blue', plate: '9 | S | 33210', model: 'Suzuki GSX', year: '2022' }, totalTrips: 467, status: 'Active', joinDate: '2023-09-15', documentStatus: 'Verified', city: 'Rabat', region: 'Rabat-Salé', stats: { cancelationRate: '12%', acceptanceRate: '82%', onlineTime: '67h 50m' } },
    { id: 'C-00007', driverId: 'D-00051', name: 'Omar Benali', email: 'omar@email.com', phone: '+212 6 77 99 11 33', avatar: 'https://i.pravatar.cc/150?u=106', rating: 4.4, location: 'Marrakech-Safi', vehicleType: 'Car', vehicleDetails: { brand: 'Hezzni XL', color: 'Black', plate: '15 | M | 12345', model: 'Renault Kadjar', year: '2021' }, totalTrips: 890, status: 'Active', joinDate: '2022-03-25', documentStatus: 'Verified', city: 'Marrakech', region: 'Marrakech-Safi', stats: { cancelationRate: '10%', acceptanceRate: '88%', onlineTime: '145h 20m' } },
    { id: 'C-00008', driverId: 'D-00052', name: 'Fatima Zahra', email: 'fatima@email.com', phone: '+212 6 88 00 22 44', avatar: 'https://i.pravatar.cc/150?u=107', rating: 4.9, location: 'Casablanca-Settat', vehicleType: 'Taxi', vehicleDetails: { brand: 'Hezzni Taxi', color: 'Red', plate: '2 | C | 67890', model: 'Peugeot 301', year: '2020' }, totalTrips: 1567, status: 'Active', joinDate: '2022-06-10', documentStatus: 'Verified', city: 'Casablanca', region: 'Casablanca-Settat', stats: { cancelationRate: '3%', acceptanceRate: '97%', onlineTime: '180h 10m' } },
    { id: 'C-00009', driverId: 'D-00053', name: 'Youssef Amrani', email: 'youssef@email.com', phone: '+212 6 99 11 33 55', avatar: 'https://i.pravatar.cc/150?u=108', rating: 3.9, location: 'Rabat-Salé', vehicleType: 'Car', vehicleDetails: { brand: 'Hezzni Standard', color: 'Grey', plate: '11 | R | 54321', model: 'Hyundai i10', year: '2018' }, totalTrips: 234, status: 'Active', joinDate: '2024-02-01', documentStatus: 'Pending', city: 'Rabat', region: 'Rabat-Salé', stats: { cancelationRate: '20%', acceptanceRate: '70%', onlineTime: '30h 45m' } },
    { id: 'C-00010', driverId: 'D-00054', name: 'Sara Mouline', email: 'sara@email.com', phone: '+212 6 10 32 54 76', avatar: 'https://i.pravatar.cc/150?u=109', rating: 4.3, location: 'Marrakech-Safi', vehicleType: 'Motorcycle', vehicleDetails: { brand: 'Hezzni Moto', color: 'Green', plate: '6 | K | 11223', model: 'KTM Duke 390', year: '2023' }, totalTrips: 89, status: 'Active', joinDate: '2024-06-15', documentStatus: 'Verified', city: 'Marrakech', region: 'Marrakech-Safi', stats: { cancelationRate: '18%', acceptanceRate: '75%', onlineTime: '15h 30m' } },
    { id: 'C-00011', driverId: 'D-00055', name: 'Khalid Benjelloun', email: 'khalid@email.com', phone: '+212 6 20 42 64 86', avatar: 'https://i.pravatar.cc/150?u=110', rating: 4.1, location: 'Casablanca-Settat', vehicleType: 'Taxi', vehicleDetails: { brand: 'Hezzni Taxi', color: 'White', plate: '4 | C | 98765', model: 'Dacia Logan', year: '2017' }, totalTrips: 3210, status: 'Active', joinDate: '2020-09-01', documentStatus: 'Verified', city: 'Anakra', region: 'Casablanca-Settat', stats: { cancelationRate: '7%', acceptanceRate: '93%', onlineTime: '310h 20m' } },
    { id: 'C-00012', driverId: 'D-00056', name: 'Nadia El Fassi', email: 'nadia@email.com', phone: '+212 6 30 52 74 96', avatar: 'https://i.pravatar.cc/150?u=111', rating: 4.7, location: 'Rabat-Salé', vehicleType: 'Car', vehicleDetails: { brand: 'Hezzni Comfort', color: 'Blue', plate: '14 | R | 45678', model: 'VW Golf', year: '2022' }, totalTrips: 645, status: 'Active', joinDate: '2023-03-20', documentStatus: 'Verified', city: 'Rabat', region: 'Rabat-Salé', stats: { cancelationRate: '6%', acceptanceRate: '91%', onlineTime: '95h 15m' } },
];


// --- Helper Components ---

const StatusBadge = ({ status }: { status: string }) => {
    const isSuspended = status === 'Suspended';
    return (
        <span style={{ 
            backgroundColor: isSuspended ? '#fee2e2' : '#eef7f0', 
            color: isSuspended ? '#ef4444' : '#2d8a46', 
            padding: '0.4rem 1rem', 
            borderRadius: '0.5rem', 
            fontSize: '0.8rem', 
            fontWeight: '600', 
            display: 'inline-block',
            minWidth: '90px',
            textAlign: 'center'
        }}>
            {status}
        </span>
    );
};

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
                backgroundColor: hovered ? '#f3f4f6' : isActive ? '#eef7f0' : 'transparent',
                color: isActive ? '#2d8a46' : '#374151',
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

    // Close dropdown when clicking outside
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
                    padding: '0.6rem 1rem', borderRadius: '2rem', 
                    border: activeValue !== 'All' ? '1px solid #38AC57' : '1px solid #e5e7eb', 
                    backgroundColor: activeValue !== 'All' ? '#eef7f0' : 'white', 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', 
                    fontSize: '0.85rem', 
                    color: activeValue !== 'All' ? '#2d8a46' : '#374151', 
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    width: '100%',
                    justifyContent: 'space-between'
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

// --- Sub-Modals ---

const EarningsModalContent = () => {
    const [activePeriod, setActivePeriod] = useState('Monthly');
    
    const earningsData: Record<string, { total: string; bars: number[]; highlight: number; highlightVal: string; onlineTime: string; trips: string }> = {
        'Today': { total: '312.50 MAD', bars: [0,0,0,0,0,0,0,0,40,60,80,30], highlight: 10, highlightVal: '80.00', onlineTime: '6h 12m', trips: '3' },
        'Weekly': { total: '2,145.30 MAD', bars: [30,50,70,40,60,80,45,0,0,0,0,0], highlight: 5, highlightVal: '512.30', onlineTime: '32h 15m', trips: '8' },
        'Monthly': { total: '9,411.91 MAD', bars: [20,40,60,45,25,55,30,15,60,90,20,55], highlight: 9, highlightVal: '1,101.44', onlineTime: '89h 38m', trips: '14' },
    };

    const data = earningsData[activePeriod];

    return (
        <div className="dr-modal-inner" style={{ padding: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Earnings</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#f3f4f6', borderRadius: '0.8rem', padding: '0.35rem', margin: '1.5rem 0', gap: '0.25rem' }}>
                {['Today', 'Weekly', 'Monthly'].map(period => (
                    <button key={period} onClick={() => setActivePeriod(period)} style={{ flex: 1, padding: '0.6rem 0.4rem', borderRadius: '0.6rem', border: 'none', backgroundColor: activePeriod === period ? 'white' : 'transparent', fontWeight: '700', fontSize: '0.85rem', color: activePeriod === period ? '#38AC57' : '#6b7280', cursor: 'pointer', boxShadow: activePeriod === period ? '0 2px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s', whiteSpace: 'nowrap', minWidth: '80px' }}>
                        {period}
                    </button>
                ))}
            </div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1.5rem' }}>
                 <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Earnings</div>
                 <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '2rem' }}>{data.total}</div>
                 
                 {/* Simple Custom Bar Chart Mock */}
                 <div className="dr-chart-container">
                     <div className="dr-chart-inner">
                         {data.bars.map((h, i) => (
                             <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                                  <div style={{ width: '12px', height: `${h}%`, backgroundColor: i === data.highlight ? '#38AC57' : '#bbf7d0', borderRadius: '20px', position: 'relative', transition: 'height 0.4s ease' }}>
                                     {i === data.highlight && (
                                         <div style={{ 
                                             position: 'absolute', top: '-35px', left: '50%', transform: 'translateX(-50%)', 
                                             backgroundColor: 'black', color: 'white', padding: '0.4rem 0.6rem', borderRadius: '0.5rem', 
                                             fontSize: '0.75rem', whiteSpace: 'nowrap', fontWeight: 'bold', zIndex: 10,
                                             boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                         }}>
                                             {data.highlightVal}
                                         </div>
                                     )}
                                  </div>
                                  <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: '500' }}>{['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][i]}</div>
                             </div>
                         ))}
                     </div>
                 </div>
            </div>

            <div className="dr-edit-grid" style={{ marginTop: '1.5rem' }}>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Online Time</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{data.onlineTime}</div>
                </div>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Total Trips</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{data.trips}</div>
                </div>
            </div>
        </div>
    );
};

const TripsHistoryModalContent = ({ onViewTripSummary }: { onViewTripSummary: (tripIndex: number) => void }) => {
    const [activeTab, setActiveTab] = useState('All');

    const allTrips = [
        { id: 0, name: 'Ahmed Hassan', date: '3 Jun, 2025 at 12:00 PM', rating: 5.0, status: 'Completed', fare: '24 MAD' },
        { id: 1, name: 'Sara Bennani', date: '2 Jun, 2025 at 3:30 PM', rating: 4.5, status: 'Cancelled', fare: '0 MAD' },
        { id: 2, name: 'Youssef Alami', date: '1 Jun, 2025 at 9:15 AM', rating: 5.0, status: 'Completed', fare: '74 MAD' },
    ];

    const filteredTrips = allTrips.filter(trip => {
        if (activeTab === 'All') return true;
        return trip.status === activeTab;
    });

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Trips History</h2>
            <p style={{ color: '#6b7280' }}>Review the trip history</p>

            <div className="dr-flex-responsive" style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div><div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Start Time</div><div style={{ fontWeight: '600' }}>14:30</div></div>
                <div><div style={{ fontSize: '0.8rem', color: '#6b7280' }}>End Time</div><div style={{ fontWeight: '600' }}>14:55</div></div>
            </div>

            <div style={{ display: 'flex', backgroundColor: '#f9fafb', borderRadius: '0.5rem', padding: '0.3rem', marginBottom: '1.5rem' }}>
                {['All', 'Completed', 'Cancelled'].map(tab => (
                     <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.3rem', border: 'none', backgroundColor: activeTab === tab ? 'white' : 'transparent', fontWeight: '600', cursor: 'pointer', boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
                        {tab}
                     </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                {filteredTrips.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>No {activeTab.toLowerCase()} trips found.</div>
                )}
                {filteredTrips.map((trip) => (
                    <div key={trip.id} onClick={() => onViewTripSummary(trip.id)} style={{ border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }} onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#38AC57'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb'; }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                             <div style={{ display: 'flex', gap: '0.5rem' }}>
                                 {Array(5).fill(0).map((_, j) => <Star key={j} size={14} fill={j < Math.floor(trip.rating) ? '#fbbf24' : '#e5e7eb'} stroke="none" />)}
                                 <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{trip.rating}</span>
                             </div>
                             <span style={{ backgroundColor: trip.status === 'Cancelled' ? '#fee2e2' : '#38AC57', color: trip.status === 'Cancelled' ? '#b91c1c' : 'white', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: 'bold' }}>
                                {trip.status}
                             </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                 <img src={`https://i.pravatar.cc/150?u=${trip.id + 10}`} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                 <div>
                                     <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{trip.name}</div>
                                     <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{trip.date}</div>
                                 </div>
                             </div>
                             <div style={{ border: '1px solid #e5e7eb', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                 {trip.fare}
                             </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#38AC5720', border: '3px solid #38AC57' }}></div>
                                <div>
                                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>From</div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Current Location, Marrakech</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                 <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #38AC57' }}></div>
                                 <div>
                                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>To</div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Current Location, Marrakech</div>
                                 </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
// --- Edit Driver Modal Content ---

const EditDriverModalContent = ({ driver, onSave }: { driver: Driver, onSave: () => void }) => {
    const [formData, setFormData] = useState({
        name: driver.name,
        phone: driver.phone,
        email: driver.email,
        region: driver.region,
        city: driver.city,
        vehicleColor: driver.vehicleDetails.color,
        plateNumber: driver.vehicleDetails.plate,
        makeModel: driver.vehicleDetails.model,
        year: driver.vehicleDetails.year,
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        outline: 'none',
        fontSize: '0.9rem',
        fontFamily: 'inherit',
        color: '#1f2937',
        backgroundColor: '#f9fafb',
        boxSizing: 'border-box' as const,
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.8rem',
        color: '#6b7280',
        marginBottom: '0.3rem',
        fontWeight: '600' as const,
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Edit Driver</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Update driver profile information</p>

            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Personal Information</h3>
            <div className="dr-edit-grid" style={{ marginBottom: '1.5rem' }}>
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
                        style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                        value={formData.region}
                        onChange={(e) => handleChange('region', e.target.value)}
                    >
                        <option>Casablanca-Settat</option>
                        <option>Rabat-Salé</option>
                        <option>Marrakech-Safi</option>
                        <option>Fès-Meknès</option>
                        <option>Tanger-Tétouan</option>
                    </select>
                </div>
                <div>
                    <label style={labelStyle}>City</label>
                    <select
                        style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                    >
                        <option>Anakra</option>
                        <option>Casablanca</option>
                        <option>Rabat</option>
                        <option>Marrakech</option>
                        <option>Fès</option>
                    </select>
                </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Vehicle Information</h3>
            <div className="dr-edit-grid" style={{ marginBottom: '2rem' }}>
                <div>
                    <label style={labelStyle}>Vehicle Colour</label>
                    <input style={inputStyle} value={formData.vehicleColor} onChange={(e) => handleChange('vehicleColor', e.target.value)} />
                </div>
                <div>
                    <label style={labelStyle}>Licence Plate Number</label>
                    <input style={inputStyle} value={formData.plateNumber} onChange={(e) => handleChange('plateNumber', e.target.value)} />
                </div>
                <div>
                    <label style={labelStyle}>Make & Model</label>
                    <input style={inputStyle} value={formData.makeModel} onChange={(e) => handleChange('makeModel', e.target.value)} />
                </div>
                <div>
                    <label style={labelStyle}>Year</label>
                    <input style={inputStyle} value={formData.year} onChange={(e) => handleChange('year', e.target.value)} />
                </div>
            </div>

            <button
                onClick={() => {
                    // In a real app, you'd save formData to backend here
                    alert('Driver information updated successfully!');
                    onSave();
                }}
                style={{
                    width: '100%', padding: '1rem', borderRadius: '2rem', border: 'none',
                    backgroundColor: '#38AC57', color: 'white', fontWeight: 'bold', fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                Save Changes
            </button>
        </div>
    );
};

// --- Main Page Component ---

export const Drivers = () => {
    // Top Level State
    const [activeStat, setActiveStat] = useState('Rental Company');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filters
    const [statusFilter, setStatusFilter] = useState('All'); 
    const [regionFilter, setRegionFilter] = useState('All');
    const [cityFilter, setCityFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    
    // Modal State
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [modalSubView, setModalSubView] = useState<'Details' | 'Earnings' | 'History' | 'Edit'>('Details');

    // Sub-modal states
    const [showChangeCategoryModal, setShowChangeCategoryModal] = useState(false);
    const [showRidePreferencesModal, setShowRidePreferencesModal] = useState(false);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [showTripSummaryModal, setShowTripSummaryModal] = useState(false);
    const [selectedTripIndex, setSelectedTripIndex] = useState<number | null>(null);

    // Track if filters panel is shown
    const [showFilters, setShowFilters] = useState(true);

    // Count of active filters
    const activeFilterCount = [statusFilter, regionFilter, cityFilter, categoryFilter].filter(f => f !== 'All').length;

    const clearAllFilters = () => {
        setStatusFilter('All');
        setRegionFilter('All');
        setCityFilter('All');
        setCategoryFilter('All');
        setSearchTerm('');
    };

    const filteredDrivers = mockDrivers.filter(driver => {
        // Search — match against name, ID, driverId, email, or phone
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const matchesSearch = 
                driver.name.toLowerCase().includes(term) ||
                driver.id.toLowerCase().includes(term) ||
                driver.driverId.toLowerCase().includes(term) ||
                driver.email.toLowerCase().includes(term) ||
                driver.phone.includes(term);
            if (!matchesSearch) return false;
        }
        
        // Stats Filter — vehicle type category cards
        if (activeStat === 'Taxi Drivers' && driver.vehicleType !== 'Taxi') return false;
        if (activeStat === 'Motorcycle Drivers' && driver.vehicleType !== 'Motorcycle') return false;
        if (activeStat === 'Car Drivers' && driver.vehicleType !== 'Car') return false;
        
        // Dropdown Filters
        if (statusFilter !== 'All' && driver.status !== statusFilter) return false;
        if (regionFilter !== 'All' && driver.region !== regionFilter) return false;
        if (cityFilter !== 'All' && driver.city !== cityFilter) return false;
        if (categoryFilter !== 'All' && driver.vehicleDetails.brand !== categoryFilter) return false;
        
        return true;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
            <style>{`
                .dr-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                }
                .dr-controls-container {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    align-items: center;
                }
                .dr-table-container {
                    width: 100%;
                    overflow-x: auto;
                    border-radius: 1rem;
                    background: transparent;
                }
                .dr-table-header {
                    display: grid;
                    grid-template-columns: 1fr 2fr 2fr 1.5fr 1fr 1fr 1fr;
                    background-color: #38AC57;
                    color: white;
                    padding: 1rem;
                    border-radius: 1rem;
                    align-items: center;
                    font-weight: bold;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    min-width: 1000px;
                }
                .dr-table-row {
                    display: grid;
                    grid-template-columns: 1fr 2fr 2fr 1.5fr 1fr 1fr 1fr;
                    background-color: white;
                    padding: 1rem;
                    border-radius: 1rem;
                    align-items: center;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                    min-width: 1000px;
                }

                .dr-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0,0,0,0.5);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    backdrop-filter: blur(4px);
                }
                .dr-modal-content {
                    width: 850px;
                    max-width: 100%;
                    background-color: white;
                    border-radius: 2rem;
                    padding: 0;
                    max-height: 95vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
                .dr-info-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1.8fr 1.2fr 1fr;
                    gap: 1.5rem;
                }
                .dr-vehicle-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1.2fr 1.2fr;
                    gap: 1.5rem;
                }
                .dr-footer-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: space-between;
                    align-items: center;
                }
                .dr-flex-responsive {
                    display: flex;
                    gap: 1.5rem;
                }
                .dr-edit-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                @media (max-width: 1024px) {
                    .dr-stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .dr-info-grid, .dr-vehicle-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .dr-modal-content {
                        padding: 0;
                    }
                    .dr-modal-inner {
                        padding: 1.5rem !important;
                    }
                    .dr-controls-container {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .dr-controls-container > div {
                        width: 100% !important;
                    }
                    .dr-flex-responsive {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    .dr-info-grid, .dr-vehicle-grid, .dr-edit-grid {
                        grid-template-columns: 1fr;
                    }
                    .dr-footer-actions {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .dr-header-actions {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .dr-stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .dr-chart-container {
                    width: 100%;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                }
                .dr-chart-inner {
                    min-width: 500px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    height: 200px;
                    gap: 10px;
                }
            `}</style>
            
            {/* Header Area */}
            <div className="dr-header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Driver</h1>
                    <p style={{ color: '#6b7280', margin: 0 }}>Manage driver accounts and generate IDs by vehicle type</p>
                </div>
                <button onClick={() => alert('Add New Driver form coming soon!')} style={{ backgroundColor: '#38AC57', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}>
                    <Plus size={20} /> Add New Drivers
                </button>
            </div>

            {/* Stats Cards */}
            <div className="dr-stats-grid">
                {[
                    { label: 'Taxi Drivers', count: String(mockDrivers.filter(d => d.vehicleType === 'Taxi').length).padStart(4, '0'), icon: taxiIcon, activeName: 'Taxi Drivers' },
                    { label: 'Motorcycle Drivers', count: String(mockDrivers.filter(d => d.vehicleType === 'Motorcycle').length).padStart(4, '0'), icon: bikeIcon, activeName: 'Motorcycle Drivers' },
                    { label: 'Car Drivers', count: String(mockDrivers.filter(d => d.vehicleType === 'Car').length).padStart(4, '0'), icon: carIcon, activeName: 'Car Drivers' },
                    { label: 'Rental Company', count: String(mockDrivers.length).padStart(4, '0'), icon: carIcon, activeName: 'Rental Company' },
                ].map((stat) => {
                    const isActive = activeStat === stat.activeName;
                    return (
                        <div 
                            key={stat.activeName}
                            onClick={() => setActiveStat(isActive ? 'Rental Company' : stat.activeName)}
                            style={{ 
                                padding: '1.5rem', borderRadius: '1.5rem', 
                                backgroundColor: isActive ? '#38AC57' : 'white', 
                                color: isActive ? 'white' : 'black',
                                position: 'relative', 
                                boxShadow: isActive ? '0 10px 15px -3px rgba(56, 172, 87, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)', 
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '140px', cursor: 'pointer',
                                transition: 'all 0.2s', transform: isActive ? 'translateY(-2px)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{color: isActive ? 'white' : '#6b7280'}}>
                                    <img src={stat.icon} alt="" style={{ height: '32px', width: 'auto', objectFit: 'contain', filter: isActive ? 'brightness(0) invert(1)' : 'none' }} />
                                </div>
                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.count}</div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                 <span style={{ fontSize: '0.7rem', textDecoration: 'underline', cursor: 'pointer' }}>View Details</span>
                                 <div style={{ backgroundColor: isActive ? 'white' : '#38AC57', borderRadius: '50%', padding: '0.4rem', color: isActive ? '#38AC57' : 'white', display: 'flex' }}>
                                    <ArrowUpRight size={16} /> 
                                </div>
                             </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="dr-controls-container">
                     <div style={{ position: 'relative', width: '250px', flexShrink: 0 }}>
                        <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                        <input 
                            type="text" 
                            placeholder="Search drivers..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '2rem', border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.85rem', color: '#1f2937', backgroundColor: 'white', boxSizing: 'border-box' }} 
                        />
                    </div>
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ 
                            padding: '0.6rem 1.2rem', borderRadius: '2rem', 
                            border: activeFilterCount > 0 ? '1px solid #38AC57' : '1px solid #e5e7eb', 
                            backgroundColor: activeFilterCount > 0 ? '#eef7f0' : showFilters ? '#f3f4f6' : 'white', 
                            display: 'flex', alignItems: 'center', gap: '0.5rem', 
                            fontSize: '0.85rem', color: activeFilterCount > 0 ? '#2d8a46' : '#374151', 
                            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                            transition: 'all 0.2s'
                        }}
                    >
                        <Filter size={14} /> Filters
                        {activeFilterCount > 0 && (
                            <span style={{ backgroundColor: '#38AC57', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                    {showFilters && (
                        <>
                            <Dropdown label="Status" options={['Active', 'Suspended']} activeValue={statusFilter} onSelect={setStatusFilter} />
                            <Dropdown label="Regions" options={['Casablanca-Settat', 'Rabat-Salé', 'Marrakech-Safi']} activeValue={regionFilter} onSelect={setRegionFilter} />
                            <Dropdown label="City" options={['Anakra', 'Casablanca', 'Rabat', 'Marrakech']} activeValue={cityFilter} onSelect={setCityFilter} />
                            <Dropdown label="Category" options={['Hezzni Standard', 'Hezzni Comfort', 'Hezzni XL', 'Hezzni Moto', 'Hezzni Taxi']} activeValue={categoryFilter} onSelect={setCategoryFilter} />
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
                {activeFilterCount > 0 && (
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        Showing <strong style={{ color: '#1f2937' }}>{filteredDrivers.length}</strong> of <strong style={{ color: '#1f2937' }}>{mockDrivers.length}</strong> drivers
                    </div>
                )}
            </div>

            {/* Table */}
            <div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Driver Management Overview</h2>
                 </div>
                 <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Manage driver accounts and generate IDs by vehicle type</p>

                 <div className="dr-table-container">
                    {/* Header */}
                    <div className="dr-table-header">
                        <div>Driver ID</div>
                        <div>Driver</div>
                        <div>Contact</div>
                        <div>Vehicle</div>
                        <div style={{ textAlign: 'center' }}>Total Trips</div>
                        <div style={{ textAlign: 'center' }}>Status</div>
                        <div style={{ textAlign: 'center' }}>Action</div>
                    </div>

                    {/* Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                         {filteredDrivers.length === 0 ? (
                             <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '1rem', textAlign: 'center' }}>
                                 <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                                 <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>No drivers found</h3>
                                 <p style={{ color: '#6b7280', margin: '0 0 1rem 0' }}>Try adjusting your search or filter criteria</p>
                                 <button onClick={clearAllFilters} style={{ padding: '0.6rem 1.5rem', borderRadius: '2rem', border: 'none', backgroundColor: '#38AC57', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                                     Clear Filters
                                 </button>
                             </div>
                         ) : filteredDrivers.map((driver, idx) => (
                             <div key={idx} className="dr-table-row">
                                 <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{driver.id}</div> 
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                     <div style={{ position: 'relative' }}>
                                         <img src={driver.avatar} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                                         <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'black', color: 'white', fontSize: '0.6rem', padding: '0 0.2rem', borderRadius: '0.2rem', display: 'flex', gap: '2px' }}>
                                             <span>★</span> {driver.rating}
                                         </div>
                                     </div>
                                     <div>
                                         <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{driver.name}</div>
                                         <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{driver.location}</div>
                                     </div>
                                 </div>
                                 <div>
                                     <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{driver.phone}</div>
                                     <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{driver.email}</div>
                                 </div>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>
                                     {driver.vehicleType === 'Car' ? <img src={carIcon} alt="" style={{ height: '20px', width: 'auto' }} /> : 
                                      driver.vehicleType === 'Taxi' ? <img src={taxiIcon} alt="" style={{ height: '20px', width: 'auto' }} /> : 
                                      <img src={bikeIcon} alt="" style={{ height: '20px', width: 'auto' }} />}
                                     {driver.vehicleType}
                                 </div>
                                 <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1rem' }}>{driver.totalTrips}</div>
                                 <div style={{ textAlign: 'center' }}>
                                      <StatusBadge status={driver.status} />
                                 </div>
                                 <div style={{ textAlign: 'center' }}>
                                     <button 
                                         onClick={() => { setSelectedDriver(driver); setModalSubView('Details'); }}
                                         style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '2rem', padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}
                                     >
                                         <Eye size={14} /> Preview
                                     </button>
                                 </div>
                             </div>
                         ))}
                    </div>
                 </div>
            </div>

            {/* Main Modal */}
            {selectedDriver && (
                <div className="dr-modal-overlay" onClick={() => setSelectedDriver(null)}>
                    <div className="dr-modal-content" onClick={e => e.stopPropagation()}>
                        {/* Modal Navigation/Header */}
                        <div className="dr-modal-inner" style={{ padding: '2rem 2rem 1rem 2rem' }}>
                            <button onClick={modalSubView === 'Details' ? () => setSelectedDriver(null) : () => setModalSubView('Details')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '1rem' }}>
                                <ArrowLeft size={24} />
                            </button>
                            
                            {modalSubView === 'Details' && (
                                <>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>Driver Details</h2>
                                    <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Driver profile information</p>
                                    
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>Driver Information</h3>
                                    
                                    <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem' }}>
                                        <div className="dr-flex-responsive">
                                            <div style={{ flexShrink: 0, position: 'relative' }}>
                                                <img src={selectedDriver.avatar} style={{ width: 64, height: 64, borderRadius: '50%' }} />
                                                <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0 0.4rem', borderRadius: '0.3rem', fontSize: '0.7rem', fontWeight: 'bold' }}>★ {selectedDriver.rating}</div>
                                            </div>
                                            <div className="dr-info-grid" style={{ flex: 1 }}>
                                                 <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name</div><div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedDriver.name}</div></div>
                                                 <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Region</div><div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedDriver.region}</div></div>
                                                 <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>City</div><div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedDriver.city}</div></div>
                                                 <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Total Trips</div><div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>256</div></div>
                                                 
                                                 <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Address</div><div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>783 Brant St Settat ON L7R 2J2</div></div>
                                                 <div style={{ gridColumn: 'span 1' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Phone</div><div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedDriver.phone.split(' ').slice(0,4).join(' ')}</div></div>
                                                 <div style={{ gridColumn: 'span 1' }}>
                                                     <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Current Status</div>
                                                     <StatusBadge status={selectedDriver.status} />
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>Vehicle Information</h3>
                                    <div style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem' }}>
                                        <div className="dr-vehicle-grid">
                                             <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Driver ID</div><div style={{ fontWeight: 'bold' }}>{selectedDriver.driverId}</div></div>
                                             <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Vehicle Colour</div><div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{width:10,height:10,borderRadius:'50%',border:'1px solid #ccc', backgroundColor: selectedDriver.vehicleDetails.color}}></div> {selectedDriver.vehicleDetails.color}</div></div>
                                             <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Licence Plate Num</div><div style={{ fontWeight: 'bold' }}>{selectedDriver.vehicleDetails.plate}</div></div>
                                             <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Make & Mode</div><div style={{ fontWeight: 'bold' }}>{selectedDriver.vehicleDetails.model}</div></div>
                                             
                                             <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Vehicle Type</div><div style={{ fontWeight: 'bold', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                                                 {selectedDriver.vehicleType === 'Car' ? <img src={carIcon} alt="" style={{ height: '32px', width: 'auto' }} /> : 
                                                  selectedDriver.vehicleType === 'Taxi' ? <img src={taxiIcon} alt="" style={{ height: '32px', width: 'auto' }} /> : 
                                                  <img src={bikeIcon} alt="" style={{ height: '32px', width: 'auto' }} />} 
                                                 {selectedDriver.vehicleDetails.brand}
                                             </div></div>
                                             <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Year</div><div style={{ fontWeight: 'bold' }}>{selectedDriver.vehicleDetails.year}</div></div>
                                        </div>
                                    </div>

                                    <div className="dr-flex-responsive" style={{ backgroundColor: '#eef7f0', borderRadius: '1rem', padding: '1.5rem', marginTop: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <div style={{ textAlign: 'inherit' }}>
                                              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Hezzni Service Category</h3>
                                              <div style={{ fontSize: '0.8rem', color: '#2d8a46', marginBottom: '0.5rem' }}>Current Category:</div>
                                              <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'inherit' }}>
                                                  {selectedDriver.vehicleType === 'Car' ? <img src={carIcon} alt="" style={{ height: '20px', width: 'auto' }} /> : 
                                                   selectedDriver.vehicleType === 'Taxi' ? <img src={taxiIcon} alt="" style={{ height: '20px', width: 'auto' }} /> : 
                                                   <img src={bikeIcon} alt="" style={{ height: '20px', width: 'auto' }} />} 
                                                  {selectedDriver.vehicleType === 'Car' ? 'Car' : 'Hezzni Standard'}
                                              </div>
                                          </div>
                                          <div style={{ textAlign: 'right' }}>
                                              <button onClick={() => { if (selectedDriver.vehicleType === 'Motorcycle') { setShowRidePreferencesModal(true); } else { setShowChangeCategoryModal(true); } }} style={{ backgroundColor: 'white', border: '1px solid #38AC57', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '0.5rem' }}>Change Category</button>
                                              <div style={{ fontSize: '0.7rem', color: '#2d8a46', maxWidth: '200px' }}>Category determines pricing and service level for this driver</div>
                                          </div>
                                    </div>

                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>Account Information</h3>
                                    <div className="dr-flex-responsive" style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem', gap: '4rem' }}>
                                         <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Join Date</div><div style={{ fontWeight: 'bold' }}>{selectedDriver.joinDate}</div></div>
                                         <div><div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Document Status</div><div style={{ fontWeight: 'bold' }}>{selectedDriver.documentStatus}</div></div>
                                    </div>
                                    
                                    {selectedDriver.status === 'Suspended' && (
                                        <div style={{ backgroundColor: '#fee2e2', borderRadius: '1rem', padding: '1.5rem', marginTop: '1.5rem' }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#7f1d1d', margin: '0 0 0.5rem 0' }}>Suspension Details</h3>
                                            <div style={{ fontSize: '0.85rem', color: '#7f1d1d' }}>
                                                <span style={{ fontWeight: 'bold' }}>Reason:</span> {selectedDriver.suspension?.reason} 
                                                <span style={{ marginLeft: '1rem', fontWeight: 'bold' }}>Suspended Until:</span> {selectedDriver.suspension?.until}
                                            </div>
                                        </div>
                                    )}

                                    <div className="dr-edit-grid" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                         <div>
                                             <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{selectedDriver.stats.cancelationRate}</div>
                                             <div style={{ fontSize: '0.9rem' }}>Cancelation Rate</div>
                                         </div>
                                         <div>
                                             <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{selectedDriver.stats.acceptanceRate}</div>
                                             <div style={{ fontSize: '0.9rem' }}>Acceptance Rate</div>
                                         </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="dr-footer-actions">
                                        <button onClick={() => setModalSubView('Edit')} style={{ flex: 1, padding: '0.8rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Edit</button>
                                        <button onClick={() => setModalSubView('Earnings')} style={{ flex: 1, padding: '0.8rem', borderRadius: '2rem', border: 'none', backgroundColor: 'black', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Earning</button>
                                        <button onClick={() => setModalSubView('History')} style={{ flex: 1, padding: '0.8rem', borderRadius: '2rem', border: 'none', backgroundColor: '#38AC57', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Trips history</button>
                                        <button onClick={() => { if (selectedDriver.status !== 'Suspended') { setShowSuspendModal(true); } else { /* Unsuspend logic - could toggle status in a real app */ alert('Driver has been unsuspended.'); } }} style={{ flex: 1, padding: '0.8rem', borderRadius: '2rem', border: 'none', backgroundColor: '#b91c1c', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>{selectedDriver.status === 'Suspended' ? 'Unsuspend Driver' : 'Suspend Driver'}</button>
                                    </div>
                                </>
                            )}
                            
                            {modalSubView === 'Earnings' && <EarningsModalContent />}
                            
                            {modalSubView === 'History' && <TripsHistoryModalContent onViewTripSummary={(tripIdx) => { setSelectedTripIndex(tripIdx); setShowTripSummaryModal(true); }} />}

                            {modalSubView === 'Edit' && selectedDriver && <EditDriverModalContent driver={selectedDriver} onSave={() => setModalSubView('Details')} />}

                        </div>
                    </div>
                </div>
            )}

            {/* Sub-Modals */}
            {showChangeCategoryModal && (
                <ChangeCategoryModal 
                    onClose={() => setShowChangeCategoryModal(false)}
                    driver={selectedDriver}
                />
            )}
            {showRidePreferencesModal && (
                <RidePreferencesModal 
                    onClose={() => setShowRidePreferencesModal(false)}
                />
            )}
            {showSuspendModal && (
                <SuspendDriverModal 
                    onClose={() => setShowSuspendModal(false)}
                />
            )}
            {showTripSummaryModal && (
                <TripSummaryModal 
                    onClose={() => setShowTripSummaryModal(false)}
                    trip={{ index: selectedTripIndex }}
                />
            )}
        </div>
    );
};
