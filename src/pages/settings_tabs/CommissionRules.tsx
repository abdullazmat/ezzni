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
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Commission Rules</h2>
                <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>Configure commission rates for different services and regions</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '2rem', color: '#111827' }}>Global Commission Rates</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem 3rem' }}>
                    {commissionRates.map((item) => (
                        <div key={item.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#374151' }}>{item.label}</label>
                                <div 
                                    onClick={() => toggleService(item.id)}
                                    style={{ 
                                        width: '40px', 
                                        height: '22px', 
                                        backgroundColor: item.enabled ? '#22c55e' : '#e5e7eb', 
                                        borderRadius: '11px', 
                                        position: 'relative', 
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s'
                                    }}
                                >
                                    <div style={{ 
                                        width: '16px', 
                                        height: '16px', 
                                        backgroundColor: 'white', 
                                        borderRadius: '50%', 
                                        position: 'absolute', 
                                        top: '3px', 
                                        left: item.enabled ? '21px' : '3px',
                                        transition: 'left 0.3s'
                                    }}></div>
                                </div>
                            </div>
                            <input 
                                type="text" 
                                defaultValue={item.value || ''}
                                placeholder={item.placeholder || ''}
                                style={{ 
                                    width: '100%', 
                                    padding: '0.75rem 1rem', 
                                    borderRadius: '0.75rem', 
                                    border: '1px solid #e5e7eb', 
                                    backgroundColor: '#f9fafb',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    color: item.enabled ? '#111827' : '#9ca3af'
                                }}
                                disabled={!item.enabled}
                            />
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={() => {
                            console.log('Saving Commission Rates:', commissionRates);
                            alert('Commission configuration saved successfully!');
                        }}
                        style={{ 
                            backgroundColor: '#22c55e', 
                            color: 'white', 
                            border: 'none', 
                            padding: '0.8rem 2.5rem', 
                            borderRadius: '2rem', 
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};
