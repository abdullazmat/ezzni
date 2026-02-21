import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ArrowUpRight, 
  Star, 
  ChevronDown,
  X,
  CheckCircle2
} from 'lucide-react';
import { Review } from './ReviewTypes';
import { ReviewsModal } from './ReviewManagementModals';

// Specialized Icons
import totalReviewsIcon from '../assets/icons/Daily Bonus Earned.png';
import visibleIcon from '../assets/icons/Verified Drivers-Passengers.png';
import highRatedIcon from '../assets/icons/Active Drivers.png';
import lowRatedIcon from '../assets/icons/active now.png';

const MOCK_REVIEWS: Review[] = [
  {
    id: 'RE1',
    userType: 'Driver',
    userInfo: {
      name: 'Youssef Ali',
      id: 'R-00045',
      avatar: 'https://i.pravatar.cc/150?u=youssef1'
    },
    reviewDate: '2025-01-10',
    visible: false,
    isFlagged: true,
    rating: 4.8,
    comment: 'The ride was smooth and comfortable. The driver was polite, the car was clean, and pickup was on time.',
    tags: ['Ready on time', 'Polite & friendly'],
    status: 'Completed'
  },
  {
    id: 'RE2',
    userType: 'Passenger',
    userInfo: {
      name: 'Youssef Ali',
      id: 'R-00045',
      avatar: 'https://i.pravatar.cc/150?u=youssef2'
    },
    reviewDate: '2025-01-10',
    visible: false,
    isFlagged: true,
    rating: 4.8,
    comment: 'Great passenger, very friendly and respectful.',
    tags: ['Polite & friendly'],
    status: 'Completed'
  },
  {
    id: 'RE3',
    userType: 'Driver',
    userInfo: {
      name: 'Youssef Ali',
      id: 'R-00045',
      avatar: 'https://i.pravatar.cc/150?u=youssef3'
    },
    reviewDate: '2025-01-10',
    visible: true,
    isFlagged: false,
    rating: 4.8,
    comment: 'The driver was very professional and the ride was comfortable.',
    tags: ['Professional'],
    status: 'Completed'
  },
  {
    id: 'RE4',
    userType: 'Passenger',
    userInfo: {
      name: 'Youssef Ali',
      id: 'R-00045',
      avatar: 'https://i.pravatar.cc/150?u=youssef4'
    },
    reviewDate: '2025-01-10',
    visible: false,
    isFlagged: true,
    rating: 4.0,
    comment: 'The ride was okay, but the driver was a bit late.',
    tags: ['Polite'],
    status: 'Completed'
  },
  {
    id: 'RE5',
    userType: 'Driver',
    userInfo: {
      name: 'Youssef Ali',
      id: 'R-00045',
      avatar: 'https://i.pravatar.cc/150?u=youssef5'
    },
    reviewDate: '2025-01-10',
    visible: true,
    isFlagged: false,
    rating: 4.2,
    comment: 'Decent ride, nothing special.',
    tags: ['Clean car'],
    status: 'Completed'
  },
  {
    id: 'RE6',
    userType: 'Passenger',
    userInfo: {
      name: 'Youssef Ali',
      id: 'R-00045',
      avatar: 'https://i.pravatar.cc/150?u=youssef6'
    },
    reviewDate: '2025-01-10',
    visible: false,
    isFlagged: true,
    rating: 4.8,
    comment: 'Smooth ride and good conversation.',
    tags: ['Good conversation'],
    status: 'Completed'
  }
];

export const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [filterStats, setFilterStats] = useState<string>('total');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeTab, setActiveTypeTab] = useState<'All' | 'Driver' | 'Passenger'>('All');
  
  const [ratingFilter, setRatingFilter] = useState('Rating');
  const [typesFilter, setTypesFilter] = useState('Types');
  const [reviewsFilter, setReviewsFilter] = useState('Reviews');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const stats = useMemo(() => {
    return {
      total: reviews.length,
      visible: reviews.filter(r => r.visible).length,
      highRated: reviews.filter(r => r.rating >= 4.5).length,
      lowRated: reviews.filter(r => r.rating < 3.0).length
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      const matchesSearch = r.userInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.userInfo.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTypeTab = activeTypeTab === 'All' || r.userType === activeTypeTab;
      
      const matchesRatingFilter = ratingFilter === 'Rating' || (
        ratingFilter === 'High (4.5+)' ? r.rating >= 4.5 :
        ratingFilter === 'Medium (3.0-4.4)' ? (r.rating >= 3.0 && r.rating < 4.5) :
        ratingFilter === 'Low (< 3.0)' ? r.rating < 3.0 : true
      );

      const matchesStatusFilter = reviewsFilter === 'Reviews' || (
        reviewsFilter === 'Visible' ? r.visible :
        reviewsFilter === 'Flagged' ? r.isFlagged : true
      );

      const matchesStats = filterStats === 'total' || 
                           (filterStats === 'visible' && r.visible) ||
                           (filterStats === 'high' && r.rating >= 4.5) ||
                           (filterStats === 'low' && r.rating < 3.0);

      return matchesSearch && matchesTypeTab && matchesRatingFilter && matchesStatusFilter && matchesStats;
    });
  }, [reviews, searchQuery, activeTypeTab, ratingFilter, reviewsFilter, filterStats]);

  const handleUpdateReview = (updated: Review) => {
    setReviews(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    setIsModalOpen(false);
  };

  return (
    <div className="main-content" style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', overflowY: 'auto' }}>
      <div className="page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#111827' }}>Review Management</h1>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '0.925rem' }}>Manage driver and rider reviews for quality control</p>
        </div>
        <button 
          onClick={() => setShowAnalytics(true)}
          style={{ 
            backgroundColor: '#38AC57', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '12px', 
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Review Analytics
        </button>
      </div>

      {showAnalytics && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAnalytics(false)}>
           <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '32px', width: '90%', maxWidth: '600px', border: '1px solid #e5e7eb' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ margin: 0, fontWeight: '800', color: '#111827' }}>Review Analytics</h2>
                  <button onClick={() => setShowAnalytics(false)} style={{ background: '#f3f4f6', border: 'none', color: '#374151', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                 <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e5e7eb' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#6B7280', fontSize: '0.875rem', fontWeight: '600' }}>Average Rating</p>
                    <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>{(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} <Star size={24} fill="#FBBF24" color="#FBBF24" style={{ display: 'inline' }} /></h3>
                 </div>
                 <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e5e7eb' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#6B7280', fontSize: '0.875rem', fontWeight: '600' }}>Growth Rate</p>
                    <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', color: '#38AC57' }}>+15%</h3>
                 </div>
              </div>
              <div style={{ marginTop: '2rem', height: '180px', backgroundColor: '#f9fafb', borderRadius: '20px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '1.5rem' }}>
                  {[30, 60, 45, 80, 55, 90, 70, 40].map((h, i) => (
                      <div key={i} style={{ flex: 1, backgroundColor: '#38AC57', height: `${h}%`, borderRadius: '6px' }}></div>
                  ))}
              </div>
           </div>
        </div>
      )}

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div 
          onClick={() => setFilterStats('total')}
          style={{ 
            backgroundColor: 'white', padding: '1.5rem', borderRadius: '24px', cursor: 'pointer', border: filterStats === 'total' ? '2px solid #38AC57' : '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
             <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={totalReviewsIcon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
             </div>
             <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Total Reviews</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
             <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>{stats.total}</span>
             <ArrowUpRight size={24} color="#38AC57" />
          </div>
        </div>

        <div 
          onClick={() => setFilterStats('visible')}
          style={{ 
            backgroundColor: filterStats === 'visible' ? '#38AC57' : 'white', padding: '1.5rem', borderRadius: '24px', cursor: 'pointer', border: filterStats === 'visible' ? 'none' : '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
             <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: filterStats === 'visible' ? 'rgba(255,255,255,0.2)' : 'transparent', borderRadius: '8px', padding: '4px' }}>
                <img src={visibleIcon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: filterStats === 'visible' ? 'brightness(0) invert(1)' : 'none' }} />
             </div>
             <span style={{ fontSize: '0.875rem', fontWeight: '600', color: filterStats === 'visible' ? 'white' : '#374151' }}>Visible</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
             <span style={{ fontSize: '2.5rem', fontWeight: '800', color: filterStats === 'visible' ? 'white' : '#111827' }}>{stats.visible}</span>
             <ArrowUpRight size={24} color={filterStats === 'visible' ? 'white' : '#38AC57'} />
          </div>
        </div>

        <div 
          onClick={() => setFilterStats('high')}
          style={{ 
            backgroundColor: 'white', padding: '1.5rem', borderRadius: '24px', cursor: 'pointer', border: filterStats === 'high' ? '2px solid #38AC57' : '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
             <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={highRatedIcon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
             </div>
             <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>High Rated</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
             <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>{stats.highRated}</span>
             <ArrowUpRight size={24} color="#38AC57" />
          </div>
        </div>

        <div 
          onClick={() => setFilterStats('low')}
          style={{ 
            backgroundColor: 'white', padding: '1.5rem', borderRadius: '24px', cursor: 'pointer', border: filterStats === 'low' ? '2px solid #38AC57' : '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
             <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={lowRatedIcon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
             </div>
             <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Low Rated</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
             <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827' }}>{stats.lowRated}</span>
             <ArrowUpRight size={24} color="#38AC57" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
          <div style={{ position: 'relative', flex: '0 0 300px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
            <Search size={18} color="#9CA3AF" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'none', outline: 'none', padding: '10px', fontSize: '14px', width: '100%', color: '#111827' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
             <div style={{ position: 'relative' }}>
                <select 
                  style={{ appearance: 'none', backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#374151', padding: '10px 35px 10px 15px', borderRadius: '12px', fontSize: '14px', cursor: 'pointer' }}
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option>Rating</option>
                  <option>High (4.5+)</option>
                  <option>Medium (3.0-4.4)</option>
                  <option>&lt; 3.0</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} color="#9CA3AF" />
             </div>

             <div style={{ position: 'relative' }}>
                <select 
                  style={{ appearance: 'none', backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#374151', padding: '10px 35px 10px 15px', borderRadius: '12px', fontSize: '14px', cursor: 'pointer' }}
                  value={typesFilter}
                  onChange={(e) => setTypesFilter(e.target.value)}
                >
                  <option>Types</option>
                  <option>Driver</option>
                  <option>Passenger</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} color="#9CA3AF" />
             </div>

             <button style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', color: '#374151', padding: '10px 20px', borderRadius: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => {
                 setSearchQuery('');
                 setRatingFilter('Rating');
                 setTypesFilter('Types');
                 setReviewsFilter('Reviews');
                 setFilterStats('total');
             }}>
                <Filter size={18} />
                Clear
             </button>
          </div>
        </div>

        <div style={{ display: 'flex', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          {['Driver Reviews', 'All Reviews', 'Passenger Reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTypeTab(tab === 'All Reviews' ? 'All' : tab.split(' ')[0] as any)}
                style={{ 
                    padding: '8px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', border: 'none',
                    backgroundColor: (activeTypeTab === 'All' && tab === 'All Reviews') || (activeTypeTab + ' Reviews' === tab) ? 'white' : 'transparent',
                    color: (activeTypeTab === 'All' && tab === 'All Reviews') || (activeTypeTab + ' Reviews' === tab) ? '#111827' : '#6B7280',
                    boxShadow: (activeTypeTab === 'All' && tab === 'All Reviews') || (activeTypeTab + ' Reviews' === tab) ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer'
                }}
              >
                {tab}
              </button>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#38AC57', color: 'white' }}>
              <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: '600' }}>User Type</th>
              <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: '600' }}>Name ID</th>
              <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: '600' }}>Review Date</th>
              <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: '600' }}>Visible</th>
              <th style={{ padding: '1.25rem 1.5rem', textAlign: 'center', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', backgroundColor: '#eef7f0', color: '#38AC57', border: '1px solid #eef7f0' }}>{review.userType}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={review.userInfo.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: 'white', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', gap: '2px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                         <Star size={10} fill="#FBBF24" color="#FBBF24" />
                         <span style={{ fontSize: '10px', fontWeight: '800' }}>{review.rating}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {review.userInfo.name}
                        <CheckCircle2 size={12} fill="black" color="white" />
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{review.userInfo.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '14px', color: '#374151', fontWeight: '600' }}>{review.reviewDate}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', backgroundColor: review.visible ? '#f3f4f6' : '#FEF2F2', color: review.visible ? '#374151' : '#EF4444' }}>
                    {review.visible ? 'Visible' : 'Flagged'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                  <button onClick={() => { setSelectedReview(review); setIsModalOpen(true); }} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '8px 20px', borderRadius: '10px', fontSize: '14px', color: '#374151', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReviewsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={selectedReview}
        onUpdate={handleUpdateReview}
        onDelete={handleDeleteReview}
      />
    </div>
  );
};
