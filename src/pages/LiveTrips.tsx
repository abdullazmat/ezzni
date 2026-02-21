import { useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, Eye, Star } from 'lucide-react';
import { TripDetailsModal } from '../components/TripDetailsModal';

// Vehicle Icons
import bikeIcon from '../assets/icons/bike.png';
import carIcon from '../assets/icons/car.png';
import taxiIcon from '../assets/icons/taxi.png';

// Payment Icons
import visaIcon from '../assets/icons/visa.png';
import mastercardIcon from '../assets/icons/mastercard.png';
import cashIcon from '../assets/icons/cash.png';

// Stats Icons
import totalArchivedIcon from '../assets/icons/Total Archived.png';
import completedIcon from '../assets/icons/completed.png';
import cancelledIcon from '../assets/icons/Cancelled Archive.png';
import earningsIcon from '../assets/icons/Total Earnings.png';
import commissionIcon from '../assets/icons/comission.png';

export const LiveTrips = () => {
    const [selectedTrip, setSelectedTrip] = useState<any>(null);
    const [filterStatus, setFilterStatus] = useState<string | null>('completed'); // Default to completed as per image
    const [filters, setFilters] = useState({
        status: '',
        city: '',
        service: '',
        method: '',
        period: ''
    });

    const stats = [
        { id: 'all', label: 'Total Archived', value: '01', icon: totalArchivedIcon },
        { id: 'completed', label: 'Completed', value: '01', icon: completedIcon },
        { id: 'cancelled', label: 'Cancelled', value: '01', icon: cancelledIcon },
        { id: 'earnings', label: 'Total Earnings', value: '610.50', unit: 'MAD', icon: earningsIcon },
        { id: 'commission', label: 'Commission', value: '5%', icon: commissionIcon },
    ];

    const trips = [
        // existing trips data...
        { 
            id: 'T-00123', 
            service: 'Regular Ride', 
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
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
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Motorcycle', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Accepted', 
            statusColor: '#eef7f0', 
            statusTextColor: '#2d8a46', 
            fare: '45.50 MAD', 
            paymentMethod: 'mastercard' 
        },
        { 
            id: 'T-00125', 
            service: 'Car Ride', 
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
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
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Motorcycle', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Arrived', 
            statusColor: '#eef7f0', 
            statusTextColor: '#2d8a46', 
            fare: '45.50 MAD', 
            paymentMethod: 'cash' 
        },
        { 
            id: 'T-00127', 
            service: 'Taxi', 
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
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
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
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
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
            rider: { name: 'Ahmed Hassan', id: 'R-00045', rating: 4.8, img: 'https://i.pravatar.cc/150?u=1' }, 
            driver: { name: 'Youssef Ali', id: 'C-00001', rating: 4.9, img: 'https://i.pravatar.cc/150?u=2' }, 
            vehicle: 'Taxi', 
            time: '14:30', 
            duration: '25 min', 
            status: 'Completed', 
            statusColor: '#eef7f0', 
            statusTextColor: '#2d8a46', 
            fare: '45.50 MAD', 
            paymentMethod: 'visa' 
        },
        { 
            id: 'T-00130', 
            service: 'Motorcycle', 
            serviceColor: '#eef7f0', 
            serviceTextColor: '#2d8a46',
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
            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 1024px) {
                    .stats-container {
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
                    }
                }
                @media (max-width: 640px) {
                    .page-header {
                        flex-direction: column;
                        align-items: flex-start !important;
                    }
                }
            `}} />
            <div className="page-header" style={{ marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Live Trips</h1>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor all trip types across Hezzni's transportation services</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                {stats.map((stat, idx) => {
                    const isActive = filterStatus === stat.id;

                    return (
                        <div 
                            key={idx} 
                            onClick={() => handleStatClick(stat.id)}
                            style={{ 
                                backgroundColor: isActive ? '#38AC57' : 'white', 
                                padding: '1.25rem', 
                                borderRadius: '1.5rem', 
                                position: 'relative',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                color: isActive ? 'white' : '#111827',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                border: isActive ? 'none' : '1px solid #f1f5f9'
                             }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                 <div style={{ display: 'flex' }}>
                                    <img src={stat.icon} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain', filter: isActive ? 'brightness(0) invert(1)' : 'none' }} />
                                 </div>
                                 <span style={{ fontSize: '1rem', fontWeight: '800', color: isActive ? 'white' : '#111827' }}>{stat.label}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: 1 }}>{stat.value}</span>
                                {stat.unit && <span style={{ fontSize: '0.9rem', fontWeight: '700', color: isActive ? 'rgba(255,255,255,0.7)' : '#94a3b8' }}>{stat.unit}</span>}
                            </div>
                             <div style={{ 
                                 position: 'absolute', 
                                 bottom: '1rem', 
                                 right: '1rem', 
                                 backgroundColor: isActive ? 'black' : '#38AC57', 
                                 width: '36px',
                                 height: '36px',
                                 display: 'flex',
                                 alignItems: 'center', 
                                 justifyContent: 'center',
                                 color: 'white',
                                 boxShadow: isActive ? 'none' : '0 4px 6px -1px rgba(56, 172, 87, 0.4)',
                                 border: 'none',
                                 clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Default square button look from mockup
                                 borderRadius: '20px 20px 0 20px' // Custom shape from mockup
                             }}>
                                <ArrowUpRight size={18} strokeWidth={3} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'white', padding: '0.5rem', borderRadius: '3rem', border: '1px solid #f1f5f9' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 3.25rem', borderRadius: '2rem', border: 'none', backgroundColor: '#f9fafb', outline: 'none', fontSize: '0.9rem' }} 
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
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}
                >
                    <SlidersHorizontal size={16} /> Clear
                </button>
            </div>

            {/* Table */}
            <div className="card table-responsive" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#38AC57', color: 'white', textAlign: 'left' }}>
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
                                            <img src={trip.rider.img} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                                            {/* Rating Star Badge */}
                                            <div style={{ 
                                                position: 'absolute', 
                                                bottom: '-4px', 
                                                left: '50%', 
                                                transform: 'translateX(-50%)',
                                                backgroundColor: 'white',
                                                borderRadius: '1rem',
                                                padding: '1px 6px',
                                                fontSize: '10px',
                                                fontWeight: '800',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '2px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                <Star size={8} fill="#fbbf24" color="#fbbf24" /> {trip.rider.rating}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#111827' }}>{trip.rider.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>{trip.rider.id}</div>
                                        </div>
                                     </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={trip.driver.img} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                                            <div style={{ 
                                                position: 'absolute', 
                                                bottom: '-4px', 
                                                left: '50%', 
                                                transform: 'translateX(-50%)',
                                                backgroundColor: 'white',
                                                borderRadius: '1rem',
                                                padding: '1px 6px',
                                                fontSize: '10px',
                                                fontWeight: '800',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '2px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                <Star size={8} fill="#fbbf24" color="#fbbf24" /> {trip.driver.rating}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#111827' }}>{trip.driver.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>{trip.driver.id}</div>
                                        </div>
                                     </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700', color: '#111827' }}>
                                        <img 
                                            src={trip.vehicle === 'Motorcycle' ? bikeIcon : trip.vehicle === 'Car' ? carIcon : taxiIcon} 
                                            alt={trip.vehicle} 
                                            style={{ width: '24px', height: 'auto', objectFit: 'contain' }} 
                                        /> 
                                        {trip.vehicle}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '800', color: '#111827', fontSize: '0.95rem' }}>{trip.time}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>{trip.duration}</div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                     <span style={{ backgroundColor: trip.statusColor, color: trip.statusTextColor, padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: '700' }}>{trip.status}</span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '900', color: '#111827', fontSize: '1rem', marginBottom: '4px' }}>{trip.fare}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                                        <img 
                                            src={trip.paymentMethod === 'visa' ? visaIcon : trip.paymentMethod === 'mastercard' ? mastercardIcon : cashIcon} 
                                            alt={trip.paymentMethod} 
                                            style={{ width: '16px', height: 'auto' }} 
                                        />
                                        {trip.paymentMethod.toUpperCase()}
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
