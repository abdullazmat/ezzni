import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, Eye, RefreshCw, X, Users, ArrowLeft, MapPin, Car, Check } from 'lucide-react';

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
  statusColor: string;
  statusTextColor: string;
  payment: {
    tva: string;
    serviceFee: string;
    method: string;
    discount: string;
    total: string;
  };
}

export const RideAssignment = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewAssignment, setPreviewAssignment] = useState<Assignment | null>(null);
  
  // Filter & Form States
  const [filterStat, setFilterStat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formService, setFormService] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formNotes, setFormNotes] = useState('');

  // Dropdown & Filter Interaction States
  const [activeDropdown, setActiveDropdown] = useState<'city' | 'filters' | null>(null);
  const [cityFilter, setCityFilter] = useState<string>('All');
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
      serviceColor: '#dcfce7',
      serviceTextColor: '#166534',
      rider: customers[3],
      driver: drivers[0],
      route: { from: 'Fès Medina', to: 'Train Station' },
      assignedAt: '09:58 AM',
      startTime: '14:30',
      endTime: '14:55',
      distance: '45km',
      status: 'Searching',
      statusColor: '#f3f4f6',
      statusTextColor: '#6b7280',
      payment: { tva: '1%', serviceFee: '0.00 MAD', method: 'Mastercard', discount: '0%', total: '45.50 MAD' }
    },
    {
      id: 'A002',
      serviceType: 'Delivery',
      serviceColor: '#dcfce7',
      serviceTextColor: '#166534',
      rider: customers[3],
      driver: drivers[0],
      route: { from: 'Restaurant Casablanca', to: 'Customer Location' },
      assignedAt: '09:45 AM',
      startTime: '09:45',
      endTime: '10:15',
      distance: '8km',
      status: 'Accepted',
      statusColor: '#dcfce7',
      statusTextColor: '#166534',
      payment: { tva: '1%', serviceFee: '2.00 MAD', method: 'Cash', discount: '10%', total: '38.00 MAD' }
    }
  ]);

  const stats = [
    { id: 'waiting', label: 'Waiting Customers', value: '068', icon: Users, color: '#16a34a', bg: 'white', arrow: true, activeBg: '#dcfce7' },
    { id: 'available', label: 'Available Drivers', value: '045', icon: Users, color: '#16a34a', bg: 'white', arrow: true, activeBg: '#dcfce7' },
    { id: 'active', label: 'Active Assignments', value: '036', icon: RefreshCw, color: '#16a34a', bg: 'white', arrow: true, activeBg: '#dcfce7' },
    { id: 'completed', label: 'Completed Today', value: '075', icon: RefreshCw, color: '#16a34a', bg: 'white', arrow: true, activeBg: '#dcfce7' },
  ];

  // Derived State
  const cities = ['All', ...Array.from(new Set([...customers.map(c => c.city), ...drivers.map(d => d.city)]))];

  const filteredCustomers = customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (cityFilter === 'All' || c.city === cityFilter)
  );

  const filteredDrivers = drivers.filter(d => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (cityFilter === 'All' || d.city === cityFilter)
  );


  // Handlers
  const handleHandleStatClick = (id: string) => {
      setFilterStat(prev => prev === id ? null : id);
  };

  const handleAssign = () => {
    if (!selectedCustomer || !selectedDriver) return;
    
    const newAssignment: Assignment = {
      id: `A00${assignments.length + 1}`,
      serviceType: formService || selectedDriver.vehicle,
      serviceColor: '#dcfce7',
      serviceTextColor: '#166534',
      rider: selectedCustomer,
      driver: selectedDriver,
      route: { from: selectedCustomer.from, to: selectedCustomer.to },
      assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      startTime: 'Now',
      endTime: 'Est. 20m',
      distance: selectedCustomer.distance,
      status: 'In_progress',
      statusColor: '#fef3c7',
      statusTextColor: '#d97706',
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
    setAssignments(assignments.map(a => 
      a.id === previewAssignment.id 
        ? { ...a, status: 'Cancelled', statusColor: '#fee2e2', statusTextColor: '#dc2626' } 
        : a
    ));
    setPreviewAssignment(prev => prev ? ({ ...prev, status: 'Cancelled', statusColor: '#fee2e2', statusTextColor: '#dc2626' }) : null);
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
            const isActive = filterStat === stat.id;
            return (
              <div 
                key={idx} 
                onClick={() => handleHandleStatClick(stat.id)}
                style={{ 
                    padding: '1.5rem', 
                    borderRadius: '1.5rem', 
                    backgroundColor: isActive ? '#22c55e' : 'white', 
                    color: isActive ? 'white' : 'var(--text-primary)', 
                    position: 'relative', 
                    boxShadow: isActive ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: isActive ? 'translateY(-2px)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <stat.icon size={20} color={isActive ? 'white' : '#22c55e'} />
                  <span style={{ fontWeight: '600' }}>{stat.label}</span>
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.value}</div>
                {stat.arrow && (
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: isActive ? 'white' : '#22c55e', borderRadius: '50%', padding: '0.5rem', color: isActive ? '#22c55e' : 'white', display: 'flex' }}>
                    <ArrowUpRight size={16} />
                  </div>
                )}
              </div>
            );
        })}
      </div>

      {/* New Assignment Form */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>New Assignment</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
           <FormSelect label="Select Category*" value={formCategory} options={['Hezzni XL', 'Standard', 'Lux']} onChange={setFormCategory} />
           <FormSelect label="Select Customer*" value={selectedCustomer ? selectedCustomer.name : ''} options={customers.map(c => c.name)} onChange={(val) => {
              const c = customers.find(cust => cust.name === val);
              if (c) setSelectedCustomer(c);
           }} />
           <FormSelect label="Select Driver*" value={selectedDriver ? selectedDriver.name : ''} options={drivers.map(d => d.name)} onChange={(val) => {
               const d = drivers.find(drv => drv.name === val);
               if (d) setSelectedDriver(d);
           }} />
           <FormSelect label="Select Service*" value={formService} options={['Taxi', 'Delivery', 'Freight']} onChange={setFormService} />
           <FormSelect label="City*" value={formCity} options={['Casablanca', 'Marrakech', 'Rabat']} onChange={setFormCity} />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
           <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Notes <span style={{ color: '#9ca3af', fontWeight: 'normal' }}>Optional</span></label>
           <textarea 
             placeholder="Type here"
             value={formNotes}
             onChange={(e) => setFormNotes(e.target.value)} 
             style={{ width: '100%', height: '100px', padding: '1rem', borderRadius: '1rem', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', resize: 'none', outline: 'none' }}
           ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
                onClick={handleAssign}
                disabled={!selectedCustomer || !selectedDriver}
                style={{ 
                    backgroundColor: selectedCustomer && selectedDriver ? '#22c55e' : '#f3f4f6', 
                    color: selectedCustomer && selectedDriver ? 'white' : '#9ca3af',
                    border: selectedCustomer && selectedDriver ? 'none' : '1px solid #e5e7eb',
                    padding: '0.8rem 2rem', 
                    borderRadius: '2rem', 
                    fontWeight: '600',
                    cursor: selectedCustomer && selectedDriver ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s'
                }}
            >
                Assign Services
            </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} ref={dropdownRef}>
         <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
                type="text" 
                placeholder="Search customers, drivers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '2rem', border: '1px solid #e5e7eb', outline: 'none' }} 
            />
            {searchTerm && <X size={16} color="#9ca3af" onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />}
         </div>
         
         {/* City Dropdown */}
         <div style={{ position: 'relative' }}>
             <button 
                onClick={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
                style={{ padding: '0.7rem 1.5rem', borderRadius: '2rem', border: `1px solid ${activeDropdown === 'city' ? '#22c55e' : '#e5e7eb'}`, backgroundColor: activeDropdown === 'city' ? '#f0fdf4' : 'white', color: activeDropdown === 'city' ? '#166534' : 'black', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', transition: 'all 0.2s' }}>
                {cityFilter === 'All' ? 'City' : cityFilter} <span style={{ fontSize: '0.7rem' }}>▼</span>
             </button>
             {activeDropdown === 'city' && (
                 <div style={{ position: 'absolute', top: '120%', left: 0, width: '180px', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '0.5rem', zIndex: 50, border: '1px solid #f3f4f6' }}>
                     {cities.map((city) => (
                         <div 
                            key={city}
                            onClick={() => { setCityFilter(city); setActiveDropdown(null); }}
                            style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '0.5rem', backgroundColor: cityFilter === city ? '#f0fdf4' : 'transparent', color: cityFilter === city ? '#166534' : 'inherit' }}
                            className="hover:bg-gray-50"
                         >
                             {city}
                             {cityFilter === city && <Check size={14} />}
                         </div>
                     ))}
                 </div>
             )}
         </div>

         {/* Filters Dropdown */}
         <div style={{ position: 'relative' }}>
             <button 
                onClick={() => setActiveDropdown(activeDropdown === 'filters' ? null : 'filters')}
                style={{ padding: '0.7rem 1.5rem', borderRadius: '2rem', border: `1px solid ${activeDropdown === 'filters' ? '#22c55e' : '#e5e7eb'}`, backgroundColor: activeDropdown === 'filters' ? '#f0fdf4' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', transition: 'all 0.2s' }}>
                <SlidersHorizontal size={14} /> Filters
             </button>
             {activeDropdown === 'filters' && (
                 <div style={{ position: 'absolute', top: '120%', left: 0, width: '220px', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '0.5rem', zIndex: 50, border: '1px solid #f3f4f6' }}>
                     <div style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600' }}>Sort By</div>
                     <div style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '0.5rem' }}>Highest Rated</div>
                     <div style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '0.5rem' }}>Most Trips</div>
                     <div style={{ borderTop: '1px solid #f3f4f6', margin: '0.5rem 0' }}></div>
                     <div 
                        onClick={() => { setCityFilter('All'); setActiveDropdown(null); }}
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '0.5rem', color: '#ef4444', fontWeight: '500' }}
                     >
                         Reset All Filters
                     </div>
                 </div>
             )}
         </div>
      </div>

      {/* Lists Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
         {/* Waiting Customers */}
         <div className="card" style={{ opacity: filterStat && filterStat !== 'waiting' ? 0.5 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Waiting Customers ({filteredCustomers.length})</h3>
                <RefreshCw 
                    size={20} 
                    onClick={handleRefresh}
                    style={{ 
                        cursor: 'pointer', 
                        transition: 'transform 0.8s', 
                        transform: isRefreshing ? 'rotate(360deg)' : 'none',
                        color: isRefreshing ? '#22c55e' : 'inherit'
                    }} 
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredCustomers.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No customers found matching filters</div>
                ) : (
                    filteredCustomers.map((c, idx) => (
                    <div key={idx} style={{ padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                             <div style={{ position: 'relative' }}>
                                <img src={c.img} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px' }}>★ {c.rating}</div>
                             </div>
                             <div>
                                 <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{c.id} · {c.name}</div>
                                 <div style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.2rem 0' }}>{c.from} → {c.to}</div>
                                 <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Requested: <span style={{ color: 'black' }}>{c.time}</span> Price: <span style={{ color: 'black' }}>{c.price}</span> Distance: <span style={{ color: 'black' }}>{c.distance}</span></div>
                             </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                             <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Category:</div>
                             <button 
                                onClick={() => setSelectedCustomer(c)}
                                style={{ 
                                    backgroundColor: selectedCustomer?.id === c.id ? '#22c55e' : 'white', 
                                    color: selectedCustomer?.id === c.id ? 'white' : 'black',
                                    border: '1px solid #e5e7eb', 
                                    padding: '0.4rem 1.2rem', 
                                    borderRadius: '2rem', 
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                              >
                                {selectedCustomer?.id === c.id ? 'Selected' : 'Select'}
                             </button>
                        </div>
                    </div>
                )))}
            </div>
         </div>

         {/* Available Drivers */}
         <div className="card" style={{ opacity: filterStat && filterStat !== 'available' ? 0.5 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Available Drivers ({filteredDrivers.length})</h3>
                <RefreshCw 
                    size={20} 
                    onClick={handleRefresh}
                    style={{ 
                        cursor: 'pointer', 
                        transition: 'transform 0.8s', 
                        transform: isRefreshing ? 'rotate(360deg)' : 'none',
                        color: isRefreshing ? '#22c55e' : 'inherit'
                    }} 
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {filteredDrivers.length === 0 ? (
                     <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No drivers found matching filters</div>
                 ) : (
                    filteredDrivers.map((d, idx) => (
                    <div key={idx} style={{ padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                             <div style={{ position: 'relative' }}>
                                <img src={d.img} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.3rem', borderRadius: '0.3rem', fontSize: '0.6rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px' }}>★ {d.rating}</div>
                             </div>
                             <div>
                                 <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{d.id} · {d.name}</div>
                                 <div style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.2rem 0' }}>City: <span style={{ color: 'black', fontWeight: '500' }}>{d.city}</span> Distance: <span style={{ color: 'black', fontWeight: '500' }}>{d.distance}</span> Location: <span style={{ fontWeight: '500', color: 'black' }}>{d.location}</span></div>
                                 <div style={{ fontSize: '0.75rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>• {d.trips} Trips <span style={{ fontSize: '0.8rem' }}>🚗</span></div>
                             </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                             <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '0.5rem' }}>Category:</div>
                             <button 
                                onClick={() => setSelectedDriver(d)}
                                style={{ 
                                    backgroundColor: selectedDriver?.id === d.id ? '#22c55e' : 'white', 
                                    color: selectedDriver?.id === d.id ? 'white' : 'black',
                                    border: '1px solid #e5e7eb', 
                                    padding: '0.4rem 1.2rem', 
                                    borderRadius: '2rem', 
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                             >
                                {selectedDriver?.id === d.id ? 'Selected' : 'Select'}
                             </button>
                        </div>
                    </div>
                )))}
            </div>
         </div>
      </div>

      {/* Recent Assignments Table */}
       <div>
           <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Recent Assignments</h2>
           <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                      <tr style={{ backgroundColor: '#22c55e', color: 'white', textAlign: 'left' }}>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Assignment ID</th>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Service Type</th>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Rider</th>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Driver</th>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Route</th>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Assigned At</th>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                          <th style={{ padding: '1rem', fontWeight: '600' }}>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {assignments
                      .filter(a => {
                          if (filterStat === 'active') return a.status === 'In_progress' || a.status === 'Searching' || a.status === 'Accepted';
                          if (filterStat === 'completed') return a.status === 'Completed';
                          return true;
                      })
                      .map((assign, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: 'white' }}>
                              <td style={{ padding: '1rem', fontWeight: '600' }}>{assign.id}</td>
                              <td style={{ padding: '1rem' }}>
                                  <span style={{ backgroundColor: assign.serviceColor, color: assign.serviceTextColor, padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.85rem' }}>{assign.serviceType}</span>
                              </td>
                              <td style={{ padding: '1rem' }}>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      <img src={assign.rider.img} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                      <div>
                                          <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{assign.rider.name}</div>
                                          <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{assign.rider.id}</div>
                                      </div>
                                   </div>
                              </td>
                              <td style={{ padding: '1rem' }}>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      <img src={assign.driver.img} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                                      <div>
                                          <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{assign.driver.name}</div>
                                          <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{assign.driver.id}</div>
                                      </div>
                                   </div>
                              </td>
                              <td style={{ padding: '1rem' }}>
                                  <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{assign.route.from} →</div>
                                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{assign.route.to}</div>
                              </td>
                              <td style={{ padding: '1rem', fontWeight: '500' }}>{assign.assignedAt}</td>
                              <td style={{ padding: '1rem' }}>
                                  <span style={{ backgroundColor: assign.statusColor, color: assign.statusTextColor, padding: '0.2rem 0.6rem', borderRadius: '0.3rem', fontSize: '0.85rem' }}>{assign.status}</span>
                              </td>
                              <td style={{ padding: '1rem' }}>
                                  <button 
                                    onClick={() => handlePreview(assign)}
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
       </div>

       {/* Assignment Modal */}
       {showPreviewModal && previewAssignment && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '550px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', borderRadius: '1.5rem', position: 'relative', backgroundColor: '#fdfdfd' }}>
                
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                     <button 
                        onClick={() => setShowPreviewModal(false)} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'black' }}
                     >
                        <ArrowLeft size={24} strokeWidth={2.5} />
                     </button>
                     <div>
                         <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>Assignment Details</h2>
                         <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem' }}>Information about this service assignment</p>
                     </div>
                </div>

                {/* Status Bar */}
                <div style={{ backgroundColor: 'white', padding: '1rem 1.5rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                     <div>
                         <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Start Time</div>
                         <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{previewAssignment.startTime}</div>
                     </div>
                     <div>
                         <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>End Time</div>
                         <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{previewAssignment.endTime}</div>
                     </div>
                     <div>
                         <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Distance</div>
                         <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{previewAssignment.distance}</div>
                     </div>
                     <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>{previewAssignment.status}</span>
                </div>

                {/* Passenger Information */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Passenger Information</h3>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                             <div style={{ position: 'relative' }}>
                                <img src={previewAssignment.rider.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                                <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {previewAssignment.rider.rating}</div>
                             </div>
                             <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'min-content 1fr', columnGap: '2rem', rowGap: '0.5rem' }}>
                                  <div style={{ whiteSpace: 'nowrap' }}>
                                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name</div>
                                      <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{previewAssignment.rider.name}</div>
                                  </div>
                                  <div>
                                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Customer ID</div>
                                      <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{previewAssignment.rider.id}</div>
                                  </div>
                             </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Category</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.rider.category}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Gender</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>♂ {previewAssignment.rider.gender}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Email</div>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem', wordBreak: 'break-all' }}>{previewAssignment.rider.email}</div>
                            </div>
                             <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Phone</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.rider.phone}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>City</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.rider.city}</div>
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
                                <img src={previewAssignment.driver.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                                <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {previewAssignment.driver.rating}</div>
                             </div>
                             <div style={{ flex: 1 }}>
                                  <div style={{ marginBottom: '0.5rem' }}>
                                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Full Name</div>
                                      <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{previewAssignment.driver.name}</div>
                                  </div>
                             </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Vehicle Type</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                    <Car size={16} /> {previewAssignment.driver.vehicleType}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Phone</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.phone}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Email</div>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem', wordBreak: 'break-all' }}>{previewAssignment.driver.email}</div>
                            </div>
                             <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Driver ID</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.driverId}</div>
                            </div>
                             <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>City</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.city}</div>
                            </div>
                             <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Gender</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>♂ {previewAssignment.driver.gender}</div>
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
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.driverId}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Vehicle Colour</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: previewAssignment.driver.vehicleColor.toLowerCase(), border: '1px solid #e5e7eb' }}></span> {previewAssignment.driver.vehicleColor}
                                </div>
                            </div>
                             <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Licence Plate Num</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.plateNumber}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Year</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.year}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Join Date</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.joinDate}</div>
                            </div>
                             <div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Make & Mode</div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{previewAssignment.driver.makeModel}</div>
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
                              <div style={{ fontWeight: '600', fontSize: '1rem', marginLeft: '1rem' }}>{previewAssignment.route.from}</div>
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
                              <div style={{ fontWeight: '600', fontSize: '1rem', marginLeft: '1rem' }}>{previewAssignment.route.to}</div>
                          </div>
                      </div>
                </div>

                {/* Payment Information */}
                <div>
                     <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Payment Information</h3>
                     <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                               <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img src={previewAssignment.driver.img} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', color: 'black', display: 'flex', alignItems: 'center', gap: '2px', whiteSpace: 'nowrap' }}>★ {previewAssignment.driver.rating}</div>
                               </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', textAlign: 'center' }}>
                               <div>
                                   <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>TVA</div>
                                   <div style={{ fontWeight: 'bold' }}>{previewAssignment.payment.tva}</div>
                               </div>
                               <div>
                                   <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Service fee</div>
                                   <div style={{ fontWeight: 'bold' }}>{previewAssignment.payment.serviceFee}</div>
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
                                   <div style={{ fontWeight: 'bold' }}>{previewAssignment.payment.discount}</div>
                               </div>
                               <div>
                                   <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Total Amount</div>
                                   <div style={{ fontWeight: 'bold' }}>{previewAssignment.payment.total}</div>
                               </div>
                          </div>
                     </div>
                </div>

                 {/* Cancel Button */}
                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                     {previewAssignment.status !== 'Cancelled' && (
                         <button 
                            onClick={handleCancelAssignment}
                            style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '1rem 3rem', borderRadius: '2rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}
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

interface FormSelectProps {
   label: string;
   options: string[];
   value?: string;
   onChange?: (val: string) => void;
}

const FormSelect = ({ label, options, value, onChange }: FormSelectProps) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>{label}</label>
        <div style={{ position: 'relative' }}>
            <select 
                value={value || ''}
                onChange={(e) => onChange && onChange(e.target.value)}
                style={{ 
                    width: '100%', 
                    padding: '0.7rem 1rem', 
                    borderRadius: '0.75rem', 
                    border: '1px solid #e5e7eb', 
                    backgroundColor: '#f9fafb', 
                    outline: 'none', 
                    appearance: 'none',
                    cursor: 'pointer'
                }}
            >
                <option value="" disabled>Select</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                ))}
            </select>
            <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '0.8rem', color: '#6b7280' }}>▼</div>
        </div>
    </div>
);
