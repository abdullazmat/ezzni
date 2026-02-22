import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  FileText, 
  FileSpreadsheet, 
  Download, 
  ArrowUpRight, 
  ChevronRight,
  Star
} from 'lucide-react';

// Specialized Icons
import totalTripsIcon from '../assets/icons/Total Trips Today.png';
import activeDriversIcon from '../assets/icons/Active Drivers.png';
import revenueIcon from '../assets/icons/Revenue.png';
import carIcon from '../assets/icons/car.png';

/* --- Dummy Data --- */

const SERVICE_VOLUME_DATA = [
  { time: '06:00', 'Car Ride': 400, 'Motorcycle': 240, 'Rental Car': 180, 'Reservation': 100, 'City To City': 50, 'Delivery': 40 },
  { time: '09:00', 'Car Ride': 300, 'Motorcycle': 139, 'Rental Car': 250, 'Reservation': 120, 'City To City': 60, 'Delivery': 50 },
  { time: '12:00', 'Car Ride': 200, 'Motorcycle': 980, 'Rental Car': 220, 'Reservation': 140, 'City To City': 70, 'Delivery': 60 },
  { time: '15:00', 'Car Ride': 278, 'Motorcycle': 390, 'Rental Car': 200, 'Reservation': 160, 'City To City': 80, 'Delivery': 70 },
  { time: '18:00', 'Car Ride': 189, 'Motorcycle': 480, 'Rental Car': 210, 'Reservation': 180, 'City To City': 90, 'Delivery': 80 },
  { time: '21:00', 'Car Ride': 239, 'Motorcycle': 380, 'Rental Car': 250, 'Reservation': 200, 'City To City': 100, 'Delivery': 90 },
  { time: '00:00', 'Car Ride': 349, 'Motorcycle': 430, 'Rental Car': 210, 'Reservation': 220, 'City To City': 110, 'Delivery': 100 },
];

const REVENUE_BY_SERVICE_DATA = [
  { day: 'Mon', revenue: 500 },
  { day: 'Tue', revenue: 400 },
  { day: 'Wed', revenue: 600 },
  { day: 'Thurs', revenue: 300 },
  { day: 'Fri', revenue: 600 },
  { day: 'Sat', revenue: 500 },
  { day: 'Sun', revenue: 300 },
];

const REGIONAL_PERFORMANCE_DATA = [
  { name: 'Casablanca-Settat', value: 35, color: '#38AC57', revenue: '180,000' },
  { name: 'Rabat-Salé-Kénitra', value: 25, color: '#0ea5e9', revenue: '95,000' },
  { name: 'Marrakech-Safi', value: 15, color: '#f97316', revenue: '75,000' },
  { name: 'Fès-Meknès', value: 10, color: '#eab308', revenue: '58,000' },
  { name: 'Tanger-Tetouan-Al Hoceima', value: 8, color: '#ef4444', revenue: '48,000' },
  { name: 'Oriental', value: 4, color: '#8b5cf6', revenue: '32,000' },
  { name: 'Béni Mellal-Khénitra', value: 3, color: '#ec4899', revenue: '24,000' },
];

const DRIVERS_DATA = [
  { id: 1, name: 'Ahmed Hassan', region: 'Casablanca-Settat', trips: 156, earnings: '12,450', rating: 4.8, status: 'Active' },
  { id: 2, name: 'Ahmed Hassan', region: 'Casablanca-Settat', trips: 156, earnings: '12,450', rating: 4.8, status: 'Active' },
  { id: 3, name: 'Ahmed Hassan', region: 'Casablanca-Settat', trips: 156, earnings: '12,450', rating: 4.8, status: 'Active' },
  { id: 4, name: 'Ahmed Hassan', region: 'Casablanca-Settat', trips: 156, earnings: '12,450', rating: 4.8, status: 'Active' },
  { id: 5, name: 'Ahmed Hassan', region: 'Casablanca-Settat', trips: 156, earnings: '12,450', rating: 4.8, status: 'Active' },
];

const RIDERS_DATA = [
  { id: 1, name: 'Sara Kamali', region: 'Rabat-Salé-Kénitra', trips: 42, earnings: '3,200', rating: 4.9, status: 'Frequent' },
  { id: 2, name: 'Sara Kamali', region: 'Rabat-Salé-Kénitra', trips: 42, earnings: '3,200', rating: 4.9, status: 'Frequent' },
  { id: 3, name: 'Sara Kamali', region: 'Rabat-Salé-Kénitra', trips: 42, earnings: '3,200', rating: 4.9, status: 'Frequent' },
  { id: 4, name: 'Sara Kamali', region: 'Rabat-Salé-Kénitra', trips: 42, earnings: '3,200', rating: 4.9, status: 'Frequent' },
];

export const Reports = () => {
  const [regionFilter, setRegionFilter] = useState('Region');
  const [serviceFilter, setServiceFilter] = useState('Service');
  const [timeFilter, setTimeFilter] = useState('This Month');
  const [activeTab, setActiveTab] = useState<'drivers' | 'riders'>('drivers');

  const [activeStat, setActiveStat] = useState<string>('Total Earning');

  /* Handlers */
  const handleExport = (type: string) => {
    alert(`Exporting as ${type}...`);
  };

  const currentListData = activeTab === 'drivers' ? DRIVERS_DATA : RIDERS_DATA;

  const statCards = [
    { label: 'Total Trips', value: '8,547', change: '+12% From Last Month', icon: totalTripsIcon },
    { label: 'Total Earning', value: '452,300', suffix: 'MAD', change: '+18% From Last Month', icon: revenueIcon },
    { label: 'Active Drivers', value: '342', change: '+5% From Last Month', icon: activeDriversIcon },
    { label: 'Fleet Size', value: '458', change: '+3 New Vehicles', icon: carIcon },
  ];

  return (
    <div className="ra-page-wrapper">
      <style>{`
        .ra-page-wrapper {
            width: 100%;
            overflow-x: hidden;
            background-color: #f8fafc;
            min-height: 100vh;
        }

        .ra-page-container {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            padding: 2.5rem;
            max-width: 1600px;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
        }
        
        .ra-page-container * {
            box-sizing: border-box;
        }

        .ra-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 0.5rem;
            width: 100%;
        }
        .ra-header-title h1 {
            font-size: 2.25rem;
            font-weight: 900;
            letter-spacing: -0.025em;
            margin: 0;
            color: var(--text-primary);
        }
        .ra-filters-group {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .ra-export-row {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: -1rem;
            width: 100%;
        }
        .ra-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            width: 100%;
        }
        .ra-stat-value {
            font-size: 2.5rem;
            font-weight: 900;
            letter-spacing: -0.025em;
        }
        .ra-charts-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            width: 100%;
        }
        .ra-pie-content {
            display: flex;
            align-items: center;
            gap: 2rem;
            flex: 1;
            width: 100%;
        }
        .ra-pie-chart-box {
            width: 45%; 
            height: 300px;
        }
        .ra-pie-legend {
            width: 55%; 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 1.25rem;
        }
        .ra-table-wrapper {
            background: white;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            width: 100%;
        }
        .ra-table-container {
            overflow-x: auto;
            width: 100%;
        }
        .ra-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 800px;
        }
        .ra-table th {
            text-align: left;
            padding: 1.25rem 1.5rem;
            font-size: 0.85rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background-color: #f8fafc;
        }
        .ra-table td {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid #f1f5f9;
        }

        @media (max-width: 1400px) {
            .ra-stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 992px) {
            .ra-charts-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .ra-page-container {
                padding: 1.5rem 1rem;
                gap: 1.5rem;
            }
            .ra-header {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .ra-header-title h1 {
                font-size: 1.75rem;
            }
            .ra-filters-group {
                flex-direction: column;
                width: 100%;
                gap: 0.75rem;
            }
            .ra-filters-group select {
                width: 100%;
            }
            .ra-export-row {
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 0;
            }
            .ra-export-row button {
                width: 100%;
                justify-content: center;
            }
            .ra-stats-grid {
                grid-template-columns: 1fr;
            }
            .ra-stat-value {
                font-size: 1.75rem;
                word-break: break-all;
            }
            .ra-pie-content {
                flex-direction: column;
                gap: 2rem;
            }
            .ra-pie-chart-box {
                width: 100% !important;
                height: 240px !important;
            }
            .ra-pie-legend {
                width: 100% !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 1.5rem !important;
            }
            .ra-pie-card-header {
                flex-direction: column;
                align-items: center !important;
                text-align: center;
                gap: 0.75rem;
            }
            .ra-charts-grid .card {
                padding: 1.25rem;
            }
            .ra-legend-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
      `}</style>
      
      <div className="ra-page-container">
        {/* --- Page Header & Filters --- */}
        <div className="ra-header">
          <div className="ra-header-title">
            <h1>Reports & Analytics</h1>
            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '1rem', fontWeight: '500' }}>
              Comprehensive business insights across all regions and services
            </p>
          </div>

          <div className="ra-filters-group">
            <select 
              className="filter-select"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              style={{ borderRadius: '1.5rem', padding: '0.75rem 1.5rem', fontWeight: '700' }}
            >
              <option>Region</option>
              <option>Casablanca-Settat</option>
              <option>Rabat-Salé-Kénitra</option>
              <option>Marrakech-Safi</option>
            </select>
            <select 
              className="filter-select"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              style={{ borderRadius: '1.5rem', padding: '0.75rem 1.5rem', fontWeight: '700' }}
            >
              <option>Service</option>
              <option>Car Ride</option>
              <option>Motorcycle</option>
              <option>Delivery</option>
            </select>
            <select 
              className="filter-select"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              style={{ borderRadius: '1.5rem', padding: '0.75rem 1.5rem', fontWeight: '700' }}
            >
              <option>This Month</option>
              <option>This Week</option>
              <option>Today</option>
              <option>Year To Date</option>
            </select>
          </div>
        </div>

      {/* --- Export Buttons Row --- */}
      <div className="ra-export-row">
        <button className="filter-btn" onClick={() => handleExport('PDF')} style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', borderRadius: '100px', padding: '0.75rem 1.5rem' }}>
          <Download size={18} /> Export PDF
        </button>
        <button className="export-btn" onClick={() => handleExport('Excel')} style={{ backgroundColor: 'var(--primary-color)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', borderRadius: '100px', padding: '0.75rem 1.5rem' }}>
          <FileSpreadsheet size={18} /> Export Excel
        </button>
        <button className="filter-btn" onClick={() => handleExport('CSV')} style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.6rem', borderRadius: '100px', padding: '0.75rem 1.5rem' }}>
          <FileText size={18} /> Export CSV
        </button>
      </div>

      {/* --- Stats Cards Grid --- */}
      <div className="ra-stats-grid">
        {statCards.map((stat) => {
          const isActive = activeStat === stat.label;
          return (
            <div 
              key={stat.label}
              className="stat-card" 
              onClick={() => setActiveStat(stat.label)}
              style={{ 
                backgroundColor: isActive ? 'var(--primary-color)' : 'white', 
                color: isActive ? 'white' : 'inherit',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '1.75rem',
                borderRadius: '32px',
                border: isActive ? 'none' : '1px solid #e2e8f0',
                boxShadow: isActive ? '0 20px 25px -5px rgba(56, 172, 87, 0.2)' : 'none'
              }}
            >
              <div className="stat-header" style={{ marginBottom: '1.5rem' }}>
                <div className="stat-icon" style={{ backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(56, 172, 87, 0.1)', width: '56px', height: '56px', borderRadius: '16px' }}>
                  <img src={stat.icon} alt={stat.label} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="stat-label" style={{ color: isActive ? 'white' : '#64748b', fontWeight: '700', fontSize: '0.9rem' }}>{stat.label}</span>
                    <span style={{ fontSize: '0.75rem', color: isActive ? 'white' : 'var(--primary-color)', fontWeight: '800', opacity: isActive ? 0.9 : 1 }}>{stat.change}</span>
                </div>
              </div>
              <div className="ra-stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', color: isActive ? 'white' : '#1e293b' }}>
                {stat.value} {stat.suffix && <span style={{ fontSize: '1.25rem', fontWeight: '600', opacity: 0.8 }}>{stat.suffix}</span>}
              </div>
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '1.75rem', 
                  right: '1.75rem', 
                  backgroundColor: isActive ? 'rgba(0,0,0,0.15)' : '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px'
                }} 
              >
                <ArrowUpRight size={22} color={isActive ? 'white' : 'var(--primary-color)'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Charts Section Lower --- */}
      <div className="ra-charts-grid">
        
        {/* Service Volume by Hour */}
        <div className="card" style={{ borderRadius: '32px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '2rem', letterSpacing: '-0.01em' }}>Service Volume by Hour</h3>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SERVICE_VOLUME_DATA}>
                <defs>
                  <linearGradient id="colorCar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38AC57" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#38AC57" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: '600' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: '600' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="Car Ride" stroke="#38AC57" strokeWidth={3} fillOpacity={1} fill="url(#colorCar)" stackId="1" />
                <Area type="monotone" dataKey="Motorcycle" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorCar)" stackId="1" />
                <Area type="monotone" dataKey="Rental Car" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCar)" stackId="1" />
                <Area type="monotone" dataKey="Reservation" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorCar)" stackId="1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="ra-legend-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
            {['Car Ride', 'Motorcycle', 'Rental Car', 'Reservation', 'City To City', 'Delivery', 'Taxi', 'Group Ride', 'Airport Ride'].map((label, idx) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: ['#38AC57', '#0ea5e9', '#f97316', '#ef4444', '#8b5cf6', '#ec4899', '#38AC57', '#f59e0b', '#dc2626'][idx] }}></div>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Service (MAD) */}
        <div className="card" style={{ borderRadius: '32px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '2rem', letterSpacing: '-0.01em' }}>Revenue by Service (MAD)</h3>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_BY_SERVICE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: '600' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: '600' }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" fill="var(--primary-color)" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Middle Row: Regional Performance vs Drivers/Riders --- */}
      <div className="ra-charts-grid">
        
        {/* Regional Performance Pie */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', borderRadius: '32px', padding: '2rem' }}>
          <div className="ra-pie-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h3 style={{ fontSize: '1.25rem', fontWeight: '900', margin: 0, letterSpacing: '-0.01em' }}>Regional Performance</h3>
             <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '800' }}>Monthly Revenue View</span>
          </div>
          
          <div className="ra-pie-content">
            <div className="ra-pie-chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={REGIONAL_PERFORMANCE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {REGIONAL_PERFORMANCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="ra-pie-legend">
              {REGIONAL_PERFORMANCE_DATA.map((item) => (
                <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e293b' }}>{item.name.split('-')[0]}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', marginLeft: '1.35rem', fontWeight: '900' }}>{item.revenue} <span style={{fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600'}}>MAD</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drivers / Riders List */}
        <div className="card" style={{ borderRadius: '32px', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '100px', padding: '0.4rem' }}>
              <button 
                onClick={() => setActiveTab('drivers')}
                style={{ 
                  padding: '0.6rem 1.75rem', 
                  borderRadius: '100px', 
                  border: 'none', 
                  backgroundColor: activeTab === 'drivers' ? 'var(--primary-color)' : 'transparent',
                  color: activeTab === 'drivers' ? 'white' : '#64748b',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem'
                }}
              >
                Drivers
              </button>
              <button 
                onClick={() => setActiveTab('riders')}
                style={{ 
                  padding: '0.6rem 1.75rem', 
                  borderRadius: '100px', 
                  border: 'none', 
                  backgroundColor: activeTab === 'riders' ? 'var(--primary-color)' : 'transparent',
                  color: activeTab === 'riders' ? 'white' : '#64748b',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem'
                }}
              >
                Riders
              </button>
            </div>
            <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: '900' }}>Active Now</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>8 Members Online</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {currentListData.map((item, idx) => (
              <div key={idx} style={{ padding: '1rem', borderRadius: '20px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.25rem', transition: 'all 0.2s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={`https://ui-avatars.com/api/?name=${item.name}&background=random&bold=true`} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '16px' }} />
                  <div style={{ position: 'absolute', bottom: -2, right: -2 }}>
                    <div style={{ backgroundColor: '#22c55e', width: '14px', height: '14px', borderRadius: '50%', border: '2.5px solid white' }}></div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '900', color: '#1e293b' }}>{item.name}</h4>
                    <ChevronRight size={14} color="#94a3b8" />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--primary-color)', fontWeight: '800' }}>{item.trips}</span> trips • <span style={{ color: '#1e293b', fontWeight: '800' }}>{item.earnings} MAD</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '500' }}>{item.region}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'white', padding: '6px 12px', borderRadius: '100px', border: '1px solid #f1f5f9' }}>
                    <Star size={14} fill="#eab308" color="#eab308" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#1e293b' }}>{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Section: Regional Performance Summary --- */}
      <div className="ra-table-wrapper">
        <div style={{ padding: '1.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', margin: 0, letterSpacing: '-0.01em' }}>Regional Summary</h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Detailed breakdown of performance metrics by region</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#f8fafc', padding: '0.5rem 1.25rem', borderRadius: '100px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1e293b' }}>Filter Region:</span>
            <select className="filter-select" style={{ border: 'none', background: 'transparent', padding: '0', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-color)', outline: 'none' }}>
              <option>All Regions</option>
              {REGIONAL_PERFORMANCE_DATA.map(r => <option key={r.name}>{r.name}</option>)}
            </select>
          </div>
        </div>

        <div className="ra-table-container">
          <table className="ra-table">
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th>Region</th>
                <th>Trip Share</th>
                <th>Revenue Status</th>
                <th>Active Drivers</th>
                <th>Growth</th>
                <th>Avg. Trip Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                { region: 'Casablanca-Settat', share: '45.2%', revenue: 'Performance Daily', drivers: 120, growth: '+15.4%', avg: '133.50 MAD', color: '#38AC57' },
                { region: 'Rabat-Salé-Kénitra', share: '24.8%', revenue: 'Performance Monthly', drivers: 85, growth: '+12.1%', avg: '112.20 MAD', color: '#0ea5e9' },
                { region: 'Marrakech-Safi', share: '15.5%', revenue: 'Performance Daily', drivers: 64, growth: '+18.7%', avg: '145.80 MAD', color: '#f97316' },
                { region: 'Fès-Meknès', share: '10.2%', revenue: 'Performance Monthly', drivers: 42, growth: '+9.3%', avg: '98.40 MAD', color: '#eab308' },
                { region: 'Tanger-Tetouan', share: '8.4%', revenue: '180,000 MAD', drivers: 38, growth: '+5.6%', avg: '125.10 MAD', color: '#ef4444' },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: row.color, boxShadow: `0 0 0 4px ${row.color}15` }}></div>
                      <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#1e293b' }}>{row.region}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ flex: 1, height: '6px', backgroundColor: '#f1f5f9', borderRadius: '10px', overflow: 'hidden', minWidth: '60px' }}>
                            <div style={{ width: row.share, height: '100%', backgroundColor: row.color }}></div>
                        </div>
                        <span style={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: '800' }}>{row.share}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                        padding: '6px 14px', 
                        borderRadius: '100px', 
                        backgroundColor: row.revenue.includes('MAD') ? '#eef7f0' : '#f1f5f9', 
                        color: row.revenue.includes('MAD') ? 'var(--primary-color)' : '#64748b',
                        fontSize: '0.8rem',
                        fontWeight: '800'
                    }}>
                        {row.revenue}
                    </span>
                  </td>
                  <td style={{ color: '#1e293b', fontSize: '0.95rem', fontWeight: '800' }}>{row.drivers}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-color)', fontWeight: '900', fontSize: '0.95rem' }}>
                        <ArrowUpRight size={16} />
                        {row.growth}
                    </div>
                  </td>
                  <td style={{ color: '#1e293b', fontSize: '0.95rem', fontWeight: '900' }}>{row.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      </div>
    </div>
  );
};
