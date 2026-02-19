import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Plane, 
  ArrowUpRight, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Clock, 
  ChevronLeft,
  Star,
  Package,
  Users
} from 'lucide-react';

interface ServiceStat {
  label: string;
  value: string;
  trend?: string;
  color: string;
  icon: React.ReactNode;
}

interface ServiceMember {
  id: string;
  name: string;
  type: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Enabled' | 'Disabled';
  activeNow: number;
  totalToday: number;
  revenue: string;
  growth: string;
  responseTime: string;
  lastUpdated: string;
  icon: React.ReactNode;
  description: string;
  rating: number;
  completionRate: string;
  features: string[];
  coverage: string[];
  stats: {
    totalRequests: number;
    activeNow: number;
    completed: number;
    cancelled: number;
  };
}

export const AllServices = () => {
  const [selectedService, setSelectedService] = useState<ServiceMember | null>(null);
  const [activeChart, setActiveChart] = useState<'revenue' | 'growth' | null>(null);

  const stats: ServiceStat[] = [
    { label: 'Total Services', value: '12', color: '#ffffff', icon: <Package size={20} color="#22c55e" /> },
    { label: 'Enabled', value: '30', color: '#22c55e', icon: <CheckCircle2 size={20} color="#ffffff" /> },
    { label: 'Disabled', value: '32', color: '#ffffff', icon: <XCircle size={20} color="#22c55e" /> },
    { label: 'Active Requests', value: '348', color: '#ffffff', icon: <Zap size={20} color="#22c55e" /> },
  ];

  const services: ServiceMember[] = [
    {
      id: '1',
      name: 'Ride',
      type: 'Regular Ride',
      priority: 'High',
      status: 'Enabled',
      activeNow: 89,
      totalToday: 1247,
      revenue: '45,230 MAD',
      growth: '+12%',
      responseTime: '3.2 min',
      lastUpdated: '2025-01-10 15:30',
      icon: <Car size={24} color="#111827" />,
      description: 'Standard point-to-point rides within the city for daily transportation needs',
      rating: 4.7,
      completionRate: '88.1%',
      features: ['Real-time tracking', 'Driver rating', 'Multiple payment options', 'Route optimization'],
      coverage: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier'],
      stats: { totalRequests: 1247, activeNow: 89, completed: 1098, cancelled: 60 }
    },
    {
      id: '2',
      name: 'Motorcycle',
      type: 'Express Bike',
      priority: 'Medium',
      status: 'Enabled',
      activeNow: 89,
      totalToday: 1247,
      revenue: '45,230 MAD',
      growth: '+12%',
      responseTime: '3.2 min',
      lastUpdated: '2025-01-10 15:30',
      icon: <Bike size={24} color="#111827" />,
      description: 'Quick motorcycle rides to beat traffic in congested urban areas',
      rating: 4.5,
      completionRate: '92.4%',
      features: ['Helmet provided', 'Express lanes', 'Solo passenger', 'Low cost'],
      coverage: ['Casablanca', 'Rabat'],
      stats: { totalRequests: 1247, activeNow: 45, completed: 1150, cancelled: 52 }
    },
    {
      id: '3',
      name: 'Ride to Airport',
      type: 'Airport Shuttle',
      priority: 'High',
      status: 'Enabled',
      activeNow: 89,
      totalToday: 1247,
      revenue: '45,230 MAD',
      growth: '+12%',
      responseTime: '3.2 min',
      lastUpdated: '2025-01-10 15:30',
      icon: <Plane size={24} color="#111827" />,
      description: 'Reliable airport transfers with luggage assistance and flight tracking',
      rating: 4.9,
      completionRate: '98.5%',
      features: ['Luggage support', 'Scheduled pickup', 'Flight tracking', 'Wait time inclusion'],
      coverage: ['CMN Airport', 'RAK Airport'],
      stats: { totalRequests: 540, activeNow: 12, completed: 520, cancelled: 8 }
    },
    {
      id: '4',
      name: 'Reservations',
      type: 'Pre-booked',
      priority: 'Medium',
      status: 'Enabled',
      activeNow: 89,
      totalToday: 1247,
      revenue: '45,230 MAD',
      growth: '+12%',
      responseTime: '3.2 min',
      lastUpdated: '2025-01-10 15:30',
      icon: <Clock size={24} color="#111827" />,
      description: 'Advanced ride scheduling for planned trips and appointments',
      rating: 4.8,
      completionRate: '95.2%',
      features: ['Future booking', 'Selection of driver', 'Fixed pricing', 'Reminder alerts'],
      coverage: ['All Cities'],
      stats: { totalRequests: 210, activeNow: 5, completed: 200, cancelled: 5 }
    },
    {
      id: '5',
      name: 'City to City',
      type: 'Intersity',
      priority: 'Low',
      status: 'Enabled',
      activeNow: 89,
      totalToday: 1247,
      revenue: '45,230 MAD',
      growth: '+12%',
      responseTime: '3.2 min',
      lastUpdated: '2025-01-10 15:30',
      icon: <Car size={24} color="#111827" />, // Should be specialized icon but Car works
      description: 'Long-distance travel between different cities with comfort options',
      rating: 4.6,
      completionRate: '90.7%',
      features: ['Highway tolls incl.', 'Comfort cars', 'Door-to-door', 'Rest stops'],
      coverage: ['Inter-city network'],
      stats: { totalRequests: 85, activeNow: 8, completed: 75, cancelled: 2 }
    },
    {
      id: '6',
      name: 'Taxi',
      type: 'Traditional Taxi',
      priority: 'High',
      status: 'Enabled',
      activeNow: 89,
      totalToday: 1247,
      revenue: '45,230 MAD',
      growth: '+12%',
      responseTime: '3.2 min',
      lastUpdated: '2025-01-10 15:30',
      icon: <Car size={24} color="#111827" />,
      description: 'Book traditional licensed taxis through the platform',
      rating: 4.3,
      completionRate: '85.4%',
      features: ['Metered fare', 'Licensed drivers', 'Street hail integration', 'Quick arrival'],
      coverage: ['Major cities'],
      stats: { totalRequests: 3400, activeNow: 156, completed: 3100, cancelled: 144 }
    },
    {
      id: '7',
      name: 'Delivery',
      type: 'Parcel Service',
      priority: 'Medium',
      status: 'Enabled',
      activeNow: 89,
      totalToday: 1247,
      revenue: '45,230 MAD',
      growth: '+12%',
      responseTime: '3.2 min',
      lastUpdated: '2025-01-10 15:30',
      icon: <Package size={24} color="#111827" />,
      description: 'On-demand package delivery and courier services',
      rating: 4.7,
      completionRate: '94.2%',
      features: ['Proof of delivery', 'Weight options', 'Fragile handling', 'Live tracking'],
      coverage: ['Casablanca', 'Rabat'],
      stats: { totalRequests: 890, activeNow: 42, completed: 850, cancelled: 15 }
    },
    {
      id: '8',
      name: 'Rental Car',
      type: 'Self-drive',
      priority: 'Medium',
      status: 'Disabled',
      activeNow: 0,
      totalToday: 0,
      revenue: '0 MAD',
      growth: '0%',
      responseTime: 'N/A',
      lastUpdated: '2025-01-10 15:30',
      icon: <Car size={24} color="#9ca3af" />,
      description: 'Self-drive car rental for flexible periods',
      rating: 4.4,
      completionRate: '0%',
      features: [],
      coverage: [],
      stats: { totalRequests: 0, activeNow: 0, completed: 0, cancelled: 0 }
    },
    {
      id: '9',
      name: 'Group Ride',
      type: 'Pooling',
      priority: 'Low',
      status: 'Disabled',
      activeNow: 0,
      totalToday: 0,
      revenue: '0 MAD',
      growth: '0%',
      responseTime: 'N/A',
      lastUpdated: '2025-01-10 15:30',
      icon: <Users size={24} color="#9ca3af" />,
      description: 'Carpooling with other passengers heading in the same direction',
      rating: 4.2,
      completionRate: '0%',
      features: [],
      coverage: [],
      stats: { totalRequests: 0, activeNow: 0, completed: 0, cancelled: 0 }
    }
  ];

  const enabledServices = services.filter(s => s.status === 'Enabled');
  const disabledServices = services.filter(s => s.status === 'Disabled');

  const renderServiceCard = (service: ServiceMember) => (
    <div key={service.id} style={{ 
      backgroundColor: 'white', 
      borderRadius: '1.25rem', 
      padding: '1.25rem', 
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
      opacity: service.status === 'Disabled' ? 0.7 : 1,
      transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#f3f4f6', padding: '0.6rem', borderRadius: '0.75rem' }}>
            {service.icon}
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#111827' }}>{service.name}</h4>
            <span style={{ 
              fontSize: '0.65rem', 
              fontWeight: '700', 
              padding: '0.1rem 0.5rem', 
              borderRadius: '0.25rem',
              backgroundColor: service.priority === 'High' ? '#fee2e2' : service.priority === 'Medium' ? '#fef3c7' : '#f3f4f6',
              color: service.priority === 'High' ? '#ef4444' : service.priority === 'Medium' ? '#d97706' : '#6b7280',
              textTransform: 'uppercase'
            }}>
              {service.priority} Priority
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div 
            style={{ 
              width: '44px', 
              height: '24px', 
              backgroundColor: service.status === 'Enabled' ? '#22c55e' : '#e5e7eb', 
              borderRadius: '12px', 
              position: 'relative', 
              cursor: 'pointer' 
            }}
          >
            <div style={{ 
              width: '18px', 
              height: '18px', 
              backgroundColor: 'white', 
              borderRadius: '50%', 
              position: 'absolute', 
              top: '3px', 
              left: service.status === 'Enabled' ? '23px' : '3px',
              transition: 'all 0.2s'
            }} />
          </div>
          <button 
            onClick={() => setSelectedService(service)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: '#6b7280' }}
          >
            <Eye size={20} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>{service.activeNow}</div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>Active Now</div>
        </div>
        <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827' }}>{service.totalToday}</div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>Total Today</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.5rem' }}>
        <span onClick={(e) => { e.stopPropagation(); setActiveChart('revenue'); }} style={{ cursor: 'pointer' }}>Revenue: <strong style={{ color: '#111827' }}>{service.revenue}</strong></span>
        <span onClick={(e) => { e.stopPropagation(); setActiveChart('growth'); }} style={{ cursor: 'pointer' }}>Growth: <strong style={{ color: '#22c55e' }}>{service.growth}</strong></span>
        <span>Resp. Time: <strong style={{ color: '#111827' }}>{service.responseTime}</strong></span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
        <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Last updated: <span style={{ fontWeight: '700' }}>{service.lastUpdated}</span></div>
        <div 
          className={service.status === 'Enabled' ? 'pulsate' : ''}
          style={{ 
            backgroundColor: service.status === 'Enabled' ? '#f0fdf4' : '#fef2f2', 
            color: service.status === 'Enabled' ? '#22c55e' : '#ef4444', 
            fontSize: '0.65rem', 
            fontWeight: '700', 
            padding: '0.2rem 0.5rem', 
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
        >
          {service.status === 'Enabled' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />}
          {service.status === 'Enabled' ? 'Live' : 'Paused'}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '100vh', position: 'relative' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827', margin: 0 }}>All Services Management</h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1rem' }}>Enable, disable, and manage all 9 Hezzni services from one central hub</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => alert('Opening Service Status Monitor...')}
            style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0.75rem 1.5rem', borderRadius: '2rem', fontWeight: '700', fontSize: '0.9rem', color: '#4b5563', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            Service Status Monitor
          </button>
          <button 
            onClick={() => alert('Opening Global Service Settings...')}
            style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '2rem', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.2)' }}
          >
            Global Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ 
            backgroundColor: stat.color, 
            color: stat.color === '#22c55e' ? 'white' : '#111827',
            padding: '1.75rem', 
            borderRadius: '1.5rem',
            border: stat.color === '#ffffff' ? '1px solid #e5e7eb' : 'none',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ 
                backgroundColor: stat.color === '#22c55e' ? 'rgba(255,255,255,0.2)' : '#f0fdf4', 
                padding: '0.5rem', 
                borderRadius: '0.75rem' 
              }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: '700' }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: '900' }}>{stat.value}</div>
            <div style={{ 
              position: 'absolute', 
              right: '1.5rem', 
              bottom: '1.5rem',
              backgroundColor: stat.color === '#22c55e' ? '#111827' : '#22c55e',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ArrowUpRight size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Enabled Services Grid */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>
          Enabled Services ({enabledServices.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {enabledServices.map(renderServiceCard)}
        </div>
      </div>

      {/* Disabled Services Grid */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1.5rem' }}>
          Disabled Services ({disabledServices.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {disabledServices.map(renderServiceCard)}
        </div>
      </div>

      {/* Revenue Modal */}
      {activeChart === 'revenue' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div onClick={() => setActiveChart(null)} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', width: '90%', maxWidth: '500px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', margin: 'auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: 0 }}>Revenue</h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '0.75rem', paddingBottom: '2rem', borderLeft: '2px dashed #e5e7eb', borderBottom: '2px dashed #e5e7eb', paddingLeft: '1rem', position: 'relative' }}>
              {/* Y-Axis Labels */}
              <div style={{ position: 'absolute', left: '-45px', bottom: '0', height: '100%', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', fontWeight: 'bold' }}>
                <span>0</span>
                <span>150</span>
                <span>300</span>
                <span>450</span>
                <span>600</span>
              </div>
              {/* Bars */}
              {[450, 320, 280, 500, 320, 250, 500, 350, 300, 450, 250].map((h, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: '#22c55e', height: `${(h/600)*100}%`, borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 0.5s ease-out' }}>
                  {i === 10 && <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>300</div>}
                </div>
              ))}
            </div>
            {/* X-Axis Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingLeft: '1rem', fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold' }}>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thurs</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>45,230 MAD</span>
            </div>
          </div>
        </div>
      )}

      {/* Growth Modal */}
      {activeChart === 'growth' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div onClick={() => setActiveChart(null)} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', width: '90%', maxWidth: '500px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', margin: 'auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', marginTop: 0 }}>Growth</h3>
            <div style={{ height: '300px', position: 'relative', borderLeft: '2px dashed #e5e7eb', borderBottom: '2px dashed #e5e7eb', paddingLeft: '1rem', overflow: 'hidden' }}>
              {/* Y-Axis Labels */}
              <div style={{ position: 'absolute', left: '-45px', bottom: '0', height: '100%', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', fontWeight: 'bold' }}>
                <span>0</span>
                <span>150</span>
                <span>300</span>
                <span>450</span>
                <span>600</span>
              </div>
              {/* Area Chart Implementation using SVG */}
              <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none">
                <defs>
                   <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <path d="M0,250 Q100,200 150,220 T300,100 T400,280 L400,300 L0,300 Z" fill="url(#growthGradient)" />
                <path d="M0,250 Q100,200 150,220 T300,100 T400,280" stroke="#3b82f6" strokeWidth="3" fill="none" />
                {/* Additional layers for stylized look */}
                <path d="M0,260 Q100,210 150,230 T300,110 T400,290 L400,300 L0,300 Z" fill="#22c55e" opacity="0.3" />
                <path d="M0,270 Q100,220 150,240 T300,120 T400,300 L400,300 L0,300 Z" fill="#f59e0b" opacity="0.3" />
                <path d="M0,280 Q100,230 150,250 T300,130 T400,300 L400,300 L0,300 Z" fill="#ef4444" opacity="0.3" />
              </svg>
            </div>
            {/* X-Axis Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingLeft: '1rem', fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold' }}>
              <span>06:00</span>
              <span>09:00</span>
              <span>12:00</span>
              <span>15:00</span>
              <span>18:00</span>
              <span>21:00</span>
              <span>00:00</span>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedService && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            width: '100%', 
            maxWidth: '680px', 
            maxHeight: '90vh', 
            borderRadius: '2rem', 
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                onClick={() => setSelectedService(null)}
                style={{ background: '#f3f4f6', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', color: '#111827' }}
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>{selectedService.name} - Service Details</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>Complete information and management options for {selectedService.type}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Service Information Box */}
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '800' }}>Service Information</h4>
                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.4rem' }}>Status:</div>
                    <span style={{ backgroundColor: '#f0fdf4', color: '#22c55e', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '700' }}>
                      {selectedService.status}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.4rem' }}>Last Updated:</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>{selectedService.lastUpdated}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.4rem' }}>Priority:</div>
                    <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: '700' }}>
                      {selectedService.priority} Priority
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.4rem' }}>Rating:</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={14} fill="#fbbf24" color="#fbbf24" /> {selectedService.rating}/5.0
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics Section */}
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '800' }}>Performance Metrics</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  {[
                    { label: 'Growth:', value: selectedService.growth, color: '#22c55e' },
                    { label: 'Revenue:', value: selectedService.revenue, color: '#111827' },
                    { label: 'Response Time:', value: selectedService.responseTime, color: '#111827' },
                    { label: 'Completion Rate:', value: selectedService.completionRate, color: '#111827' }
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.4rem' }}>{m.label}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '800', color: m.color }}>{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Description Section */}
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '800' }}>Service Description</h4>
                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '1.5rem', color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {selectedService.description}
                </div>
              </div>

              {/* Service Features Grid */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '1.5rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '800' }}>Service Features</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {selectedService.features.map((feature: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: '600', color: '#16a34a' }}>
                      <CheckCircle2 size={16} /> {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Coverage Areas Section */}
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '800' }}>Coverage Areas</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {selectedService.coverage.map((city: string, i: number) => (
                    <span key={i} style={{ 
                      padding: '0.6rem 1.5rem', 
                      borderRadius: '2rem', 
                      border: '1px solid #e5e7eb', 
                      fontSize: '0.8rem', 
                      fontWeight: '700', 
                      color: '#4b5563' 
                    }}>
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Statistics Grid */}
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '2rem' }}>
                <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '800' }}>Detailed Statistics</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {[
                    { label: 'Total Requests', value: selectedService.stats.totalRequests },
                    { label: 'Active Now', value: selectedService.stats.activeNow },
                    { label: 'Completed', value: selectedService.stats.completed },
                    { label: 'Cancelled', value: selectedService.stats.cancelled }
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center', flex: 1, borderRight: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827', marginBottom: '0.25rem' }}>{s.value}</div>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: '700', textTransform: 'uppercase' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Navigation Helper */}
      <div style={{ 
        position: 'fixed', 
        bottom: '2rem', 
        left: '2rem', 
        backgroundColor: '#f1f5f9', 
        padding: '0.5rem 1rem', 
        borderRadius: '2rem', 
        display: 'flex', 
        gap: '1rem',
        fontSize: '0.7rem',
        fontWeight: '700',
        color: '#64748b',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        zIndex: 50
      }}>
        <span>#ALLSERVICES</span>
        <span>•</span>
        <span>MANAGEMENT HUB v1.0</span>
      </div>
    </div>
  );
};
