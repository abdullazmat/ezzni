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
    <div className="vp-daily-bonus-container">
      <style>{`
        .vp-daily-bonus-container {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            animation: fadeIn 0.4s ease-out;
        }

        .vp-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .vp-stat-card {
            background: white;
            padding: 2rem;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .vp-stat-card.active {
            background: #38AC57;
            border-color: #38AC57;
            box-shadow: 0 20px 25px -5px rgba(56, 172, 87, 0.2);
            color: white;
        }

        .vp-stat-card:hover:not(.active) {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
            border-color: #38AC57;
        }

        .vp-stat-icon-box {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0fdf4;
            transition: all 0.3s;
        }

        .vp-stat-card.active .vp-stat-icon-box {
            background: rgba(255, 255, 255, 0.2);
        }

        .vp-stat-main {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .vp-stat-main .label {
            font-size: 1rem;
            font-weight: 800;
            color: #64748b;
            transition: all 0.3s;
        }

        .vp-stat-card.active .label {
            color: rgba(255, 255, 255, 0.9);
        }

        .vp-stat-value-row {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
        }

        .vp-stat-value {
            font-size: 2.5rem;
            font-weight: 900;
            letter-spacing: -0.025em;
        }

        .vp-stat-unit {
            font-size: 1rem;
            font-weight: 800;
            color: #94a3b8;
            transition: all 0.3s;
        }

        .vp-stat-card.active .vp-stat-unit {
            color: rgba(255, 255, 255, 0.8);
        }

        .vp-stat-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .vp-stat-subtitle {
            font-size: 0.875rem;
            font-weight: 600;
            color: #64748b;
            transition: all 0.3s;
        }

        .vp-stat-card.active .vp-stat-subtitle {
            color: rgba(255, 255, 255, 0.8);
        }

        .vp-trend-indicator {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f9;
            color: #64748b;
            transition: all 0.3s;
        }

        .vp-stat-card.active .vp-trend-indicator {
            background: rgba(0, 0, 0, 0.15);
            color: white;
        }

        .vp-config-section {
            background: white;
            padding: 2.5rem;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .vp-config-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2.5rem;
            gap: 1.5rem;
            flex-wrap: wrap;
        }

        .vp-config-header h2 {
            font-size: 1.5rem;
            font-weight: 900;
            margin: 0;
            color: #1e293b;
        }

        .vp-toggle-container {
            display: flex;
            align-items: center;
            gap: 1.25rem;
            background: #f8fafc;
            padding: 0.75rem 1.5rem;
            border-radius: 100px;
            border: 1px solid #e2e8f0;
        }

        .vp-toggle-text {
            text-align: right;
        }

        .vp-toggle-text .main {
            display: block;
            font-weight: 800;
            font-size: 0.95rem;
            color: #1e293b;
        }

        .vp-toggle-text .sub {
            display: block;
            font-size: 0.75rem;
            color: #64748b;
        }

        .vp-form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 2rem;
        }

        .vp-input-group label {
            display: block;
            font-size: 0.95rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            color: #334155;
        }

        .vp-input-group input {
            width: 100%;
            padding: 1rem 1.25rem;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            background-color: #f8fafc;
            font-size: 1rem;
            font-weight: 600;
            outline: none;
            transition: all 0.2s;
            box-sizing: border-box;
        }

        .vp-input-group input:focus {
            border-color: #38AC57;
            background: white;
            box-shadow: 0 0 0 4px rgba(56, 172, 87, 0.1);
        }

        .vp-peak-hours-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
        }

        .vp-peak-card {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 1.25rem;
            flex-wrap: wrap;
        }

        .vp-peak-card .title {
            font-weight: 800;
            font-size: 1rem;
            color: #1e293b;
            min-width: 80px;
        }

        .vp-peak-inputs {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }

        .vp-peak-inputs input {
            width: 110px;
            padding: 0.75rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            font-weight: 700;
            font-size: 0.95rem;
            text-align: center;
        }

        .vp-table-scroll {
            overflow-x: auto;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            background: white;
        }

        .vp-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
        }

        .vp-table th {
            background: #f8fafc;
            padding: 1.25rem 1.5rem;
            text-align: left;
            font-size: 0.875rem;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid #e2e8f0;
        }

        .vp-table td {
            padding: 1.5rem;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }

        .vp-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1.25rem;
            border-radius: 100px;
            font-size: 0.875rem;
            font-weight: 700;
            background: #f1f5f9;
            color: #475569;
        }

        .vp-switch {
            width: 48px;
            height: 26px;
            border-radius: 100px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s;
        }

        .vp-switch .knob {
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 3px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
            .vp-daily-bonus-container {
                gap: 1.5rem;
            }
            .vp-config-header {
                flex-direction: column;
                align-items: stretch;
                text-align: center;
            }
            .vp-toggle-container {
                justify-content: space-between;
            }
            .vp-peak-hours-grid {
                grid-template-columns: 1fr;
            }
            .vp-peak-card {
                flex-direction: column;
                align-items: stretch;
            }
            .vp-peak-inputs {
                justify-content: center;
            }
            .vp-config-section {
                padding: 1.5rem;
            }
        }
      `}</style>

      {/* Stats Grid */}
      <div className="vp-stats-grid">
        {statsCards.map((card, index) => {
          const isActive = selectedCard === card.title;
          return (
            <div 
              key={index} 
              className={`vp-stat-card ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCard(card.title)}
            >
              <div className="vp-stat-icon-box">
                <img src={card.icon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              </div>
              
              <div className="vp-stat-main">
                <span className="label">{card.title}</span>
                <div className="vp-stat-value-row">
                  <span className="vp-stat-value">{card.value}</span>
                  {card.unit && <span className="vp-stat-unit">{card.unit}</span>}
                </div>
              </div>
              
              <div className="vp-stat-footer">
                <span className="vp-stat-subtitle">{card.subtitle}</span>
                <div className="vp-trend-indicator">
                  <ArrowUpRight size={20} style={{ transform: card.trend === 'up' ? 'none' : 'rotate(90deg)' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Section */}
      <div className="vp-config-section">
        <div className="vp-config-header">
          <h2>Daily Bonus Configuration</h2>
          <div className="vp-toggle-container">
            <div className="vp-toggle-text">
              <span className="main">Enable Daily Bonus</span>
              <span className="sub">Turn bonus system on/off</span>
            </div>
            <div 
              className="vp-switch"
              onClick={() => setDailyBonusEnabled(!dailyBonusEnabled)}
              style={{ backgroundColor: dailyBonusEnabled ? '#38AC57' : '#e2e8f0' }}
            >
              <div className="knob" style={{ left: dailyBonusEnabled ? '25px' : '3px' }}></div>
            </div>
          </div>
        </div>

        <div className="vp-form-grid">
          {[
            { label: 'Daily Target Rides', type: 'number', value: '30' },
            { label: 'Per Ride Bonus (MAD)', type: 'number', value: '0.25' },
            { label: 'Max Daily Bonus', type: 'number', value: '30' },
            { label: 'Peak Hour Multiplier', type: 'number', value: '2' },
            { label: 'Weekend Multiplier', type: 'number', value: '1.5' },
            { label: 'Daily Reset Time', type: 'text', placeholder: '00:00' },
          ].map((field, i) => (
            <div key={i} className="vp-input-group">
              <label>{field.label}</label>
              <input 
                type={field.type} 
                defaultValue={field.value}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Peak Hours Configuration */}
      <div className="vp-config-section">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2.5rem', color: '#1e293b' }}>Peak Hours Configuration</h2>
        <div className="vp-peak-hours-grid">
           {[1, 2].map((p) => (
             <div key={p} className="vp-peak-card">
                <span className="title">Peak {p}</span>
                <div className="vp-peak-inputs">
                  <input type="text" defaultValue="07:00 AM" />
                  <span style={{ fontWeight: '800', color: '#64748b' }}>To</span>
                  <input type="text" defaultValue="09:00 AM" />
                </div>
                <span style={{ fontSize: '0.9rem', color: '#38AC57', fontWeight: '800', background: '#f0fdf4', padding: '0.5rem 1rem', borderRadius: '100px' }}>
                  +0.50 MAD / ride
                </span>
             </div>
           ))}
        </div>
      </div>

      {/* Bonus Rules Table */}
      <div className="vp-config-section" style={{ padding: '0' }}>
        <div style={{ padding: '2.5rem 2.5rem 1.5rem 2.5rem' }}>
           <h2 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0, color: '#1e293b' }}>Bonus Rules & Multipliers</h2>
           <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem', fontWeight: '500' }}>Configure additional bonus opportunities for drivers</p>
        </div>

        <div className="vp-table-scroll">
          <table className="vp-table">
            <thead>
               <tr>
                  <th>Action</th>
                  <th>Bonus Amount</th>
                  <th>User Type</th>
                  <th>Conditions</th>
                  <th>Status</th>
                  <th>Manage</th>
               </tr>
            </thead>
            <tbody>
               {bonusRules.map((rule, i) => (
                 <tr key={i}>
                    <td>
                       <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#1e293b' }}>{rule.action}</div>
                       <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', fontWeight: '500' }}>{rule.description}</div>
                    </td>
                    <td>
                       <div className="vp-badge" style={{ backgroundColor: '#f0fdf4', color: '#38AC57' }}>
                          <span style={{ fontWeight: '900' }}>{rule.amount}</span>
                          <span style={{ fontSize: '0.8rem', marginLeft: '0.35rem', opacity: 0.8 }}>{rule.unit}</span>
                       </div>
                    </td>
                    <td>
                       <span className="vp-badge">{rule.userType}</span>
                    </td>
                    <td style={{ fontSize: '0.95rem', color: '#475569', maxWidth: '300px', fontWeight: '500', lineHeight: '1.5' }}>
                       {rule.condition}
                    </td>
                    <td>
                       <div 
                         className="vp-switch"
                         onClick={() => alert('Toggle status')}
                         style={{ backgroundColor: rule.status ? '#38AC57' : '#e2e8f0', width: '44px', height: '24px' }}
                       >
                          <div className="knob" style={{ width: '18px', height: '18px', left: rule.status ? '23px' : '3px' }}></div>
                       </div>
                    </td>
                    <td>
                       <button 
                        className="vp-trend-indicator"
                        style={{ background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                       >
                          <MoreVertical size={20} />
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
