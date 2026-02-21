import { useState, useMemo } from 'react';
import { 
  Plus, 
  Eye, 
  Search as SearchIcon,
} from 'lucide-react';
import { Promotion } from './CouponTypes';
import { CouponsModal, CreatePromotionModal } from './CouponsModals';

const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'PROMO001',
    name: 'New User Discount',
    code: 'WELCOME20',
    discount: '20%',
    discountType: 'Percentage',
    discountValue: '20',
    validUntil: '2025-12-31',
    usageCount: 245,
    maxUsage: 1000,
    status: 'Active',
    description: 'Welcome discount for new users',
    minOrderAmount: '50 MAD',
    eligibleServices: ['Rides', 'Deliveries', 'Motorcycle', 'Rental Car', 'Taxi']
  },
  {
    id: 'PROMO002',
    name: 'Weekend Special',
    code: 'WEEKEND15',
    discount: '15%',
    discountType: 'Percentage',
    discountValue: '15',
    validUntil: '2025-12-31',
    usageCount: 245,
    maxUsage: 1000,
    status: 'Active',
    description: 'Special discount for weekend trips',
    minOrderAmount: '30 MAD',
    eligibleServices: ['Rides', 'Taxi']
  },
  {
    id: 'PROMO003',
    name: 'Summer Sale',
    code: 'SUMMER25',
    discount: '15%',
    discountType: 'Percentage',
    discountValue: '15',
    validUntil: '2025-12-31',
    usageCount: 245,
    maxUsage: 1000,
    status: 'Expired',
    description: 'Get 25% off on all products during our Summer Sale.',
    minOrderAmount: '40 MAD',
    eligibleServices: ['Rides', 'Deliveries', 'Motorcycle', 'Rental Car', 'Taxi']
  }
];

// Add more mock data to match the image
for (let i = 4; i <= 12; i++) {
  MOCK_PROMOTIONS.push({
    ...MOCK_PROMOTIONS[2],
    id: `PROMO00${i}`,
  });
}

export const Coupons = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(MOCK_PROMOTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredPromotions = useMemo(() => {
    return promotions.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [promotions, searchQuery]);

  const handleUpdatePromotion = (updated: Promotion) => {
    setPromotions(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
    setIsDetailsModalOpen(false);
  };

  const handleCreatePromotion = (newPromo: Promotion) => {
    setPromotions(prev => [newPromo, ...prev]);
    setIsCreateModalOpen(false);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#111827' }}>Promotions & Coupons</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '1rem' }}>Manage promotional campaigns and discount codes</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          style={{ 
            backgroundColor: '#38AC57', 
            color: 'white', 
            border: 'none', 
            padding: '12px 32px', 
            borderRadius: '16px', 
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.1rem',
            boxShadow: '0 4px 12px rgba(56, 172, 87, 0.2)'
          }}
        >
          <Plus size={24} strokeWidth={3} /> Create Promotion
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search..." 
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
        <SearchIcon size={20} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#38AC57', color: 'white' }}>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '15px' }}>Promotion Name</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '15px' }}>Code</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '15px' }}>Discount</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '15px' }}>Valid Until</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '15px' }}>Usage Count</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontWeight: '600', fontSize: '15px' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'center', fontWeight: '600', fontSize: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promo) => (
              <tr key={promo.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>{promo.name}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '700' }}>{promo.id}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '15px', color: '#6B7280', fontWeight: '600' }}>{promo.code}</td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '15px', color: '#38AC57', fontWeight: '800' }}>{promo.discount}</td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '14px', color: '#374151', fontWeight: '700' }}>{promo.validUntil}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: '#111827' }}>{promo.usageCount}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>of {promo.maxUsage}</div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '6px 16px', 
                    borderRadius: '8px', 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    backgroundColor: promo.status === 'Active' ? '#eef7f0' : '#FEF2F2', 
                    color: promo.status === 'Active' ? '#38AC57' : '#EF4444' 
                  }}>
                    {promo.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                  <button 
                    onClick={() => { setSelectedPromotion(promo); setIsDetailsModalOpen(true); }}
                    style={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      padding: '8px 20px', 
                      borderRadius: '12px', 
                      fontSize: '15px', 
                      color: '#374151', 
                      fontWeight: '700', 
                      cursor: 'pointer', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Eye size={18} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CouponsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        promotion={selectedPromotion}
        onUpdate={handleUpdatePromotion}
        onDelete={handleDeletePromotion}
      />

      <CreatePromotionModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePromotion}
      />
    </div>
  );
};
