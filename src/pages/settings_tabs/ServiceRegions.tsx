import { MoreVertical, Plane, Globe, Users } from 'lucide-react';

// Vehicle Icons
import carIcon from '../../assets/icons/car.png';
import taxiIcon from '../../assets/icons/taxi.png';
import bikeIcon from '../../assets/icons/bike.png';

export const ServiceRegions = () => {
    const regions = [
        { name: 'Casablanca-Settat', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Rabat-Salé-Kénitra', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Marrakech-Safi', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Fès-Meknès', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Tanger-Tétouan-Al Hoceima', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Oriental', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Souss-Massa', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Béni Mellal-Khénifra', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Drâa-Tafilalet', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Active' },
        { name: 'Laâyoune-Sakia El Hamra', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Inactive' },
        { name: 'Guelmim-Oued Noun', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Inactive' },
        { name: 'Dakhla-Oued Ed-Dahab', drivers: '1,245', trips: '12.5K', commission: 'Enabled', status: 'Inactive' },
    ];

    const services = [
        { icon: <img src={carIcon} alt="Ride" style={{ height: '18px', width: 'auto' }} />, label: 'Ride' },
        { icon: <img src={bikeIcon} alt="Moto" style={{ height: '18px', width: 'auto' }} />, label: 'Moto' },
        { icon: <img src={taxiIcon} alt="Taxi" style={{ height: '18px', width: 'auto' }} />, label: 'Taxi' },
        { icon: <Plane size={14} />, label: 'Airport' },
        { icon: <Globe size={14} />, label: 'Intercity' },
        { icon: <Users size={14} />, label: 'Group' },
    ];

  return (
    <div className="vp-regions-container">
      <style>{`
        .vp-regions-container {
            animation: fadeIn 0.4s ease-out;
        }

        .vp-regions-header {
            margin-bottom: 2.5rem;
        }

        .vp-regions-header h2 {
            font-size: 1.75rem;
            font-weight: 900;
            color: #1e293b;
            margin: 0;
            letter-spacing: -0.025em;
        }

        .vp-regions-header p {
            color: #64748b;
            margin: 0.5rem 0 0 0;
            font-size: 1.1rem;
            font-weight: 500;
        }

        .vp-regions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 2rem;
        }

        .vp-region-card {
            background: white;
            border-radius: 32px;
            padding: 2rem;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .vp-region-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            border-color: #38AC57;
        }

        .vp-region-card.inactive {
            opacity: 0.7;
        }

        .vp-region-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
        }

        .vp-region-info h3 {
            font-size: 1.25rem;
            font-weight: 900;
            margin: 0 0 0.5rem 0;
            color: #1e293b;
        }

        .vp-status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1.25rem;
            border-radius: 100px;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .vp-status-badge.active {
            background: #f0fdf4;
            color: #38AC57;
        }

        .vp-status-badge.inactive {
            background: #f1f5f9;
            color: #64748b;
        }

        .vp-more-btn {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s;
        }

        .vp-more-btn:hover {
            background: #f1f5f9;
            color: #1e293b;
        }

        .vp-region-stats {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .vp-region-stat-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.95rem;
        }

        .vp-region-stat-row .label {
            color: #64748b;
            font-weight: 600;
        }

        .vp-region-stat-row .value {
            color: #1e293b;
            font-weight: 800;
        }

        .vp-services-preview {
            border-top: 1px solid #f1f5f9;
            padding-top: 1.5rem;
        }

        .vp-services-preview h4 {
            font-size: 0.875rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .vp-services-tag-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
        }

        .vp-service-tag {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            font-weight: 700;
            color: #475569;
            background: #f8fafc;
            padding: 0.5rem;
            border-radius: 10px;
            border: 1px solid #f1f5f9;
        }

        @media (max-width: 768px) {
            .vp-regions-grid {
                grid-template-columns: 1fr;
            }
            .vp-region-card {
                padding: 1.5rem;
            }
            .vp-services-tag-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
      `}</style>

      <div className="vp-regions-header">
        <h2>Service Regions</h2>
        <p>Manage service availability and configuration by region</p>
      </div>

      <div className="vp-regions-grid">
        {regions.map((region, index) => (
          <div 
            key={index} 
            className={`vp-region-card ${region.status !== 'Active' ? 'inactive' : ''}`}
            onClick={() => alert(`Opening Settings for ${region.name}...`)}
          >
            <div className="vp-region-card-header">
              <div className="vp-region-info">
                <h3>{region.name}</h3>
                <span className={`vp-status-badge ${region.status === 'Active' ? 'active' : 'inactive'}`}>
                  {region.status}
                </span>
              </div>
              <button 
                className="vp-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Managing options for ${region.name}`);
                }}
              >
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="vp-region-stats">
              <div className="vp-region-stat-row">
                <span className="label">Active Drivers</span>
                <span className="value">{region.drivers}</span>
              </div>
              <div className="vp-region-stat-row">
                <span className="label">Trips This Month</span>
                <span className="value">{region.trips}</span>
              </div>
              <div className="vp-region-stat-row">
                <span className="label">Custom Commission</span>
                <span className="value" style={{ color: '#38AC57' }}>{region.commission}</span>
              </div>
            </div>

            <div className="vp-services-preview">
              <h4>Available Services</h4>
              <div className="vp-services-tag-grid">
                {services.map((service, i) => (
                  <div key={i} className="vp-service-tag">
                    <span style={{ color: '#38AC57', display: 'flex' }}>{service.icon}</span>
                    {service.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
