import { useState } from 'react';
import { ArrowUpRight, MoreVertical } from 'lucide-react';

// Specialized Icons
import dailyBonusIcon from '../../assets/icons/Daily Bonus Earned.png';
import totalTripsIcon from '../../assets/icons/Total Trips Today.png';
import revenueIcon from '../../assets/icons/Revenue.png';

export const DailyBonus = () => {
  const [dailyBonusEnabled, setDailyBonusEnabled] = useState(true);

  const [selectedCard, setSelectedCard] = useState<string>('Daily Ride Target');

  const statsCards = [
    { 
      title: 'Daily Target Bonus', 
      value: '7.5', 
      unit: 'MAD', 
      subtitle: '30 rides * 0.25 MAD', 
      icon: revenueIcon,
      trend: 'up'
    },
    { 
      title: 'Daily Ride Target', 
      value: '30', 
      unit: '', 
      subtitle: 'Rides Per Day', 
      icon: totalTripsIcon,
      trend: 'down'
    },
    { 
      title: 'Per Ride Bonus', 
      value: '0.25', 
      unit: 'MAD', 
      subtitle: 'Per Completed Ride', 
      icon: dailyBonusIcon,
      trend: 'up'
    },
    { 
      title: 'Peak Hour Multiplier', 
      value: '2x', 
      unit: '', 
      subtitle: 'During Peak Hours', 
      icon: dailyBonusIcon,
      trend: 'up'
    },
  ];

  const bonusRules = [
    { action: 'Daily Ride Target', description: 'Bonus per ride toward daily target', amount: '0.25', unit: 'MAD', userType: 'Driver', condition: '0.25 MAD per ride, 30 rides = 7.5 MAD total', status: true },
    { action: 'Peak Hour Rides', description: 'Bonus per ride toward daily target', amount: '0.25', unit: 'MAD', userType: 'Driver', condition: 'Additional 0.50 MAD during peak hours (7...', status: true },
    { action: 'Weekend Target', description: 'Bonus per ride toward daily target', amount: '0.25', unit: 'MAD', userType: 'Driver', condition: '0.35 MAD per ride on weekends', status: true },
    { action: 'Driver Referral', description: 'Bonus per ride toward daily target', amount: '0.25', unit: 'MAD', userType: 'Driver', condition: '50.00 MAD when referred driver completes 10 trips', status: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {statsCards.map((card, index) => {
          const isActive = selectedCard === card.title;
          return (
            <div 
              key={index} 
              onClick={() => setSelectedCard(card.title)}
              style={{ 
                backgroundColor: isActive ? '#38AC57' : '#ffffff', 
                padding: '1.5rem', 
                borderRadius: '1.5rem', 
                border: isActive ? 'none' : '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                color: isActive ? '#ffffff' : '#111827',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={card.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.9 }}>{card.title}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                 <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>{card.value}</span>
                 {card.unit && <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{card.unit}</span>}
              </div>
              
              <div style={{ fontSize: '0.85rem', opacity: 0.7, fontWeight: '500' }}>{card.subtitle}</div>
  
              <div style={{ 
                position: 'absolute', 
                right: '1.5rem', 
                bottom: '1.5rem',
                backgroundColor: isActive ? '#111827' : (card.trend === 'up' ? '#38AC57' : '#111827'),
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}>
                {card.trend === 'up' ? <ArrowUpRight size={18} /> : <ArrowUpRight size={18} style={{ transform: 'rotate(90deg)' }} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Section */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Daily Bonus Configuration</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Enable Daily Bonus</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Turn bonus system on/off</div>
             </div>
             <div 
               onClick={() => setDailyBonusEnabled(!dailyBonusEnabled)}
               style={{ 
                 width: '50px', 
                 height: '26px', 
                 backgroundColor: dailyBonusEnabled ? '#38AC57' : '#e5e7eb', 
                 borderRadius: '13px', 
                 position: 'relative', 
                 cursor: 'pointer',
                 transition: 'background-color 0.3s'
               }}
             >
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  position: 'absolute', 
                  top: '3px', 
                  left: dailyBonusEnabled ? '27px' : '3px',
                  transition: 'left 0.3s'
                }}></div>
             </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {[
            { label: 'Daily Target Rides', type: 'number', value: '30' },
            { label: 'Per Ride Bonus MAD', type: 'number', value: '0.25' },
            { label: 'Max Daily Bonus', type: 'number', value: '30' },
            { label: 'Peak Hour Multiplier', type: 'number', value: '2' },
            { label: 'Weekend Multiplier', type: 'number', value: '1.5' },
            { label: 'Daily Reset Time', type: 'text', placeholder: 'Type here' },
          ].map((field, i) => (
            <div key={i}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>{field.label}</label>
              <input 
                type={field.type} 
                defaultValue={field.value}
                placeholder={field.placeholder}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '0.75rem', 
                  border: '1px solid #e5e7eb', 
                  backgroundColor: '#f9fafb',
                  fontSize: '0.9rem',
                  outline: 'none'
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Peak Hours Configuration */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Peak Hours Configuration</h2>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
           {[1, 2].map((p) => (
             <div key={p} style={{ flex: 1, backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Peak {p}:</span>
                <input type="text" defaultValue="07:00AM" style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', width: '90px', fontSize: '0.85rem' }} />
                <span>To</span>
                <input type="text" defaultValue="09:00AM" style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', width: '90px', fontSize: '0.85rem' }} />
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Bonus: 0.50 MAD per ride</span>
             </div>
           ))}
        </div>
      </div>

      {/* Bonus Rules Table */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb' }}>
        <div style={{ marginBottom: '1.5rem' }}>
           <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Bonus Rules & Multipliers</h2>
           <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>Configure additional bonus opportunities for drivers</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
            <thead>
               <tr style={{ backgroundColor: '#38AC57', color: 'white' }}>
                  <th style={{ padding: '1rem', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Action</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Bonus Amount</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>User Type</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Conditions</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '1rem', borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Action</th>
               </tr>
            </thead>
            <tbody>
               {bonusRules.map((rule, i) => (
                 <tr key={i} style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <td style={{ padding: '1.25rem 1rem' }}>
                       <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{rule.action}</div>
                       <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{rule.description}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                       <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', gap: '0.5rem' }}>
                          <span style={{ fontWeight: '700' }}>{rule.amount}</span>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{rule.unit}</span>
                       </div>
                    </td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                       <span style={{ backgroundColor: '#f3f4f6', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>{rule.userType}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', fontSize: '0.85rem', color: '#4b5563', maxWidth: '300px' }}>
                       {rule.condition}
                    </td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                       <div style={{ 
                         width: '44px', 
                         height: '24px', 
                         backgroundColor: rule.status ? '#38AC57' : '#e5e7eb', 
                         borderRadius: '12px', 
                         position: 'relative',
                         cursor: 'pointer'
                       }}>
                          <div style={{ 
                            width: '18px', 
                            height: '18px', 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            position: 'absolute', 
                            top: '3px', 
                            left: rule.status ? '23px' : '3px'
                          }}></div>
                       </div>
                    </td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                       <button 
                        onClick={() => alert(`Managing action: ${rule.action}`)}
                        style={{ 
                            background: '#f9fafb', 
                            border: '1px solid #e5e7eb', 
                            cursor: 'pointer', 
                            color: '#6b7280',
                            padding: '0.4rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                       >
                          <MoreVertical size={18} />
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
