import logo from '../assets/Logo.png';
import { 
  LayoutDashboard, 
  MapPin, 
  Navigation, 
  Archive, 
  BadgeCheck, 
  Calendar, 
  Truck, 
  Users, 
  User, 
  FileText, 
  Building2, 
  CreditCard, 
  Headphones, 
  Star, 
  Ticket, 
  Bell, 
  BarChart2, 
  Settings 
} from 'lucide-react';

type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

export const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-trips', label: 'Live Trips', icon: MapPin },
    { id: 'ride-assignment', label: 'Ride Assignment', icon: Navigation },
    { id: 'archive-trips', label: 'Archive Trips', icon: Archive },
    { id: 'verification-badges', label: 'Verification Badges', icon: BadgeCheck },
    { id: 'reservation', label: 'Reservation', icon: Calendar },
    { id: 'delivery-services', label: 'Delivery Services', icon: Truck },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'riders', label: 'Riders', icon: User },
    { id: 'driver-documents', label: 'Driver Documents', icon: FileText },
    { id: 'rental-companies', label: 'Rental Companies', icon: Building2 },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'support', label: 'Support', icon: Headphones },
    { id: 'review-management', label: 'Review Management', icon: Star },
    { id: 'coupons', label: 'Coupons', icon: Ticket },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'report', label: 'Report', icon: BarChart2 },
    { id: 'settings', label: 'Setting', icon: Settings },
  ];

  return (
    <div className="sidebar" style={{ overflowY: 'auto' }}>
      <div className="sidebar-header" style={{ marginBottom: '2rem', padding: '0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img src={logo} alt="Hezzni Logo" style={{ height: '32px', width: 'auto' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981', letterSpacing: '-0.02em' }}>ezzni</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <a 
            key={item.id}
            href="#" 
            className={`nav-link ${activePage === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      
      <div 
        className="sidebar-footer" 
        onClick={() => onNavigate('all-services')}
        style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '1rem', cursor: 'pointer', border: activePage === 'all-services' ? '2px solid #22c55e' : 'none' }}
      >
         <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <div style={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '50%' }}>
                <Settings size={20} style={{ color: '#22c55e' }} />
             </div>
             <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.875rem', color: '#111827' }}>All Services</p>
                   <span style={{ backgroundColor: '#22c55e', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>New</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>9 Hezzni Services Hub</p>
             </div>
         </div>
         {activePage === 'all-services' && <div style={{ position: 'absolute', right: '1.5rem', width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }} />}
      </div>
    </div>
  );
};
