import { useState } from 'react';

export const FareStructure = () => {
    const [activeService, setActiveService] = useState('Car Ride');

    const services = [
        'Motorcycle', 'Taxi', 'Car Ride', 'Airport Ride', 'City to City', 'Delivery', 'Group Ride', 'Reservation', 'Hezzni Standard', 'Hezzni Comfort', 'Hezzni XL'
    ];

    const fareFields = [
        { label: 'Base Fare (MAD)', value: '5' },
        { label: 'Booking Fee (MAD)', value: '5' },
        { label: 'Per Minute Rate (MAD)', value: '5' },
        { label: 'Night Surcharge (%)', value: '5' },
        { label: 'Per KM Rate (MAD)', value: '5' },
        { label: 'Cancellation Fee (MAD)', value: '5' },
        { label: 'Minimum Fare', value: '5' },
        { label: 'Peak Hour Surcharge (%)', value: '5' },
    ];

  return (
    <div className="vp-fare-container">
      <style>{`
        .vp-fare-container {
            animation: fadeIn 0.4s ease-out;
        }

        .vp-fare-header {
            margin-bottom: 2.5rem;
        }

        .vp-fare-header h2 {
            font-size: 1.75rem;
            font-weight: 900;
            color: #1e293b;
            margin: 0;
            letter-spacing: -0.025em;
        }

        .vp-fare-header p {
            color: #64748b;
            margin: 0.5rem 0 0 0;
            font-size: 1.1rem;
            font-weight: 500;
        }

        .vp-fare-subtabs {
            display: flex;
            gap: 0.625rem;
            background: #f1f5f9;
            padding: 8px;
            border-radius: 100px;
            width: fit-content;
            margin-bottom: 2.5rem;
            overflow-x: auto;
            max-width: 100%;
            scrollbar-width: none;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }

        .vp-fare-subtabs::-webkit-scrollbar {
            display: none;
        }

        .vp-subtab-btn {
            padding: 0.75rem 1.75rem;
            border-radius: 100px;
            border: none;
            background: transparent;
            color: #64748b;
            font-weight: 800;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
        }

        .vp-subtab-btn.active {
            background: #38AC57;
            color: white;
            box-shadow: 0 4px 12px rgba(56, 172, 87, 0.2);
        }

        .vp-fare-card {
            background: white;
            padding: 2.5rem;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .vp-fare-card h3 {
            font-size: 1.5rem;
            font-weight: 900;
            margin: 0;
            color: #1e293b;
        }

        .vp-fare-card p {
            color: #64748b;
            font-size: 1rem;
            margin: 0.5rem 0 2.5rem 0;
            font-weight: 500;
        }

        .vp-fare-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 2rem;
        }

        .vp-fare-input-group label {
            display: block;
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            color: #334155;
        }

        .vp-fare-input-group input {
            width: 100%;
            padding: 1.125rem 1.5rem;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            background-color: #f8fafc;
            font-size: 1.1rem;
            font-weight: 700;
            outline: none;
            transition: all 0.2s;
            color: #1e293b;
            box-sizing: border-box;
        }

        .vp-fare-input-group input:focus {
            border-color: #38AC57;
            background: white;
            box-shadow: 0 0 0 4px rgba(56, 172, 87, 0.1);
        }

        .vp-update-btn {
            background: #111827;
            color: white;
            border: none;
            padding: 1.25rem 3.5rem;
            border-radius: 100px;
            font-weight: 900;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 15px -3px rgba(17, 24, 39, 0.2);
        }

        .vp-update-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 25px -5px rgba(17, 24, 39, 0.3);
        }

        @media (max-width: 768px) {
            .vp-fare-card {
                padding: 1.5rem;
            }
            .vp-fare-grid {
                grid-template-columns: 1fr;
            }
            .vp-subtab-btn {
                padding: 0.6rem 1.25rem;
                font-size: 0.85rem;
            }
            .vp-update-btn {
                width: 100%;
            }
        }
      `}</style>

      <div className="vp-fare-header">
        <h2>Fare Structure</h2>
        <p>Configure pricing for different service types</p>
      </div>

      <div className="vp-fare-subtabs">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => setActiveService(service)}
            className={`vp-subtab-btn ${activeService === service ? 'active' : ''}`}
          >
            {service}
          </button>
        ))}
      </div>

      <div className="vp-fare-card">
        <div className="vp-fare-card-header">
          <h3>{activeService}</h3>
          <p>Configure pricing for {activeService} service</p>
        </div>

        <div className="vp-fare-grid">
          {fareFields.map((field, i) => (
            <div key={i} className="vp-fare-input-group">
              <label>{field.label}</label>
              <input 
                type="text" 
                defaultValue={field.value}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="vp-update-btn"
            onClick={() => alert(`Fare structure for ${activeService} updated successfully!`)}
          >
            Update Fare Structure
          </button>
        </div>
      </div>
    </div>
  );
};
