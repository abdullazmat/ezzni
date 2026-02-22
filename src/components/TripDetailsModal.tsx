import { ArrowLeft, Star } from 'lucide-react';

// Vehicle Icons
import bikeIcon from '../assets/icons/bike.png';
import carIcon from '../assets/icons/car.png';
import taxiIcon from '../assets/icons/taxi.png';
import mastercardIcon from '../assets/icons/mastercard.png';
import visaIcon from '../assets/icons/visa.png';
import cashIcon from '../assets/icons/cash.png';
import pickupIcon from '../assets/icons/pickup.png';
import destinationIcon from '../assets/icons/destination.png';
import locationSwapIcon from '../assets/icons/location icon.png';

interface TripDetailsModalProps {
  trip: any;
  onClose: () => void;
}

export const TripDetailsModal = ({ trip, onClose }: TripDetailsModalProps) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(8px)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .modal-card {
            width: 100%;
            max-width: 900px;
            max-height: 95vh;
            overflow-y: auto;
            padding: 2.5rem;
            background-color: #f8fafc;
            border-radius: 2rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
            position: relative;
        }
        .section-card {
            background-color: white;
            padding: 2rem;
            border-radius: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01);
            border: 1px solid #f1f5f9;
        }
        .section-title {
            font-size: 1.25rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            color: #111827;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .info-layout {
            display: flex;
            gap: 2.5rem;
            align-items: flex-start;
        }
        .info-fields-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 2rem;
            flex: 1;
            width: 100%;
        }
        .info-item {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }
        .info-label {
            font-size: 0.8rem;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }
        .info-value {
            font-size: 1rem;
            font-weight: 700;
            color: #0f172a;
            word-break: break-all;
        }
        .stats-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #ffffff;
            padding: 1.5rem 2.5rem;
            border-radius: 1.25rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.04);
            border: 1px solid #f1f5f9;
        }
        @media (max-width: 1024px) {
            .info-fields-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (max-width: 768px) {
            .modal-card {
                padding: 1.5rem;
                padding-top: 3.5rem;
            }
            .info-layout {
                flex-direction: column;
                align-items: center;
                gap: 2rem;
            }
            .info-fields-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
                text-align: left;
            }
            .section-card {
                padding: 1.5rem;
            }
            .stats-bar {
                flex-wrap: wrap;
                gap: 1.5rem;
                padding: 1.5rem;
            }
            .stats-bar > div {
                flex: 1;
                min-width: calc(50% - 0.75rem);
            }
        }
        @media (max-width: 480px) {
            .info-fields-grid {
                grid-template-columns: 1fr;
                gap: 1.25rem;
            }
            .stats-bar > div {
                min-width: 100%;
                text-align: center;
            }
            .info-item {
                align-items: center;
                text-align: center;
            }
        }
      `}} />
      <div className="modal-card">
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={onClose}
            style={{ marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={24} color="#1f2937" />
          </button>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>Live Trip Details - {trip.id}</h2>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>View information for archived live trip</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
           <div>
               <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: '500' }}>Start Time</div>
               <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>14:30</div>
           </div>
           <div>
               <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: '500' }}>End Time</div>
               <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>14:55</div>
           </div>
           <div>
               <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: '500' }}>Distance</div>
               <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>45km</div>
           </div>
           <div>
               <span style={{ backgroundColor: '#eef7f0', color: '#38AC57', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: '600' }}>Completed</span>
           </div>
        </div>

        {/* Passenger Information */}
        <div className="section-card">
            <h3 className="section-title">Passenger Information</h3>
            <div className="info-layout">
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={trip.rider.img} alt={trip.rider.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f1f5f9' }} />
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '-8px', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        backgroundColor: 'white', 
                        padding: '4px 12px', 
                        borderRadius: '2rem', 
                        fontSize: '0.85rem', 
                        fontWeight: '800',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px', 
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                        whiteSpace: 'nowrap',
                        border: '1px solid #f1f5f9',
                        color: '#111827'
                    }}>
                        <Star size={14} fill="#fbbf24" color="#fbbf24" /> {trip.rider.rating}
                    </div>
                </div>
                <div className="info-fields-grid">
                    <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{trip.rider.name}</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Customer ID</span>
                        <span className="info-value">{trip.rider.id}</span>
                    </div>
                     <div className="info-item">
                         <span className="info-label">Category</span>
                        <span className="info-value">Taxi</span>
                    </div>
                     <div className="info-item">
                         <span className="info-label">Gender</span>
                        <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <span style={{ fontSize: '1.1rem' }}>♂</span> Male
                        </div>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{trip.rider.name.toLowerCase().replace(' ', '')}@gmail.com</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Phone</span>
                        <span className="info-value">+212 6 12 34 56</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">City</span>
                        <span className="info-value">Casablanca</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Driver Information */}
        <div className="section-card">
            <h3 className="section-title">Driver Information</h3>
             <div className="info-layout">
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={trip.driver.img} alt={trip.driver.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f1f5f9' }} />
                     <div style={{ 
                         position: 'absolute', 
                         bottom: '-8px', 
                         left: '50%', 
                         transform: 'translateX(-50%)', 
                         backgroundColor: 'white', 
                         padding: '4px 12px', 
                         borderRadius: '2rem', 
                         fontSize: '0.85rem', 
                         fontWeight: '800',
                         display: 'flex', 
                         alignItems: 'center', 
                         gap: '4px', 
                         boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                         whiteSpace: 'nowrap',
                         border: '1px solid #f1f5f9',
                         color: '#111827'
                     }}>
                        <Star size={14} fill="#fbbf24" color="#fbbf24" /> {trip.driver.rating}
                    </div>
                </div>
                 <div className="info-fields-grid">
                    <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{trip.driver.name}</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Vehicle Type</span>
                        <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={trip.vehicle === 'Motorcycle' ? bikeIcon : trip.vehicle === 'Car' ? carIcon : taxiIcon} alt="" style={{ height: '24px', width: 'auto' }} />
                            {trip.vehicle}
                        </div>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Phone</span>
                        <span className="info-value">+212 6 12 34 56</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Email</span>
                        <span className="info-value">{trip.driver.name.toLowerCase().replace(' ', '')}@gmail.com</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Driver ID</span>
                        <span className="info-value">{trip.driver.id}</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">City</span>
                        <span className="info-value">Casablanca</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Gender</span>
                        <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <span style={{ fontSize: '1.1rem' }}>♂</span> Male
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Vehicle Information */}
        <div className="section-card">
            <h3 className="section-title">Vehicle Information</h3>
            <div className="info-fields-grid">
                 <div className="info-item">
                    <span className="info-label">Driver ID</span>
                    <span className="info-value">D-00045</span>
                 </div>
                 <div className="info-item">
                    <span className="info-label">Vehicle Colour</span>
                    <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'white' }}></span>
                        White
                    </div>
                 </div>
                 <div className="info-item">
                    <span className="info-label">Licence Plate Num</span>
                    <span className="info-value">8 | 1 | 26363</span>
                 </div>
                 <div className="info-item">
                    <span className="info-label">Make & Model</span>
                    <span className="info-value">Dacia Logan</span>
                 </div>
                 <div className="info-item">
                    <span className="info-label">Year</span>
                    <span className="info-value">2020</span>
                 </div>
                 <div className="info-item">
                    <span className="info-label">Join Date</span>
                    <span className="info-value">2023-01-15</span>
                 </div>
            </div>
        </div>

        {/* Pickup & Destination Cards */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
            {/* Pickup Card */}
            <div className="card" style={{ width: '100%', backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                <img src={pickupIcon} alt="pickup" style={{ width: '32px', height: '32px', objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                     <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400', fontFamily: 'Outfit, Inter, sans-serif' }}>Pickup</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginTop: '2px', fontFamily: 'Outfit, Inter, sans-serif', wordBreak: 'break-word' }}>Current Location, Marrakech</div>
                </div>
            </div>

            {/* Swap Icon Circle - Further Enlarged */}
            <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: 'white', 
                border: '1px solid #f1f5f9', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                margin: '-36px 0',
                zIndex: 10
            }}>
                <img src={locationSwapIcon} alt="swap" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
            </div>

            {/* Destination Card */}
            <div className="card" style={{ width: '100%', backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={destinationIcon} alt="destination" style={{ width: '32px', height: '32px', objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                     <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400', fontFamily: 'Outfit, Inter, sans-serif' }}>Destination</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginTop: '2px', fontFamily: 'Outfit, Inter, sans-serif', wordBreak: 'break-word' }}>Current Location, Marrakech</div>
                </div>
            </div>
        </div>

        {/* Payment Information */}
         <div className="section-card" style={{ marginBottom: '1rem' }}>
            <h3 className="section-title">Payment Information</h3>
            <div>
                {/* Profile/Avatar Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
                     <div style={{ position: 'relative' }}>
                        <img src={trip.rider.img} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f1f5f9' }} />
                         <div style={{ 
                             position: 'absolute', 
                             bottom: '-10px', 
                             left: '50%', 
                             transform: 'translateX(-50%)', 
                             backgroundColor: 'white', 
                             padding: '4px 12px', 
                             borderRadius: '2rem', 
                             fontSize: '0.8rem', 
                             fontWeight: '800',
                             display: 'flex', 
                             alignItems: 'center', 
                             gap: '4px', 
                             boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
                             border: '1px solid #f1f5f9',
                             color: '#111827'
                         }}>
                            <Star size={12} fill="#fbbf24" color="#fbbf24" /> {trip.rider.rating}
                        </div>
                    </div>
                </div>

                <div className="info-fields-grid">
                    <div className="info-item">
                         <span className="info-label">TVA</span>
                         <span className="info-value">1%</span>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Service fee</span>
                         <span className="info-value">0.00 MAD</span>
                    </div>
                    
                    <div className="info-item">
                         <span className="info-label">Payment Method</span>
                         <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '1.5rem' }}>
                            <img 
                                src={trip.paymentMethod === 'visa' ? visaIcon : trip.paymentMethod === 'mastercard' ? mastercardIcon : cashIcon} 
                                alt="" 
                                style={{ height: '16px', width: 'auto', display: 'block', imageRendering: 'pixelated' }} 
                            />
                            <span>{trip.paymentMethod.toUpperCase()}</span>
                         </div>
                    </div>
                    <div className="info-item">
                         <span className="info-label">Discount</span>
                         <span className="info-value">0%</span>
                    </div>
                     <div className="info-item">
                         <span className="info-label">Total Amount</span>
                         <span className="info-value" style={{ fontSize: '1.25rem', color: '#38AC57' }}>{trip.fare}</span>
                    </div>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};
