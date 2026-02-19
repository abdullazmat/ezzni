import { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft,
  Car,
  Truck,
  Bike,
  Info,
  Key
} from 'lucide-react';
import { Promotion } from './CouponTypes';

interface CouponsModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotion: Promotion | null;
  onUpdate: (promotion: Promotion) => void;
  onDelete: (id: string) => void;
}

export const CouponsModal = ({ isOpen, onClose, promotion, onUpdate, onDelete }: CouponsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPromo, setEditedPromo] = useState<Promotion | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (promotion) {
      setEditedPromo(promotion);
      setIsEditing(false); // Reset editing state when promotion changes
    }
  }, [promotion]);

  if (!isOpen || !promotion || !editedPromo) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSave = () => {
    onUpdate(editedPromo);
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleToggleService = (serviceId: string) => {
    if (!isEditing) return;
    setEditedPromo(prev => {
      if (!prev) return null;
      const services = prev.eligibleServices.includes(serviceId)
        ? prev.eligibleServices.filter(id => id !== serviceId)
        : [...prev.eligibleServices, serviceId];
      return { ...prev, eligibleServices: services };
    });
  };

  const services = [
    { id: 'Rides', label: 'Rides', icon: Car },
    { id: 'Deliveries', label: 'Deliveries', icon: Truck },
    { id: 'Motorcycle', label: 'Motorcycle', icon: Bike },
    { id: 'Rental Car', label: 'Rental Car', icon: Key },
    { id: 'Taxi', label: 'Taxi', icon: Car }
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    fontWeight: '500',
    outline: 'none'
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white', borderRadius: '32px', width: '90%',
          maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto',
          position: 'relative', padding: '2.5rem', color: '#111827',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <button 
          onClick={onClose}
          style={{ 
            border: 'none', background: '#f3f4f6', cursor: 'pointer', 
            padding: '10px', borderRadius: '50%', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <ArrowLeft size={24} />
        </button>

        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>Promotion Details</h2>
        <p style={{ margin: '0 0 2rem 0', color: '#6B7280', fontSize: '1rem' }}>Complete information about this promotion</p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>Trip Summary</h3>
        
        <div style={{ 
          backgroundColor: '#f9fafb', borderRadius: '24px', padding: '2rem',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem',
          marginBottom: '2rem', border: '1px solid #f3f4f6'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Promotion ID</div>
            <div style={{ fontWeight: '800', fontSize: '15px' }}>{editedPromo.id}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Status</div>
            {isEditing ? (
              <select 
                value={editedPromo.status} 
                onChange={(e) => setEditedPromo({...editedPromo, status: e.target.value as any})}
                style={inputStyle}
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
            ) : (
              <span style={{ 
                backgroundColor: editedPromo.status === 'Active' ? '#DCFCE7' : '#FEE2E2',
                color: editedPromo.status === 'Active' ? '#10B981' : '#EF4444',
                padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800'
              }}>
                {editedPromo.status}
              </span>
            )}
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Promotion Name</div>
            {isEditing ? (
              <input 
                value={editedPromo.name} 
                onChange={(e) => setEditedPromo({...editedPromo, name: e.target.value})}
                style={inputStyle}
              />
            ) : (
              <div style={{ fontWeight: '800', fontSize: '15px' }}>{editedPromo.name}</div>
            )}
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Promo Code</div>
            {isEditing ? (
              <input 
                value={editedPromo.code} 
                onChange={(e) => setEditedPromo({...editedPromo, code: e.target.value})}
                style={inputStyle}
              />
            ) : (
              <div style={{ fontWeight: '800', fontSize: '15px' }}>{editedPromo.code}</div>
            )}
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Discount</div>
            {isEditing ? (
              <input 
                value={editedPromo.discount} 
                onChange={(e) => setEditedPromo({...editedPromo, discount: e.target.value})}
                style={inputStyle}
              />
            ) : (
              <div style={{ fontWeight: '800', fontSize: '15px' }}>{editedPromo.discount}</div>
            )}
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Expire Date</div>
            {isEditing ? (
              <input 
                type="date"
                value={editedPromo.validUntil} 
                onChange={(e) => setEditedPromo({...editedPromo, validUntil: e.target.value})}
                style={inputStyle}
              />
            ) : (
              <div style={{ fontWeight: '800', fontSize: '15px' }}>{editedPromo.validUntil}</div>
            )}
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Min Order Amount</div>
            {isEditing ? (
              <input 
                value={editedPromo.minOrderAmount} 
                onChange={(e) => setEditedPromo({...editedPromo, minOrderAmount: e.target.value})}
                style={inputStyle}
              />
            ) : (
              <div style={{ fontWeight: '800', fontSize: '15px' }}>{editedPromo.minOrderAmount}</div>
            )}
          </div>
          <div style={{ gridColumn: 'span 4' }}>
            <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700', marginBottom: '4px' }}>Usage Count</div>
            <div style={{ fontWeight: '800', fontSize: '15px' }}>{editedPromo.usageCount} of {editedPromo.maxUsage}</div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>Description</h3>
        <textarea 
          value={editedPromo.description}
          readOnly={!isEditing}
          onChange={(e) => setEditedPromo({...editedPromo, description: e.target.value})}
          style={{ 
            width: '100%', backgroundColor: '#f9fafb', border: isEditing ? '1px solid #10B981' : '1px solid #f3f4f6',
            borderRadius: '16px', padding: '1.5rem', fontSize: '15px', color: '#4B5563',
            minHeight: '100px', marginBottom: '2rem', outline: 'none', resize: 'none'
          }}
        />

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>Eligible Services</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {services.map(service => (
            <button 
              key={service.id}
              onClick={() => handleToggleService(service.id)}
              style={{ 
                border: editedPromo.eligibleServices.includes(service.id) ? '2px solid #10B981' : '1px solid #e5e7eb', 
                backgroundColor: editedPromo.eligibleServices.includes(service.id) ? '#F0FDF4' : 'white',
                padding: '8px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '14px', fontWeight: '700', color: '#374151',
                cursor: isEditing ? 'pointer' : 'default',
                transition: 'all 0.2s'
              }}
            >
              <service.icon size={16} color={editedPromo.eligibleServices.includes(service.id) ? '#10B981' : '#374151'} /> {service.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing ? (
            <button 
              onClick={handleSave}
              style={{ 
                flex: 1, backgroundColor: '#10B981', color: 'white', border: 'none',
                padding: '16px', borderRadius: '100px', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              style={{ 
                flex: 1, backgroundColor: 'black', color: 'white', border: 'none',
                padding: '16px', borderRadius: '100px', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer'
              }}
            >
              Edit
            </button>
          )}
          
          <button 
            onClick={() => onDelete(editedPromo.id)}
            style={{ 
              flex: 1, backgroundColor: '#EF4444', color: 'white', border: 'none',
              padding: '16px', borderRadius: '100px', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>

        {showToast && (
          <div style={{ 
            position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: 'white',
            padding: '1.25rem 2rem', borderRadius: '100px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem',
            zIndex: 1100, color: '#111827'
          }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Info size={24} />
            </div>
            <span style={{ fontWeight: '700', fontSize: '16px' }}>Promotion has been updated</span>
            <button onClick={() => setShowToast(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', marginLeft: '1rem' }}><X size={20} /></button>
          </div>
        )}
      </div>
    </div>
  );
};

interface CreatePromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (promotion: Promotion) => void;
}

export const CreatePromotionModal = ({ isOpen, onClose, onCreate }: CreatePromotionModalProps) => {
  const [formData, setFormData] = useState<Partial<Promotion>>({
    name: '',
    code: '',
    description: '',
    discountType: 'Percentage',
    discountValue: '',
    validUntil: '',
    status: 'Active',
    maxUsage: 1000,
    minOrderAmount: '',
    eligibleServices: []
  });
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const services = [
    { id: 'Rides', label: 'Car Ride', icon: Car },
    { id: 'Motorcycle', label: 'Motorcycle', icon: Bike },
    { id: 'Rental Car', label: 'Rental Car', icon: Key },
    { id: 'Taxi', label: 'Taxi', icon: Car },
    { id: 'Deliveries', label: 'Delivery', icon: Truck }
  ];

  const handleToggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      eligibleServices: prev.eligibleServices?.includes(serviceId)
        ? prev.eligibleServices.filter(id => id !== serviceId)
        : [...(prev.eligibleServices || []), serviceId]
    }));
  };

  const handleCreate = () => {
    const newPromo: Promotion = {
      id: `PROMO${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: formData.name || '',
      code: formData.code || '',
      description: formData.description || '',
      discount: formData.discountType === 'Percentage' ? `${formData.discountValue}%` : `${formData.discountValue} MAD`,
      discountType: formData.discountType as any,
      discountValue: formData.discountValue || '',
      validUntil: formData.validUntil || '',
      usageCount: 0,
      maxUsage: formData.maxUsage || 1000,
      status: formData.status as any,
      minOrderAmount: formData.minOrderAmount || '0 MAD',
      eligibleServices: formData.eligibleServices || []
    };
    setShowToast(true);
    setTimeout(() => {
        setShowToast(false);
        onCreate(newPromo);
    }, 500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e5e7eb',
    fontSize: '15px', marginTop: '8px', outline: 'none', backgroundColor: 'white'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '15px', fontWeight: '700', color: '#111827'
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white', borderRadius: '32px', width: '95%',
          maxWidth: '780px', maxHeight: '95vh', overflowY: 'auto',
          position: 'relative', padding: '2.5rem', color: '#111827',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', marginBottom: '1rem' }}>
          <ArrowLeft size={24} />
        </button>

        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>Create New Promotion</h2>
        <p style={{ margin: '0 0 2rem 0', color: '#6B7280', fontSize: '1rem' }}>Set up a new promotional campaign with discount codes and usage rules</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {/* Left Column */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>Basic Information</h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Promotion Name</label>
              <input type="text" placeholder="Type here" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Promo Code</label>
              <input type="text" placeholder="Type here" style={inputStyle} value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Description</label>
              <textarea placeholder="Type here" style={{...inputStyle, minHeight: '100px', resize: 'none'}} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>Discount Settings</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Discount Type</label>
                <select style={inputStyle} value={formData.discountType} onChange={e => setFormData({...formData, discountType: e.target.value as any})}>
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Discount Amount</label>
                <input type="text" placeholder="Type here" style={inputStyle} value={formData.discountValue} onChange={e => setFormData({...formData, discountValue: e.target.value})} />
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Expire Date</label>
              <input type="date" style={inputStyle} value={formData.validUntil} onChange={e => setFormData({...formData, validUntil: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Status</label>
              <select style={inputStyle} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '2rem 0 1.5rem 0' }}>Usage Limits & Requirements</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Maximum *</label>
            <input type="number" placeholder="Type here" style={inputStyle} value={formData.maxUsage} onChange={e => setFormData({...formData, maxUsage: parseInt(e.target.value)})} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Minimum Oder Amount (MAD)</label>
            <input type="text" placeholder="Type here" style={inputStyle} value={formData.minOrderAmount} onChange={e => setFormData({...formData, minOrderAmount: e.target.value})} />
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Eligible Services</h3>
        <p style={{ margin: '0 0 1.5rem 0', color: '#6B7280', fontSize: '0.9rem' }}>Select which services this promotion applies to. Leave empty to apply to all services.</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          {services.map(service => (
            <div 
              key={service.id}
              onClick={() => handleToggleService(service.id)}
              style={{ 
                flex: 1, padding: '1.5rem 1rem', borderRadius: '16px', border: formData.eligibleServices?.includes(service.id) ? '2px solid #10B981' : '1px solid #f3f4f6',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer',
                transition: 'all 0.2s', backgroundColor: formData.eligibleServices?.includes(service.id) ? '#F0FDF4' : 'white',
                minWidth: '100px'
              }}
            >
              <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <service.icon size={32} color={formData.eligibleServices?.includes(service.id) ? '#10B981' : '#374151'} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#374151', textAlign: 'center' }}>{service.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{ 
              padding: '16px 64px', borderRadius: '100px', border: '1px solid #e5e7eb',
              backgroundColor: 'white', fontWeight: '800', fontSize: '1rem', cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleCreate}
            style={{ 
              padding: '16px 64px', borderRadius: '100px', border: 'none',
              backgroundColor: '#10B981', color: 'white', fontWeight: '800', fontSize: '1rem', cursor: 'pointer'
            }}
          >
            Create Promotion
          </button>
        </div>

        {showToast && (
          <div style={{ 
            position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: 'white',
            padding: '1.25rem 2rem', borderRadius: '100px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem',
            zIndex: 1100, color: '#111827'
          }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Info size={24} />
            </div>
            <span style={{ fontWeight: '700', fontSize: '16px' }}>Coupon Code has been created</span>
            <button onClick={() => setShowToast(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', marginLeft: '1rem' }}><X size={20} /></button>
          </div>
        )}
      </div>
    </div>
  );
};
