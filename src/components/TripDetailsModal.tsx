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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '1.25rem 2rem', borderRadius: '1rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
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
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.25rem', color: '#111827' }}>Passenger Information</h3>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={trip.rider.img} alt={trip.rider.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '-8px', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        backgroundColor: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '1rem', 
                        fontSize: '0.8rem', 
                        fontWeight: '700',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '3px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        whiteSpace: 'nowrap',
                        border: '1px solid #f1f5f9'
                    }}>
                        <Star size={12} fill="#fbbf24" color="#fbbf24" /> {trip.rider.rating}
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '1.25rem' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Full Name</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>{trip.rider.name}</div>
                        </div>
                        <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Customer ID</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>{trip.rider.id}</div>
                        </div>
                         <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Category</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Taxi</div>
                        </div>
                         <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Gender</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                               <span style={{ fontSize: '1.1rem' }}>♂</span> Male
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Email</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>{trip.rider.name.toLowerCase().replace(' ', '')}@gmail.com</div>
                        </div>
                        <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Phone</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>+212 6 12 34 56</div>
                        </div>
                        <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>City</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>Casablanca</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Driver Information */}
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.25rem', color: '#111827' }}>Driver Information</h3>
             <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={trip.driver.img} alt={trip.driver.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                     <div style={{ 
                         position: 'absolute', 
                         bottom: '-8px', 
                         left: '50%', 
                         transform: 'translateX(-50%)', 
                         backgroundColor: 'white', 
                         padding: '2px 8px', 
                         borderRadius: '1rem', 
                         fontSize: '0.8rem', 
                         fontWeight: '700',
                         display: 'flex', 
                         alignItems: 'center', 
                         gap: '3px', 
                         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                         whiteSpace: 'nowrap',
                         border: '1px solid #f1f5f9'
                     }}>
                        <Star size={12} fill="#fbbf24" color="#fbbf24" /> {trip.driver.rating}
                    </div>
                </div>
                 <div style={{ flex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '1.25rem' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Full Name</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>{trip.driver.name}</div>
                        </div>
                        <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Vehicle Type</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={trip.vehicle === 'Motorcycle' ? bikeIcon : trip.vehicle === 'Car' ? carIcon : taxiIcon} alt="" style={{ height: '32px', width: 'auto' }} />
                                {trip.vehicle}
                            </div>
                        </div>
                        <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Phone</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>+212 6 12 34 56</div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Email</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>{trip.driver.name.toLowerCase().replace(' ', '')}@gmail.com</div>
                        </div>
                         <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Driver ID</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>{trip.driver.id}</div>
                        </div>
                         <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>City</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>Casablanca</div>
                        </div>
                         <div>
                             <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Gender</div>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                               <span style={{ fontSize: '1.1rem' }}>♂</span> Male
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Vehicle Information */}
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.25rem', color: '#111827', fontFamily: 'Inter, sans-serif' }}>Vehicle Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                 <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Driver ID</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>D-00045</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Vehicle Colour</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'white' }}></span>
                        White
                    </div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Licence Plate Num</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>8 | 1 | 26363</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Make & Model</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>Dacia Logan</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Year</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>2020</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: '500' }}>Join Date</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>2023-01-15</div>
                 </div>
            </div>
        </div>

        {/* Pickup & Destination Cards */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
            {/* Pickup Card */}
            <div className="card" style={{ width: '100%', backgroundColor: 'white', padding: '1.25rem 1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                <img src={pickupIcon} alt="pickup" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <div style={{ flex: 1 }}>
                     <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400', fontFamily: 'Outfit, Inter, sans-serif' }}>Pickup</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginTop: '2px', fontFamily: 'Outfit, Inter, sans-serif' }}>Current Location, Marrakech</div>
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
            <div className="card" style={{ width: '100%', backgroundColor: 'white', padding: '1.25rem 1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={destinationIcon} alt="destination" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <div>
                     <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400', fontFamily: 'Outfit, Inter, sans-serif' }}>Destination</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginTop: '2px', fontFamily: 'Outfit, Inter, sans-serif' }}>Current Location, Marrakech</div>
                </div>
            </div>
        </div>

        {/* Payment Information */}
         <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#111827' }}>Payment Information</h3>
            <div className="card" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                
                {/* Profile/Avatar Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
                     <div style={{ position: 'relative' }}>
                        <img src={trip.rider.img} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                         <div style={{ 
                             position: 'absolute', 
                             bottom: '-10px', 
                             left: '50%', 
                             transform: 'translateX(-50%)', 
                             backgroundColor: 'white', 
                             padding: '2px 10px', 
                             borderRadius: '1rem', 
                             fontSize: '0.85rem', 
                             fontWeight: '700',
                             display: 'flex', 
                             alignItems: 'center', 
                             gap: '3px', 
                             boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                             border: '1px solid #f1f5f9' 
                         }}>
                            <Star size={12} fill="#fbbf24" color="#fbbf24" /> {trip.rider.rating}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ textAlign: 'left' }}>
                         <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '500' }}>TVA</div>
                         <div style={{ fontSize: '1rem', fontWeight: '800', color: '#111827' }}>1%</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                         <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '500' }}>Service fee</div>
                         <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827' }}>0.00 MAD</div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                         <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '500' }}>Payment Method</div>
                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', height: '1.5rem' }}>
                            <img 
                                src={trip.paymentMethod === 'visa' ? visaIcon : trip.paymentMethod === 'mastercard' ? mastercardIcon : cashIcon} 
                                alt="" 
                                style={{ height: '16px', width: 'auto', display: 'block', imageRendering: 'pixelated' }} 
                            />
                            <span style={{ fontWeight: '800', fontSize: '1rem', color: '#111827' }}>{trip.paymentMethod.toUpperCase()}</span>
                         </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                         <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '500' }}>Discount</div>
                         <div style={{ fontSize: '1rem', fontWeight: '800', color: '#111827' }}>0%</div>
                    </div>
                     <div style={{ textAlign: 'right' }}>
                         <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '500' }}>Total Amount</div>
                         <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827' }}>{trip.fare}</div>
                    </div>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};
