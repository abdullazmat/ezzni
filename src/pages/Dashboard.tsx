import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { 
    getDashboardMetricsApi, 
    getRegionsPerformanceApi, 
    getTripsPerformanceApi, 
    getRevenueDataApi,
    getTopDriversApi, 
    getTopRidersApi,
    DashboardMetrics,
    RegionPerformance,
    TripPerformance,
    RevenueDataItem,
    TopDriver,
    TopRider
} from '../services/api';

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

export const Dashboard = () => {
  const [region, setRegion] = useState('All Regions');
  const [revenuePeriod, setRevenuePeriod] = useState('Monthly');
  const [tripsPeriod, setTripsPeriod] = useState('Yearly');
  const [activeTab, setActiveTab] = useState<'drivers' | 'riders'>('drivers');
  const [activeMetric, setActiveMetric] = useState<'trips' | 'drivers' | 'earnings' | 'bonus'>('drivers');
  
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [regionsPerf, setRegionsPerf] = useState<RegionPerformance[]>([]);
  const [tripsPerf, setTripsPerf] = useState<TripPerformance[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueDataItem[]>([]);
  const [topDriversList, setTopDriversList] = useState<TopDriver[]>([]);
  const [topRidersList, setTopRidersList] = useState<TopRider[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchFilteredData();
  }, [region, revenuePeriod, tripsPeriod, activeMetric]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [rRes] = await Promise.all([
        getRegionsPerformanceApi()
      ]);
      if (rRes.ok) setRegionsPerf(rRes.data);
    } catch (err) {
      console.error('Failed to fetch initial data', err);
    }
  };

  const fetchFilteredData = async () => {
    try {
      const [mRes, tRes, rvRes, dRes, rdRes] = await Promise.all([
        getDashboardMetricsApi({ region }),
        getTripsPerformanceApi({ period: tripsPeriod, metric: activeMetric }),
        getRevenueDataApi({ region, period: revenuePeriod, metric: activeMetric }),
        getTopDriversApi({ region }),
        getTopRidersApi({ region })
      ]);

      if (mRes.ok) setMetrics(mRes.data);
      if (tRes.ok) setTripsPerf(tRes.data);
      if (rvRes.ok) setRevenueData(rvRes.data);
      if (dRes.ok) setTopDriversList(dRes.data);
      if (rdRes.ok) setTopRidersList(rdRes.data);
    } catch (err) {
      console.error('Failed to fetch filtered dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Loader2 className="animate-spin" size={48} color="#38AC57" />
        </div>
    );
  }

  const stats = {
    trips: { value: metrics?.trips?.value?.toLocaleString() ?? '0', trend: `${metrics?.trips?.trend ?? 0}%` },
    drivers: { value: metrics?.drivers?.value?.toLocaleString() ?? '0', trend: `+${metrics?.drivers?.trend ?? 0}%` },
    earnings: { value: metrics?.earnings?.value?.toLocaleString() ?? '0', trend: `+${metrics?.earnings?.trend ?? 0}%` },
    bonus: { value: metrics?.bonus?.value?.toLocaleString() ?? '0', trend: `+${metrics?.bonus?.trend ?? 0}` },
    lineData: revenueData.length > 0 ? revenueData : generateLineData(1)
  };

  const currentPieData = tripsPerf.length > 0 
    ? tripsPerf.map((p, i) => {
        const isCurrency = activeMetric === 'earnings' || activeMetric === 'bonus';
        const rawCount = Number(p.count !== undefined ? p.count : 0);
        const displayCount = isNaN(rawCount) ? '0' : rawCount.toLocaleString();
        
        return {
          name: p.name || 'Unknown',
          value: Math.round(Number(p.value || 0)),
          color: ['#38AC57', '#a855f7', '#ec4899', '#06b6d4', '#f97316', '#ef4444', '#a3e635', '#93c5fd', '#2d8a46', '#92400e', '#6b7280', '#fdba74'][i % 12],
          count: isCurrency ? `${displayCount} MAD` : displayCount
        };
      })
    : [
        { name: 'Casablanca-Settat', value: 35, color: '#38AC57', count: activeMetric === 'earnings' ? '12,450 MAD' : '450' },
        { name: 'Rabat-Salé-Kénitra', value: 25, color: '#a855f7', count: activeMetric === 'earnings' ? '8,920 MAD' : '320' },
        { name: 'Marrakech-Safi', value: 20, color: '#ec4899', count: activeMetric === 'earnings' ? '7,150 MAD' : '285' },
        { name: 'Fès-Meknès', value: 15, color: '#06b6d4', count: activeMetric === 'earnings' ? '5,420 MAD' : '195' },
        { name: 'Other', value: 5, color: '#f97316', count: activeMetric === 'earnings' ? '2,100 MAD' : '85' }
      ];

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
        @media (max-width: 1024px) {
           .pie-legend-grid {
             grid-template-columns: repeat(3, 1fr) !important;
           }
        }
        @media (max-width: 768px) {
           .pie-legend-grid {
             grid-template-columns: repeat(2, 1fr) !important;
           }
        }
        @media (max-width: 640px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          .dashboard-header select {
            width: 100%;
          }
          .pie-legend-grid {
            grid-template-columns: 1fr !important;
          }
          .stat-value {
            font-size: 2rem !important;
          }
          .stat-label-text {
            font-size: 0.85rem !important;
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
                <span className="stat-label-text" style={{ fontSize: '1rem', fontWeight: '700' }}>Total Trips Today</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: activeMetric === 'trips' ? 'white' : '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                }}>{stats.trips.trend}</span>
            </div>
            <div className="stat-value" style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0' }}>{stats.trips.value}</div>
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
                <span className="stat-label-text" style={{ fontSize: '1rem', fontWeight: '700' }}>Active Drivers</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: activeMetric === 'drivers' ? 'white' : '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                }}>{stats.drivers.trend}</span>
            </div>
            <div className="stat-value" style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0' }}>{stats.drivers.value}</div>
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
                <span className="stat-label-text" style={{ fontSize: '1rem', fontWeight: '700' }}>Total Earnings</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: activeMetric === 'earnings' ? 'white' : '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                 }}>{stats.earnings.trend}</span>
            </div>
            <div className="stat-value" style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0', display: 'flex', alignItems: 'baseline' }}>
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
                <span className="stat-label-text" style={{ fontSize: '1rem', fontWeight: '700' }}>Daily Bonus Earned</span>
                <span style={{ 
                    fontSize: '0.875rem', 
                    color: activeMetric === 'bonus' ? 'white' : '#38AC57',
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                }}>{stats.bonus.trend}</span>
            </div>
            <div className="stat-value" style={{ fontSize: '3rem', fontWeight: '800', margin: '0.5rem 0', display: 'flex', alignItems: 'baseline' }}>
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
                    value={revenuePeriod}
                    onChange={(e) => setRevenuePeriod(e.target.value)}
                    style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', cursor: 'pointer', fontWeight: '500' }}
                >
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </select>
            </div>
            <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.lineData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="val1" stackId="1" stroke="#38AC57" fill="#38AC57" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="val2" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.4} />
                        <Area type="monotone" dataKey="val3" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="val4" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="val5" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
         </div>

         {/* Top Regions Performance */}
         <div className="card" style={{ flex: '1 1 350px', borderRadius: '1.5rem', border: '1px solid #f1f5f9', maxHeight: '420px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>Top Regions Performance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(regionsPerf.length > 0 ? regionsPerf : [
                    { name: 'Casablanca-Settat', trips: 450, drivers: 120, trend: '+12.5%' },
                    { name: 'Rabat-Salé-Kénitra', trips: 380, drivers: 95, trend: '+8.2%' },
                    { name: 'Marrakech-Safi', trips: 310, drivers: 88, trend: '+5.4%' },
                    { name: 'Fès-Meknès', trips: 240, drivers: 62, trend: '-2.1%' }
                ]).map((region, idx) => (
                    <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span style={{ fontWeight: '700', color: '#111827', fontSize: '1rem' }}>{region.name}</span>
                            <span style={{ fontSize: '0.75rem', backgroundColor: region.trend.startsWith('-') ? '#fee2e2' : '#eef7f0', color: region.trend.startsWith('-') ? '#ef4444' : '#2d8a46', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontWeight: 'bold' }}>{region.trend}</span>
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
           {/* Distribution Performance (Pie Chart) */}
           <div className="card" style={{ flex: '1 1 400px', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                        {activeMetric === 'bonus' ? 'Total Daily Bonus' : 
                         activeMetric === 'earnings' ? 'Earnings Distribution' :
                         activeMetric === 'drivers' ? 'Drivers Distribution' :
                         'Total Trips Performance'}
                    </h3>
                    <span style={{ fontSize: '0.875rem', color: '#38AC57', fontWeight: '700', cursor: 'pointer' }}>
                        {activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}
                    </span>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <select 
                        value={tripsPeriod}
                        onChange={(e) => setTripsPeriod(e.target.value)}
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
                <div className="pie-legend-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
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
                            {(topDriversList.length > 0 ? topDriversList : [
                                { id: 1, name: 'Hassan Ali', idNumber: 'D-8821', location: 'Casablanca', trips: 156, rating: 4.9, vehicle: 'taxi' },
                                { id: 2, name: 'Yassir B.', idNumber: 'D-4412', location: 'Rabat', trips: 142, rating: 4.8, vehicle: 'car' },
                                { id: 3, name: 'Omar M.', idNumber: 'D-9901', location: 'Marrakech', trips: 128, rating: 4.7, vehicle: 'bike' }
                            ]).map((person, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ position: "relative" }}>
                                            <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt={person.name} style={{ width: '60px', height: '60px', borderRadius: '1.25rem', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                <span style={{ color: '#eab308' }}>★</span> {Number(person.rating).toFixed(1)}
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
                                            {(person.trips * 100).toLocaleString()} <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>MAD</span>
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
                            {(topDriversList.length > 0 ? topDriversList : [
                                { id: 1, name: 'Hassan Ali', idNumber: 'D-8821', location: 'Casablanca', trips: 156, rating: 4.9, vehicle: 'taxi' },
                                { id: 2, name: 'Yassir B.', idNumber: 'D-4412', location: 'Rabat', trips: 142, rating: 4.8, vehicle: 'car' },
                                { id: 3, name: 'Omar M.', idNumber: 'D-9901', location: 'Marrakech', trips: 128, rating: 4.7, vehicle: 'bike' }
                            ]).map((person, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '1.25rem', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={`https://i.pravatar.cc/150?u=${idx + 20}`} alt={person.name} style={{ width: '60px', height: '60px', borderRadius: '1.25rem', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                <span style={{ color: '#eab308' }}>★</span> {Number(person.rating).toFixed(1)}
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
                            {(activeTab === 'drivers' 
                                ? (topDriversList.length > 0 ? topDriversList : [
                                    { id: 1, name: 'Hassan Ali', idNumber: 'D-8821', location: 'Casablanca', trips: 156, rating: 4.9, vehicle: 'taxi' },
                                    { id: 2, name: 'Yassir B.', idNumber: 'D-4412', location: 'Rabat', trips: 142, rating: 4.8, vehicle: 'car' },
                                    { id: 3, name: 'Omar M.', idNumber: 'D-9901', location: 'Marrakech', trips: 128, rating: 4.7, vehicle: 'bike' }
                                  ])
                                : (topRidersList.length > 0 ? topRidersList : [
                                    { id: 1, name: 'Fatima Z.', idNumber: 'R-7721', location: 'Casablanca', trips: 45, rating: 5.0 },
                                    { id: 2, name: 'Adam S.', idNumber: 'R-3312', location: 'Rabat', trips: 38, rating: 4.9 },
                                    { id: 3, name: 'Laila K.', idNumber: 'R-1102', location: 'Casablanca', trips: 32, rating: 4.8 }
                                  ])
                            ).map((person, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '1.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={`https://i.pravatar.cc/150?u=${person.idNumber}`} alt={person.name} style={{ width: '60px', height: '60px', borderRadius: '1.25rem', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                <span style={{ color: '#eab308' }}>★</span> {Number(person.rating).toFixed(1)}
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
                                            <img src={getVehicleIcon((person as any).vehicle)} alt="vehicle" style={{ width: '32px', height: 'auto' }} />
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
