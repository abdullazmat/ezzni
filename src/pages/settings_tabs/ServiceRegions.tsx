import { MoreVertical, Car, Bike, Plane, Globe, Users } from 'lucide-react';

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
        { icon: <Car size={14} />, label: 'Ride' },
        { icon: <Bike size={14} />, label: 'Moto' },
        { icon: <Car size={14} />, label: 'Taxi' },
        { icon: <Plane size={14} />, label: 'Airport' },
        { icon: <Globe size={14} />, label: 'Intercity' },
        { icon: <Users size={14} />, label: 'Group' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Service Regions</h2>
                <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>Manage service availability by region</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {regions.map((region, index) => (
                    <div key={index} style={{ 
                        backgroundColor: 'white', 
                        borderRadius: '1.5rem', 
                        padding: '1.5rem', 
                        border: '1px solid #e5e7eb',
                        opacity: region.status === 'Active' ? 1 : 0.6,
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                    }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>{region.name}</h3>
                                <span style={{ 
                                    backgroundColor: region.status === 'Active' ? '#f0fdf4' : '#f3f4f6', 
                                    color: region.status === 'Active' ? '#16a34a' : '#6b7280', 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '1rem', 
                                    fontSize: '0.75rem', 
                                    fontWeight: '700' 
                                }}>
                                    {region.status}
                                </span>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert(`Managing settings for ${region.name}`);
                                }}
                                style={{ 
                                    background: '#f9fafb', 
                                    border: '1px solid #e5e7eb', 
                                    cursor: 'pointer', 
                                    color: '#9ca3af',
                                    padding: '0.4rem',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            >
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                <span style={{ color: '#6b7280' }}>Active Drivers:</span>
                                <span style={{ fontWeight: '700' }}>{region.drivers}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                <span style={{ color: '#6b7280' }}>Monthly Trips:</span>
                                <span style={{ fontWeight: '700' }}>{region.trips}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                <span style={{ color: '#6b7280' }}>Custom Commission:</span>
                                <span style={{ fontWeight: '700', color: '#22c55e' }}>{region.commission}</span>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#111827', marginBottom: '0.75rem' }}>Available Services</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                {services.map((service, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#4b5563', fontWeight: '500' }}>
                                        <div style={{ color: '#22c55e' }}>{service.icon}</div>
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
