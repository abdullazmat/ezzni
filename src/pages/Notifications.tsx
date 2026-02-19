import { useState, useMemo } from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Users, 
  Calendar, 
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Navigation,
  CheckCircle2,
  Clock
} from 'lucide-react';
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
      icon: Calendar,
      color: '#10B981',
      bg: '#F0FDF4',
      onClick: () => setTargetFilter(targetFilter === 'Today' ? null : 'Today')
    },
    { 
      label: 'To Drivers', 
      value: '30', 
      desc: 'Driver app notifications', 
      icon: Navigation,
      color: 'white',
      bg: '#10B981',
      onClick: () => setTargetFilter(targetFilter === 'Drivers' ? null : 'Drivers')
    },
    { 
      label: 'To Passengers', 
      value: '32', 
      desc: 'Passenger app notifications', 
      icon: Users,
      color: '#10B981',
      bg: '#F0FDF4',
      onClick: () => setTargetFilter(targetFilter === 'Riders' ? null : 'Riders')
    },
    { 
      label: 'System Status', 
      value: '90%', 
      desc: 'Engagement rate', 
      icon: TrendingUp,
      color: '#10B981',
      bg: '#F0FDF4',
      onClick: () => setIsStatusModalOpen(true)
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case 'Safety': return <ShieldCheck size={20} className="text-green-600" />;
      case 'Message': return <CheckCircle2 size={20} className="text-green-600" />;
      case 'Trip': return <Clock size={20} className="text-green-600" />;
      default: return <Bell size={20} className="text-green-600" />;
    }
  };

  const getIconBg = () => {
    return '#F0FDF4';
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
            backgroundColor: '#10B981', 
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
        {stats.map((stat, index) => (
          <div 
            key={index} 
            onClick={stat.onClick}
            style={{ 
              backgroundColor: stat.bg, 
              padding: '1.5rem', 
              borderRadius: '24px', 
              border: (targetFilter === stat.label.split(' ').pop() || (stat.label === 'Total Sent Today' && targetFilter === 'Today')) 
                ? '2px solid #10B981' 
                : (stat.color === 'white' ? 'none' : '1px solid #E5E7EB'),
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: (targetFilter === stat.label.split(' ').pop() || (stat.label === 'Total Sent Today' && targetFilter === 'Today')) ? 'scale(1.02)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                backgroundColor: stat.color === 'white' ? 'rgba(255,255,255,0.2)' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={20} color={stat.color === 'white' ? 'white' : '#10B981'} />
              </div>
              <span style={{ color: stat.color === 'white' ? 'white' : '#6B7280', fontWeight: '700', fontSize: '0.9rem' }}>{stat.label}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: stat.color === 'white' ? 'white' : '#111827', lineHeight: '1' }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: stat.color === 'white' ? 'rgba(255,255,255,0.8)' : '#6B7280', marginTop: '0.5rem', fontWeight: '600' }}>{stat.desc}</div>
              </div>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: stat.color === 'white' ? 'black' : '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ArrowUpRight size={18} color="white" />
              </div>
            </div>
          </div>
        ))}
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
            backgroundColor: activeTab === 'External' ? '#10B981' : 'transparent',
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
            backgroundColor: activeTab === 'Internal' ? '#10B981' : 'transparent',
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
                    <span style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: '700' }}>{notif.timestamp}</span>
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.95rem', fontWeight: '600' }}>{notif.message}</p>
                </div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
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
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
              </div>
            ))}
          </div>
        </div>
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
