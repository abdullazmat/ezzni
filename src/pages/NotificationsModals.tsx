import { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  ChevronDown, 
  Users
} from 'lucide-react';
import { Notification } from './Notifications';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateNotificationModal = ({ isOpen, onClose }: ModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'Drivers',
    status: 'All Drivers',
    vehicle: 'All Vehicle',
    city: 'All City'
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '600px', backgroundColor: 'white', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', left: '24px', border: 'none', background: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        
        <div style={{ padding: '3rem 3rem 2rem 3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0', textAlign: 'left' }}>Create New Notification</h2>
          <p style={{ margin: '0 0 2rem 0', color: '#6B7280', fontWeight: '600' }}>Send targeted notifications to drivers and passengers across both mobile apps</p>
          
          {/* Step Indicator */}
          <div style={{ display: 'flex', backgroundColor: '#F3F4F6', borderRadius: '12px', padding: '4px', marginBottom: '2rem' }}>
            <button 
              onClick={() => setStep(1)}
              style={{ 
                flex: 1, 
                padding: '10px', 
                borderRadius: '8px', 
                border: 'none', 
                backgroundColor: step === 1 ? '#10B981' : 'transparent',
                color: step === 1 ? 'white' : '#6B7280',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Content
            </button>
            <button 
              onClick={() => setStep(2)}
              style={{ 
                flex: 1, 
                padding: '10px', 
                borderRadius: '8px', 
                border: 'none', 
                backgroundColor: step === 2 ? '#10B981' : 'transparent',
                color: step === 2 ? 'white' : '#6B7280',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Audience
            </button>
          </div>

          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontWeight: '800', color: '#111827' }}>Notification Title</label>
                <input 
                  type="text" 
                  placeholder="Enter notification title" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontWeight: '800', color: '#111827' }}>Message</label>
                <textarea 
                  placeholder="Enter your message" 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', resize: 'none' }}
                />
              </div>
              
              <div style={{ backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
                <p style={{ margin: '0 0 1rem 0', fontWeight: '700', color: '#374151' }}>Mobile App Preview</p>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1rem', border: '1px solid #E5E7EB' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bell color="white" size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{formData.title || 'Notification Title'}</span>
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Just Now</span>
                    </div>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6B7280' }}>{formData.message || 'Your notification message will appear here...'}</p>
                  </div>
                </div>
                <p style={{ margin: '1rem 0 0 0', fontSize: '0.75rem', color: '#6B7280', textAlign: 'center' }}>This notification will appear in the admin dashboard</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '800', fontSize: '1rem' }}>Private Target</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', appearance: 'none', outline: 'none', fontWeight: '600' }}
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                  >
                    <option>Drivers</option>
                    <option>Passengers</option>
                  </select>
                  <ChevronDown size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              <p style={{ margin: '0.5rem 0 0 0', fontWeight: '800' }}>Driver Filters</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>Driver Status</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', appearance: 'none', outline: 'none', fontWeight: '600' }}
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option>All Drivers</option>
                    <option>Active</option>
                    <option>Offline</option>
                  </select>
                  <ChevronDown size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>Vehicle Type</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', appearance: 'none', outline: 'none', fontWeight: '600' }}
                    value={formData.vehicle}
                    onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                  >
                    <option>All Vehicle</option>
                    <option>Car</option>
                    <option>Motorcycle</option>
                  </select>
                  <ChevronDown size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>City</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', appearance: 'none', outline: 'none', fontWeight: '600' }}
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  >
                    <option>All City</option>
                    <option>Casablanca</option>
                    <option>Rabat</option>
                  </select>
                  <ChevronDown size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '1.25rem', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users color="white" size={24} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '800', fontSize: '1.1rem' }}>Estimated Reach</p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>Approximate delivery count</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '2rem', fontWeight: '800' }}>450</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280', fontWeight: '700' }}>Users</p>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
            {step === 1 ? (
              <button 
                onClick={onClose}
                style={{ flex: 1, padding: '14px', borderRadius: '30px', border: '1.5px solid #E5E7EB', backgroundColor: 'transparent', fontWeight: '800', cursor: 'pointer' }}
              >
                Cancel
              </button>
            ) : (
              <button 
                onClick={() => setStep(1)}
                style={{ flex: 1, padding: '14px', borderRadius: '30px', border: '1.5px solid #E5E7EB', backgroundColor: 'transparent', fontWeight: '800', cursor: 'pointer' }}
              >
                Previous
              </button>
            )}
            <button 
              onClick={() => step === 1 ? setStep(2) : onClose()}
              style={{ flex: 1, padding: '14px', borderRadius: '30px', border: 'none', backgroundColor: '#10B981', color: 'white', fontWeight: '800', cursor: 'pointer' }}
            >
              {step === 1 ? 'Next' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TeamNotificationModal = ({ isOpen, onClose }: ModalProps) => {
  const [sendOption, setSendOption] = useState<'Now' | 'Schedule'>('Now');
  const departments = ['Car Ride', 'Operations', 'Support', 'Marketing', 'Legal', 'Sales'];
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: 'Announcement'
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '600px', backgroundColor: 'white', position: 'relative' }}>
         <button onClick={onClose} style={{ position: 'absolute', top: '24px', left: '24px', border: 'none', background: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        
        <div style={{ padding: '3rem 3rem 2rem 3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Send Team Notification</h2>
          <p style={{ margin: '0 0 2rem 0', color: '#6B7280', fontWeight: '600' }}>Create internal notifications for admin panel team members</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '800' }}>Notification Title</label>
              <input 
                type="text" 
                placeholder="Enter notification title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '800' }}>Message</label>
              <textarea 
                placeholder="Enter your message" 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', outline: 'none', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontWeight: '800' }}>Target Departments</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {departments.map(dept => (
                  <label key={dept} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', backgroundColor: '#F9FAFB', padding: '10px 12px', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600' }}>
                    <input type="checkbox" style={{ accentColor: '#10B981' }} />
                    {dept}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '800' }}>Category</label>
              <div style={{ position: 'relative' }}>
                <select 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E5E7EB', appearance: 'none', outline: 'none', fontWeight: '600' }}
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Announcement</option>
                  <option>Urgent</option>
                  <option>Update</option>
                </select>
                <ChevronDown size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontWeight: '800' }}>Send Option</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={() => setSendOption('Now')}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    borderRadius: '30px', 
                    backgroundColor: sendOption === 'Now' ? 'black' : 'transparent',
                    color: sendOption === 'Now' ? 'white' : '#6B7280',
                    border: sendOption === 'Now' ? 'none' : '1.5px solid #E5E7EB',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Send Now
                </button>
                <button 
                  onClick={() => setSendOption('Schedule')}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    borderRadius: '30px', 
                    backgroundColor: sendOption === 'Schedule' ? 'black' : 'transparent',
                    color: sendOption === 'Schedule' ? 'white' : '#6B7280',
                    border: sendOption === 'Schedule' ? 'none' : '1.5px solid #E5E7EB',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Schedule
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '1.25rem', border: '1px solid #E5E7EB' }}>
                <p style={{ margin: '0 0 1rem 0', fontWeight: '700', color: '#374151' }}>Dashboard Preview</p>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1rem', border: '1px solid #E5E7EB' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bell color="white" size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{formData.title || 'Notification Title'}</span>
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Just Now</span>
                    </div>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6B7280' }}>{formData.message || 'Your notification message will appear here...'}</p>
                  </div>
                </div>
                <p style={{ margin: '1rem 0 0 0', fontSize: '0.75rem', color: '#6B7280', textAlign: 'center' }}>This notification will appear in the admin dashboard</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
            <button 
              onClick={onClose}
              style={{ flex: 1, padding: '14px', borderRadius: '30px', border: '1.5px solid #E5E7EB', backgroundColor: 'transparent', fontWeight: '800', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              style={{ flex: 1.5, padding: '14px', borderRadius: '30px', border: 'none', backgroundColor: '#10B981', color: 'white', fontWeight: '800', cursor: 'pointer' }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotificationDetailsModal = ({ isOpen, onClose, notification }: ModalProps & { notification: Notification | null }) => {
  if (!isOpen || !notification) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '500px', backgroundColor: 'white', position: 'relative' }}>
         <button onClick={onClose} style={{ position: 'absolute', top: '24px', left: '24px', border: 'none', background: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        
        <div style={{ padding: '3rem 2.5rem 2.5rem 2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 1.5rem 0' }}>Notification Details</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.75rem 0' }}>{notification.title}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ padding: '4px 12px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#3B82F6', fontSize: '0.8rem', fontWeight: '700' }}>Announcement</span>
                <span style={{ padding: '4px 12px', borderRadius: '6px', backgroundColor: '#F0FDF4', color: '#10B981', fontSize: '0.8rem', fontWeight: '700' }}>Sent</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontWeight: '800', color: '#111827' }}>Message</label>
              <div style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', color: '#374151', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: '600' }}>
                {notification.message}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <label style={{ fontWeight: '800', color: '#111827' }}>Target Departments</label>
               <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                 {['Operations', 'Support'].map(dept => (
                   <span key={dept} style={{ padding: '6px 16px', borderRadius: '8px', backgroundColor: '#F0F9FF', color: '#0EA5E9', fontSize: '0.85rem', fontWeight: '700' }}>{dept}</span>
                 ))}
               </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>12</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0, fontWeight: '700' }}>Delivered</p>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>9</p>
                <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0, fontWeight: '700' }}>Read</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SystemStatusModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const services = [
    { name: 'Push Notification Service', status: 'Operational', latency: '45ms' },
    { name: 'Driver App API', status: 'Operational', latency: '120ms' },
    { name: 'Passenger App API', status: 'Operational', latency: '115ms' },
    { name: 'Database Engine', status: 'Operational', latency: '12ms' },
    { name: 'Admin Dashboard', status: 'Operational', latency: '85ms' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '550px', backgroundColor: 'white', position: 'relative' }}>
         <button onClick={onClose} style={{ position: 'absolute', top: '24px', left: '24px', border: 'none', background: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        
        <div style={{ padding: '3rem 2.5rem 2.5rem 2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>System Status</h2>
          <p style={{ margin: '0 0 2rem 0', color: '#6B7280', fontWeight: '600' }}>Real-time health monitoring of notification services</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)' }}></div>
              <div>
                <p style={{ margin: 0, fontWeight: '800', color: '#065F46', fontSize: '1.1rem' }}>All Systems Operational</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#059669', fontWeight: '700' }}>Last checked: Just now</p>
              </div>
            </div>

            {services.map((service, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: '800', color: '#111827' }}>{service.name}</span>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '700' }}>Latency: {service.latency}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#059669' }}>{service.status}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            style={{ width: '100%', marginTop: '2.5rem', padding: '14px', borderRadius: '30px', border: 'none', backgroundColor: '#10B981', color: 'white', fontWeight: '800', cursor: 'pointer' }}
          >
            Close Status Report
          </button>
        </div>
      </div>
    </div>
  );
};
