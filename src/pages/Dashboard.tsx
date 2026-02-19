import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, Truck, Users, Wallet, Trophy } from 'lucide-react';

/* Dummy Data Generators */
const generateLineData = (multiplier: number) => [
  { time: '06:00', trips: 100 * multiplier },
  { time: '09:00', trips: 350 * multiplier },
  { time: '12:00', trips: 150 * multiplier },
  { time: '15:00', trips: 200 * multiplier },
  { time: '18:00', trips: 450 * multiplier },
  { time: '21:00', trips: 400 * multiplier },
  { time: '00:00', trips: 50 * multiplier },
];

const pieData = [
  { name: 'Completed', value: 30, color: '#22c55e' }, // Green
  { name: 'Active', value: 45, color: '#0ea5e9' },    // Blue
  { name: 'Pending', value: 25, color: '#eab308' },   // Yellow
  { name: 'Cancelled', value: 15, color: '#ec4899' }, // Pink
  { name: 'Scheduled', value: 20, color: '#f97316' }, // Orange
];

const topDrivers = [
  { id: 1, name: 'Mohamed Berrada', idNumber: 'T-00089', location: 'Bab Fès', trips: 167, rating: 4.8 },
  { id: 2, name: 'Ahmed Hassan', idNumber: 'T-00092', location: 'Casablanca', trips: 154, rating: 4.9 },
  { id: 3, name: 'Youssef Alami', idNumber: 'T-00103', location: 'Rabat', trips: 142, rating: 4.7 },
  { id: 4, name: 'Karim Benjelloun', idNumber: 'T-00045', location: 'Marrakech', trips: 138, rating: 4.5 },
];

const topRiders = [
  { id: 1, name: 'Sarah Johnson', idNumber: 'R-00123', location: 'Casablanca', trips: 45, rating: 5.0 },
  { id: 2, name: 'Mike Ross', idNumber: 'R-00456', location: 'Rabat', trips: 38, rating: 4.8 },
  { id: 3, name: 'Emily Clark', idNumber: 'R-00789', location: 'Marrakech', trips: 32, rating: 4.9 },
  { id: 4, name: 'David Smith', idNumber: 'R-00234', location: 'Tangier', trips: 29, rating: 4.7 },
];

export const Dashboard = () => {
  const [region, setRegion] = useState('All Regions');
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [activeTab, setActiveTab] = useState<'drivers' | 'riders'>('drivers');
  const [activeMetric, setActiveMetric] = useState<'trips' | 'drivers' | 'earnings' | 'bonus'>('trips');
  const [stats, setStats] = useState({
    trips: { value: '1,247', trend: '+12%' },
    drivers: { value: '342', trend: '+5%' },
    earnings: { value: '154,320', trend: '+18%' },
    bonus: { value: '1,847', trend: '+156' },
    lineData: generateLineData(1)
  });

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegion = e.target.value;
    setRegion(newRegion);
    // Simulate data update
    const multiplier = newRegion === 'All Regions' ? 1 : Math.random() * 0.5 + 0.5;
    setStats({
        trips: { value: Math.floor(1247 * multiplier).toLocaleString(), trend: '+12%' },
        drivers: { value: Math.floor(342 * multiplier).toLocaleString(), trend: '+5%' },
        earnings: { value: Math.floor(154320 * multiplier).toLocaleString(), trend: '+18%' },
        bonus: { value: Math.floor(1847 * multiplier).toLocaleString(), trend: '+156' },
        lineData: generateLineData(multiplier)
    });
  };

  const getChartTitle = () => {
    switch (activeMetric) {
        case 'trips': return 'Total Trips';
        case 'drivers': return 'Total Drivers';
        case 'earnings': return 'Total Earnings';
        case 'bonus': return 'Daily Bonus Earned';
        default: return 'Total Trips';
    }
  };

    const getPieChartTitle = () => {
    switch (activeMetric) {
        case 'trips': return 'Total Trips Performance';
        case 'drivers': return 'Total Drivers Performance';
        case 'earnings': return 'Total Earnings'; // Keeping simplified
        case 'bonus': return 'Total Daily Bonus Earned';
        default: return 'Total Trips Performance';
    }
  };

  const getChartData = () => {
     // Return same structure but modified values based on metric for simulation
     const multiplier = activeMetric === 'trips' ? 1 : activeMetric === 'drivers' ? 0.3 : activeMetric === 'earnings' ? 120 : 1.5;
     return stats.lineData.map(d => ({ ...d, trips: d.trips * multiplier })); 
  };

  /* Pie Chart Logic */
  const [pieFilter, setPieFilter] = useState('Monthly');

  const getPieData = () => {
    // Simulate different data for different time filters
    const baseData = [
      { name: 'Completed', value: 30, color: '#22c55e' },
      { name: 'Active', value: 45, color: '#0ea5e9' },
      { name: 'Pending', value: 25, color: '#eab308' },
      { name: 'Cancelled', value: 15, color: '#ec4899' },
      { name: 'Scheduled', value: 20, color: '#f97316' },
    ];

    if (pieFilter === 'Weekly') {
        return baseData.map(d => ({ ...d, value: Math.floor(d.value * 0.25) }));
    } else if (pieFilter === 'Yearly') {
        return baseData.map(d => ({ ...d, value: d.value * 12 }));
    }
    return baseData;
  };

  const currentPieData = getPieData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Overview of your ride-sharing platform across Morocco</p>
        </div>
        <div>
            <select 
                value={region}
                onChange={handleRegionChange}
                style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--background-light)', cursor: 'pointer' }}
            >
                <option>All Regions</option>
                <option>Casablanca-Settat</option>
                <option>Rabat-Salé-Kénitra</option>
                <option>Marrakech-Safi</option>
                <option>Fès-Meknès</option>
                <option>Tanger-Tetouan-Al Hoceima</option>
            </select>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        
        {/* Card 1 - Total Trips */}
        <div 
            onClick={() => setActiveMetric('trips')}
            style={{ 
                backgroundColor: activeMetric === 'trips' ? 'var(--primary-color)' : 'white', 
                color: activeMetric === 'trips' ? 'white' : 'var(--text-primary)', 
                padding: '1.5rem', 
                borderRadius: '1.5rem', 
                position: 'relative', 
                overflow: 'hidden', 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                boxShadow: activeMetric === 'trips' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Truck size={20} />
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Total Trips Today</span>
                <span style={{ 
                    fontSize: '0.75rem', 
                    backgroundColor: activeMetric === 'trips' ? 'rgba(255,255,255,0.2)' : 'rgba(34, 197, 94, 0.1)', 
                    color: activeMetric === 'trips' ? 'white' : 'var(--primary-color)',
                    padding: '0.1rem 0.4rem', 
                    borderRadius: '1rem' 
                }}>{stats.trips.trend}</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.trips.value}</div>
            <div style={{ fontSize: '0.75rem', textDecoration: 'underline', marginTop: '0.5rem', opacity: 0.8 }}>Vs Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'trips' ? 'black' : 'var(--primary-color)', borderRadius: '50%', padding: '0.5rem', color: 'white' }}>
                <ArrowUpRight size={20} />
            </div>
        </div>

        {/* Card 2 - Active Drivers */}
        <div 
            onClick={() => setActiveMetric('drivers')}
            style={{ 
                backgroundColor: activeMetric === 'drivers' ? 'var(--primary-color)' : 'white', 
                color: activeMetric === 'drivers' ? 'white' : 'var(--text-primary)',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                position: 'relative', 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                boxShadow: activeMetric === 'drivers' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Users size={20} className={activeMetric === 'drivers' ? '' : "text-gray-500"} />
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Active Drivers</span>
                <span style={{ 
                    fontSize: '0.75rem', 
                    color: activeMetric === 'drivers' ? 'white' : 'var(--success-color)',
                    backgroundColor: activeMetric === 'drivers' ? 'rgba(255,255,255,0.2)' : 'transparent',
                    padding: activeMetric === 'drivers' ? '0.1rem 0.4rem' : '0',
                    borderRadius: '1rem'
                }}>{stats.drivers.trend}</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.drivers.value}</div>
            <div style={{ fontSize: '0.75rem', color: activeMetric === 'drivers' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginTop: '0.5rem' }}>Vs Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'drivers' ? 'black' : 'var(--primary-color)', borderRadius: '50%', padding: '0.5rem', color: 'white' }}>
                <ArrowUpRight size={20} />
            </div>
        </div>

        {/* Card 3 - Total Earnings */}
        <div 
            onClick={() => setActiveMetric('earnings')}
             style={{ 
                backgroundColor: activeMetric === 'earnings' ? 'var(--primary-color)' : 'white', 
                color: activeMetric === 'earnings' ? 'white' : 'var(--text-primary)',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                position: 'relative', 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                boxShadow: activeMetric === 'earnings' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Wallet size={20} className={activeMetric === 'earnings' ? '' : "text-gray-500"} />
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Total Earnings</span>
                <span style={{ 
                    fontSize: '0.75rem', 
                    color: activeMetric === 'earnings' ? 'white' : 'var(--success-color)',
                    backgroundColor: activeMetric === 'earnings' ? 'rgba(255,255,255,0.2)' : 'transparent',
                    padding: activeMetric === 'earnings' ? '0.1rem 0.4rem' : '0',
                    borderRadius: '1rem'
                 }}>{stats.earnings.trend}</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'baseline' }}>
                {stats.earnings.value} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: activeMetric === 'earnings' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginLeft: '5px' }}>MAD</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: activeMetric === 'earnings' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginTop: '0.5rem' }}>Vs Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'earnings' ? 'black' : 'var(--primary-color)', borderRadius: '50%', padding: '0.5rem', color: 'white' }}>
                <ArrowUpRight size={20} />
            </div>
        </div>

        {/* Card 4 - Daily Bonus */}
        <div 
            onClick={() => setActiveMetric('bonus')}
            style={{ 
                backgroundColor: activeMetric === 'bonus' ? 'var(--primary-color)' : 'white', 
                color: activeMetric === 'bonus' ? 'white' : 'var(--text-primary)',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                position: 'relative', 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                boxShadow: activeMetric === 'bonus' ? '0 10px 15px -3px rgba(34, 197, 94, 0.4)' : 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Trophy size={20} className={activeMetric === 'bonus' ? '' : "text-gray-500"} />
                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Daily Bonus Earned</span>
                <span style={{ 
                    fontSize: '0.75rem', 
                    color: activeMetric === 'bonus' ? 'white' : 'var(--success-color)',
                     backgroundColor: activeMetric === 'bonus' ? 'rgba(255,255,255,0.2)' : 'transparent',
                    padding: activeMetric === 'bonus' ? '0.1rem 0.4rem' : '0',
                    borderRadius: '1rem'
                }}>{stats.bonus.trend}</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'baseline' }}>
                {stats.bonus.value} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: activeMetric === 'bonus' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginLeft: '5px' }}>MAD</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: activeMetric === 'bonus' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginTop: '0.5rem' }}>Vs MAD Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'bonus' ? 'black' : 'var(--primary-color)', borderRadius: '50%', padding: '0.5rem', color: 'white' }}>
                <ArrowUpRight size={20} />
            </div>
        </div>
      </div>

      {/* Charts & Lists Row 1 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
         {/* Line Chart */}
         <div className="card" style={{ flex: '2 1 600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{getChartTitle()}</h3>
                <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    style={{ padding: '0.2rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                >
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </select>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()}>
                        <defs>
                            <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="trips" stroke="#22c55e" fillOpacity={1} fill="url(#colorTrips)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* Top Regions List */}
         <div className="card" style={{ flex: '1 1 300px' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Top Regions Performance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Casablanca-Settat', trips: 385, drivers: 89, trend: '+18%' },
                  { name: 'Rabat-Salé-Kénitra', trips: 196, drivers: 45, trend: '+18%' },
                  { name: 'Marrakech-Safi', trips: 168, drivers: 38, trend: '+18%' },
                  { name: 'Fès-Meknès', trips: 142, drivers: 32, trend: '+18%' },
                  { name: 'Tanger-Tetouan-Al Hoceima', trips: 127, drivers: 28, trend: '+18%' },
                ].map((region, idx) => (
                    <div key={idx} style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.75rem', cursor: 'pointer' }} onClick={() => alert(`Showing details for ${region.name}`)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: '500' }}>{region.name}</span>
                            <span style={{ fontSize: '0.75rem', backgroundColor: '#dcfce7', color: '#166534', padding: '0.1rem 0.4rem', borderRadius: '1rem' }}>{region.trend}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <span>📈 {region.trips} trips</span>
                            <span>👥 {region.drivers} drivers</span>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>

       {/* Charts & Lists Row 2 */}
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
           {/* Pie Chart */}
           <div className="card" style={{ flex: '1 1 400px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{getPieChartTitle()}</h3>
                    <select 
                        value={pieFilter}
                        onChange={(e) => setPieFilter(e.target.value)}
                        style={{ padding: '0.2rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </select>
                </div>
                <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={currentPieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {currentPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    {pieData.map((entry, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color }}></div>
                            <span>{entry.name}</span>
                        </div>
                    ))}
                </div>
           </div>

           {/* Top Drivers/Riders */}
           <div className="card" style={{ flex: '1 1 400px' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button 
                        onClick={() => setActiveTab('drivers')}
                        style={{ 
                            backgroundColor: activeTab === 'drivers' ? '#22c55e' : '#e2e8f0', 
                            color: activeTab === 'drivers' ? 'white' : '#64748b', 
                            border: 'none', 
                            padding: '0.5rem 1.5rem', 
                            borderRadius: '1.5rem', 
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: activeTab === 'drivers' ? '0 2px 4px rgba(34, 197, 94, 0.3)' : 'none'
                        }}
                    >
                        Top Drivers
                    </button>
                    <button 
                        onClick={() => setActiveTab('riders')}
                        style={{ 
                            backgroundColor: activeTab === 'riders' ? '#22c55e' : '#e2e8f0', 
                            color: activeTab === 'riders' ? 'white' : '#64748b', 
                            border: 'none', 
                            padding: '0.5rem 1.5rem', 
                            borderRadius: '1.5rem', 
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: activeTab === 'riders' ? '0 2px 4px rgba(34, 197, 94, 0.3)' : 'none'
                        }}
                    >
                        Top Rider
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(activeTab === 'drivers' ? topDrivers : topRiders).map((person, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={`https://i.pravatar.cc/150?u=${person.idNumber}`} alt={person.name} style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{person.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        {person.idNumber} • {person.location}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#eab308' }}>★ {person.rating}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '0.875rem' }}>
                                <div>+ {person.trips} Trips</div>
                                <Truck size={16} />
                            </div>
                        </div>
                    ))}
                </div>
           </div>
       </div>

    </div>
  );
};
