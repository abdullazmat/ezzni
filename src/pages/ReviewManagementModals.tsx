import { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft,
  Star
} from 'lucide-react';
import { Review } from './ReviewTypes';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
  onUpdate: (review: Review) => void;
  onDelete: (id: string) => void;
}

export const ReviewsModal = ({ isOpen, onClose, review, onUpdate, onDelete }: ReviewsModalProps) => {
  const [activeTab, setActiveTab] = useState<'Given' | 'Received'>('Received');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    if (review) setEditComment(review.comment);
  }, [review]);

  if (!isOpen || !review) return null;

  const handleFlagToggle = () => {
    onUpdate({
      ...review,
      isFlagged: !review.isFlagged,
      visible: review.isFlagged 
    });
  };

  const handleSaveEdit = () => {
    onUpdate({
      ...review,
      comment: editComment
    });
    setIsEditing(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const receivedReviews = [
      {
          id: '1',
          rating: 5.0,
          userName: 'Sarah Mohamed',
          userType: 'passenger',
          date: '3 Jun, 2025 at 12:00 PM',
          comment: review.comment,
          tags: review.tags,
          status: 'Completed',
          avatar: 'https://i.pravatar.cc/150?u=sarah'
      },
      {
          id: '2',
          rating: 4.5,
          userName: 'Ahmed Hassan',
          userType: 'passenger',
          date: '4 Jun, 2025 at 02:30 PM',
          comment: 'Very professional driver, arrived on time and the car was in perfect condition.',
          tags: ['Polite & friendly', 'On time'],
          status: 'Completed',
          avatar: 'https://i.pravatar.cc/150?u=ahmed'
      }
  ];

  const givenReviews = [
      {
          id: 'g1',
          rating: 5.0,
          userName: 'Youssef Ali',
          userType: 'Driver',
          date: '2 Jun, 2025 at 10:00 AM',
          comment: 'Excellent passenger, very respectfull and followed all safety guidelines.',
          tags: ['Respectful', 'Good communication'],
          status: 'Completed',
          avatar: 'https://i.pravatar.cc/150?u=youssef'
      }
  ];

  const currentList = activeTab === 'Received' ? receivedReviews : givenReviews;

  return (
    <div 
      className="modal-overlay" 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        className="modal-container"
        style={{
          backgroundColor: 'white',
          borderRadius: '32px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '2rem',
          color: '#111827',
          border: '1px solid #e5e7eb',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <button 
            onClick={onClose}
            style={{ 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer', 
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#374151'
            }}
          >
            <ArrowLeft size={24} />
          </button>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Reviews</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
           <div style={{ backgroundColor: '#f3f4f6', padding: '6px', borderRadius: '100px', width: 'fit-content', display: 'flex' }}>
              <button 
                onClick={() => setActiveTab('Given')}
                style={{ 
                    padding: '10px 30px', 
                    borderRadius: '100px', 
                    fontSize: '14px', 
                    fontWeight: '700',
                    border: 'none',
                    backgroundColor: activeTab === 'Given' ? 'white' : 'transparent',
                    color: activeTab === 'Given' ? '#111827' : '#6B7280',
                    cursor: 'pointer',
                    boxShadow: activeTab === 'Given' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s'
                }}
              >
                Ratings Given
              </button>
              <button 
                onClick={() => setActiveTab('Received')}
                style={{ 
                    padding: '10px 30px', 
                    borderRadius: '100px', 
                    fontSize: '14px', 
                    fontWeight: '700',
                    border: 'none',
                    backgroundColor: activeTab === 'Received' ? 'white' : 'transparent',
                    color: activeTab === 'Received' ? '#111827' : '#6B7280',
                    cursor: 'pointer',
                    boxShadow: activeTab === 'Received' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s'
                }}
              >
                Ratings Received
              </button>
           </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
           {currentList.map((item, idx) => (
               <div 
                 key={idx}
                 style={{ 
                     border: '1px solid #e5e7eb', 
                     borderRadius: '24px', 
                     padding: '1.5rem',
                     backgroundColor: '#f9fafb'
                 }}
               >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} fill={i < item.rating ? "#FBBF24" : "none"} color="#FBBF24" />
                        ))}
                        <span style={{ marginLeft: '8px', fontWeight: '800', fontSize: '16px', color: '#111827' }}>{item.rating.toFixed(1)}</span>
                     </div>
                     <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #38AC57', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#38AC57' }}></div>
                     </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                     <img src={item.avatar} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                     <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                           <span style={{ fontWeight: '800', fontSize: '15px' }}>{item.userName}</span>
                           <span style={{ fontSize: '11px', color: '#38AC57', backgroundColor: '#eef7f0', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>{item.userType}</span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.date}</span>
                     </div>
                     <div style={{ backgroundColor: '#38AC57', color: 'white', padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: '700' }}>
                        {item.status}
                     </div>
                  </div>

                  {isEditing && activeTab === 'Received' && item.id === '1' ? (
                      <textarea 
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        style={{ width: '100%', backgroundColor: 'white', border: '1px solid #d1d5db', color: '#111827', borderRadius: '12px', padding: '1rem', fontSize: '14px', minHeight: '100px', marginBottom: '1rem', outline: 'none' }}
                      />
                  ) : (
                      <p style={{ margin: '0 0 1.5rem 0', color: '#4B5563', fontSize: '14px', lineHeight: '1.6' }}>
                         {item.comment}
                      </p>
                  )}

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {item.tags.map((tag: string, tIdx: number) => (
                        <span key={tIdx} style={{ backgroundColor: '#38AC57', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                           {tag}
                        </span>
                    ))}
                  </div>
               </div>
           ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
           <button 
             onClick={handleFlagToggle}
             style={{ 
                flex: 1, 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                padding: '16px', 
                borderRadius: '100px', 
                fontWeight: 'bold', 
                fontSize: '16px',
                cursor: 'pointer',
                color: '#374151',
                transition: 'all 0.2s'
             }}
           >
             {review.isFlagged ? 'Unflagged' : 'Flagged'}
           </button>
           {isEditing ? (
               <button 
                 onClick={handleSaveEdit}
                 style={{ 
                    flex: 1, 
                    backgroundColor: '#38AC57', 
                    color: 'white', 
                    border: 'none', 
                    padding: '16px', 
                    borderRadius: '100px', 
                    fontWeight: 'bold', 
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                 }}
               >
                 Save
               </button>
           ) : (
               <button 
                 onClick={() => setIsEditing(true)}
                 style={{ 
                    flex: 1, 
                    backgroundColor: '#111827', 
                    color: 'white', 
                    border: 'none', 
                    padding: '16px', 
                    borderRadius: '100px', 
                    fontWeight: 'bold', 
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                 }}
               >
                 Edit
               </button>
           )}
           <button 
             onClick={() => setShowDeleteConfirm(true)}
             style={{ 
                flex: 1, 
                backgroundColor: '#DC2626', 
                color: 'white', 
                border: 'none', 
                padding: '16px', 
                borderRadius: '100px', 
                fontWeight: 'bold', 
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
             }}
           >
             Delete
           </button>
        </div>

        {showDeleteConfirm && (
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '100px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1100, color: '#111827' }}>
               <div style={{ width: '40px', height: '40px', backgroundColor: '#111827', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>i</span>
               </div>
               <span style={{ fontWeight: '700', fontSize: '16px' }}>Review has been deleted</span>
               <button 
                  onClick={() => {
                      onDelete(review.id);
                      setShowDeleteConfirm(false);
                      onClose();
                  }}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: '800', color: '#38AC57', fontSize: '14px', marginLeft: '1rem' }}
               >
                  Undo
               </button>
               <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF' }}
               >
                  <X size={20} />
               </button>
            </div>
        )}
      </div>
    </div>
  );
};
