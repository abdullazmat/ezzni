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
  TrendingUp, 
  Users, 
  Truck, 
  Wallet,
  ChevronRight,
  Star
} from 'lucide-react';

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
  { name: 'Casablanca-Settat', value: 35, color: '#22c55e', revenue: '180,000' },
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

  /* Handlers */
  const handleExport = (type: string) => {
    alert(`Exporting as ${type}...`);
  };

  const currentListData = activeTab === 'drivers' ? DRIVERS_DATA : RIDERS_DATA;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
      
      {/* --- Page Header & Filters --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Reports & Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
            Comprehensive business insights across all regions and services
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            className="filter-select"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            style={{ borderRadius: '1.5rem', padding: '0.6rem 1.25rem' }}
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
            style={{ borderRadius: '1.5rem', padding: '0.6rem 1.25rem' }}
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
            style={{ borderRadius: '1.5rem', padding: '0.6rem 1.25rem' }}
          >
            <option>This Month</option>
            <option>This Week</option>
            <option>Today</option>
            <option>Year To Date</option>
          </select>
        </div>
      </div>

      {/* --- Export Buttons Row --- */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button className="filter-btn" onClick={() => handleExport('PDF')} style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export PDF
        </button>
        <button className="export-btn" onClick={() => handleExport('Excel')} style={{ backgroundColor: 'var(--primary-color)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileSpreadsheet size={18} /> Export Excel
        </button>
        <button className="filter-btn" onClick={() => handleExport('CSV')} style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} /> Export CSV
        </button>
      </div>

      {/* --- Stats Cards Grid --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        
        {/* Total Trips */}
        <div className="stat-card" style={{ position: 'relative' }}>
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: '#f0fdf4' }}>
              <Truck size={20} color="var(--primary-color)" />
            </div>
            <span className="stat-label">Total Trips</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', marginLeft: 'auto', fontWeight: '600' }}>+12% From Last Month</span>
          </div>
          <div className="stat-value">8,547</div>
          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }} className="stat-arrow">
            <ArrowUpRight size={20} color="var(--primary-color)" />
          </div>
        </div>

        {/* Total Earning */}
        <div className="stat-card" style={{ backgroundColor: 'var(--primary-color)', color: 'white', position: 'relative' }}>
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <Wallet size={20} color="white" />
            </div>
            <span className="stat-label" style={{ color: 'white', opacity: 0.9 }}>Total Earning</span>
            <span style={{ fontSize: '0.75rem', color: 'white', marginLeft: 'auto', fontWeight: '600' }}>+18% From Last Month</span>
          </div>
          <div className="stat-value" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            452,300 <span style={{ fontSize: '1rem', fontWeight: '500' }}>MAD</span>
          </div>
          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', backgroundColor: 'black' }} className="stat-arrow">
            <ArrowUpRight size={20} color="white" />
          </div>
        </div>

        {/* Active Drivers */}
        <div className="stat-card" style={{ position: 'relative' }}>
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: '#f0fdf4' }}>
              <Users size={20} color="var(--primary-color)" />
            </div>
            <span className="stat-label">Active Drivers</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', marginLeft: 'auto', fontWeight: '600' }}>+5% From Last Month</span>
          </div>
          <div className="stat-value">342</div>
          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }} className="stat-arrow">
             <ArrowUpRight size={20} color="var(--primary-color)" />
          </div>
        </div>

        {/* Fleet Size */}
        <div className="stat-card" style={{ position: 'relative' }}>
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: '#f0fdf4' }}>
              <TrendingUp size={20} color="var(--primary-color)" />
            </div>
            <span className="stat-label">Fleet Size</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', marginLeft: 'auto', fontWeight: '600' }}>+3 New Vehicles</span>
          </div>
          <div className="stat-value">458</div>
          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }} className="stat-arrow">
             <ArrowUpRight size={20} color="var(--primary-color)" />
          </div>
        </div>
      </div>

      {/* --- Charts Section Lower --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Service Volume by Hour */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Service Volume by Hour</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SERVICE_VOLUME_DATA}>
                <defs>
                  <linearGradient id="colorCar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip />
                <Area type="monotone" dataKey="Car Ride" stroke="#22c55e" fillOpacity={1} fill="url(#colorCar)" stackId="1" />
                <Area type="monotone" dataKey="Motorcycle" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorCar)" stackId="1" />
                <Area type="monotone" dataKey="Rental Car" stroke="#f97316" fillOpacity={1} fill="url(#colorCar)" stackId="1" />
                <Area type="monotone" dataKey="Reservation" stroke="#ef4444" fillOpacity={1} fill="url(#colorCar)" stackId="1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
            {['Car Ride', 'Motorcycle', 'Rental Car', 'Reservation', 'City To City', 'Delivery', 'Taxi', 'Group Ride', 'Airport Ride'].map((label, idx) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: ['#22c55e', '#0ea5e9', '#f97316', '#ef4444', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#dc2626'][idx] }}></div>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Service (MAD) */}
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Revenue by Service (MAD)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_BY_SERVICE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="var(--primary-color)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Middle Row: Regional Performance vs Drivers/Riders --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Regional Performance Pie */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h3 style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0 }}>Regional Performance</h3>
             <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', cursor: 'pointer' }}>Monthly Revenue View</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
            <div style={{ width: '50%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={REGIONAL_PERFORMANCE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={110}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {REGIONAL_PERFORMANCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ width: '50%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {REGIONAL_PERFORMANCE_DATA.map((item) => (
                <div key={item.name} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700' }}>{item.name.split('-')[0]}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginLeft: '1.25rem' }}>{item.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drivers / Riders List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '2rem', padding: '0.25rem' }}>
              <button 
                onClick={() => setActiveTab('drivers')}
                style={{ 
                  padding: '0.5rem 2rem', 
                  borderRadius: '2rem', 
                  border: 'none', 
                  backgroundColor: activeTab === 'drivers' ? 'var(--primary-color)' : 'transparent',
                  color: activeTab === 'drivers' ? 'white' : 'var(--text-secondary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                Drivers
              </button>
              <button 
                onClick={() => setActiveTab('riders')}
                style={{ 
                  padding: '0.5rem 2rem', 
                  borderRadius: '2rem', 
                  border: 'none', 
                  backgroundColor: activeTab === 'riders' ? 'var(--primary-color)' : 'transparent',
                  color: activeTab === 'riders' ? 'white' : 'var(--text-secondary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
              >
                Rider
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '600' }}>8 Of 8 Drivers</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {currentListData.map((item, idx) => (
              <div key={idx} style={{ padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1rem', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <div style={{ position: 'relative' }}>
                  <img src={`https://ui-avatars.com/api/?name=${item.name}&background=random`} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '12px' }} />
                  <div style={{ position: 'absolute', top: -3, right: -3 }}>
                    <div style={{ backgroundColor: '#22c55e', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid white' }}></div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700' }}>{item.name}</h4>
                    <div style={{ backgroundColor: 'var(--primary-color)', borderRadius: '50%', padding: '2px' }}>
                       <ChevronRight size={8} color="white" />
                    </div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    {item.trips} trips • {item.earnings} MAD • rides
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.region}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#eab308' }}>
                      <Star size={10} fill="#eab308" />
                      <span style={{ fontSize: '0.7rem', fontWeight: '700' }}>{item.rating}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Section: Regional Performance Summary --- */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>Regional Performance Summary</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Region:</span>
            <select className="filter-select" style={{ borderRadius: '1.5rem', padding: '0.3rem 1rem', fontSize: '0.75rem' }}>
              <option>Region</option>
              {REGIONAL_PERFORMANCE_DATA.map(r => <option key={r.name}>{r.name}</option>)}
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Region</th>
              <th style={{ padding: '1rem 1.5rem' }}>Trip Share</th>
              <th style={{ padding: '1rem 1.5rem' }}>Revenue</th>
              <th style={{ padding: '1rem 1.5rem' }}>Active Drivers</th>
              <th style={{ padding: '1rem 1.5rem' }}>Growth</th>
              <th style={{ padding: '1rem 1.5rem' }}>Avg. Trip Value</th>
            </tr>
          </thead>
          <tbody>
            {[
              { region: 'Casablanca-Settat', share: '45%', revenue: 'Daily', drivers: 120, growth: '+15%', avg: 133, color: '#0ea5e9' },
              { region: 'Casablanca-Settat', share: '45%', revenue: 'Monthly', drivers: 120, growth: '+15%', avg: 133, color: '#e2e8f0' },
              { region: 'Casablanca-Settat', share: '45%', revenue: 'Daily', drivers: 120, growth: '+15%', avg: 133, color: '#e2e8f0' },
              { region: 'Casablanca-Settat', share: '45%', revenue: 'Monthly', drivers: 120, growth: '+15%', avg: 133, color: '#e2e8f0' },
              { region: 'Casablanca-Settat', share: '45%', revenue: '180,000', drivers: 120, growth: '+15%', avg: 133, color: '#e2e8f0' },
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: row.color }}></div>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{row.region}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{row.share}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '700', fontSize: '0.9rem' }}>{row.revenue}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{row.drivers}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.9rem' }}>{row.growth}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{row.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
