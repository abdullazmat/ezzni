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
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Fare Structure</h2>
                <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>Configure pricing for different service types</p>
            </div>

            {/* Service Sub-tabs */}
            <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                marginBottom: '2rem', 
                overflowX: 'auto', 
                padding: '4px',
                backgroundColor: '#f1f5f9',
                borderRadius: '1.5rem',
                width: 'fit-content',
                maxWidth: '100%'
            }}>
                {services.map((service) => (
                    <button
                        key={service}
                        onClick={() => setActiveService(service)}
                        style={{
                            padding: '0.6rem 1.25rem',
                            borderRadius: '1.25rem',
                            border: 'none',
                            backgroundColor: activeService === service ? '#38AC57' : 'transparent',
                            color: activeService === service ? 'white' : '#64748b',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s'
                        }}
                    >
                        {service}
                    </button>
                ))}
            </div>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>{activeService}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>Configure pricing for {activeService} service</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    {fareFields.map((field, i) => (
                        <div key={i}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>{field.label}</label>
                            <input 
                                type="text" 
                                defaultValue={field.value}
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

                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={() => {
                            alert(`Fare structure for ${activeService} updated successfully!`);
                        }}
                        style={{ 
                            backgroundColor: '#38AC57', 
                            color: 'white', 
                            border: 'none', 
                            padding: '0.8rem 2.5rem', 
                            borderRadius: '2rem', 
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(56, 172, 87, 0.4)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Update Fare Structure
                    </button>
                </div>
            </div>
        </div>
    );
};
