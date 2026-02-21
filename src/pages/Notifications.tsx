import { useState, useMemo } from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Specialized Icons
import totalReservationsIcon from '../assets/icons/Total Reservations.png';
import toDriversIcon from '../assets/icons/To Drivers.png';
import pendingPaymentsIcon from '../assets/icons/pending payments.png';
import failedPaymentsIcon from '../assets/icons/failed payments.png';
import { 
  CreateNotificationModal, 
  TeamNotificationModal, 
  NotificationDetailsModal,
  SystemStatusModal
} from './NotificationsModals';

export interface Notification {
  id: string;
  type: 'External' | 'Internal';
  category: string;
  title: string;
  message: string;
  timestamp: string;
  status: 'Sent' | 'Scheduled' | 'Failed';
  readCount: number;
  deliveryCount: number;
  target?: string;
  departments?: string[];
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'NOT001',
    type: 'External',
    category: 'Safety',
    title: 'Safety Check',
    message: 'Unusual delay detected. Are you okay?',
    timestamp: 'Just Now',
    status: 'Sent',
    readCount: 0,
    deliveryCount: 30,
    target: 'Drivers'
  },
  {
    id: 'NOT002',
    type: 'External',
    category: 'Safety',
    title: 'Safety Check',
    message: 'Unusual delay detected. Are you okay?',
    timestamp: 'Just Now',
    status: 'Sent',
    readCount: 0,
    deliveryCount: 30,
    target: 'Drivers'
  },
  {
    id: 'NOT003',
    type: 'External',
    category: 'External',
    title: 'App Update Available',
    message: 'Version 2.4.0 is now live for all users.',
    timestamp: '2 hours ago',
    status: 'Sent',
    readCount: 150,
    deliveryCount: 300,
    target: 'All'
  },
  {
    id: 'NOT004',
    type: 'External',
    category: 'Safety',
    title: 'Safety Check',
    message: 'Unusual delay detected. Are you okay?',
    timestamp: '1 day ago',
    status: 'Sent',
    readCount: 25,
    deliveryCount: 30,
    target: 'Drivers'
  },
  {
    id: 'NOT005',
    type: 'External',
    category: 'Safety',
    title: 'Safety Check',
    message: 'Unusual delay detected. Are you okay?',
    timestamp: '1 day ago',
    status: 'Sent',
    readCount: 25,
    deliveryCount: 30,
    target: 'Drivers'
  },
  {
    id: 'NOT006',
    type: 'External',
    category: 'Message',
    title: 'Message from Driver',
    message: 'Your driver has arrived - please head to...',
    timestamp: '1 day ago',
    status: 'Sent',
    readCount: 1,
    deliveryCount: 1,
    target: 'Riders'
  },
  {
    id: 'NOT007',
    type: 'External',
    category: 'Trip',
    title: 'Trip Completed',
    message: "You've arrived at your destination. Thanks for...",
    timestamp: '1 hour ago',
    status: 'Sent',
    readCount: 1,
    deliveryCount: 1,
    target: 'Riders'
  },
  {
    id: 'NOT008',
    type: 'External',
    category: 'Ride',
    title: 'Ride Accepted',
    message: 'Ali in a Toyota Camry (ABC-234) is on the way...',
    timestamp: '1 hour ago',
    status: 'Sent',
    readCount: 1,
    deliveryCount: 1,
    target: 'Riders'
  },
  // Internal Notifications
  {
    id: 'INT001',
    type: 'Internal',
    category: 'Support',
    title: 'High Support Volume',
    message: 'Support team is experiencing high volume. Please prioritize urgent tickets.',
    timestamp: 'Just Now',
    status: 'Sent',
    readCount: 5,
    deliveryCount: 8,
    departments: ['Support']
  },
  {
    id: 'INT002',
    type: 'Internal',
    category: 'Operations',
    title: 'New Driver Registration Peak',
    message: 'Scheduled maintenance for the driver portal tonight at 12 AM.',
    timestamp: '1 hour ago',
    status: 'Sent',
    readCount: 12,
    deliveryCount: 20,
    departments: ['Operations', 'Legal']
  },
  {
    id: 'INT003',
    type: 'Internal',
    category: 'Marketing',
    title: 'Winter Campaign Launch',
    message: 'The winter campaign assets are ready for review.',
    timestamp: '1 day ago',
    status: 'Sent',
    readCount: 15,
    deliveryCount: 15,
    departments: ['Marketing']
  }
];

export const Notifications = () => {
  const [activeTab, setActiveTab] = useState<'External' | 'Internal'>('External');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetFilter, setTargetFilter] = useState<string | null>(null);

  const filteredNotifications = useMemo(() => {
    return MOCK_NOTIFICATIONS.filter(n => {
      const matchesType = n.type === activeTab;
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTarget = !targetFilter || 
                          (n.target === targetFilter) || 
                          (targetFilter === 'Today' && (n.timestamp.includes('Now') || n.timestamp.includes('hour')));
      
      return matchesType && matchesSearch && matchesTarget;
    });
  }, [activeTab, searchQuery, targetFilter]);

  const stats = [
    { 
      label: 'Total Sent Today', 
      value: '12', 
      desc: 'Cross-platform delivery', 
      icon: totalReservationsIcon,
      color: '#38AC57',
      bg: '#eef7f0',
      onClick: () => setTargetFilter(targetFilter === 'Today' ? null : 'Today')
    },
    { 
      label: 'To Drivers', 
      value: '30', 
      desc: 'Driver app notifications', 
      icon: toDriversIcon,
      color: 'white',
      bg: '#38AC57',
      onClick: () => setTargetFilter(targetFilter === 'Drivers' ? null : 'Drivers')
    },
    { 
      label: 'To Passengers', 
      value: '32', 
      desc: 'Passenger app notifications', 
      icon: pendingPaymentsIcon,
      color: '#38AC57',
      bg: '#eef7f0',
      onClick: () => setTargetFilter(targetFilter === 'Riders' ? null : 'Riders')
    },
    { 
      label: 'System Status', 
      value: '90%', 
      desc: 'Engagement rate', 
      icon: failedPaymentsIcon,
      color: '#38AC57',
      bg: '#eef7f0',
      onClick: () => setIsStatusModalOpen(true)
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case 'Safety': return <ShieldCheck size={20} color="#38AC57" />;
      case 'Message': return <CheckCircle2 size={20} color="#38AC57" />;
      case 'Trip': return <Clock size={20} color="#38AC57" />;
      default: return <Bell size={20} color="#38AC57" />;
    }
  };

  const getIconBg = () => {
    return '#eef7f0';
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, color: '#111827' }}>Notification Management Center</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '1.1rem' }}>External app notifications & internal admin team communications</p>
        </div>
        <button 
          onClick={() => activeTab === 'External' ? setIsCreateModalOpen(true) : setIsTeamModalOpen(true)}
          style={{ 
            backgroundColor: '#38AC57', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '16px', 
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
          }}
        >
          <Plus size={20} strokeWidth={3} /> {activeTab === 'External' ? 'Create Notification' : 'Send Team Notification'}
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {stats.map((stat, index) => {
          const isActive = (stat.label === 'Total Sent Today' && targetFilter === 'Today') ||
                           (stat.label === 'To Drivers' && targetFilter === 'Drivers') ||
                           (stat.label === 'To Passengers' && targetFilter === 'Riders') ||
                           (stat.label === 'System Status' && isStatusModalOpen);

          return (
            <div 
              key={index} 
              onClick={stat.onClick}
              style={{ 
                backgroundColor: isActive ? '#38AC57' : '#eef7f0', 
                padding: '1.5rem', 
                borderRadius: '24px', 
                border: isActive ? 'none' : '1px solid #E5E7EB',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isActive ? 'scale(1.02)' : 'none',
                boxShadow: isActive ? '0 10px 15px -3px rgba(56, 172, 87, 0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '12px', 
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={stat.icon} alt={stat.label} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                </div>
                <span style={{ color: isActive ? 'white' : '#6B7280', fontWeight: '700', fontSize: '0.9rem' }}>{stat.label}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: isActive ? 'white' : '#111827', lineHeight: '1' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.85rem', color: isActive ? 'rgba(255,255,255,0.8)' : '#6B7280', marginTop: '0.5rem', fontWeight: '600' }}>{stat.desc}</div>
                </div>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: isActive ? 'black' : '#38AC57',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ArrowUpRight size={18} color="white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search notifications..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '400px', 
            padding: '12px 16px 12px 48px', 
            borderRadius: '24px', 
            border: '1px solid #e5e7eb', 
            fontSize: '1rem',
            outline: 'none',
            backgroundColor: 'white'
          }}
        />
        <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'inline-flex', backgroundColor: '#F3F4F6', padding: '6px', borderRadius: '16px', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('External')}
          style={{ 
            padding: '10px 32px', 
            borderRadius: '12px', 
            border: 'none',
            backgroundColor: activeTab === 'External' ? '#38AC57' : 'transparent',
            color: activeTab === 'External' ? 'white' : '#6B7280',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          External App
        </button>
        <button 
          onClick={() => setActiveTab('Internal')}
          style={{ 
            padding: '10px 32px', 
            borderRadius: '12px', 
            border: 'none',
            backgroundColor: activeTab === 'Internal' ? '#38AC57' : 'transparent',
            color: activeTab === 'Internal' ? 'white' : '#6B7280',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Admin Team
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {activeTab === 'Internal' ? (
          <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#38AC57', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '800', fontSize: '15px' }}>Title</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '15px', textAlign: 'center' }}>Target</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '15px', textAlign: 'center' }}>Category</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '15px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((notif) => (
                  <tr key={notif.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>{notif.title}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700' }}>{notif.id}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '6px 20px', 
                        borderRadius: '8px', 
                        fontSize: '13px', 
                        fontWeight: '700', 
                        backgroundColor: (notif.category === 'Urgent' || notif.category === 'Alert') ? '#FEE2E2' : '#DBEAFE', 
                        color: (notif.category === 'Urgent' || notif.category === 'Alert') ? '#EF4444' : '#3B82F6'
                      }}>
                        {notif.departments?.[0] || 'Support'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '6px 20px', 
                        borderRadius: '8px', 
                        fontSize: '13px', 
                        fontWeight: '700', 
                        backgroundColor: notif.category === 'Update' ? '#FEF9C3' : 
                                       (notif.category === 'Urgent' || notif.category === 'Alert') ? '#FEE2E2' : '#DBEAFE',
                        color: notif.category === 'Update' ? '#854D0E' : 
                               (notif.category === 'Urgent' || notif.category === 'Alert') ? '#EF4444' : '#3B82F6'
                      }}>
                        {notif.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '6px 20px', 
                        borderRadius: '8px', 
                        fontSize: '13px', 
                        fontWeight: '700', 
                        backgroundColor: notif.status === 'Sent' ? '#eef7f0' : '#F3F4F6', 
                        color: notif.status === 'Sent' ? '#38AC57' : '#374151' 
                      }}>
                        {notif.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div>
              <h2 style={{ fontSize: '1rem', color: '#6B7280', fontWeight: '700', marginBottom: '1rem' }}>Today</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredNotifications.filter(n => n.timestamp.includes('Now') || n.timestamp.includes('hour')).map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => { setSelectedNotification(notif); setIsDetailsModalOpen(true); }}
                    style={{ 
                      backgroundColor: 'white', 
                      padding: '1.25rem', 
                      borderRadius: '16px', 
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      cursor: 'pointer',
                      transition: 'transform 0.1s ease',
                    }}
                  >
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px', 
                      backgroundColor: getIconBg(),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {getIcon(notif.category)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#111827' }}>{notif.title}</span>
                        <span style={{ color: '#38AC57', fontSize: '0.8rem', fontWeight: '700' }}>{notif.timestamp}</span>
                      </div>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.95rem', fontWeight: '600' }}>{notif.message}</p>
                    </div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38AC57' }}></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '1rem', color: '#6B7280', fontWeight: '700', marginBottom: '1rem' }}>Yesterday</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredNotifications.filter(n => n.timestamp.includes('day')).map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => { setSelectedNotification(notif); setIsDetailsModalOpen(true); }}
                    style={{ 
                      backgroundColor: 'white', 
                      padding: '1.25rem', 
                      borderRadius: '16px', 
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px', 
                      backgroundColor: getIconBg(),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {getIcon(notif.category)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '800', fontSize: '1.1rem', color: '#111827' }}>{notif.title}</span>
                        <span style={{ color: '#6B7280', fontSize: '0.8rem', fontWeight: '700' }}>{notif.timestamp}</span>
                      </div>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.95rem', fontWeight: '600' }}>{notif.message}</p>
                    </div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38AC57' }}></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <CreateNotificationModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      <TeamNotificationModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
      />
      <NotificationDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)}
        notification={selectedNotification}
      />
      <SystemStatusModal 
        isOpen={isStatusModalOpen} 
        onClose={() => setIsStatusModalOpen(false)}
      />
    </div>
  );
};
