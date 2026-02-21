import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

// Import custom icons
import totalTripsIcon from '../assets/icons/Total Trips Today.png';
import activeDriversIcon from '../assets/icons/Active Drivers.png';
import totalEarningsIcon from '../assets/icons/Total Earnings.png';
import dailyBonusIcon from '../assets/icons/Daily Bonus Earned.png';
import carIcon from '../assets/icons/car.png';
import taxiIcon from '../assets/icons/taxi.png';
import bikeIcon from '../assets/icons/bike.png';
import driversRegionIcon from '../assets/icons/drivers-region performance.png';
import increaseIcon from '../assets/icons/increase.png';
import bonusTripIcon from '../assets/icons/earning bonuses trips car icon.png';

/* Dummy Data Generators */
const generateLineData = (multiplier: number) => {
  const baseData = [
    { time: '06:00', val1: 40, val2: 30, val3: 20, val4: 25, val5: 35 },
    { time: '09:00', val1: 120, val2: 80, val3: 60, val4: 70, val5: 90 },
    { time: '12:00', val1: 80, val2: 60, val3: 40, val4: 50, val5: 60 },
    { time: '15:00', val1: 90, val2: 70, val3: 50, val4: 65, val5: 75 },
    { time: '18:00', val1: 180, val2: 140, val3: 110, val4: 120, val5: 150 },
    { time: '21:00', val1: 160, val2: 130, val3: 100, val4: 110, val5: 130 },
    { time: '00:00', val1: 30, val2: 20, val3: 15, val4: 10, val5: 5 },
  ];
  return baseData.map(d => ({
    time: d.time,
    val1: d.val1 * multiplier,
    val2: d.val2 * multiplier,
    val3: d.val3 * multiplier,
    val4: d.val4 * multiplier,
    val5: d.val5 * multiplier,
  }));
};

const topDrivers: { id: number; name: string; idNumber: string; location: string; trips: number; rating: number; vehicle?: string }[] = [
  { id: 1, name: 'Mohamed Berrada', idNumber: 'T-00089', location: 'Bab Fès', trips: 167, rating: 4.8, vehicle: 'taxi' },
  { id: 2, name: 'Ahmed Hassan', idNumber: 'T-00092', location: 'Casablanca', trips: 154, rating: 4.9, vehicle: 'car' },
  { id: 3, name: 'Youssef Alami', idNumber: 'T-00103', location: 'Rabat', trips: 142, rating: 4.7, vehicle: 'bike' },
  { id: 4, name: 'Karim Benjelloun', idNumber: 'T-00045', location: 'Marrakech', trips: 138, rating: 4.5, vehicle: 'taxi' },
];

const topRiders: { id: number; name: string; idNumber: string; location: string; trips: number; rating: number; vehicle?: string }[] = [
  { id: 1, name: 'Sarah Johnson', idNumber: 'R-00123', location: 'Casablanca', trips: 45, rating: 5.0 },
  { id: 2, name: 'Mike Ross', idNumber: 'R-00456', location: 'Rabat', trips: 38, rating: 4.8 },
  { id: 3, name: 'Emily Clark', idNumber: 'R-00789', location: 'Marrakech', trips: 32, rating: 4.9 },
  { id: 4, name: 'David Smith', idNumber: 'R-00234', location: 'Tangier', trips: 29, rating: 4.7 },
];

const totalEarningsData = [
  { id: 1, name: 'Mohamed Berrada', idNumber: 'T-00089', location: 'Bab Fès', trips: 167, rating: 4.8, vehicle: 'car', earnings: '16,700' },
  { id: 2, name: 'Ahmed Hassan', idNumber: 'T-00092', location: 'Casablanca', trips: 154, rating: 4.9, vehicle: 'car', earnings: '15,400' },
  { id: 3, name: 'Youssef Alami', idNumber: 'T-00103', location: 'Rabat', trips: 142, rating: 4.7, vehicle: 'car', earnings: '14,200' },
  { id: 4, name: 'Karim Benjelloun', idNumber: 'T-00045', location: 'Marrakech', trips: 138, rating: 4.5, vehicle: 'car', earnings: '13,800' },
  { id: 5, name: 'Karim Benjelloun', idNumber: 'T-00045', location: 'Marrakech', trips: 138, rating: 4.5, vehicle: 'car', earnings: '13,800' },
];

const dailyBonusData = [
  { id: 1, name: 'Mohamed Berrada', idNumber: 'T-00089', location: 'Bab Fès', trips: 167, rating: 4.8 },
  { id: 2, name: 'Ahmed Hassan', idNumber: 'T-00092', location: 'Casablanca', trips: 154, rating: 4.8 },
  { id: 3, name: 'Youssef Alami', idNumber: 'T-00103', location: 'Rabat', trips: 142, rating: 4.8 },
  { id: 4, name: 'Karim Benjelloun', idNumber: 'T-00045', location: 'Marrakech', trips: 138, rating: 4.8 },
  { id: 5, name: 'Karim Benjelloun', idNumber: 'T-00045', location: 'Marrakech', trips: 138, rating: 4.8 },
];


export const Dashboard = () => {
  const [region, setRegion] = useState('All Regions');
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const [activeTab, setActiveTab] = useState<'drivers' | 'riders'>('drivers');
  const [activeMetric, setActiveMetric] = useState<'trips' | 'drivers' | 'earnings' | 'bonus'>('drivers'); // Set default to drivers to match design
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

  const getChartData = () => {
     return stats.lineData; 
  };

  /* Pie Chart Logic */
  const getPieData = () => {
    // Basic scaling to show interactivity when region changes
    const multiplier = region === 'All Regions' ? 1 : 0.7;
    return [
      { name: 'Tanger-Tetouan-Al Hoceima', value: 30, color: '#38AC57', count: Math.floor(180000 * multiplier).toLocaleString() },
      { name: 'Laayoune-Sakia El Hamra', value: 10, color: '#a855f7', count: Math.floor(95000 * multiplier).toLocaleString() },
      { name: 'Dakhla-Oued Ed-Dahab', value: 10, color: '#ec4899', count: Math.floor(95000 * multiplier).toLocaleString() },
      { name: 'Draa-Tafilalet', value: 10, color: '#06b6d4', count: Math.floor(32000 * multiplier).toLocaleString() },
      { name: 'Oriental', value: 10, color: '#f97316', count: Math.floor(75000 * multiplier).toLocaleString() },
      { name: 'Rabat-Sale-Kenitra', value: 10, color: '#ef4444', count: Math.floor(95000 * multiplier).toLocaleString() },
      { name: 'Casablanca-Settat', value: 10, color: '#a3e635', count: Math.floor(95000 * multiplier).toLocaleString() },
      { name: 'Souss-Massa', value: 10, color: '#93c5fd', count: Math.floor(180000 * multiplier).toLocaleString() },
      { name: 'Fes-Meknes', value: 10, color: '#2d8a46', count: Math.floor(48000 * multiplier).toLocaleString() },
      { name: 'Beni Mellal-Khenifra', value: 20, color: '#92400e', count: Math.floor(58000 * multiplier).toLocaleString() },
      { name: 'Marrakech-Safi', value: 45, color: '#6b7280', count: Math.floor(58000 * multiplier).toLocaleString() },
      { name: 'Guelmim-Oued Noun', value: 12, color: '#fdba74', count: Math.floor(24000 * multiplier).toLocaleString() },
    ];
  };

  const currentPieData = getPieData();

  const getVehicleIcon = (type: string | undefined) => {
    switch (type) {
        case 'taxi': return taxiIcon;
        case 'car': return carIcon;
        case 'bike': return bikeIcon;
        default: return carIcon;
    }
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          .dashboard-header select {
            width: 100%;
          }
        }
      `}} />
      
      {/* Title Section */}
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Overview of your ride-sharing platform across Morocco</p>
        </div>
        <div>
            <select 
                value={region}
                onChange={handleRegionChange}
                style={{ 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '1rem', 
                    border: 'none', 
                    backgroundColor: '#e5e7eb', 
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: '#4b5563',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0/0/24/24\' stroke=\'%234b5563\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1rem',
                    paddingRight: '3rem'
                }}
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
                boxShadow: activeMetric === 'trips' ? '0 10px 15px -3px rgba(56, 172, 87, 0.4)' : 'var(--shadow-sm)',
                border: activeMetric === 'trips' ? 'none' : '1px solid #f1f5f9'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <img src={totalTripsIcon} alt="Trips" style={{ width: '40px', height: 'auto' }} />
                <span style={{ fontSize: '1rem', fontWeight: '700' }}>Total Trips Today</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                }}>{stats.trips.trend}</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0' }}>{stats.trips.value}</div>
            <div style={{ fontSize: '0.875rem', textDecoration: 'underline', color: activeMetric === 'trips' ? 'white' : 'var(--text-secondary)', opacity: 0.8 }}>Vs Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'trips' ? 'black' : 'var(--primary-color)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <ArrowUpRight size={24} />
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
                boxShadow: activeMetric === 'drivers' ? '0 10px 15px -3px rgba(56, 172, 87, 0.4)' : 'var(--shadow-sm)',
                border: activeMetric === 'drivers' ? 'none' : '1px solid #f1f5f9',
                backgroundImage: activeMetric === 'drivers' ? 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)' : 'none'
            }}
        >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <img src={activeDriversIcon} alt="Drivers" style={{ width: '40px', height: 'auto' }} />
                <span style={{ fontSize: '1rem', fontWeight: '700' }}>Active Drivers</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: activeMetric === 'drivers' ? 'white' : '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                }}>{stats.drivers.trend}</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0' }}>{stats.drivers.value}</div>
            <div style={{ fontSize: '0.875rem', textDecoration: 'underline', color: activeMetric === 'drivers' ? 'white' : 'var(--text-secondary)', opacity: 0.8 }}>Vs Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'drivers' ? 'black' : 'var(--primary-color)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <ArrowUpRight size={24} />
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
                boxShadow: activeMetric === 'earnings' ? '0 10px 15px -3px rgba(56, 172, 87, 0.4)' : 'var(--shadow-sm)',
                border: activeMetric === 'earnings' ? 'none' : '1px solid #f1f5f9'
            }}
        >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <img src={totalEarningsIcon} alt="Earnings" style={{ width: '40px', height: 'auto' }} />
                <span style={{ fontSize: '1rem', fontWeight: '700' }}>Total Earnings</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                 }}>{stats.earnings.trend}</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0', display: 'flex', alignItems: 'baseline' }}>
                {stats.earnings.value} <span style={{ fontSize: '1.25rem', fontWeight: '600', color: activeMetric === 'earnings' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginLeft: '8px' }}>MAD</span>
            </div>
            <div style={{ fontSize: '0.875rem', textDecoration: 'underline', color: activeMetric === 'earnings' ? 'white' : 'var(--text-secondary)', opacity: 0.8 }}>Vs Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'earnings' ? 'black' : 'var(--primary-color)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <ArrowUpRight size={24} />
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
                boxShadow: activeMetric === 'bonus' ? '0 10px 15px -3px rgba(56, 172, 87, 0.4)' : 'var(--shadow-sm)',
                border: activeMetric === 'bonus' ? 'none' : '1px solid #f1f5f9'
            }}
        >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <img src={dailyBonusIcon} alt="Bonus" style={{ width: '40px', height: 'auto' }} />
                <span style={{ fontSize: '1rem', fontWeight: '700' }}>Daily Bonus Earned</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                }}>{stats.bonus.trend}</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0', display: 'flex', alignItems: 'baseline' }}>
                {stats.bonus.value} <span style={{ fontSize: '1.25rem', fontWeight: '600', color: activeMetric === 'bonus' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginLeft: '8px' }}>MAD</span>
            </div>
            <div style={{ fontSize: '0.875rem', textDecoration: 'underline', color: activeMetric === 'bonus' ? 'white' : 'var(--text-secondary)', opacity: 0.8 }}>Vs Yesterday</div>
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: activeMetric === 'bonus' ? 'black' : 'var(--primary-color)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <ArrowUpRight size={24} />
            </div>
        </div>
      </div>

      {/* Charts & Lists Row 1 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
         {/* Line Chart */}
         <div className="card" style={{ flex: '2 1 600px', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                    {activeMetric === 'bonus' ? 'Daily Bonus Earned' : activeMetric === 'earnings' ? 'Total Earnings' : 'Total Trips'}
                </h3>
                <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', cursor: 'pointer', fontWeight: '500' }}
                >
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </select>
            </div>
            <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="val1" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="val2" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="val3" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="val4" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="val5" stackId="1" stroke="#38AC57" fill="#38AC57" fillOpacity={0.8} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* Top Regions Performance */}
         <div className="card" style={{ flex: '1 1 350px', borderRadius: '1.5rem', border: '1px solid #f1f5f9', maxHeight: '420px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>Top Regions Performance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { name: 'Casablanca-Settat', trips: 385, drivers: 89, trend: '+18%' },
                  { name: 'Rabat-Salé-Kénitra', trips: 196, drivers: 45, trend: '+18%' },
                  { name: 'Marrakech-Safi', trips: 168, drivers: 38, trend: '+18%' },
                  { name: 'Fès-Meknès', trips: 142, drivers: 32, trend: '+18%' },
                  { name: 'Tanger-Tetouan-Al Hoceima', trips: 127, drivers: 28, trend: '+18%' },
                ].map((region, idx) => (
                    <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span style={{ fontWeight: '700', color: '#111827', fontSize: '1rem' }}>{region.name}</span>
                            <span style={{ fontSize: '0.75rem', backgroundColor: '#eef7f0', color: '#2d8a46', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontWeight: 'bold' }}>{region.trend}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <img src={increaseIcon} alt="trips" style={{ width: '16px', height: '16px', imageRendering: 'auto' }} /> {region.trips} trips
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <img src={driversRegionIcon} alt="drivers" style={{ width: '16px', height: '16px', imageRendering: 'auto' }} /> {region.drivers} drivers
                            </span>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>

       {/* Bottom Row */}
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
           {/* Total Trips Performance (Pie Chart) */}
           <div className="card" style={{ flex: '1 1 400px', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                        {activeMetric === 'bonus' ? 'Total Daily Bonus Earned' : 'Total Trips Performance'}
                    </h3>
                    <span style={{ fontSize: '0.875rem', color: '#38AC57', fontWeight: '700', cursor: 'pointer' }}>
                        {activeMetric === 'bonus' ? 'Total Trips' : 'Total Trips'}
                    </span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <select 
                        style={{ padding: '0.5rem 1rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', fontWeight: '500' }}>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </select>
                </div>
                <div style={{ height: '350px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={currentPieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={140}
                                dataKey="value"
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
                                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                    return (
                                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontWeight: '800', fontSize: '14px', pointerEvents: 'none' }}>
                                            {`${value}%`}
                                        </text>
                                    );
                                }}
                            >
                                {currentPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* Custom Legend Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                    {currentPieData.map((entry, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: entry.color }}></div>
                                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4b5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.name}</span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#2d8a46', marginLeft: '1rem' }}>{entry.count}</span>
                        </div>
                    ))}
                </div>
           </div>

           {/* Bottom Right - Conditional Content */}
           <div className="card" style={{ flex: '2 1 600px', borderRadius: '1.5rem', border: '1px solid #f1f5f9', maxHeight: '550px', overflowY: 'auto' }}>
                {activeMetric === 'earnings' ? (
                    <>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>Total Earnings</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {totalEarningsData.map((person, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt={person.name} style={{ width: '60px', height: '60px', borderRadius: '1.25rem', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                <span style={{ color: '#eab308' }}>★</span> {person.rating}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '1.125rem', color: '#111827' }}>{person.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.2rem' }}>
                                                {person.idNumber} • {person.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                            • {person.trips} Trips <img src={bonusTripIcon} alt="vehicle" style={{ width: '18px', height: 'auto' }} />
                                        </div>
                                        <div style={{ marginTop: '0.5rem', color: '#38AC57', fontWeight: '800', fontSize: '1.25rem' }}>
                                            {person.earnings} <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>MAD</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : activeMetric === 'bonus' ? (
                    <>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>Daily Bonus Earned</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {dailyBonusData.map((person, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '1.25rem', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={`https://i.pravatar.cc/150?u=${idx + 20}`} alt={person.name} style={{ width: '60px', height: '60px', borderRadius: '1.25rem', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                <span style={{ color: '#eab308' }}>★</span> {person.rating}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '1.125rem', color: '#111827' }}>{person.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.2rem' }}>
                                                Bonus ID: {person.idNumber} • {person.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                            • {person.trips} Trips Completed <img src={bonusTripIcon} alt="bonus icon" style={{ width: '18px', height: 'auto' }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', backgroundColor: '#f1f5f9', padding: '0.4rem', borderRadius: '2rem', width: 'fit-content' }}>
                            <button 
                                onClick={() => setActiveTab('drivers')}
                                style={{ 
                                    backgroundColor: activeTab === 'drivers' ? '#38AC57' : 'transparent', 
                                    color: activeTab === 'drivers' ? 'white' : '#64748b', 
                                    border: 'none', 
                                    padding: '0.6rem 2.5rem', 
                                    borderRadius: '1.5rem', 
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                Top Drivers
                            </button>
                            <button 
                                onClick={() => setActiveTab('riders')}
                                style={{ 
                                    backgroundColor: activeTab === 'riders' ? '#38AC57' : 'transparent', 
                                    color: activeTab === 'riders' ? 'white' : '#64748b', 
                                    border: 'none', 
                                    padding: '0.6rem 2.5rem', 
                                    borderRadius: '1.5rem', 
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                Top Rider
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {(activeTab === 'drivers' ? topDrivers : topRiders).map((person, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={`https://i.pravatar.cc/150?u=${person.idNumber}`} alt={person.name} style={{ width: '60px', height: '60px', borderRadius: '1.25rem', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                <span style={{ color: '#eab308' }}>★</span> {person.rating}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '1.125rem', color: '#111827' }}>{person.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.2rem' }}>
                                                {person.idNumber} • {person.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>• {person.trips} Trips</div>
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <img src={getVehicleIcon(person.vehicle)} alt="vehicle" style={{ width: '32px', height: 'auto' }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
           </div>
       </div>

    </div>
  );
};
