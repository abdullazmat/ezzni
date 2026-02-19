
import { useState, useRef, useEffect } from 'react';
import { Search, Eye, Plus, ChevronDown, Filter, Calendar, Fuel, Settings, Palette, MoreVertical } from 'lucide-react';
import { VehicleDetailModal, VehicleListing, AddVehicleModal } from './RentalCompaniesModals';

// Status colors
const statusColors: Record<string, { bg: string; color: string; border: string }> = {
    'Available': { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
    'Approved': { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
    'Pending': { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
    'Pending Review': { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
    'Rejected': { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
    'Complete': { bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' },
};

// HD Car images from Unsplash
const carImages: Record<string, string> = {
    'Mercedes G Wagon': 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=600&h=400&fit=crop',
    'Dacia Logan': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop',
    'BMW 5 Series': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
    'Toyota Corolla': 'https://images.unsplash.com/photo-1621993202323-f438eec934ff?w=600&h=400&fit=crop',
};
const defaultCarImg = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop';

// Company data
interface CompanyRecord {
    name: string; email: string; phone: string; logo: string;
    location: string; region: string; fleetSize: number;
    vehicleTypes: string; commission: string; documents: string;
    status: string; submitted: string; contract: string;
}

const mockCompanies: CompanyRecord[] = [
    { name: 'Atlas Fleet Services', email: 'contact@atlasfleet.ma', phone: '+212 5 22 34 56 78', logo: '🚗', location: 'Casablanca', region: 'Casablanca-Settat', fleetSize: 45, vehicleTypes: 'Sedan, Suv, Van', commission: '15% commission', documents: 'Complete', status: 'Available', submitted: '2024-06-15', contract: '2024-07-01' },
    { name: 'Atlas Fleet Services', email: 'contact@atlasfleet.ma', phone: '+212 5 22 34 56 78', logo: '🚗', location: 'Casablanca', region: 'Casablanca-Settat', fleetSize: 45, vehicleTypes: 'Sedan, Suv, Van', commission: '15% commission', documents: 'Complete', status: 'Approved', submitted: '2024-06-15', contract: '2024-07-01' },
    { name: 'Atlas Fleet Services', email: 'contact@atlasfleet.ma', phone: '+212 5 22 34 56 78', logo: '🚗', location: 'Casablanca', region: 'Casablanca-Settat', fleetSize: 45, vehicleTypes: 'Sedan, Suv, Van', commission: '15% commission', documents: 'Complete', status: 'Pending', submitted: '2024-06-15', contract: '2024-07-01' },
    { name: 'Atlas Fleet Services', email: 'contact@atlasfleet.ma', phone: '+212 5 22 34 56 78', logo: '🚗', location: 'Casablanca', region: 'Casablanca-Settat', fleetSize: 45, vehicleTypes: 'Sedan, Suv, Van', commission: '15% commission', documents: 'Complete', status: 'Rejected', submitted: '2024-06-15', contract: '2024-07-01' },
    { name: 'Atlas Fleet Services', email: 'contact@atlasfleet.ma', phone: '+212 5 22 34 56 78', logo: '🚗', location: 'Casablanca', region: 'Casablanca-Settat', fleetSize: 45, vehicleTypes: 'Sedan, Suv, Van', commission: '15% commission', documents: 'Complete', status: 'Available', submitted: '2024-06-15', contract: '2024-07-01' },
    { name: 'Atlas Fleet Services', email: 'contact@atlasfleet.ma', phone: '+212 5 22 34 56 78', logo: '🚗', location: 'Casablanca', region: 'Casablanca-Settat', fleetSize: 45, vehicleTypes: 'Sedan, Suv, Van', commission: '15% commission', documents: 'Complete', status: 'Rejected', submitted: '2024-06-15', contract: '2024-07-01' },
];

// Vehicle listings data
const mockVehicles: VehicleListing[] = [
    { id: 'T2345-A-6', name: 'Mercedes G Wagon', price: '380 MAD/day', year: '2025', transmission: 'Automatic', fuel: 'Petrol', color: 'Black', status: 'Approved', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Luxury SUV with premium features. Ideal for business trips and special occasions. Fully equipped with latest technology.' },
    { id: 'T2345-A-6', name: 'Dacia Logan', price: '380 MAD/day', year: '2025', transmission: 'Automatic', fuel: 'Petrol', color: 'Black', status: 'Approved', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Reliable and affordable sedan. Perfect for daily commutes and city driving. Excellent fuel economy.' },
    { id: 'T2345-A-6', name: 'BMW 5 Series', price: '380 MAD/day', year: '2025', transmission: 'Automatic', fuel: 'Petrol', color: 'Black', status: 'Pending Review', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Luxury sedan with premium features. Ideal for business trips and special occasions. Fully equipped with latest technology.' },
    { id: 'T2345-A-6', name: 'Mercedes G Wagon', price: '380 MAD/day', year: '2025', transmission: 'Automatic', fuel: 'Petrol', color: 'Black', status: 'Pending Review', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Luxury SUV with premium features. Ideal for business trips and special occasions. Fully equipped with latest technology.' },
    { id: 'T2345-A-6', name: 'Mercedes G Wagon', price: '380 MAD/day', year: '2025', transmission: 'Automatic', fuel: 'Petrol', color: 'Black', status: 'Rejected', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Luxury SUV with premium features. Ideal for business trips and special occasions.' },
    { id: 'T2345-A-6', name: 'Dacia Logan', price: '380 MAD/day', year: '2025', transmission: 'Automatic', fuel: 'Petrol', color: 'Black', status: 'Approved', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Reliable and affordable sedan. Perfect for daily commutes and city driving.' },
    { id: 'T2345-A-6', name: 'BMW 5 Series', price: '380 MAD/day', year: '2025', transmission: 'Automatic', fuel: 'Petrol', color: 'Black', status: 'Rejected', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Luxury sedan with premium features.' },
    { id: 'T2345-A-6', name: 'Toyota Corolla', price: '280 MAD/day', year: '2024', transmission: 'Automatic', fuel: 'Petrol', color: 'White', status: 'Pending Review', company: 'Makao Car Rental', companyLogo: '⚫', carsAvailable: 28, licensePlate: '12345-A-6', seats: 5, submittedDate: '2025-01-08 14:30', description: 'Popular and dependable sedan. Great for long distance travel.' },
];


// Dropdown
const Dropdown = ({ label, options, activeValue, onSelect }: { label: string; options: string[]; activeValue: string; onSelect: (v: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false); };
        if (isOpen) document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, [isOpen]);
    return (
        <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={() => setIsOpen(!isOpen)} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '24px',
                border: '1px solid #e5e7eb', backgroundColor: 'white', fontSize: '14px', color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap'
            }}>
                {activeValue === 'All' ? label : `✓ ${activeValue}`}
                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>
            {isOpen && (
                <div style={{ position: 'absolute', top: '120%', left: 0, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 50, minWidth: '160px', padding: '6px' }}>
                    {['All', ...options].map(o => (
                        <div key={o} onClick={() => { onSelect(o); setIsOpen(false); }}
                            style={{ padding: '8px 14px', cursor: 'pointer', borderRadius: '8px', fontSize: '14px', fontWeight: activeValue === o ? 'bold' : 'normal', backgroundColor: activeValue === o ? '#f0fdf4' : 'transparent', color: activeValue === o ? '#166534' : '#374151' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = activeValue === o ? '#f0fdf4' : 'transparent'}
                        >{o}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const RentalCompanies = () => {
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [activeTab, setActiveTab] = useState('All Listings');
    const [activeStat, setActiveStat] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleListing | null>(null);
    const [banner, setBanner] = useState<{ type: 'approve' | 'reject'; msg: string } | null>(null);

    const [vehicles, setVehicles] = useState<VehicleListing[]>(mockVehicles);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const available = vehicles.filter(v => v.status === 'Approved').length;
    const pending = vehicles.filter(v => v.status === 'Pending Review').length;
    const rejected = vehicles.filter(v => v.status === 'Rejected').length;

    const statCards = [
        { key: 'Available', label: 'Available', value: String(available).padStart(2, '0'), emoji: '🚗✅' },
        { key: 'Approved', label: viewMode === 'table' ? 'Booked' : 'Approved', value: String(available).padStart(2, '0'), emoji: '🚙👍' },
        { key: 'Pending', label: viewMode === 'table' ? 'Under Review' : 'Pending', value: String(pending).padStart(2, '0'), emoji: '🚗⏳' },
        { key: 'Rejected', label: 'Rejected', value: String(rejected).padStart(2, '0'), emoji: '🚗❌' },
    ];

    const tabs = ['All Listings', 'Pending', 'Approved', 'Rejected'];

    // Filter vehicles
    const filteredVehicles = vehicles.filter(v => {
        if (searchTerm && !v.name.toLowerCase().includes(searchTerm.toLowerCase()) && !v.company.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        
        // Tab filters
        if (activeTab === 'Pending' && v.status !== 'Pending Review') return false;
        if (activeTab === 'Approved' && v.status !== 'Approved') return false;
        if (activeTab === 'Rejected' && v.status !== 'Rejected') return false;
        
        // Stat card filters
        if (activeStat === 'Available' && v.status !== 'Approved') return false; // Approved cars are available
        if (activeStat === 'Approved' && v.status !== 'Approved') return false;
        if (activeStat === 'Pending' && v.status !== 'Pending Review') return false;
        if (activeStat === 'Rejected' && v.status !== 'Rejected') return false;
        
        // Dropdown filters
        if (statusFilter !== 'All') {
            if (statusFilter === 'Pending' && v.status === 'Pending Review') return true; // Handle Pending/Pending Review mismatch
            if (v.status !== statusFilter) return false;
        }
        return true;
    });

    // Filter companies
    const filteredCompanies = mockCompanies.filter(c => {
        if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) && !c.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        
        // Tab filters
        if (activeTab === 'Pending' && c.status !== 'Pending') return false;
        if (activeTab === 'Approved' && c.status !== 'Approved' && c.status !== 'Available') return false;
        if (activeTab === 'Rejected' && c.status !== 'Rejected') return false;
        
        // Stat card filters
        if (activeStat === 'Available' && c.status !== 'Available') return false;
        if (activeStat === 'Approved' && c.status !== 'Approved') return false;
        if (activeStat === 'Pending' && c.status !== 'Pending') return false;
        if (activeStat === 'Rejected' && c.status !== 'Rejected') return false;
        
        // Dropdown filters
        if (statusFilter !== 'All' && c.status !== statusFilter) return false;
        return true;
    });

    const handleApprove = () => { 
        if (selectedVehicle) {
            setVehicles(vehicles.map(v => v === selectedVehicle ? { ...v, status: 'Approved' } : v));
            setSelectedVehicle(null); 
            setBanner({ type: 'approve', msg: 'This listing has been approved' }); 
            setTimeout(() => setBanner(null), 5000); 
        }
    };

    const handleReject = () => { 
        if (selectedVehicle) {
            setVehicles(vehicles.map(v => v === selectedVehicle ? { ...v, status: 'Rejected' } : v));
            setSelectedVehicle(null); 
            setBanner({ type: 'reject', msg: 'This listing has been rejected' }); 
            setTimeout(() => setBanner(null), 5000); 
        }
    };

    const handleAddVehicle = (newVehicleData: Omit<VehicleListing, 'id' | 'companyLogo' | 'submittedDate' | 'status'>) => {
        const newVehicle: VehicleListing = {
            ...newVehicleData,
            id: `T${Math.floor(Math.random() * 10000)}-N`,
            companyLogo: '🆕',
            submittedDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
            status: 'Pending Review'
        };
        setVehicles([newVehicle, ...vehicles]);
        setBanner({ type: 'approve', msg: 'New vehicle submitted successfully' }); 
        setTimeout(() => setBanner(null), 5000);
    };

    const statusBadge = (status: string) => {
        const sc = statusColors[status] || statusColors['Pending'];
        return <span style={{ backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>{status}</span>;
    };

    return (
        <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            {/* Banner */}
            {banner && (
                <div style={{
                    position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000,
                    backgroundColor: 'white', borderRadius: '12px', padding: '14px 24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '12px',
                    border: `1px solid ${banner.type === 'approve' ? '#bbf7d0' : '#fecaca'}`,
                    animation: 'slideUp 0.3s ease'
                }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: banner.type === 'approve' ? '#dbeafe' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                        ℹ️
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{banner.msg}</span>
                    <button onClick={() => setBanner(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '16px', marginLeft: '8px' }}>✕</button>
                </div>
            )}

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Rental Companies</h1>
                    <p style={{ color: '#6b7280', margin: '4px 0 0 0', fontSize: '14px' }}>Manage rental company partnerships and fleet integrations</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')} style={{
                        padding: '10px 20px', borderRadius: '24px', border: '1px solid #e5e7eb', backgroundColor: 'white', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#22c55e'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                    >{viewMode === 'table' ? 'View All' : 'View All'}</button>
                    <button onClick={() => setIsAddModalOpen(true)} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '24px', border: 'none',
                        backgroundColor: '#22c55e', color: 'white', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}
                    ><Plus size={18} /> Add Vehicle</button>
                </div>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {statCards.map(stat => {
                    const isActive = activeStat === stat.key;
                    return (
                        <div key={stat.key} onClick={() => setActiveStat(isActive ? '' : stat.key)}
                            style={{
                                backgroundColor: 'white', padding: '24px', borderRadius: '24px', position: 'relative',
                                cursor: 'pointer', transition: 'all 0.3s', boxShadow: isActive ? '0 8px 20px rgba(34,197,94,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
                                border: isActive ? '2px solid #22c55e' : '2px solid transparent', transform: isActive ? 'translateY(-2px)' : 'none',
                                overflow: 'hidden'
                            }}>
                            <div style={{ fontWeight: '600', fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{stat.label}</div>
                            <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{stat.value}</div>
                            <div style={{ position: 'absolute', right: '16px', bottom: '16px', fontSize: '40px', opacity: 0.7 }}>{stat.emoji}</div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', maxWidth: '260px' }}>
                        <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '10px 16px 10px 48px', borderRadius: '24px', border: '1px solid #e5e7eb', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
                    </div>
                    <Dropdown label="Status" options={['Available', 'Approved', 'Pending', 'Pending Review', 'Rejected']} activeValue={statusFilter} onSelect={setStatusFilter} />
                    <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '24px', border: '1px solid #e5e7eb', backgroundColor: 'white', fontSize: '14px', cursor: 'pointer' }}>
                        <Filter size={14} /> Filters
                    </button>
                </div>
                <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '24px', padding: '3px' }}>
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '8px 18px', borderRadius: '20px', border: 'none',
                            backgroundColor: activeTab === tab ? '#1f2937' : 'transparent',
                            color: activeTab === tab ? 'white' : '#6b7280',
                            fontWeight: '600', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
                        }}>{tab}</button>
                    ))}
                </div>
            </div>

            {/* ====== TABLE VIEW ====== */}
            {viewMode === 'table' && (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 0.8fr 0.8fr 1.2fr 0.8fr', padding: '16px 24px', backgroundColor: '#10b981', color: 'white', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', marginBottom: '16px' }}>
                        <div>Company Details</div><div>Location</div><div>Fleet Info</div><div style={{ textAlign: 'center' }}>Documents</div><div style={{ textAlign: 'center' }}>Status</div><div style={{ textAlign: 'center' }}>Submitted</div><div style={{ textAlign: 'center' }}>Action</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredCompanies.length === 0 ? (
                            <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '16px', textAlign: 'center' }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏢</div>
                                <h3 style={{ margin: '0 0 8px 0' }}>No companies found</h3>
                                <p style={{ color: '#6b7280', margin: 0 }}>Try adjusting your filters</p>
                            </div>
                        ) : filteredCompanies.map((c, i) => {
                            return (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 0.8fr 0.8fr 1.2fr 0.8fr', padding: '16px 24px', backgroundColor: 'white', borderRadius: '16px', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{c.logo}</div>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '14px' }}>{c.name}</div>
                                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.email}</div>
                                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.phone}</div>
                                        </div>
                                    </div>
                                    <div><div style={{ fontWeight: '600', fontSize: '13px' }}>{c.location}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.region}</div></div>
                                    <div><div style={{ fontWeight: '600', fontSize: '13px' }}>{c.fleetSize} vehicles</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.vehicleTypes}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.commission}</div></div>
                                    <div style={{ textAlign: 'center' }}>{statusBadge(c.documents)}</div>
                                    <div style={{ textAlign: 'center' }}>{statusBadge(c.status)}</div>
                                    <div style={{ textAlign: 'center' }}><div style={{ fontSize: '13px', fontWeight: '600' }}>{c.submitted}</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Contract: {c.contract}</div></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <button onClick={() => setViewMode('grid')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '20px', border: '1px solid #e5e7eb', backgroundColor: 'white', fontSize: '13px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f0fdf4'; e.currentTarget.style.borderColor = '#22c55e'; }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                                        ><Eye size={14} /> Preview</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* ====== GRID VIEW ====== */}
            {viewMode === 'grid' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    {filteredVehicles.length === 0 ? (
                        <div style={{ gridColumn: '1/-1', backgroundColor: 'white', padding: '48px', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚗</div>
                            <h3 style={{ margin: '0 0 8px 0' }}>No vehicles found</h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>Try adjusting your filters</p>
                        </div>
                    ) : filteredVehicles.map((v, i) => {
                        const sc = statusColors[v.status] || statusColors['Pending'];
                        return (
                            <div key={i} onClick={() => setSelectedVehicle(v)} style={{
                                backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.25s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'none'; }}
                            >
                                {/* Image */}
                                <div style={{ position: 'relative', height: '180px', backgroundColor: '#f3f4f6' }}>
                                    <img src={carImages[v.name] || defaultCarImg} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>{v.status}</div>
                                </div>
                                {/* Info */}
                                <div style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{v.name}</h3>
                                        <span style={{ backgroundColor: '#22c55e', color: 'white', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>{v.price}</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>{v.id}</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '14px', fontSize: '12px', color: '#6b7280' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {v.year}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Settings size={12} /> {v.transmission}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Fuel size={12} /> {v.fuel}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Palette size={12} /> {v.color}</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '28px', height: '28px', backgroundColor: '#1f2937', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>{v.companyLogo}</div>
                                            <div>
                                                <div style={{ fontSize: '12px', fontWeight: '600' }}>{v.company}</div>
                                                <div style={{ fontSize: '10px', color: '#9ca3af' }}>{v.carsAvailable} cars available</div>
                                            </div>
                                        </div>
                                        <button onClick={e => { e.stopPropagation(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                                            <MoreVertical size={16} color="#9ca3af" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Vehicle Detail Modal */}
            {selectedVehicle && (
                <VehicleDetailModal
                    vehicle={selectedVehicle}
                    onClose={() => setSelectedVehicle(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
            
            {isAddModalOpen && (
                <AddVehicleModal
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddVehicle}
                />
            )}
        </div>
    );
};
