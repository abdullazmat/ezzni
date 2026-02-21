import { Eye, Edit2, Trash2 } from 'lucide-react';

export const DocumentRequirements = () => {
    const documentTypes = [
        { name: 'National ID (CIN)', description: 'Moroccan National Identity Card', types: ['Driver', 'Rider'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Driving License', description: 'Valid Moroccan driving license', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Vehicle Registration (Carte Grise)', description: 'Vehicle registration document', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Vehicle Insurance', description: 'Valid vehicle insurance certificate', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Criminal Background Check', description: 'Clean criminal record certificate', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Medical Certificate', description: 'Medical fitness certificate for drivers', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Medical Certificate', description: 'Medical fitness certificate for drivers', types: ['Rental Co.'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>Document Requirements</h2>
                <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0' }}>Configure required documents for different user types</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#38AC57', color: 'white' }}>
                                <th style={{ padding: '1rem', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Document Type</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>User Types</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>File Limits</th>
                                <th style={{ padding: '1rem', borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documentTypes.map((doc, index) => (
                                <tr key={index} style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#111827' }}>{doc.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{doc.description}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {doc.types.map((type, i) => (
                                                <span key={i} style={{ border: '1px solid #e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>{type}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{doc.limits}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>{doc.formats}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                            <button style={{ background: 'white', border: '1px solid #e5e7eb', padding: '0.4rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4b5563', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                                                <Eye size={14} /> View
                                            </button>
                                            <button style={{ background: 'white', border: '1px solid #e5e7eb', padding: '0.4rem', borderRadius: '0.5rem', color: '#4b5563', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef7f0'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                                                <Edit2 size={14} />
                                            </button>
                                            <button style={{ background: 'white', border: '1px solid #fee2e2', padding: '0.4rem', borderRadius: '0.5rem', color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

