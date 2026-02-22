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
    <div className="main-content" style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', overflowY: 'auto' }}>
      <style>{`
        .not-header-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2.5rem;
            gap: 1.5rem;
        }
        .not-title-section h1 {
            font-size: 2rem;
            font-weight: 800;
            margin: 0 0 0.5rem 0;
            color: #111827;
        }
        .not-title-section p {
            margin: 0;
            color: #6B7280;
            font-size: 1.1rem;
        }
        .not-create-btn {
            background-color: #38AC57;
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 18px;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1rem;
            box-shadow: 0 8px 16px -4px rgba(56, 172, 87, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
        }
        .not-create-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 20px -4px rgba(56, 172, 87, 0.5);
            background-color: #2e8f47;
        }
        .not-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            margin-bottom: 2.5rem;
        }
        .not-stat-card {
            padding: 1.75rem;
            border-radius: 28px;
            border: 1px solid #E5E7EB;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .not-stat-card.active {
            background-color: #38AC57 !important;
            border-color: #38AC57 !important;
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(56, 172, 87, 0.3);
        }
        .not-search-container {
            position: relative;
            margin-bottom: 2rem;
            max-width: 500px;
        }
        .not-search-input {
            width: 100%;
            padding: 14px 16px 14px 52px;
            border-radius: 20px;
            border: 1.5px solid #e5e7eb;
            font-size: 1rem;
            font-weight: 600;
            outline: none;
            background-color: white;
            transition: all 0.2s;
        }
        .not-search-input:focus {
            border-color: #38AC57;
            box-shadow: 0 0 0 4px rgba(56, 172, 87, 0.1);
        }
        .not-tabs-container {
            display: inline-flex;
            background-color: #F3F4F6;
            padding: 6px;
            border-radius: 20px;
            margin-bottom: 2.5rem;
        }
        .not-tab-btn {
            padding: 12px 36px;
            border-radius: 14px;
            border: none;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.95rem;
        }
        .not-tab-active {
            background-color: #38AC57;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .not-list-group {
            margin-bottom: 2rem;
        }
        .not-group-title {
            font-size: 1.1rem;
            color: #111827;
            font-weight: 900;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .not-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 24px;
            border: 1.5px solid #E5E7EB;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-bottom: 1rem;
        }
        .not-card:hover {
            border-color: #38AC57;
            background-color: #fcfdfc;
            transform: translateX(4px);
        }
        .not-table-wrapper {
            background-color: white;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid #E5E7EB;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
            overflow-x: auto;
        }
        .not-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 800px;
        }

        @media (max-width: 1024px) {
            .not-stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (max-width: 768px) {
            .not-header-container {
                flex-direction: column;
                align-items: stretch;
                text-align: center;
            }
            .not-create-btn {
                width: 100%;
                justify-content: center;
            }
            .not-stats-grid {
                grid-template-columns: 1fr;
            }
            .not-search-container {
                max-width: 100%;
            }
            .not-tabs-container {
                width: 100%;
            }
            .not-tab-btn {
                flex: 1;
                padding: 12px 10px;
            }
            .not-card {
                flex-direction: column;
                align-items: flex-start;
                padding: 1.25rem;
            }
            .not-card-status {
                align-self: flex-end;
            }
        }
      `}</style>
      {/* Header */}
      <div className="not-header-container">
        <div className="not-title-section">
          <h1>Notification Management Center</h1>
          <p>External app notifications & internal admin team communications</p>
        </div>
        <button 
          className="not-create-btn"
          onClick={() => activeTab === 'External' ? setIsCreateModalOpen(true) : setIsTeamModalOpen(true)}
        >
          <Plus size={22} strokeWidth={3} /> {activeTab === 'External' ? 'Create Notification' : 'Send Team Notification'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="not-stats-grid">
        {stats.map((stat, index) => {
          const isActive = (stat.label === 'Total Sent Today' && targetFilter === 'Today') ||
                           (stat.label === 'To Drivers' && targetFilter === 'Drivers') ||
                           (stat.label === 'To Passengers' && targetFilter === 'Riders') ||
                           (stat.label === 'System Status' && isStatusModalOpen);

          return (
            <div 
              key={index} 
              onClick={stat.onClick}
              className={`not-stat-card ${isActive ? 'active' : ''}`}
              style={{ 
                backgroundColor: isActive ? '#38AC57' : '#eef7f0', 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '14px', 
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isActive ? 'none' : '0 4px 6px rgba(0,0,0,0.05)'
                }}>
                  <img src={stat.icon} alt={stat.label} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                </div>
                <span style={{ color: isActive ? 'white' : '#6B7280', fontWeight: '800', fontSize: '0.95rem' }}>{stat.label}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: isActive ? 'white' : '#111827', lineHeight: '1' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.85rem', color: isActive ? 'rgba(255,255,255,0.85)' : '#6B7280', marginTop: '0.6rem', fontWeight: '700' }}>{stat.desc}</div>
                </div>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  backgroundColor: isActive ? 'rgba(0,0,0,0.3)' : '#38AC57',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}>
                  <ArrowUpRight size={20} color="white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="not-search-container">
        <input 
          type="text" 
          className="not-search-input"
          placeholder="Search by title or message..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={22} color="#9CA3AF" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
      </div>

      {/* Navigation Tabs */}
      <div className="not-tabs-container">
        <button 
          onClick={() => setActiveTab('External')}
          className={`not-tab-btn ${activeTab === 'External' ? 'not-tab-active' : ''}`}
          style={{ color: activeTab === 'External' ? 'white' : '#6B7280' }}
        >
          External App
        </button>
        <button 
          onClick={() => setActiveTab('Internal')}
          className={`not-tab-btn ${activeTab === 'Internal' ? 'not-tab-active' : ''}`}
          style={{ color: activeTab === 'Internal' ? 'white' : '#6B7280' }}
        >
          Admin Team
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {activeTab === 'Internal' ? (
          <div className="not-table-wrapper">
            <table className="not-table">
              <thead>
                <tr style={{ backgroundColor: '#38AC57', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '15px' }}>Title</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '15px', textAlign: 'center' }}>Target</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '15px', textAlign: 'center' }}>Category</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '15px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.length > 0 ? filteredNotifications.map((notif) => (
                  <tr key={notif.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontWeight: '900', fontSize: '16px', color: '#111827' }}>{notif.title}</div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '800', letterSpacing: '0.05em', marginTop: '2px' }}>{notif.id}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '6px 20px', 
                        borderRadius: '10px', 
                        fontSize: '13px', 
                        fontWeight: '800', 
                        backgroundColor: '#DBEAFE', 
                        color: '#3B82F6'
                      }}>
                        {notif.departments?.[0] || 'Support'}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '6px 20px', 
                        borderRadius: '10px', 
                        fontSize: '13px', 
                        fontWeight: '800', 
                        backgroundColor: notif.category === 'Update' ? '#FEF9C3' : 
                                       (notif.category === 'Urgent' || notif.category === 'Alert') ? '#FEE2E2' : '#DBEAFE',
                        color: notif.category === 'Update' ? '#854D0E' : 
                               (notif.category === 'Urgent' || notif.category === 'Alert') ? '#EF4444' : '#3B82F6'
                      }}>
                        {notif.category}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '6px 20px', 
                        borderRadius: '10px', 
                        fontSize: '13px', 
                        fontWeight: '800', 
                        backgroundColor: notif.status === 'Sent' ? '#eef7f0' : '#F3F4F6', 
                        color: notif.status === 'Sent' ? '#38AC57' : '#374151' 
                      }}>
                        {notif.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                   <tr>
                     <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: '#9CA3AF', fontWeight: '700' }}>No admin notifications found</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="not-list-group">
              <h2 className="not-group-title">Today</h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredNotifications.filter(n => n.timestamp.includes('Now') || n.timestamp.includes('hour')).map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => { setSelectedNotification(notif); setIsDetailsModalOpen(true); }}
                    className="not-card"
                  >
                    <div style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '16px', 
                      backgroundColor: getIconBg(),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 10px rgba(56, 172, 87, 0.1)'
                    }}>
                      {getIcon(notif.category)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: '900', fontSize: '1.15rem', color: '#111827' }}>{notif.title}</span>
                        <span style={{ color: '#38AC57', fontSize: '0.85rem', fontWeight: '800' }}>{notif.timestamp}</span>
                      </div>
                      <p style={{ margin: '0.4rem 0 0 0', color: '#6B7280', fontSize: '1rem', fontWeight: '600', lineHeight: '1.5' }}>{notif.message}</p>
                    </div>
                    <div className="not-card-status" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#38AC57', flexShrink: 0 }}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="not-list-group">
              <h2 className="not-group-title">Yesterday</h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredNotifications.filter(n => n.timestamp.includes('day')).map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => { setSelectedNotification(notif); setIsDetailsModalOpen(true); }}
                    className="not-card"
                  >
                    <div style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '16px', 
                      backgroundColor: getIconBg(),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 10px rgba(9, 10, 10, 0.05)'
                    }}>
                      {getIcon(notif.category)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: '900', fontSize: '1.15rem', color: '#111827' }}>{notif.title}</span>
                        <span style={{ color: '#6B7280', fontSize: '0.85rem', fontWeight: '800' }}>{notif.timestamp}</span>
                      </div>
                      <p style={{ margin: '0.4rem 0 0 0', color: '#6B7280', fontSize: '1rem', fontWeight: '600', lineHeight: '1.5' }}>{notif.message}</p>
                    </div>
                    <div className="not-card-status" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#38AC57', flexShrink: 0 }}></div>
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
