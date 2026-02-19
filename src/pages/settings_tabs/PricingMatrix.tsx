import { Edit2 } from 'lucide-react';

export const PricingMatrix = () => {
    const services = [
        { type: 'Motorcycle', perKm: '2.00', perMin: '0.40', minFare: '8.00', serviceFee: '-', tva: '18%', icon: '🏍️' },
        { type: 'Standard Car', perKm: '3.00', perMin: '0.50', minFare: '8.00', serviceFee: '-', tva: '18%', icon: '🚗' },
        { type: 'Comfort Car', perKm: '6.00', perMin: '0.60', minFare: '8.00', serviceFee: '-', tva: '18%', icon: '🚙' },
        { type: 'XL', perKm: '7.00', perMin: '0.70', minFare: '8.00', serviceFee: '-', tva: '18%', icon: '🚐' },
        { type: 'Taxi', perKm: '4.50', perMin: '0.55', minFare: '8.00', serviceFee: '-', tva: '18%', icon: '🚖' },
        { type: 'Express Delivery', perKm: '3.50', perMin: '0.00', minFare: '15.00', serviceFee: '-', tva: '18%', icon: '📦' },
        { type: 'City to City', perKm: '3.50', perMin: '0.45', minFare: '50.00', serviceFee: '-', tva: '18%', icon: '🏬' },
        { type: 'Group Ride', perKm: '8.00', perMin: '0.80', minFare: '20.00', serviceFee: '-', tva: '18%', icon: '👥' },
        { type: 'Reservation', perKm: '5.50', perMin: '0.55', minFare: '10.00', serviceFee: '-', tva: '18%', icon: '📅' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Service Pricing Matrix</h2>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#22c55e', color: 'white' }}>
                            <th style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', textAlign: 'left' }}>Service Type</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Per KM</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Per Minute</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Min Fare</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Service Fee</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>TVA</th>
                            <th style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', textAlign: 'left' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={index} style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <td style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1.25rem' }}>{service.icon}</span>
                                        <span style={{ fontWeight: '500' }}>{service.type}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>{service.perKm}</td>
                                <td style={{ padding: '1rem' }}>{service.perMin}</td>
                                <td style={{ padding: '1rem' }}>{service.minFare}</td>
                                <td style={{ padding: '1rem' }}>{service.serviceFee}</td>
                                <td style={{ padding: '1rem' }}>{service.tva}</td>
                                <td style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                                        <Edit2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
