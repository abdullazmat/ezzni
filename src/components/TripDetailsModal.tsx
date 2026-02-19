import { ArrowLeft, Star, Navigation, MapPin } from 'lucide-react';

interface TripDetailsModalProps {
  trip: any;
  onClose: () => void;
}

export const TripDetailsModal = ({ trip, onClose }: TripDetailsModalProps) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '1.5rem 2rem', borderRadius: '1rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
           <div>
               <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Start Time</div>
               <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>14:30</div>
           </div>
           <div>
               <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>End Time</div>
               <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>14:55</div>
           </div>
           <div>
               <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Distance</div>
               <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>45km</div>
           </div>
           <div>
               <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Completed</span>
           </div>
        </div>

        {/* Passenger Information */}
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>Passenger Information</h3>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                    <img src={trip.rider.img} alt={trip.rider.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.4rem', borderRadius: '0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        <Star size={10} fill="white" color="white" /> 4.8
                    </div>
                </div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem 2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Full Name</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>{trip.rider.name}</div>
                    </div>
                    <div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Customer ID</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>R-00045</div>
                    </div>
                     <div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Category</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Hezzni XL</div>
                    </div>
                     <div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Gender</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Male</div>
                    </div>
                     <div style={{ gridColumn: '1 / 2' }}>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Ahmedhassan@gmail.com</div>
                    </div>
                     <div style={{ gridColumn: '2 / 3' }}>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>+212 6 12 34 56</div>
                    </div>
                     <div style={{ gridColumn: '3 / 4' }}>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>City</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Casablanca</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Driver Information */}
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>Driver Information</h3>
             <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                    <img src={trip.driver.img} alt={trip.driver.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                     <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', padding: '0.1rem 0.4rem', borderRadius: '0.5rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        <Star size={10} fill="white" color="white" /> 4.8
                    </div>
                </div>
                 <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem 2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Full Name</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Ahmed Hassan</div>
                    </div>
                    <div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Vehicle Type</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Taxi</div>
                    </div>
                     <div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>+212 6 12 34 56</div>
                    </div>
                     <div></div>
                     <div style={{ gridColumn: '1 / 2' }}>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Ahmedhassan@gmail.com</div>
                    </div>
                     <div style={{ gridColumn: '2 / 3' }}>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Driver ID</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>R-00045</div>
                    </div>
                     <div style={{ gridColumn: '3 / 4' }}>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>City</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>casablanca</div>
                    </div>
                     <div style={{ gridColumn: '4 / 5' }}>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Gender</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Male</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Vehicle Information */}
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>Vehicle Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Driver ID</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>D-00045</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Vehicle Colour</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white' }}></span>
                        White
                    </div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Licence Plate Num</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>8 | 1 | 26363</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Make & Mode</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>Dacia Logan</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Year</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>2020</div>
                 </div>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Join Date</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}>2023-01-15</div>
                 </div>
            </div>
        </div>

        {/* Current Location / Route */}
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                    </div>
                    <div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Pickup</div>
                         <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>Current Location, Marrakech</div>
                    </div>
                </div>

                <div style={{ position: 'absolute', left: '11px', top: '30px', bottom: '30px', width: '2px', backgroundColor: '#e5e7eb', zIndex: 0 }}></div>
                <div style={{ position: 'absolute', left: '0', right: '0', top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'center', zIndex: 1, pointerEvents: 'none' }}>
                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Navigation size={16} color="#22c55e" />
                     </div>
                </div>


                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <MapPin size={24} color="#22c55e" fill="#22c55e" />
                    </div>
                    <div>
                         <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Destination</div>
                         <div style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>Current Location, Marrakech</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Payment Information */}
         <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Payment Information</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                     <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>TVA</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>1%</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1, borderRight: '1px solid #f3f4f6' }}>
                     <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>Service fee</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>0.00 MAD</div>
                </div>
                
                 {/* Center Avatar */}
                 <div style={{ position: 'relative', margin: '0 2rem' }}>
                    <img src={trip.driver.img} alt={trip.driver.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                     <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                        <Star size={12} fill="#fbbf24" color="#fbbf24" style={{marginTop: '-2px'}}/> 4.8
                    </div>
                </div>

                <div style={{ textAlign: 'center', flex: 1, borderLeft: '1px solid #f3f4f6' }}>
                     <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>Payment Method</div>
                     <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ef4444', marginRight: '-10px' }}></div>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fbbf24' }}></div>
                     </div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                     <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>Discount</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>0%</div>
                </div>
                 <div style={{ textAlign: 'center', flex: 1 }}>
                     <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Amount</div>
                     <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>{trip.fare}</div>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};
