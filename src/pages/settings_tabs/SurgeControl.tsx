import { Moon } from 'lucide-react';

export const SurgeControl = () => {
    const surgeItems = Array(24).fill({
        title: 'Weekend Nights',
        subtitle: 'Fri/Sat 8PM-4AM',
        rate: '9'
    });

    const reservationFees = [
        { type: 'Motorcycle', city: '+5 MAD', intercity: '+25 MAD', airport: '+40 MAD', icon: '🏍️' },
        { type: 'Standard Car', city: '+10 MAD', intercity: '+35 MAD', airport: '+40 MAD', icon: '🚗' },
        { type: 'Comfort Car', city: '+15 MAD', intercity: '+50 MAD', airport: '+40 MAD', icon: '🚙' },
        { type: 'XL', city: '+20 MAD', intercity: '+25 MAD', airport: '+40 MAD', icon: '🚐' },
        { type: 'Taxi', city: '+5 MAD', intercity: '+35 MAD', airport: '+40 MAD', icon: '🚖' },
        { type: 'Express Delivery', city: '+10 MAD', intercity: '+50 MAD', airport: '+40 MAD', icon: '📦' },
        { type: 'City to City', city: '+15 MAD', intercity: '+25 MAD', airport: '+40 MAD', icon: '🏬' },
        { type: 'Group Ride', city: '+20 MAD', intercity: '+35 MAD', airport: '+40 MAD', icon: '👥' },
        { type: 'Reservation', city: '+5 MAD', intercity: '+50 MAD', airport: '+40 MAD', icon: '📅' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Surge Pricing Control</h2>
                <select style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '2rem', 
                    border: '1px solid #e5e7eb', 
                    backgroundColor: 'white',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                }}>
                    <option>Casablanca</option>
                </select>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Seven scenarios (all 1.2x except airport) • Manage dynamic pricing for high-demand periods
            </p>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '1rem',
                marginBottom: '3rem'
            }}>
                {surgeItems.map((item, index) => (
                    <div key={index} style={{ 
                        backgroundColor: 'white', 
                        padding: '1rem', 
                        borderRadius: '0.75rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ 
                                backgroundColor: '#f0fdf4', 
                                padding: '0.5rem', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                <Moon size={18} color="#22c55e" />
                            </div>
                            <div>
                                <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item.title}</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.subtitle}</div>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type="text" 
                                    defaultValue={item.rate} 
                                    style={{ 
                                        width: '40px', 
                                        padding: '0.3rem', 
                                        borderRadius: '0.5rem', 
                                        border: '1px solid #e5e7eb',
                                        fontSize: '0.875rem',
                                        textAlign: 'center'
                                    }} 
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2px' }}>
                                    <span style={{ fontSize: '8px', cursor: 'pointer' }}>▲</span>
                                    <span style={{ fontSize: '8px', cursor: 'pointer' }}>▼</span>
                                </div>
                            </div>
                            
                            {/* Toggle Switch */}
                            <label style={{ position: 'relative', display: 'inline-block', width: '36px', height: '20px' }}>
                                <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                                <span style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: '#22c55e',
                                    transition: '.4s',
                                    borderRadius: '34px'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        content: '""',
                                        height: '14px',
                                        width: '14px',
                                        left: '18px',
                                        bottom: '3px',
                                        backgroundColor: 'white',
                                        transition: '.4s',
                                        borderRadius: '50%'
                                    }}></span>
                                </span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Reservation Fees</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Pre-booking charges by service type and destination
            </p>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#22c55e', color: 'white' }}>
                            <th style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', textAlign: 'left' }}>Service Type</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>City</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Intercity</th>
                            <th style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', textAlign: 'left' }}>Airport</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationFees.map((fee, index) => (
                            <tr key={index} style={{ backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <td style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.25rem' }}>{fee.icon}</span>
                                        <span style={{ fontWeight: '500' }}>{fee.type}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{fee.city}</td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{fee.intercity}</td>
                                <td style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', fontWeight: '500' }}>{fee.airport}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
