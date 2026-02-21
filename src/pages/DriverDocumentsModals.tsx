
import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Eye, Car, Bike, Download } from 'lucide-react';

// Status badge colors
const statusColors: Record<string, { bg: string; color: string; border: string }> = {
    'Verified': { bg: '#eef7f0', color: '#2d8a46', border: '#bbf7d0' },
    'Pending': { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' },
    'Updated': { bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' },
    'Rejected': { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
    'Expired': { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
    'Under Review': { bg: '#fef9c3', color: '#a16207', border: '#fef08a' },
    'Completed': { bg: '#eef7f0', color: '#2d8a46', border: '#bbf7d0' },
};

const StatusBadge = ({ status }: { status: string }) => {
    const s = statusColors[status] || statusColors['Pending'];
    return (
        <span style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
            {status}
        </span>
    );
};

// ============ SELECT CATEGORY MODAL ============
export const SelectCategoryModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: (cat: string) => void }) => {
    const [selected, setSelected] = useState('Hezzni Standard');
    const categories = [
        { id: 'Hezzni Standard', desc: 'Affordable everyday rides', icon: 'Car' },
        { id: 'Hezzni Comfort', desc: 'Premium rides with higher fares', icon: 'Car' },
        { id: 'Hezzni XL', desc: 'For group trips and extra space', icon: 'Car' },
        { id: 'Motorcycle', desc: 'Affordable everyday rides', icon: 'Bike' },
        { id: 'Taxi', desc: 'Affordable everyday rides', icon: 'Car' },
        { id: 'Hezzni Delivery', desc: 'Deliver parcels and packages', icon: 'Car' },
    ];

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '500px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={24} />
                </button>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0' }}>Rider  - T-00234</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 24px 0' }}>Complete rider profile and activity information</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {categories.map(cat => {
                        const isSelected = selected === cat.id;
                        return (
                            <div key={cat.id} onClick={() => setSelected(cat.id)} style={{
                                display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '16px',
                                border: isSelected ? '2px solid #38AC57' : '2px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s'
                            }}>
                                <div style={{ width: 48, height: 48, backgroundColor: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', flexShrink: 0 }}>
                                    {cat.icon === 'Bike' ? <Bike size={24} color="#374151" /> : <Car size={24} color="#374151" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{cat.id}</div>
                                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{cat.desc}</div>
                                </div>
                                <div style={{ width: 20, height: 20, borderRadius: '50%', border: isSelected ? '5px solid #38AC57' : '2px solid #d1d5db', backgroundColor: 'white', flexShrink: 0 }}></div>
                            </div>
                        );
                    })}
                </div>

                <button onClick={() => { onConfirm(selected); onClose(); }} style={{
                    width: '100%', padding: '14px', borderRadius: '32px', border: 'none',
                    backgroundColor: '#38AC57', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d8a46'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#38AC57'}
                >Confirm</button>
            </div>
        </div>
    );
};

// ============ DOCUMENT PREVIEW MODAL ============
// Generate SVG data URI for document previews
const makeDocSvg = (title: string, subtitle: string, color: string, icon: string, page: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="320" viewBox="0 0 520 320">
        <rect width="520" height="320" rx="12" fill="#f8fafc"/>
        <rect x="20" y="20" width="480" height="280" rx="8" fill="white" stroke="${color}" stroke-width="2"/>
        <rect x="20" y="20" width="480" height="50" rx="8" fill="${color}"/>
        <rect x="20" y="62" width="480" height="8" fill="${color}"/>
        <text x="260" y="52" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="18" font-weight="bold">${title}</text>
        <text x="260" y="100" text-anchor="middle" fill="#64748b" font-family="Arial,sans-serif" font-size="13">${subtitle}</text>
        <text x="260" y="180" text-anchor="middle" fill="${color}" font-family="Arial,sans-serif" font-size="48">${icon}</text>
        <rect x="60" y="220" width="160" height="10" rx="4" fill="#e2e8f0"/>
        <rect x="60" y="240" width="120" height="10" rx="4" fill="#e2e8f0"/>
        <rect x="300" y="220" width="160" height="10" rx="4" fill="#e2e8f0"/>
        <rect x="300" y="240" width="100" height="10" rx="4" fill="#e2e8f0"/>
        <text x="260" y="290" text-anchor="middle" fill="#94a3b8" font-family="Arial,sans-serif" font-size="11">${page}</text>
    </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const documentImages: Record<string, string[]> = {
    'National ID Card (CIN)': [
        makeDocSvg('CARTE NATIONALE D\'IDENTITÉ', 'Royaume du Maroc • CIN', '#1e40af', '🪪', 'Front Side'),
        makeDocSvg('CARTE NATIONALE D\'IDENTITÉ', 'Verso • Informations personnelles', '#1e40af', '🪪', 'Back Side'),
    ],
    "Driver's License": [
        makeDocSvg('PERMIS DE CONDUIRE', 'Royaume du Maroc • رخصة السياقة', '#2d8a46', '🚗', 'Front Side'),
        makeDocSvg('PERMIS DE CONDUIRE', 'Catégories • Validité', '#2d8a46', '🚗', 'Back Side'),
    ],
    'Pro Driver Card / Carte Professionnelle': [
        makeDocSvg('CARTE PROFESSIONNELLE', 'Chauffeur Professionnel • بطاقة مهنية', '#7c3aed', '🏷️', 'Front Side'),
        makeDocSvg('CARTE PROFESSIONNELLE', 'Numéro de carte • Détails', '#7c3aed', '🏷️', 'Back Side'),
    ],
    'Vehicle Photos': [
        makeDocSvg('VEHICLE PHOTO', 'Front View • Vue avant', '#0369a1', '🚘', 'Front View'),
        makeDocSvg('VEHICLE PHOTO', 'Side View • Vue latérale', '#0369a1', '🚙', 'Side View'),
        makeDocSvg('VEHICLE PHOTO', 'Rear View • Vue arrière', '#0369a1', '🚗', 'Rear View'),
    ],
    'Face Verification': [
        makeDocSvg('FACE VERIFICATION', 'Selfie Photo • التحقق من الوجه', '#dc2626', '🤳', 'Selfie'),
    ],
    'Taxi License(Taxi Drivers Only)': [
        makeDocSvg('LICENCE DE TAXI', 'Autorisation de Transport • رخصة سيارة أجرة', '#ca8a04', '🚕', 'Front Side'),
        makeDocSvg('LICENCE DE TAXI', 'Conditions & Validité', '#ca8a04', '🚕', 'Back Side'),
    ],
    'Vehicle Registration (Carte Grise)': [
        makeDocSvg('CARTE GRISE', 'Certificat d\'Immatriculation • البطاقة الرمادية', '#0f766e', '📋', 'Front Side'),
        makeDocSvg('CARTE GRISE', 'Caractéristiques Techniques', '#0f766e', '📋', 'Back Side'),
    ],
    'Vehicle Detail': [
        makeDocSvg('VEHICLE INSURANCE', 'Assurance Automobile • تأمين السيارة', '#9333ea', '🛡️', 'Insurance Document'),
        makeDocSvg('VEHICLE INSURANCE', 'Policy Details • Attestation', '#9333ea', '🛡️', 'Insurance Card'),
    ],
    'Vehicle Details': [
        makeDocSvg('VEHICLE DETAILS', 'Licence Plate • لوحة الترقيم', '#ea580c', '🔢', 'Plate Number'),
        makeDocSvg('VEHICLE DETAILS', 'Make, Model & Specifications', '#ea580c', '📝', 'Vehicle Info'),
    ],
};

export const DocumentPreviewModal = ({ docName, onClose }: { docName: string; onClose: () => void }) => {
    const [imgIndex, setImgIndex] = useState(0);
    const images = documentImages[docName] || [
        `https://picsum.photos/seed/${encodeURIComponent(docName)}/520/320`,
    ];
    const totalImages = images.length;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '520px', padding: '32px' }}>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={24} />
                </button>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 20px 0' }}>{docName}</h3>

                <div style={{ position: 'relative', marginBottom: '16px' }}>
                    <img 
                        src={images[imgIndex]} 
                        alt={docName} 
                        style={{ 
                            width: '100%', height: '280px', objectFit: 'cover', 
                            borderRadius: '16px', backgroundColor: '#f3f4f6',
                            display: 'block'
                        }} 
                    />
                    {/* Left Arrow */}
                    <button 
                        onClick={() => setImgIndex(Math.max(0, imgIndex - 1))} 
                        disabled={imgIndex === 0}
                        style={{
                            position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', border: 'none',
                            cursor: imgIndex === 0 ? 'default' : 'pointer', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)', opacity: imgIndex === 0 ? 0.35 : 1,
                            transition: 'opacity 0.2s'
                        }}
                    >
                        <ChevronLeft size={22} />
                    </button>
                    {/* Right Arrow */}
                    <button 
                        onClick={() => setImgIndex(Math.min(totalImages - 1, imgIndex + 1))} 
                        disabled={imgIndex === totalImages - 1}
                        style={{
                            position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', border: 'none',
                            cursor: imgIndex === totalImages - 1 ? 'default' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)', opacity: imgIndex === totalImages - 1 ? 0.35 : 1,
                            transition: 'opacity 0.2s'
                        }}
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Image indicator dots */}
                {totalImages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
                        {images.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setImgIndex(i)}
                                style={{ 
                                    width: imgIndex === i ? '20px' : '8px', height: '8px', borderRadius: '4px', border: 'none',
                                    backgroundColor: imgIndex === i ? '#38AC57' : '#d1d5db', cursor: 'pointer',
                                    transition: 'all 0.2s', padding: 0
                                }} 
                            />
                        ))}
                    </div>
                )}

                {/* Page indicator text */}
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginBottom: '20px' }}>
                    Page {imgIndex + 1} of {totalImages}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={onClose} style={{
                        flex: 1, padding: '12px', borderRadius: '24px', border: '1px solid #e5e7eb',
                        backgroundColor: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                    >Cancel</button>
                    <button onClick={() => alert('Document downloaded!')} style={{
                        flex: 1, padding: '12px', borderRadius: '24px', border: 'none',
                        backgroundColor: '#38AC57', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d8a46'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#38AC57'}
                    >
                        <Download size={16} /> Download
                    </button>
                </div>
            </div>
        </div>
    );
};

// ============ APPLICATION REVIEW MODAL ============
export const ApplicationReviewModal = ({ doc, onClose, onApprove, onReject }: { doc: any; onClose: () => void; onApprove: () => void; onReject: () => void }) => {
    const [notes, setNotes] = useState('');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showDocPreview, setShowDocPreview] = useState<string | null>(null);
    const [mainStatus, setMainStatus] = useState(doc.status);
    const [openMainStatus, setOpenMainStatus] = useState(false);

    const uploadedDocs = [
        { name: 'National ID Card (CIN)', desc: 'Government-issued identification.', status: 'Under Review', date: '2025-01-10' },
        { name: "Driver's License", desc: 'Valid and current driver\'s license.', status: 'Pending', date: '2025-01-10' },
        { name: 'Pro Driver Card / Carte Professionnelle', desc: '(If Applicable) Professional permit required for commercial drivers.', status: 'Verified', date: '2025-01-10' },
        { name: 'Vehicle Photos', desc: 'Upload clear exterior photos of your vehicle.', status: 'Updated', date: '2025-01-10' },
        { name: 'Face Verification', desc: 'Take a selfie to confirm your identity.', status: 'Under Review', date: '2025-01-10' },
        { name: 'Taxi License(Taxi Drivers Only)', desc: 'Required only if you drive a taxi.', status: 'Verified', date: '2025-01-10' },
        { name: 'Vehicle Registration (Carte Grise)', desc: 'Proof of vehicle ownership.', status: 'Updated', date: '2025-01-10' },
        { name: 'Vehicle Detail', desc: 'Add current vehicle insurance details.', status: 'Under Review', date: '2025-01-10' },
        { name: 'Vehicle Details', desc: 'Provide make, model, and plate number.', status: 'Updated', date: '2025-01-10' },
    ];

    const [docStatuses, setDocStatuses] = useState<Record<string, string>>(
        Object.fromEntries(uploadedDocs.map(d => [d.name, d.status]))
    );
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const statusOptions = ['Pending', 'Under Review', 'Verified', 'Updated', 'Rejected'];

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative' }}>
                {/* Header */}
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={24} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Driver Application Review</h2>
                    <StatusBadge status={mainStatus} />
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 28px 0' }}>Review all uploaded documents and approve or reject the application</p>

                {/* Driver Information */}
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px 0' }}>Driver Information</h3>
                <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={doc.avatar} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                            <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', borderRadius: '6px', padding: '0 4px', fontSize: '10px', fontWeight: 'bold' }}>4.8</div>
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', fontSize: '13px' }}>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Full Name</div><div style={{ fontWeight: '600' }}>{doc.driverName}</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Vehicle Type</div><div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>🚕 Taxi</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Phone</div><div style={{ fontWeight: '600' }}>+212 6 12 34 56</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Application ID</div><div style={{ fontWeight: '600' }}>REG-001</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Email</div><div style={{ fontWeight: '600' }}>Ahmedhassan@gmail.com</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Driver ID</div><div style={{ fontWeight: '600' }}>{doc.driverId}</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>City</div><div style={{ fontWeight: '600' }}>Casablanca</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Gender</div><div style={{ fontWeight: '600' }}>♂ Male</div></div>
                            <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Application Date</div><div style={{ fontWeight: '600' }}>10-01-2026</div></div>
                            <div style={{ position: 'relative' }}>
                                <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Current Status</div>
                                <button onClick={() => setOpenMainStatus(!openMainStatus)} style={{
                                    display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px',
                                    border: `1px solid ${(statusColors[mainStatus] || statusColors['Pending']).border}`,
                                    backgroundColor: (statusColors[mainStatus] || statusColors['Pending']).bg,
                                    color: (statusColors[mainStatus] || statusColors['Pending']).color,
                                    fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                                }}>
                                    {mainStatus} <ChevronDown size={12} />
                                </button>
                                {openMainStatus && (
                                    <div style={{ position: 'absolute', top: '110%', left: 0, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', zIndex: 100, minWidth: '130px', padding: '4px' }}>
                                        {statusOptions.map(s => (
                                            <div key={s} onClick={() => { setMainStatus(s); setOpenMainStatus(false); }}
                                                style={{ padding: '6px 10px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', fontWeight: mainStatus === s ? 'bold' : 'normal', backgroundColor: mainStatus === s ? '#eef7f0' : 'transparent' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = mainStatus === s ? '#eef7f0' : 'transparent'}
                                            >{s}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Selection */}
                <div style={{ backgroundColor: '#eef7f0', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '24px' }}>
                    <p style={{ fontWeight: '600', fontSize: '14px', marginBottom: '12px', margin: '0 0 12px 0' }}>Category Determines Pricing And Service Level For This Driver</p>
                    {selectedCategory && <p style={{ fontSize: '13px', color: '#2d8a46', margin: '0 0 12px 0' }}>Selected: <strong>{selectedCategory}</strong></p>}
                    <button onClick={() => setShowCategoryModal(true)} style={{
                        padding: '10px 24px', borderRadius: '24px', border: '1px solid #e5e7eb',
                        backgroundColor: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#38AC57'; e.currentTarget.style.backgroundColor = '#eef7f0'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = 'white'; }}
                    >Select Category</button>
                </div>

                {/* Vehicle Information */}
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px 0' }}>Vehicle Information</h3>
                <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', fontSize: '13px' }}>
                        <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Driver ID</div><div style={{ fontWeight: 'bold', fontSize: '16px' }}>D-00045</div></div>
                        <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Vehicle Colour</div><div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>⚪ White</div></div>
                        <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Licence Plate Num</div><div style={{ fontWeight: 'bold', fontSize: '16px' }}>8 | i | 26363</div></div>
                        <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Make & Model</div><div style={{ fontWeight: 'bold', fontSize: '16px' }}>Dacia Logan</div></div>
                        <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Year</div><div style={{ fontWeight: 'bold', fontSize: '16px' }}>2020</div></div>
                        <div><div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '2px' }}>Join Date</div><div style={{ fontWeight: '600' }}>2023-01-15</div></div>
                    </div>
                </div>

                {/* Uploaded Documents */}
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 16px 0' }}>Uploaded Documents</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                    {uploadedDocs.map(d => (
                        <div key={d.name} style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '16px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{d.name}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px', minHeight: '32px' }}>{d.desc}</div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                                {/* Status dropdown */}
                                <div style={{ position: 'relative' }}>
                                    <button onClick={() => setOpenDropdown(openDropdown === d.name ? null : d.name)} style={{
                                        display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px',
                                        border: `1px solid ${(statusColors[docStatuses[d.name]] || statusColors['Pending']).border}`,
                                        backgroundColor: (statusColors[docStatuses[d.name]] || statusColors['Pending']).bg,
                                        color: (statusColors[docStatuses[d.name]] || statusColors['Pending']).color,
                                        fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                                    }}>
                                        {docStatuses[d.name]} <ChevronDown size={12} />
                                    </button>
                                    {openDropdown === d.name && (
                                        <div style={{ position: 'absolute', top: '110%', left: 0, backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', zIndex: 10, minWidth: '130px', padding: '4px' }}>
                                            {statusOptions.map(s => (
                                                <div key={s} onClick={() => { setDocStatuses(prev => ({ ...prev, [d.name]: s })); setOpenDropdown(null); }}
                                                    style={{ padding: '6px 10px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', fontWeight: docStatuses[d.name] === s ? 'bold' : 'normal', backgroundColor: docStatuses[d.name] === s ? '#eef7f0' : 'transparent' }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = docStatuses[d.name] === s ? '#eef7f0' : 'transparent'}
                                                >{s}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => setShowDocPreview(d.name)} style={{
                                    display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px',
                                    border: '1px solid #e5e7eb', backgroundColor: 'white', fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#38AC57'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; }}
                                >
                                    <Eye size={12} /> Preview
                                </button>
                            </div>
                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>Updated on {d.date}</div>
                        </div>
                    ))}
                </div>

                {/* Internal Notes */}
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>Internal Notes</h3>
                <textarea placeholder="Add internal notes about this application (not visible to applicant)..." value={notes} onChange={e => setNotes(e.target.value)}
                    style={{ width: '100%', height: '80px', padding: '14px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', resize: 'none', fontFamily: 'inherit', fontSize: '13px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }}
                />
                <button onClick={() => alert('Notes saved!')} style={{
                    padding: '10px 24px', borderRadius: '24px', border: '1px solid #1f2937', backgroundColor: 'white',
                    fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginBottom: '24px', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; }}
                >Save Notes</button>

                {/* Approve / Reject */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => { onApprove(); onClose(); }} style={{
                        flex: 1, padding: '14px', borderRadius: '32px', border: 'none',
                        backgroundColor: '#38AC57', color: 'white', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2d8a46'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#38AC57'}
                    >Approve Application</button>
                    <button onClick={() => { onReject(); onClose(); }} style={{
                        flex: 1, padding: '14px', borderRadius: '32px', border: '2px solid #dc2626',
                        backgroundColor: 'white', color: '#dc2626', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; }}
                    >Reject Application</button>
                </div>
            </div>

            {/* Sub-modals */}
            {showCategoryModal && <SelectCategoryModal onClose={() => setShowCategoryModal(false)} onConfirm={setSelectedCategory} />}
            {showDocPreview && <DocumentPreviewModal docName={showDocPreview} onClose={() => setShowDocPreview(null)} />}
        </div>
    );
};
