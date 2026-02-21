import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, Eye, RefreshCw, ArrowLeft, Star } from 'lucide-react';

// Icons
import waitingCustomersIcon from '../assets/icons/Waiting Customers.png';
import availableDriversIcon from '../assets/icons/Available Drivers.png';
import activeAssignmentsIcon from '../assets/icons/Active Assignments.png';
import completedTodayIcon from '../assets/icons/Completed Today.png';
import pickupIcon from '../assets/icons/pickup.png';
import destinationIcon from '../assets/icons/destination.png';
import mastercardIcon from '../assets/icons/mastercard.png';
import visaIcon from '../assets/icons/visa.png';
import cashIcon from '../assets/icons/cash.png';
import taxiIcon from '../assets/icons/taxi.png';
import bikeIcon from '../assets/icons/bike.png';
import carIcon from '../assets/icons/car.png';
import locationIcon from '../assets/icons/location icon.png';

interface Customer {
  id: string;
  name: string;
  img: string;
  rating: number;
  from: string;
  to: string;
  time: string;
  price: string;
  distance: string;
  email: string;
  phone: string;
  city: string;
  gender: string;
  category: string;
}

interface Driver {
  id: string;
  name: string;
  img: string;
  rating: number;
  city: string;
  distance: string;
  location: string;
  trips: number;
  vehicle: string;
  email: string;
  phone: string;
  gender: string;
  vehicleType: string;
  vehicleColor: string;
  plateNumber: string;
  makeModel: string;
  year: string;
  joinDate: string;
  driverId: string;
}

interface Assignment {
  id: string;
  serviceType: string;
  serviceColor: string;
  serviceTextColor: string;
  rider: Customer;
  driver: Driver;
  route: { from: string; to: string };
  assignedAt: string;
  startTime: string;
  endTime: string;
  distance: string;
  status: string;
  payment: {
    tva: string;
    serviceFee: string;
    method: string;
    discount: string;
    total: string;
  };
}

const statusLabel = (status: string) => {
  switch (status) {
    case 'In_progress': return 'In Progress';
    case 'Searching': return 'Searching';
    case 'Accepted': return 'Accepted';
    case 'Completed': return 'Completed';
    case 'Cancelled': return 'Cancelled';
    default: return status;
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'In_progress': return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
    case 'Searching': return { bg: '#f0f9ff', color: '#0284c7', border: '#bae6fd' };
    case 'Accepted': return { bg: '#eef7f0', color: '#2d8a46', border: '#bbf7d0' };
    case 'Completed': return { bg: '#eef7f0', color: '#38AC57', border: '#eef7f0' };
    case 'Cancelled': return { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' };
    default: return { bg: '#f8fafc', color: '#64748b', border: '#f1f5f9' };
  }
};

export const RideAssignment = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewAssignment, setPreviewAssignment] = useState<Assignment | null>(null);
  
  // Filter & Form States
  const [searchTerm, setSearchTerm] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formService, setFormService] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Dropdown & Filter Interaction States
  const [activeStat, setActiveStat] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<'city' | 'filters' | null>(null);
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Standard', 'Lux', 'Taxi', 'Hezzni XL']);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock Data
  const customers: Customer[] = [
    { 
      id: 'C-0001', name: 'Sarah Mohamed El-Fassi', img: 'https://i.pravatar.cc/150?u=a', rating: 4.8, 
      from: 'Centre-ville Casablanca', to: 'Aéroport Mohammed V', time: '10:30 AM', price: '180 MAD', distance: '30 km',
      email: 'sarah.elfassi@gmail.com', phone: '+212 6 12 34 56 78', city: 'Casablanca', gender: 'Female', category: 'Standard'
    },
    { 
      id: 'C-0002', name: 'Ahmed Hassan', img: 'https://i.pravatar.cc/150?u=b', rating: 4.8, 
      from: 'Marrakech Medina', to: 'Menara Mall', time: '10:45 AM', price: '45 MAD', distance: '5 km',
      email: 'ahmed.hassan@gmail.com', phone: '+212 6 98 76 54 32', city: 'Marrakech', gender: 'Male', category: 'Taxi'
    },
    { 
      id: 'C-0003', name: 'Fatima Zahra', img: 'https://i.pravatar.cc/150?u=c', rating: 4.9, 
      from: 'Rabat Agdal', to: 'Sale Marina', time: '11:00 AM', price: '60 MAD', distance: '12 km',
      email: 'fatima.zahra@gmail.com', phone: '+212 6 11 22 33 44', city: 'Rabat', gender: 'Female', category: 'Lux'
    },
    { 
      id: 'C-0004', name: 'Karim Ben', img: 'https://i.pravatar.cc/150?u=d', rating: 4.7, 
      from: 'Tangier City Center', to: 'Port Tangier', time: '11:15 AM', price: '30 MAD', distance: '8 km',
      email: 'karim.ben@gmail.com', phone: '+212 6 55 66 77 88', city: 'Tangier', gender: 'Male', category: 'Hezzni XL'
    },
  ];

  const drivers: Driver[] = [
    { 
      id: 'T-0004', name: 'Mohamed Berrada', img: 'https://i.pravatar.cc/150?u=x', rating: 4.8, 
      city: 'Casablanca', distance: '12 km', location: 'Downtown', trips: 167, vehicle: 'Car',
      email: 'mohamed.berrada@gmail.com', phone: '+212 6 12 34 56', gender: 'Male', 
      vehicleType: 'Taxi', vehicleColor: 'White', plateNumber: '8 | A | 26363', makeModel: 'Dacia Logan', year: '2020', joinDate: '2023-01-15', driverId: 'D-00045'
    },
    { 
      id: 'T-0005', name: 'Youssef Ali', img: 'https://i.pravatar.cc/150?u=y', rating: 4.9, 
      city: 'Marrakech', distance: '5 km', location: 'Gueliz', trips: 210, vehicle: 'Taxi',
      email: 'youssef.ali@gmail.com', phone: '+212 6 99 88 77 66', gender: 'Male',
      vehicleType: 'Comfort', vehicleColor: 'Black', plateNumber: '6 | B | 12345', makeModel: 'Peugeot 301', year: '2022', joinDate: '2023-03-20', driverId: 'D-00052'
    },
    { 
      id: 'T-0006', name: 'Omar Little', img: 'https://i.pravatar.cc/150?u=z', rating: 4.5, 
      city: 'Rabat', distance: '8 km', location: 'Hassan', trips: 98, vehicle: 'Motorcycle',
      email: 'omar.little@gmail.com', phone: '+212 6 44 33 22 11', gender: 'Male',
      vehicleType: 'Moto', vehicleColor: 'Red', plateNumber: '12 | M | 9876', makeModel: 'Honda SH', year: '2021', joinDate: '2023-06-10', driverId: 'D-00068'
    },
  ];

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'A001',
      serviceType: 'Taxi',
      serviceColor: '#eef7f0',
      serviceTextColor: '#2d8a46',
      rider: customers[3],
      driver: drivers[0],
      route: { from: 'Fès Medina', to: 'Train Station' },
      assignedAt: '09:58 AM',
      startTime: '14:30',
      endTime: '14:55',
      distance: '45km',
      status: 'Searching',
      payment: { tva: '1%', serviceFee: '0.00 MAD', method: 'Mastercard', discount: '0%', total: '45.50 MAD' }
    },
    {
      id: 'A002',
      serviceType: 'Delivery',
      serviceColor: '#fef3c7',
      serviceTextColor: '#d97706',
      rider: customers[3],
      driver: drivers[0],
      route: { from: 'Restaurant Casablanca', to: 'Customer Location' },
      assignedAt: '09:45 AM',
      startTime: '09:45',
      endTime: '10:15',
      distance: '8km',
      status: 'Accepted',
      payment: { tva: '1%', serviceFee: '2.00 MAD', method: 'Cash', discount: '10%', total: '38.00 MAD' }
    }
  ]);

  const stats = [
    { id: 'waiting', label: 'Waiting Customers', value: customers.length.toString().padStart(3, '0'), icon: waitingCustomersIcon },
    { id: 'available', label: 'Available Drivers', value: drivers.length.toString().padStart(3, '0'), icon: availableDriversIcon },
    { id: 'active', label: 'Active Assignments', value: assignments.filter(a => a.status === 'In_progress' || a.status === 'Accepted').length.toString().padStart(3, '0'), icon: activeAssignmentsIcon },
    { id: 'completed', label: 'Completed Today', value: assignments.filter(a => a.status === 'Completed').length.toString().padStart(3, '0'), icon: completedTodayIcon },
  ];

  // Derived State
  const cities = ['All', ...Array.from(new Set([...customers.map(c => c.city), ...drivers.map(d => d.city)]))];

  const filteredCustomers = customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (cityFilter === 'All' || c.city === cityFilter) &&
      (activeStat === 'waiting' || activeStat === null) &&
      selectedCategories.includes(c.category)
  );

  const filteredDrivers = drivers.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (cityFilter === 'All' || d.city === cityFilter) &&
      (activeStat === 'available' || activeStat === null) &&
      selectedCategories.includes(d.vehicleType)
  );

  const filteredAssignments = assignments.filter(a => {
      const matchCity = cityFilter === 'All' || a.rider.city === cityFilter || a.driver.city === cityFilter;
      const matchStat = activeStat === 'active' ? (a.status !== 'Completed' && a.status !== 'Cancelled') : 
                        activeStat === 'completed' ? a.status === 'Completed' : true;
      const matchCategory = selectedCategories.includes(a.rider.category) || selectedCategories.includes(a.driver.vehicleType);
      return matchCity && matchStat && matchCategory;
  });


  // Handlers

  const handleAssign = () => {
    if (!selectedCustomer || !selectedDriver) return;
    
    const serviceColors: Record<string, { bg: string; text: string }> = {
      'Taxi': { bg: '#eef7f0', text: '#2d8a46' },
      'Delivery': { bg: '#fef3c7', text: '#d97706' },
      'Freight': { bg: '#ede9fe', text: '#7c3aed' },
    };
    const sType = formService || selectedDriver.vehicle;
    const sColors = serviceColors[sType] || { bg: '#eef7f0', text: '#2d8a46' };

    const newAssignment: Assignment = {
      id: `A00${assignments.length + 1}`,
      serviceType: sType,
      serviceColor: sColors.bg,
      serviceTextColor: sColors.text,
      rider: selectedCustomer,
      driver: selectedDriver,
      route: { from: selectedCustomer.from, to: selectedCustomer.to },
      assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      startTime: 'Now',
      endTime: 'Est. 20m',
      distance: selectedCustomer.distance,
      status: 'In_progress',
      payment: { tva: '1%', serviceFee: '5.00 MAD', method: 'Cash', discount: '0%', total: selectedCustomer.price }
    };
    
    setAssignments([newAssignment, ...assignments]);
    setSelectedCustomer(null);
    setSelectedDriver(null);
    setFormCategory('');
    setFormService('');
    setFormCity('');
    setFormNotes('');
  };

  const handlePreview = (assignment: Assignment) => {
    setPreviewAssignment(assignment);
    setShowPreviewModal(true);
  };

  const handleCancelAssignment = () => {
    if (!previewAssignment) return;
    setAssignments(assignments.map((a: Assignment) => 
      a.id === previewAssignment.id 
        ? { ...a, status: 'Cancelled' } 
        : a
    ));
    setPreviewAssignment((prev: Assignment | null) => prev ? ({ ...prev, status: 'Cancelled' }) : null);
  };

  const handleRefresh = () => {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Ride Assignment Dispatch</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manually assign rides between customers and available drivers</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {stats.map((stat, idx) => {
          const isActive = activeStat === stat.id;
          return (
            <div 
              key={idx} 
              onClick={() => setActiveStat(isActive ? null : stat.id)}
              style={{ 
                padding: '1.5rem', 
                borderRadius: '1.5rem', 
                backgroundColor: isActive ? '#38AC57' : 'white', 
                color: isActive ? 'white' : '#111827', 
                position: 'relative', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                border: '1px solid #f1f5f9',
                minHeight: '140px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={stat.icon} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                <span style={{ fontWeight: '600', fontSize: '1rem', color: isActive ? 'white' : '#64748b' }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'Outfit, Inter, sans-serif' }}>{stat.value}</div>
              <div style={{ 
                  position: 'absolute', 
                  bottom: '1.25rem', 
                  right: '1.25rem', 
                  backgroundColor: isActive ? '#000' : '#38AC57', 
                  borderRadius: '50%', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white'
              }}>
                <ArrowUpRight size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* New Assignment Form */}
      <div className="card" style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: 'white', border: '1px solid #f1f5f9' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#111827' }}>New Assignment</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
           <FormSelect label="Select Category*" value={formCategory} options={['Hezzni XL', 'Standard', 'Lux']} onChange={(val: string) => setFormCategory(val)} />
           <FormSelect label="Select Customer*" value={selectedCustomer?.name || ''} options={customers.map(c => c.name)} onChange={(val: string) => setSelectedCustomer(customers.find(c => c.name === val) || null)} />
           <FormSelect label="Select Driver*" value={selectedDriver?.name || ''} options={drivers.map(d => d.name)} onChange={(val: string) => setSelectedDriver(drivers.find(d => d.name === val) || null)} />
           <FormSelect label="Select Service*" value={formService} options={['Taxi', 'Delivery', 'Freight']} onChange={(val: string) => setFormService(val)} />
           <FormSelect label="City*" value={formCity} options={['Casablanca', 'Marrakech', 'Rabat']} onChange={(val: string) => setFormCity(val)} />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
           <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>Notes <span style={{ color: '#94a3b8', fontWeight: '400' }}>Optional</span></label>
           <textarea 
             placeholder="Type here"
             value={formNotes}
             onChange={(e) => setFormNotes(e.target.value)} 
             style={{ width: '100%', height: '120px', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', resize: 'none', outline: 'none', fontSize: '1rem' }}
           ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
                onClick={handleAssign}
                disabled={!selectedCustomer || !selectedDriver}
                style={{ 
                    backgroundColor: 'white', 
                    color: selectedCustomer && selectedDriver ? '#111827' : '#9ca3af',
                    border: '1px solid #e5e7eb',
                    padding: '0.8rem 2.5rem', 
                    borderRadius: '2rem', 
                    fontWeight: '600',
                    cursor: selectedCustomer && selectedDriver ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
            >
                Assign Services
            </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         <div style={{ position: 'relative', width: '320px' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.875rem 1.25rem 0.875rem 3rem', borderRadius: '2rem', border: '1px solid #e5e7eb', outline: 'none', backgroundColor: '#f8fafc' }} 
            />
         </div>
         
         <div style={{ position: 'relative' }}>
             <button 
                onClick={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
                style={{ padding: '0.875rem 1.5rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}
             >
                {cityFilter} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>▼</span>
             </button>
             {activeDropdown === 'city' && (
                <div style={{ position: 'absolute', top: '110%', left: 0, backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 100, border: '1px solid #f1f5f9', padding: '0.5rem', minWidth: '150px' }}>
                    {cities.map(city => (
                        <div 
                            key={city}
                            onClick={() => { setCityFilter(city); setActiveDropdown(null); }}
                            style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '0.75rem', fontSize: '0.9rem', backgroundColor: cityFilter === city ? '#f8fafc' : 'transparent', fontWeight: cityFilter === city ? '700' : '400' }}
                        >
                            {city}
                        </div>
                    ))}
                </div>
             )}
         </div>

         <div style={{ position: 'relative' }}>
             <button 
                onClick={() => setActiveDropdown(activeDropdown === 'filters' ? null : 'filters')}
                style={{ padding: '0.875rem 1.5rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}
             >
                <SlidersHorizontal size={14} /> Filters
             </button>
             {activeDropdown === 'filters' && (
                <div style={{ position: 'absolute', top: '110%', right: 0, backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 100, border: '1px solid #f1f5f9', padding: '1rem', minWidth: '200px' }}>
                    <div style={{ marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.9rem' }}>Show only:</div>
                    {['Standard', 'Lux', 'Taxi', 'Hezzni XL', 'Moto', 'Comfort'].map(cat => (
                        <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input 
                                type="checkbox" 
                                checked={selectedCategories.includes(cat)}
                                onChange={() => {
                                    if (selectedCategories.includes(cat)) {
                                        setSelectedCategories(selectedCategories.filter(c => c !== cat));
                                    } else {
                                        setSelectedCategories([...selectedCategories, cat]);
                                    }
                                }}
                                style={{ width: '16px', height: '16px' }} 
                            />
                            {cat}
                        </label>
                    ))}
                </div>
             )}
         </div>
      </div>

      {/* Lists Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
         {/* Waiting Customers */}
         <div className="card" style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: 'white', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Waiting Customers ({filteredCustomers.length})</h3>
                <button 
                   onClick={handleRefresh}
                   style={{ 
                       width: '40px', 
                       height: '40px', 
                       borderRadius: '0.75rem', 
                       backgroundColor: '#000', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       cursor: 'pointer',
                       border: 'none',
                       transition: 'all 0.2s',
                   }}
                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
                >
                    <RefreshCw size={20} color="white" style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {filteredCustomers.map((c, idx) => (
                    <div key={idx} style={{ padding: '1.25rem', border: '1px solid #f1f5f9', borderRadius: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                        <div style={{ display: 'flex', gap: '1.25rem' }}>
                             <div style={{ position: 'relative' }}>
                                <img src={c.img} alt="" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '2px 8px', borderRadius: '1rem', fontSize: '0.7rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '700' }}>
                                    <Star size={10} fill="#fbbf24" color="#fbbf24" /> {c.rating}
                                </div>
                             </div>
                             <div>
                                 <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#111827' }}>{c.id} · {c.name}</div>
                                 <div style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.35rem 0' }}>{c.from} → {c.to}</div>
                                 <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Requested: <span style={{ color: '#111827', fontWeight: '700' }}>{c.time}</span> Price: <span style={{ color: '#111827', fontWeight: '700' }}>{c.price}</span> Distance: <span style={{ color: '#111827', fontWeight: '700' }}>{c.distance}</span></div>
                             </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                             <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Category: <span style={{ color: '#111827', fontWeight: '600' }}>{c.category}</span></div>
                             <button 
                                onClick={() => setSelectedCustomer(c)}
                                style={{ 
                                    backgroundColor: selectedCustomer?.id === c.id ? '#38AC57' : 'white', 
                                    color: selectedCustomer?.id === c.id ? 'white' : '#111827',
                                    border: '1px solid #e5e7eb', 
                                    padding: '0.5rem 2rem', 
                                    borderRadius: '2rem', 
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                              >
                                {selectedCustomer?.id === c.id ? 'Selected' : 'Select'}
                             </button>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Available Drivers */}
         <div className="card" style={{ padding: '2rem', borderRadius: '1.5rem', backgroundColor: 'white', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Available Drivers ({filteredDrivers.length})</h3>
                <button 
                   onClick={handleRefresh}
                   style={{ 
                       width: '40px', 
                       height: '40px', 
                       borderRadius: '0.75rem', 
                       backgroundColor: '#000', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       cursor: 'pointer',
                       border: 'none',
                       transition: 'all 0.2s',
                   }}
                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
                >
                    <RefreshCw size={20} color="white" style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                 {filteredDrivers.map((d, idx) => (
                    <div key={idx} style={{ padding: '1.25rem', border: '1px solid #f1f5f9', borderRadius: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                        <div style={{ display: 'flex', gap: '1.25rem' }}>
                             <div style={{ position: 'relative' }}>
                                <img src={d.img} alt="" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '2px 8px', borderRadius: '1rem', fontSize: '0.7rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '700' }}>
                                    <Star size={10} fill="#fbbf24" color="#fbbf24" /> {d.rating}
                                </div>
                             </div>
                             <div>
                                 <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#111827' }}>{d.id} · {d.name}</div>
                                 <div style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.35rem 0' }}>City: <span style={{ color: '#111827', fontWeight: '700' }}>{d.city}</span> Distance: <span style={{ color: '#111827', fontWeight: '700' }}>{d.distance}</span> Location: <span style={{ color: '#111827', fontWeight: '700' }}>{d.location}</span></div>
                                 <div style={{ fontSize: '0.85rem', color: '#38AC57', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600' }}>
                                     • {d.trips} Trips <img src={d.vehicleType === 'Moto' ? bikeIcon : d.vehicleType === 'Comfort' ? carIcon : taxiIcon} alt="" style={{ height: '12px', width: 'auto' }} />
                                 </div>
                             </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                             <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Category: <span style={{ color: '#111827', fontWeight: '600' }}>{d.vehicleType}</span></div>
                             <button 
                                onClick={() => setSelectedDriver(d)}
                                style={{ 
                                    backgroundColor: selectedDriver?.id === d.id ? '#38AC57' : 'white', 
                                    color: selectedDriver?.id === d.id ? 'white' : '#111827',
                                    border: '1px solid #e5e7eb', 
                                    padding: '0.5rem 2rem', 
                                    borderRadius: '2rem', 
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}
                             >
                                {selectedDriver?.id === d.id ? 'Selected' : 'Select'}
                             </button>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>

      {/* Recent Assignments Table */}
       <div>
           <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.5rem', color: '#111827' }}>Recent Assignments</h2>
           <div style={{ padding: 0, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                  <thead>
                      <tr style={{ backgroundColor: '#38AC57', color: 'white' }}>
                          <th style={{ padding: '1.25rem', fontWeight: '700', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', textAlign: 'left' }}>Assignment ID</th>
                          <th style={{ padding: '1.25rem', fontWeight: '700', textAlign: 'left' }}>Service Type</th>
                          <th style={{ padding: '1.25rem', fontWeight: '700', textAlign: 'left' }}>Rider</th>
                          <th style={{ padding: '1.25rem', fontWeight: '700', textAlign: 'left' }}>Driver</th>
                          <th style={{ padding: '1.25rem', fontWeight: '700', textAlign: 'left' }}>Assigned At</th>
                          <th style={{ padding: '1.25rem', fontWeight: '700', textAlign: 'left' }}>Status</th>
                          <th style={{ padding: '1.25rem', fontWeight: '700', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem', textAlign: 'center' }}>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredAssignments.map((assign: Assignment, idx: number) => (
                          <tr key={idx} style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderRadius: '1rem' }}>
                              <td style={{ padding: '1.25rem', fontWeight: '700', color: '#111827', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}>{assign.id}</td>
                              <td style={{ padding: '1.25rem' }}>
                                  <span style={{ 
                                      backgroundColor: assign.serviceColor, 
                                      color: assign.serviceTextColor, 
                                      padding: '0.4rem 1.25rem', 
                                      borderRadius: '1rem', 
                                      fontSize: '0.9rem',
                                      fontWeight: '600'
                                  }}>
                                    {assign.serviceType}
                                  </span>
                              </td>
                              <td style={{ padding: '1.25rem' }}>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                      <div style={{ position: 'relative' }}>
                                        <img src={assign.rider.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                        <div style={{ position: 'absolute', bottom: -2, right: -2, backgroundColor: 'white', padding: '1px 3px', borderRadius: '4px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1px', fontSize: '0.6rem' }}>
                                            <Star size={8} fill="#fbbf24" color="#fbbf24" /> {assign.rider.rating}
                                        </div>
                                      </div>
                                      <div>
                                          <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#111827' }}>{assign.rider.name}</div>
                                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{assign.rider.id}</div>
                                      </div>
                                   </div>
                              </td>
                              <td style={{ padding: '1.25rem' }}>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                      <div style={{ position: 'relative' }}>
                                        <img src={assign.driver.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                        <div style={{ position: 'absolute', bottom: -2, right: -2, backgroundColor: 'white', padding: '1px 3px', borderRadius: '4px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1px', fontSize: '0.6rem' }}>
                                            <Star size={8} fill="#fbbf24" color="#fbbf24" /> {assign.driver.rating}
                                        </div>
                                      </div>
                                      <div>
                                          <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#111827' }}>{assign.driver.name}</div>
                                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{assign.driver.id}</div>
                                      </div>
                                   </div>
                              </td>
                              <td style={{ padding: '1.25rem', fontWeight: '600', color: '#111827' }}>{assign.assignedAt}</td>
                              <td style={{ padding: '1.25rem' }}>
                                  {(() => {
                                    const s = getStatusStyle(assign.status);
                                    return (
                                      <span style={{ 
                                          backgroundColor: s.bg, 
                                          color: s.color, 
                                          padding: '0.4rem 1.25rem', 
                                          borderRadius: '0.5rem', 
                                          fontSize: '0.9rem',
                                          fontWeight: '600',
                                          border: `1px solid ${s.border}`
                                      }}>
                                        {statusLabel(assign.status)}
                                      </span>
                                    );
                                  })()}
                              </td>
                              <td style={{ padding: '1.25rem', textAlign: 'center', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                                  <button 
                                    onClick={() => handlePreview(assign)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '2rem', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}
                                  >
                                      <Eye size={16} /> Preview
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
           </div>
       </div>

       {/* Assignment Modal */}
       {showPreviewModal && previewAssignment && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '900px', maxHeight: '95vh', overflowY: 'auto', padding: '2.5rem', borderRadius: '1.5rem', position: 'relative', backgroundColor: '#fdfdfd' }}>
                
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                     <button 
                        onClick={() => setShowPreviewModal(false)} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'black', marginBottom: '1.5rem' }}
                     >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                     </button>
                     <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#111827', fontFamily: 'Outfit, Inter, sans-serif' }}>Assignment Details</h2>
                     <p style={{ color: '#94a3b8', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Information about this service assignment</p>
                </div>

                {/* Status Bar */}
                <div style={{ backgroundColor: 'white', padding: '1.25rem 2rem', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                     <div>
                         <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.2rem' }}>Start Time</div>
                         <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.startTime}</div>
                     </div>
                     <div>
                         <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.2rem' }}>End Time</div>
                         <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.endTime}</div>
                     </div>
                     <div>
                         <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.2rem' }}>Distance</div>
                         <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.distance}</div>
                     </div>
                     <div style={{ marginLeft: 'auto' }}>
                       {(() => {
                        const s = getStatusStyle(previewAssignment.status);
                        return (
                          <span style={{ 
                               backgroundColor: s.bg, 
                               color: s.color, 
                               padding: '0.5rem 1.25rem', 
                               borderRadius: '0.5rem', 
                               fontSize: '0.9rem', 
                               fontWeight: '700',
                               border: `1px solid ${s.border}`
                           }}>
                               {statusLabel(previewAssignment.status)}
                           </span>
                        );
                      })()}
                     </div>
                </div>

                {/* Passenger Information */}
                 <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#111827' }}>Passenger Information</h3>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                        {/* Row 1: Avatar + Full Name, Customer ID, Category, Gender */}
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                             <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img src={previewAssignment.rider.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #f1f5f9' }} />
                                <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', fontWeight: '700' }}>
                                    <Star size={10} fill="#fbbf24" color="#fbbf24" /> {previewAssignment.rider.rating}
                                </div>
                             </div>
                             <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Full Name</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.rider.name}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Customer ID</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.rider.id.replace('C-', 'R-')}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Category</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.rider.category}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Gender</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                          {previewAssignment.rider.gender === 'Male' ? '♂' : '♀'} {previewAssignment.rider.gender}
                                      </div>
                                  </div>
                             </div>
                        </div>
                        {/* Row 2: Email, Phone, City */}
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', paddingLeft: 'calc(64px + 1.5rem)' }}>
                               <div>
                                   <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Email</div>
                                   <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.rider.email}</div>
                               </div>
                               <div>
                                   <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Phone</div>
                                   <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.rider.phone}</div>
                               </div>
                               <div>
                                   <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>City</div>
                                   <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.rider.city}</div>
                               </div>
                         </div>
                    </div>
                 </div>

                {/* Driver Information */}
                <div style={{ marginBottom: '2rem' }}>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#111827' }}>Driver Information</h3>
                   <div style={{ backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                           <img src={previewAssignment.driver.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #f1f5f9' }} />
                           <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.15rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', fontWeight: '700' }}>
                               <Star size={10} fill="#fbbf24" color="#fbbf24" /> {previewAssignment.driver.rating}
                           </div>
                        </div>
                        <div style={{ flex: 1 }}>
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '1.25rem' }}>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Full Name</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.name}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Vehicle Type</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                          <img src={previewAssignment.driver.vehicleType === 'Moto' ? bikeIcon : previewAssignment.driver.vehicleType === 'Comfort' ? carIcon : taxiIcon} alt="" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} /> {previewAssignment.driver.vehicleType}
                                      </div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Phone</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.phone}</div>
                                  </div>
                             </div>
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Email</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.email}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Driver ID</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.id.replace('T-', 'R-')}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>City</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.city}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Gender</div>
                                      <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                          {previewAssignment.driver.gender === 'Male' ? '♂' : '♀'} {previewAssignment.driver.gender}
                                      </div>
                                  </div>
                             </div>
                        </div>
                   </div>
                </div>

                {/* Vehicle Information */}
                <div style={{ marginBottom: '2rem' }}>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#111827' }}>Vehicle Information</h3>
                   <div style={{ backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                            <div>
                               <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Driver ID</div>
                               <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.driverId}</div>
                           </div>
                           <div>
                               <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Vehicle Colour</div>
                               <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                   <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: previewAssignment.driver.vehicleColor.toLowerCase(), border: '1px solid #e5e7eb', display: 'inline-block', flexShrink: 0 }}></span> {previewAssignment.driver.vehicleColor}
                               </div>
                           </div>
                            <div>
                               <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Licence Plate Num</div>
                               <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.plateNumber}</div>
                           </div>
                           <div>
                               <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Make & Mode</div>
                               <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.makeModel}</div>
                           </div>
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.25rem' }}>
                           <div>
                               <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Year</div>
                               <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.year}</div>
                           </div>
                           <div>
                               <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.3rem' }}>Join Date</div>
                               <div style={{ fontWeight: '700', fontSize: '1rem', color: '#111827' }}>{previewAssignment.driver.joinDate}</div>
                           </div>
                       </div>
                   </div>
                </div>

                {/* Route Information */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                        {/* Pickup Card */}
                        <div style={{ backgroundColor: 'white', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <img src={pickupIcon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400', marginBottom: '0.2rem' }}>Pickup</div>
                                <div style={{ fontWeight: '400', fontSize: '1.25rem', color: '#111827', fontFamily: 'Inter, sans-serif' }}>{previewAssignment.route.from}</div>
                            </div>
                        </div>

                        {/* Swap Icon */}
                        <div style={{ 
                            position: 'absolute', 
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%)', 
                            zIndex: 10,
                            backgroundColor: 'white',
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            border: '1px solid #f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                        }}>
                             <img src={locationIcon} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                        </div>

                        {/* Destination Card */}
                        <div style={{ backgroundColor: 'white', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <img src={destinationIcon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400', marginBottom: '0.2rem' }}>Destination</div>
                                <div style={{ fontWeight: '400', fontSize: '1.25rem', color: '#111827', fontFamily: 'Inter, sans-serif' }}>{previewAssignment.route.to}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>Payment Information</h3>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                         {/* Driver Profile Section */}
                         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
                              <div style={{ position: 'relative' }}>
                                  <img src={previewAssignment.driver.img} alt="" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' }} />
                                  <div style={{ 
                                      position: 'absolute', 
                                      bottom: -12, 
                                      left: '50%', 
                                      transform: 'translateX(-50%)', 
                                      backgroundColor: 'white', 
                                      padding: '3px 12px', 
                                      borderRadius: '1rem', 
                                      fontSize: '0.9rem', 
                                      color: '#111827', 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      gap: '5px', 
                                      boxShadow: '0 4px 6px rgba(0,0,0,0.08)', 
                                      border: '1px solid #f1f5f9', 
                                      fontWeight: '600' 
                                  }}>
                                      <Star size={14} fill="#fbbf24" color="#fbbf24" /> {previewAssignment.driver.rating}
                                  </div>
                              </div>
                         </div>

                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', alignItems: 'center', textAlign: 'left' }}>
                              <div>
                                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400', marginBottom: '0.4rem' }}>TVA</div>
                                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.payment.tva}</div>
                              </div>
                              <div>
                                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400', marginBottom: '0.4rem' }}>Service fee</div>
                                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.payment.serviceFee}</div>
                              </div>
                              <div>
                                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400', marginBottom: '0.4rem' }}>Payment Method</div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                       <img 
                                         src={previewAssignment.payment.method === 'Cash' ? cashIcon : previewAssignment.payment.method === 'Visa' ? visaIcon : mastercardIcon} 
                                         alt="" 
                                         style={{ height: '22px', width: 'auto' }} 
                                       />
                                       <span style={{ fontWeight: '600', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.payment.method}</span>
                                  </div>
                              </div>
                              <div>
                                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400', marginBottom: '0.4rem' }}>Discount</div>
                                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.payment.discount}</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '400', marginBottom: '0.4rem' }}>Total Amount</div>
                                  <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#111827' }}>{previewAssignment.payment.total}</div>
                              </div>
                         </div>
                    </div>
                </div>

                 {/* Cancel Button */}
                 <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                     {previewAssignment.status !== 'Cancelled' && (
                         <button 
                            onClick={handleCancelAssignment}
                            style={{ backgroundColor: '#be1111', color: 'white', border: 'none', padding: '1rem 3rem', borderRadius: '2rem', fontWeight: '800', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(190, 17, 17, 0.2)' }}
                         >
                             Cancel Assignment
                         </button>
                     )}
                 </div>

            </div>
        </div>
       )}

    </div>
  );
};

const FormSelect = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem', color: '#111827' }}>{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          padding: '0.875rem 1.25rem', 
          borderRadius: '1rem', 
          border: '1px solid #f1f5f9', 
          backgroundColor: '#f8fafc', 
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: value ? '#111827' : '#94a3b8',
          fontSize: '0.95rem',
          fontWeight: value ? '700' : '400'
        }}
      >
        {value || 'Select'}
        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>▼</span>
      </div>
      {isOpen && (
        <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 100, border: '1px solid #f1f5f9', padding: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
          {options.map((opt: string) => (
            <div 
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '0.75rem', fontSize: '0.95rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
