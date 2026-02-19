import { useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, Eye, CheckCircle, CreditCard } from 'lucide-react';
import { TripDetailsModal } from '../components/TripDetailsModal';

export const LiveTrips = () => {
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        status: '',
        city: '',
        service: '',
        method: '',
        period: ''
    });

    const stats = [
        { id: 'all', label: 'Total Archived', value: '08', color: 'var(--text-primary)', iconBg: 'white', arrowBg: '#22c55e' },
        { id: 'completed', label: 'Completed', value: '03', color: 'var(--text-primary)', iconBg: 'white', arrowBg: '#22c55e', activeColor: 'white', activeBg: '#22c55e', activeIconBg: 'rgba(255,255,255,0.2)', activeArrowBg: 'black' },
        { id: 'cancelled', label: 'Cancelled', value: '02', color: 'var(--text-primary)', iconBg: 'white', arrowBg: '#22c55e', activeColor: 'white', activeBg: '#22c55e', activeIconBg: 'rgba(255,255,255,0.2)', activeArrowBg: 'black' },
        { id: 'earnings', label: 'Total Earnings', value: '610.50', unit: 'MAD', color: 'var(--text-primary)', iconBg: 'white', arrowBg: '#22c55e', activeColor: 'white', activeBg: '#22c55e', activeIconBg: 'rgba(255,255,255,0.2)', activeArrowBg: 'black' },
        { id: 'commission', label: 'Commission', value: '5%', color: 'var(--text-primary)', iconBg: 'white', arrowBg: '#22c55e', activeColor: 'white', activeBg: '#22c55e', activeIconBg: 'rgba(255,255,255,0.2)', activeArrowBg: 'black' },
    ];

    const trips = [
        // existing trips data...
        { 
            id: 'T-00123', 
            service: 'Regular Ride', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Motorcycle', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Searching', 
            statusColor: '#dbeafe', 
            statusTextColor: '#1e40af', 
            fare: '45.50 MAD', 
            paymentMethod: 'visa' 
        },
        { 
            id: 'T-00124', 
            service: 'Motorcycle', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Motorcycle', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Accepted', 
            statusColor: '#dcfce7', 
            statusTextColor: '#166534', 
            fare: '45.50 MAD', 
            paymentMethod: 'mastercard' 
        },
        { 
            id: 'T-00125', 
            service: 'Car Ride', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Car', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Arriving', 
            statusColor: '#e0f2fe', 
            statusTextColor: '#0284c7', 
            fare: '45.50 MAD', 
            paymentMethod: 'visa' 
        },
        { 
            id: 'T-00126', 
            service: 'Motorcycle', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Motorcycle', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Arrived', 
            statusColor: '#dcfce7', 
            statusTextColor: '#166534', 
            fare: '45.50 MAD', 
            paymentMethod: 'cash' 
        },
        { 
            id: 'T-00127', 
            service: 'Taxi', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Taxi', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Started', 
            statusColor: '#ede9fe', 
            statusTextColor: '#7c3aed', 
            fare: '45.50 MAD', 
            paymentMethod: 'visa' 
        },
        { 
            id: 'T-00128', 
            service: 'Motorcycle', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Motorcycle', 
            time: '14:30', 
            duration: '25 min', 
            status: 'In_progress', 
            statusColor: '#f3e8ff', 
            statusTextColor: '#9333ea', 
            fare: '45.50 MAD', 
            paymentMethod: 'mastercard' 
        },
        { 
            id: 'T-00129', 
            service: 'Taxi', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Taxi', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Completed', 
            statusColor: '#dcfce7', 
            statusTextColor: '#166534', 
            fare: '45.50 MAD', 
            paymentMethod: 'visa' 
        },
        { 
            id: 'T-00130', 
            service: 'Motorcycle', 
            serviceColor: '#dcfce7', 
            serviceTextColor: '#166534',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Motorcycle', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Cancelled', 
            statusColor: '#fee2e2', 
            statusTextColor: '#dc2626', 
            fare: '45.50 MAD', 
            paymentMethod: 'mastercard' 
        },
    ];

    const filteredTrips = trips.filter(trip => {
        // Quick Card Filters
        if (filterStatus) {
            if (filterStatus === 'completed' && trip.status !== 'Completed') return false;
            if (filterStatus === 'cancelled' && trip.status !== 'Cancelled') return false;
            if ((filterStatus === 'earnings' || filterStatus === 'commission') && trip.status !== 'Completed') return false;
            // 'all' shows everything
        }

        // Dropdown Filters
        if (filters.status && filters.status !== 'Status' && trip.status !== filters.status) return false;
        if (filters.service && filters.service !== 'Service Type' && trip.service !== filters.service) return false;
        if (filters.method && filters.method !== 'Method' && trip.paymentMethod !== filters.method.toLowerCase()) return false;
        
        // City logic (placeholder since trip object doesn't have city directly shown in table but it's likely a property if we had full data. 
        // For now, no city filtering as city data is missing in the simplified trip objects in this file, or we can mock match against a random city or just ignore for demo)
        // Ignoring City filter for exact match to avoid breaking everything since data is mock.
        
        return true;
    });

    const handleStatClick = (statId: string) => {
        if (filterStatus === statId) {
            setFilterStatus(null); // Toggle off
        } else {
            setFilterStatus(statId);
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            city: '',
            service: '',
            method: '',
            period: ''
        });
        setFilterStatus(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Live Trips</h1>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor all trip types across Hezzni's transportation services</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
                {stats.map((stat, idx) => {
                    const isActive = filterStatus === stat.id;

                    return (
                        <div 
                            key={idx} 
                            onClick={() => handleStatClick(stat.id)}
                            style={{ 
                                backgroundColor: isActive && stat.activeBg ? stat.activeBg : (stat.color === 'var(--text-primary)' ? 'white' : 'white'), 
                                padding: '1.5rem', 
                                borderRadius: '1.5rem', 
                                position: 'relative',
                                boxShadow: isActive ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)',
                                color: isActive && stat.activeColor ? stat.activeColor : stat.color,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                transform: isActive ? 'translateY(-2px)' : 'none'
                             }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                 <div style={{ 
                                     width: '24px', 
                                     height: '24px', 
                                     borderRadius: '50%', 
                                     backgroundColor: isActive && stat.activeIconBg ? stat.activeIconBg : stat.iconBg, 
                                     display: 'flex', 
                                     alignItems: 'center', 
                                     justifyContent: 'center' 
                                  }}>
                                    <CheckCircle size={14} color={isActive ? 'white' : '#22c55e'} />
                                 </div>
                                 <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1 }}>
                                {stat.value}
                                {stat.unit && <span style={{ fontSize: '0.9rem', fontWeight: 'normal', display: 'block' }}>{stat.unit}</span>}
                            </div>
                             <div style={{ 
                                 position: 'absolute', 
                                 bottom: '1rem', 
                                 right: '1rem', 
                                 backgroundColor: isActive && stat.activeArrowBg ? stat.activeArrowBg : stat.arrowBg, 
                                 borderRadius: '50%', 
                                 padding: '0.5rem', 
                                 color: 'white' 
                             }}>
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 3rem', borderRadius: '2rem', border: '1px solid #e5e7eb', outline: 'none' }} 
                    />
                </div>
                <SelectDropdown 
                    label="Status" 
                    options={['Searching', 'Accepted', 'Arriving', 'Arrived', 'Started', 'In_progress', 'Completed', 'Cancelled']}
                    value={filters.status}
                    onChange={(val) => handleFilterChange('status', val)}
                />
                <SelectDropdown 
                    label="City" 
                    options={['Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Fes']}
                    value={filters.city}
                    onChange={(val) => handleFilterChange('city', val)}
                />
                <SelectDropdown 
                    label="Service Type" 
                    options={['Regular Ride', 'Motorcycle', 'Car Ride', 'Taxi']}
                    value={filters.service}
                    onChange={(val) => handleFilterChange('service', val)}
                />
                <SelectDropdown 
                    label="Method" 
                    options={['Visa', 'Mastercard', 'Cash']}
                    value={filters.method}
                    onChange={(val) => handleFilterChange('method', val)}
                />
                 <SelectDropdown 
                    label="Periods" 
                    options={['Today', 'Yesterday', 'Last Week', 'Last Month']}
                    value={filters.period}
                    onChange={(val) => handleFilterChange('period', val)}
                />
                <button 
                    onClick={clearFilters}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer' }}
                >
                    <SlidersHorizontal size={16} /> Clear
                </button>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#22c55e', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Trip ID</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Service</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Rider</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Driver</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Vehicle</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Time</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Fare</th>
                            <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrips.length > 0 ? filteredTrips.map((trip, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: 'white' }}>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>{trip.id}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span style={{ backgroundColor: trip.serviceColor, color: trip.serviceTextColor, padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.85rem' }}>{trip.service}</span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={trip.rider.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0 0.2rem', borderRadius: '0.5rem', fontSize: '0.6rem', display: 'flex', alignItems: 'center' }}>⭐ {trip.rider.rating}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{trip.rider.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{trip.rider.id}</div>
                                        </div>
                                     </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={trip.driver.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                             <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0 0.2rem', borderRadius: '0.5rem', fontSize: '0.6rem', display: 'flex', alignItems: 'center' }}>⭐ {trip.driver.rating}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{trip.driver.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{trip.driver.id}</div>
                                        </div>
                                     </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                                        {trip.vehicle === 'Motorcycle' ? '🏍️' : trip.vehicle === 'Car' ? '🚗' : '🚕'} {trip.vehicle}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600' }}>{trip.time}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{trip.duration}</div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                     <span style={{ backgroundColor: trip.statusColor, color: trip.statusTextColor, padding: '0.3rem 0.8rem', borderRadius: '0.3rem', fontSize: '0.85rem', fontWeight: '500' }}>{trip.status}</span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600' }}>{trip.fare}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                        {trip.paymentMethod === 'visa' ? <CreditCard size={12} color="#1d4ed8" /> : trip.paymentMethod === 'mastercard' ? <span style={{ display: 'flex' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fbbf24', marginLeft: '-5px' }}></div></span> : '💵'} 
                                        {trip.paymentMethod === 'visa' ? 'VISA' : ''}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <button 
                                        onClick={() => setSelectedTrip(trip)}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #e5e7eb', backgroundColor: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', cursor: 'pointer', fontSize: '0.85rem' }}
                                    >
                                        <Eye size={14} /> Preview
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={9} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No trips found matching your filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedTrip && <TripDetailsModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />}
        </div>
    );
};

interface SelectDropdownProps {
    label: string;
    options?: string[];
    value?: string;
    onChange?: (val: string) => void;
}

const SelectDropdown = ({ label, options = [], value, onChange }: SelectDropdownProps) => (
    <div style={{ position: 'relative' }}>
        <select 
            value={value || label}
            onChange={(e) => onChange && onChange(e.target.value)}
            style={{ 
                padding: '0.8rem 2rem 0.8rem 1rem', 
                borderRadius: '2rem', 
                border: '1px solid #e5e7eb', 
                outline: 'none', 
                appearance: 'none', 
                backgroundColor: 'white', 
                minWidth: '120px', 
                cursor: 'pointer',
                color: value && value !== label ? 'black' : '#6b7280'
            }}
        >
            <option value="">{label}</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
            ))}
        </select>
        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '0.8rem' }}>▼</div>
    </div>
);
