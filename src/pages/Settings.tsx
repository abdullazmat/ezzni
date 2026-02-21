import { useState } from 'react';
import { 
  Users, 
  Percent, 
  Layout, 
  MapPin,
  FileText,
  Gift,
  Bell
} from 'lucide-react';

// Sub-components
import { 
  CommissionRules, 
  FareStructure, 
  DailyBonus, 
  ServiceRegions, 
  DocumentRequirements, 
  TeamManagement 
} from './settings_tabs';

interface SettingsProps {
  onNavigate?: (page: string) => void;
}

export const Settings = ({ onNavigate }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState('daily-bonus');

  const tabs = [
    { id: 'commission-rules', label: 'Commission Rules', icon: <Percent size={18} /> },
    { id: 'fare-structure', label: 'Fare Structure', icon: <Layout size={18} /> },
    { id: 'daily-bonus', label: 'Daily Bonus', icon: <Gift size={18} /> },
    { id: 'service-regions', label: 'Service Regions', icon: <MapPin size={18} /> },
    { id: 'document-requirements', label: 'Document Requirements', icon: <FileText size={18} /> },
    { id: 'team-management', label: 'Team Management', icon: <Users size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'commission-rules':
        return <CommissionRules />;
      case 'fare-structure':
        return <FareStructure />;
      case 'daily-bonus':
        return <DailyBonus />;
      case 'service-regions':
        return <ServiceRegions />;
      case 'document-requirements':
        return <DocumentRequirements />;
      case 'team-management':
        return <TeamManagement />;
      default:
        return <DailyBonus />;
    }
  };

  return (
    <div className="settings-container" style={{ padding: '1.5rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#111827', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Settings</h1>
            <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>Configure platform settings and preferences</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Type here..." 
                style={{ 
                  padding: '0.75rem 3rem 0.75rem 1.25rem', 
                  borderRadius: '2rem', 
                  border: '1px solid #e5e7eb', 
                  width: '320px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }} 
              />
              <button 
                onClick={() => alert('Performing global platform search...')}
                style={{ 
                    position: 'absolute', 
                    right: '4px', 
                    top: '4px', 
                    backgroundColor: '#38AC57', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.5rem 1.5rem', 
                    borderRadius: '1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}
              >
                Search
              </button>
            </div>
            
            <div 
                onClick={() => alert('No new notifications')}
                style={{ position: 'relative', cursor: 'pointer' }}
            >
               <Bell size={24} color="#6b7280" />
               <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', backgroundColor: '#38AC57', borderRadius: '50%', border: '2px solid white' }}></span>
            </div>

            <div 
                onClick={() => alert('Opening Profile Settings...')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'white', padding: '0.4rem 1rem 0.4rem 0.4rem', borderRadius: '2rem', border: '1px solid #e5e7eb', cursor: 'pointer' }}
            >
               <img src="https://i.pravatar.cc/150?u=paityn" alt="User" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
               <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Paityn Calzo</div>
                  <div style={{ fontSize: '0.7rem', color: '#38AC57', fontWeight: '600' }}>Admin</div>
               </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button 
                onClick={() => onNavigate ? onNavigate('report') : alert('Loading Platform Analytics...')}
                style={{ 
                    backgroundColor: '#38AC57', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.75rem 1.75rem', 
                    borderRadius: '2rem', 
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(56, 172, 87, 0.2)',
                    transition: 'all 0.2s'
                }}
            >
                Review Analytics
            </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#f1f5f9', 
          padding: '6px', 
          borderRadius: '2.5rem', 
          width: 'fit-content',
          marginBottom: '2rem',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
          overflowX: 'auto',
          maxWidth: '100%'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                borderRadius: '2rem',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#38AC57' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
};

