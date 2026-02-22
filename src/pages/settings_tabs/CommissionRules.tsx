import { useState } from 'react';

export const CommissionRules = () => {
    const [commissionRates, setCommissionRates] = useState([
        { id: 1, label: 'Car Ride', value: 30, enabled: true },
        { id: 2, label: 'Reservation', value: 30, enabled: true },
        { id: 3, label: 'Group Ride', value: 30, enabled: true },
        { id: 4, label: 'Hezzni Comfort', value: 30, enabled: true },
        { id: 5, label: 'Motorcycle', value: 30, enabled: true },
        { id: 6, label: 'Airport Ride', value: 30, placeholder: 'Type here', enabled: true },
        { id: 7, label: 'Delivery', value: 30, enabled: true },
        { id: 8, label: 'Hezzni Standard', value: 30, enabled: true },
        { id: 9, label: 'City to City', value: 30, enabled: true },
        { id: 10, label: 'Taxi', value: 30, enabled: true },
        { id: 11, label: 'Hezzni XL', value: 30, enabled: true },
    ]);

    const toggleService = (id: number) => {
        setCommissionRates(prev => prev.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
    };

  return (
    <div className="vp-commission-container">
      <style>{`
        .vp-commission-container {
            animation: fadeIn 0.4s ease-out;
        }

        .vp-commission-header {
            margin-bottom: 2.5rem;
        }

        .vp-commission-header h2 {
            font-size: 1.75rem;
            font-weight: 900;
            color: #1e293b;
            margin: 0;
            letter-spacing: -0.025em;
        }

        .vp-commission-header p {
            color: #64748b;
            margin: 0.5rem 0 0 0;
            font-size: 1.1rem;
            font-weight: 500;
        }

        .vp-commission-card {
            background: white;
            padding: 2.5rem;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .vp-commission-card h3 {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 2.5rem;
            color: #1e293b;
        }

        .vp-commission-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
        }

        .vp-commission-item {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            transition: all 0.2s;
        }

        .vp-commission-item:focus-within {
            border-color: #38AC57;
            background: white;
            box-shadow: 0 4px 12px rgba(56, 172, 87, 0.08);
        }

        .vp-commission-item .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
        }

        .vp-commission-item label {
            font-size: 1.05rem;
            font-weight: 800;
            color: #1e293b;
        }

        .vp-commission-item input {
            width: 100%;
            padding: 1rem 1.25rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            background-color: white;
            font-size: 1.1rem;
            font-weight: 800;
            outline: none;
            transition: all 0.2s;
            color: #1e293b;
        }

        .vp-commission-item input:disabled {
            background: #f1f5f9;
            color: #94a3b8;
            cursor: not-allowed;
        }

        .vp-switch {
            width: 44px;
            height: 24px;
            border-radius: 100px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vp-switch .knob {
            width: 18px;
            height: 18px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 3px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .vp-save-btn {
            background: #38AC57;
            color: white;
            border: none;
            padding: 1.125rem 3.5rem;
            border-radius: 100px;
            font-weight: 900;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 10px 15px -3px rgba(56, 172, 87, 0.3);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .vp-save-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(56, 172, 87, 0.4);
            background: #2e8d46;
        }

        @media (max-width: 768px) {
            .vp-commission-card {
                padding: 1.5rem;
            }
            .vp-commission-grid {
                grid-template-columns: 1fr;
            }
            .vp-save-btn {
                width: 100%;
                justify-content: center;
            }
        }
      `}</style>

      <div className="vp-commission-header">
        <h2>Commission Rules</h2>
        <p>Configure commission rates for different services and regions</p>
      </div>

      <div className="vp-commission-card">
        <h3>Global Commission Rates</h3>
        
        <div className="vp-commission-grid">
          {commissionRates.map((item) => (
            <div key={item.id} className="vp-commission-item" style={{ opacity: item.enabled ? 1 : 0.6 }}>
              <div className="header">
                <label>{item.label}</label>
                <div 
                  className="vp-switch"
                  onClick={() => toggleService(item.id)}
                  style={{ backgroundColor: item.enabled ? '#38AC57' : '#e2e8f0' }}
                >
                  <div className="knob" style={{ left: item.enabled ? '23px' : '3px' }}></div>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  defaultValue={item.value || ''}
                  placeholder={item.placeholder || '00'}
                  disabled={!item.enabled}
                />
                <span style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontWeight: '800', color: item.enabled ? '#64748b' : '#cbd5e1', fontSize: '1rem' }}>%</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="vp-save-btn"
            onClick={() => alert('Commission configuration saved successfully!')}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
