import { useState } from 'react';
import { Camera, LogOut, Eye, EyeOff, CheckCircle } from 'lucide-react';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');

  const tabs = [
    { id: 'login-history', label: 'Login History' },
    { id: 'language-timezone', label: 'Language & Timezone' },
    { id: 'change-password', label: 'Change Password' },
    { id: 'edit-profile', label: 'Edit Profile' },
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'terms-of-service', label: 'Terms of Service' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Profile Section */}
      <div className="card" style={{ padding: 0, overflow: 'visible', position: 'relative', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
          {/* Cover Image */}
          <div style={{ height: '200px', backgroundColor: '#38AC57', width: '100%', borderRadius: '1rem' }}></div>
          
          <div style={{ padding: '0 2rem', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {/* Profile Image with Camera Icon */}
                    <div style={{ position: 'relative' }}>
                        <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                            alt="Profile" 
                            style={{ width: '160px', height: '160px', borderRadius: '50%', border: '6px solid white', objectFit: 'cover' }}
                        />
                        <button style={{ 
                            position: 'absolute', 
                            bottom: '10px', 
                            right: '10px', 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            padding: '0.6rem', 
                            border: '1px solid #e5e7eb', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <Camera size={20} />
                        </button>
                    </div>

                    {/* Name and Status */}
                    <div style={{ marginTop: '4rem' }}>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#111827' }}>Paityn Calzo</h1>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.6rem', 
                            backgroundColor: '#eef7f0', 
                            padding: '0.4rem 1rem', 
                            borderRadius: '2rem', 
                            width: 'fit-content',
                            cursor: 'pointer',
                            border: '1px solid #eef7f0'
                        }}>
                            <span style={{ height: '10px', width: '10px', backgroundColor: '#38AC57', borderRadius: '50%' }}></span>
                            <span style={{ color: '#2d8a46', fontSize: '1rem', fontWeight: '700' }}>Available ⌄</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <button style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem', 
                        padding: '0.7rem 1.8rem', 
                        borderRadius: '2.5rem', 
                        border: '1px solid #e5e7eb', 
                        backgroundColor: 'white', 
                        fontWeight: '700', 
                        cursor: 'pointer',
                        fontSize: '1rem',
                        color: '#374151',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ backgroundColor: '#38AC57', color: 'white', borderRadius: '50%', padding: '5px', display: 'flex' }}>
                            <LogOut size={16} strokeWidth={3} />
                        </div>
                        Log Out
                    </button>
                </div>
              </div>
          </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0 2rem' }} />

      {/* Tabs Container */}
      <div style={{ padding: '0 2rem' }}>
          <div className="card" style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              padding: '0.5rem', 
              overflowX: 'auto', 
              borderRadius: '3rem', 
              backgroundColor: 'white',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              border: '1px solid #f1f5f9'
          }}>
              {tabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{ 
                        background: activeTab === tab.id ? '#38AC57' : 'transparent', 
                        color: activeTab === tab.id ? 'white' : '#64748b', 
                        border: 'none', 
                        padding: '0.8rem 2rem', 
                        borderRadius: '2.5rem', 
                        cursor: 'pointer', 
                        fontWeight: '700',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem'
                    }}
                  >
                      {tab.label}
                  </button>
              ))}
          </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '0 2rem 2rem 2rem' }}>
          {activeTab === 'edit-profile' && <EditProfileForm />}
          {activeTab === 'change-password' && <ChangePasswordForm />}
          {activeTab === 'login-history' && <LoginHistory />}
          {activeTab === 'language-timezone' && <LanguageTimezone />}
          {activeTab === 'privacy-policy' && (
              <div className="card" style={{ padding: '2rem', lineHeight: '1.6' }}>
                  <h2 style={{ marginBottom: '1.5rem', color: '#111827' }}>Privacy Policy</h2>
                  <p>Welcome to Ezzni. Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
                  <h3 style={{ marginTop: '1.5rem', color: '#374151' }}>1. Information We Collect</h3>
                  <p>We collect information such as your name, contact details, location data for ride-sharing features, and payment information to provide our services.</p>
                  <h3 style={{ marginTop: '1.5rem', color: '#374151' }}>2. How We Use Data</h3>
                  <p>Data is used to facilitate ride assignments, process payments, and improve platform security for both drivers and riders.</p>
                  <h3 style={{ marginTop: '1.5rem', color: '#374151' }}>3. Data Sharing</h3>
                  <p>We only share data with third-party partners as required to complete service transactions or as mandated by law.</p>
              </div>
          )}
          {activeTab === 'terms-of-service' && (
            <div className="card" style={{ padding: '2rem', lineHeight: '1.6' }}>
                <h2 style={{ marginBottom: '1.5rem', color: '#111827' }}>Terms of Service</h2>
                <p>By using Ezzni, you agree to the following terms and conditions.</p>
                <h3 style={{ marginTop: '1.5rem', color: '#374151' }}>1. User Responsibilities</h3>
                <p>Users must provide accurate information and maintain the security of their accounts. Misuse of the platform may lead to suspension.</p>
                <h3 style={{ marginTop: '1.5rem', color: '#374151' }}>2. Service Availability</h3>
                <p>Ezzni strives to maintain high availability but does not guarantee uninterrupted service due to maintenance or third-party issues.</p>
                <h3 style={{ marginTop: '1.5rem', color: '#374151' }}>3. Liability</h3>
                <p>Ezzni is a platform connecting riders and drivers. While we vet our partners, we are not liable for individual conduct outside of platform mediated safety protocols.</p>
            </div>
          )}
      </div>

    </div>
  );
};

const EditProfileForm = () => {
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }}>
                <FormGroup label="Full Name" value="Paityn Calzo" />
                <FormGroup label="Department" value="Product Design" />
                <FormGroup label="Direct Manager" value="Michael Torres" />
                <FormGroup label="Employee ID" value="ID01" />
                <FormGroup label="Job Title" value="Developer" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#1f2937' }}>Email</label>
                    <input 
                        type="text" 
                        defaultValue="your@mail.com" 
                        style={{ ...inputStyle, border: '1px solid #38AC57', backgroundColor: 'white' }} 
                    />
                </div>
                
                {/* Location & Timezone Split */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', color: '#374151' }}>Location & Time Zone</label>
                     <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '2', minWidth: '200px' }}>
                             <input type="text" defaultValue="Hybrid · San Francisco HQ" style={inputStyle} />
                        </div>
                        <div style={{ flex: '1', minWidth: '150px' }}>
                             <TimezoneSelect />
                        </div>
                     </div>
                </div>

                {/* Phone No */}
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Phone No</label>
                    <PhoneInput />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <FormGroup label="On Boarding Date" value="14-02-2026" />
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button type="submit" style={{ backgroundColor: '#38AC57', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
                    Update Profile
                </button>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div style={{ 
                    position: 'fixed', 
                    bottom: '2rem', 
                    right: '2rem', 
                    backgroundColor: 'white', 
                    color: '#374151', 
                    padding: '1rem 2rem', 
                    borderRadius: '3rem', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    border: '1px solid #e5e7eb',
                    zIndex: 1000
                }}>
                    <div style={{ backgroundColor: 'black', borderRadius: '50%', padding: '2px', display: 'flex' }}>
                         <CheckCircle size={16} color="white" />
                    </div>
                    <span style={{ fontWeight: '500' }}>Profile updated successfully</span>
                </div>
            )}
        </form>
    );
};

const ChangePasswordForm = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorType, setErrorType] = useState<'none' | 'incorrect' | 'mismatch'>('none');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Reset or simulate
        setErrorType('none');
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#111827' }}>Current Password</h3>
                <div style={{ position: 'relative' }}>
                    <input 
                        type={showCurrent ? "text" : "password"} 
                        placeholder="Enter Your Current Password" 
                        style={{ ...inputStyle, borderRadius: '0.75rem', border: errorType === 'incorrect' ? '1px solid #ef4444' : '1px solid #e5e7eb', backgroundColor: 'white' }} 
                        onChange={() => errorType === 'incorrect' && setErrorType('none')}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowCurrent(!showCurrent)}
                        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <Eye size={20} color="#64748b" />
                    </button>
                </div>
                {errorType === 'incorrect' && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '500' }}>Current password is incorrect. Please try again</div>}
            </div>

            <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#111827' }}>New Password</h3>
                <div style={{ position: 'relative' }}>
                    <input 
                        type={showNew ? "text" : "password"} 
                        placeholder="Enter Your New Password" 
                        style={{ ...inputStyle, borderRadius: '0.75rem', border: '1px solid #111827', backgroundColor: 'white' }} 
                    />
                    <button 
                         type="button" 
                         onClick={() => setShowNew(!showNew)}
                         style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {showNew ? <Eye size={20} color="#64748b" /> : <EyeOff size={20} color="#64748b" />}
                    </button>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#111827' }}>Confirm Password</h3>
                <div style={{ position: 'relative' }}>
                    <input 
                        type={showConfirm ? "text" : "password"} 
                        placeholder="Confirm Your New Password" 
                        style={{ ...inputStyle, borderRadius: '0.75rem', border: errorType === 'mismatch' ? '1px solid #ef4444' : '1px solid #e5e7eb', backgroundColor: 'white' }} 
                        onChange={() => errorType === 'mismatch' && setErrorType('none')}
                    />
                    <button 
                         type="button" 
                         onClick={() => setShowConfirm(!showConfirm)}
                         style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {showConfirm ? <Eye size={20} color="#64748b" /> : <EyeOff size={20} color="#64748b" />}
                    </button>
                </div>
                {errorType === 'mismatch' && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '500' }}>New passwords do not match</div>}
            </div>

            <div style={{ marginTop: '1rem' }}>
                 <button type="submit" style={{ backgroundColor: '#38AC57', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
                    Update Password
                </button>
            </div>
        </form>
    );
}

const LoginHistory = () => {
    const historyData = [
        { id: '1', displayId: 'ID-001', member: { name: 'Ahmed El Mansouri', email: 'ahmed.mansouri@hezzni.ma', img: 'https://i.pravatar.cc/150?u=12' }, role: 'Developer', status: 'Active', lastLogin: '2026-01-30 02:35 PM', lastLogout: '2026-01-30 05:35 PM' },
        { id: '2', displayId: 'ID-002', member: { name: 'Fatima Zahra', email: 'fatima.zahra@hezzni.ma', img: 'https://i.pravatar.cc/150?u=13' }, role: 'Developer', status: 'Active', lastLogin: '2026-01-30 02:35 PM', lastLogout: '2026-01-30 05:35 PM' },
        { id: '3', displayId: 'ID-003', member: { name: 'Youssef Benali', email: 'youssef.benali@hezzni.ma', img: 'https://i.pravatar.cc/150?u=14' }, role: 'Developer', status: 'Active', lastLogin: '2026-01-30 02:35 PM', lastLogout: '2026-01-30 05:35 PM' },
        { id: '4', displayId: 'ID-004', member: { name: 'Sara Alami', email: 'sara.alami@hezzni.ma', img: 'https://i.pravatar.cc/150?u=15' }, role: 'Developer', status: 'Active', lastLogin: '2026-01-30 02:35 PM', lastLogout: '2026-01-30 05:35 PM' },
        { id: '5', displayId: 'ID-005', member: { name: 'Omar Idrissi', email: 'omar.idrissi@hezzni.ma', img: 'https://i.pravatar.cc/150?u=16' }, role: 'Developer', status: 'Inactive', lastLogin: '2026-01-30 02:35 PM', lastLogout: '2026-01-30 05:35 PM' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Team Management</h3>
                <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>View your recent account activity</p>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.8rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#38AC57', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '1.25rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', fontWeight: '800', fontSize: '1rem' }}>ID</th>
                            <th style={{ padding: '1.25rem', fontWeight: '800', fontSize: '1rem' }}>Member</th>
                            <th style={{ padding: '1.25rem', fontWeight: '800', fontSize: '1rem' }}>Role</th>
                            <th style={{ padding: '1.25rem', fontWeight: '800', fontSize: '1rem' }}>Status</th>
                            <th style={{ padding: '1.25rem', fontWeight: '800', fontSize: '1rem' }}>Last Login</th>
                            <th style={{ padding: '1.25rem', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem', fontWeight: '800', fontSize: '1rem' }}>Last Logout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((row) => (
                            <tr key={row.id} style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                <td style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', fontWeight: '500' }}>{row.displayId}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <img src={row.member.img} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#111827' }}>{row.member.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{row.member.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ backgroundColor: '#eef7f0', color: '#2d8a46', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: '600' }}>{row.role}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                     <span style={{ 
                                         backgroundColor: row.status === 'Active' ? '#eef7f0' : '#f3f4f6', 
                                         color: row.status === 'Active' ? '#2d8a46' : '#4b5563', 
                                         padding: '0.3rem 0.8rem', 
                                         borderRadius: '1rem', 
                                         fontSize: '0.8rem', 
                                         fontWeight: '600' 
                                     }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                                        <div>{row.lastLogin.split(' ')[0]}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{row.lastLogin.split(' ').slice(1).join(' ')}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                                        <div>{row.lastLogout.split(' ')[0]}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{row.lastLogout.split(' ').slice(1).join(' ')}</div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const LanguageTimezone = () => {
    const [selectedLang, setSelectedLang] = useState('English');
    const languages = [
        { code: 'EN', name: 'English', region: 'English (US)' },
        { code: 'AR', name: 'Arabic', region: 'العربية' },
        { code: 'FR', name: 'French', region: 'Français' },
    ];

    return (
        <div style={{ }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#374151' }}>Available Languages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {languages.map(lang => (
                    <label 
                        key={lang.code}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            padding: '1rem 1.5rem', 
                            border: `1px solid ${selectedLang === lang.name ? '#38AC57' : '#e5e7eb'}`, 
                            borderRadius: '0.75rem', 
                            cursor: 'pointer',
                            backgroundColor: selectedLang === lang.name ? '#eef7f0' : 'white',
                            transition: 'all 0.2s',
                            boxShadow: selectedLang === lang.name ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                backgroundColor: '#f3f4f6', 
                                borderRadius: '0.5rem', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: '#4b5563'
                            }}>
                                {lang.code}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: '#111827', marginBottom: '0.2rem' }}>{lang.name}</div>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{lang.region}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                             {selectedLang === lang.name && <span style={{ marginRight: '1rem', fontSize: '0.8rem', color: '#2d8a46', backgroundColor: '#eef7f0', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '500' }}>current</span>}
                             <div style={{ 
                                 width: '20px', 
                                 height: '20px', 
                                 borderRadius: '50%', 
                                 border: `2px solid ${selectedLang === lang.name ? '#38AC57' : '#d1d5db'}`,
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center'
                             }}>
                                 {selectedLang === lang.name && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38AC57' }}></div>}
                             </div>
                             <input 
                                type="radio" 
                                name="language" 
                                checked={selectedLang === lang.name} 
                                onChange={() => setSelectedLang(lang.name)}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </label>
                ))}
            </div>
             <div style={{ marginTop: '2rem' }}>
                <button style={{ backgroundColor: '#38AC57', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const PhoneInput = () => {
    const [phoneNumber, setPhoneNumber] = useState('605884449');
    const [selectedCountry, setSelectedCountry] = useState({ code: '+212', flag: '🇲🇦', name: 'Morocco' });
    const [showDropdown, setShowDropdown] = useState(false);

    const countries = [
        { code: '+212', flag: '🇲🇦', name: 'Morocco' },
        { code: '+1', flag: '🇺🇸', name: 'USA' },
        { code: '+33', flag: '🇫🇷', name: 'France' },
        { code: '+44', flag: '🇬🇧', name: 'UK' },
        { code: '+971', flag: '🇦🇪', name: 'UAE' },
        { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
        { code: '+20', flag: '🇪🇬', name: 'Egypt' },
        { code: '+91', flag: '🇮🇳', name: 'India' },
        { code: '+49', flag: '🇩🇪', name: 'Germany' },
        { code: '+34', flag: '🇪🇸', name: 'Spain' },
        { code: '+39', flag: '🇮🇹', name: 'Italy' },
        { code: '+81', flag: '🇯🇵', name: 'Japan' },
        { code: '+86', flag: '🇨🇳', name: 'China' },
        { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    ];

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPhoneNumber(val);
        
        // Auto-detect based on prefix
        const detect = countries.find(c => val.startsWith(c.code.replace('+', '')) || val.startsWith(c.code));
        if (detect) {
            setSelectedCountry(detect);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb', padding: '0 0.5rem' }}>
                <div 
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '0.5rem', borderRight: '1px solid #e5e7eb', padding: '0.8rem', cursor: 'pointer' }}
                >
                    <span style={{ fontSize: '1.2rem' }}>{selectedCountry.flag}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{selectedCountry.code} ⌄</span>
                </div>
                <input 
                    type="text" 
                    value={phoneNumber} 
                    onChange={handlePhoneChange}
                    style={{ ...inputStyle, border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }} 
                />
            </div>

            {showDropdown && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '200px',
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    border: '1px solid #f1f5f9',
                    zIndex: 100,
                    maxHeight: '200px',
                    overflowY: 'auto'
                }}>
                    {countries.map(c => (
                        <div 
                            key={c.code} 
                            onClick={() => { setSelectedCountry(c); setShowDropdown(false); }}
                            style={{ padding: '0.8rem 1rem', cursor: 'pointer', display: 'flex', gap: '0.8rem', borderBottom: '1px solid #f8fafc' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eef7f0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <span>{c.flag}</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{c.name} ({c.code})</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TimezoneSelect = () => {
    const [selected, setSelected] = useState('(GMT-08:00) Pacific Time');
    const [show, setShow] = useState(false);

    const timezones = [
        '(GMT-12:00) International Date Line West',
        '(GMT-11:00) Midway Island, Samoa',
        '(GMT-10:00) Hawaii',
        '(GMT-09:00) Alaska',
        '(GMT-08:00) Pacific Time',
        '(GMT-07:00) Mountain Time',
        '(GMT-06:00) Central Time',
        '(GMT-05:00) Eastern Time',
        '(GMT-04:00) Atlantic Time',
        '(GMT-03:00) Brasilia',
        '(GMT+00:00) UTC / Greenwich Mean Time',
        '(GMT+01:00) Paris, Casablanca, Berlin',
        '(GMT+02:00) Cairo, Johannesburg',
        '(GMT+03:00) Moscow, Nairobi, Riyadh',
        '(GMT+04:00) Abu Dhabi, Muscat',
        '(GMT+05:30) Mumbai, New Delhi',
        '(GMT+08:00) Beijing, Perth, Singapore',
        '(GMT+09:00) Tokyo, Seoul',
        '(GMT+10:00) Sydney, Melbourne',
    ];

    return (
        <div style={{ position: 'relative' }}>
            <div 
                onClick={() => setShow(!show)}
                style={{ ...inputStyle, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected}</span>
                <span>⌄</span>
            </div>
            {show && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '300px',
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    border: '1px solid #f1f5f9',
                    zIndex: 100,
                    maxHeight: '250px',
                    overflowY: 'auto'
                }}>
                    {timezones.map(tz => (
                        <div 
                            key={tz} 
                            onClick={() => { setSelected(tz); setShow(false); }}
                            style={{ padding: '0.8rem 1rem', cursor: 'pointer', fontSize: '0.875rem' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eef7f0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {tz}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const inputStyle = {
    width: '100%', 
    padding: '1rem', 
    borderRadius: '0.5rem', 
    border: '1px solid #e5e7eb', 
    backgroundColor: '#f9fafb',
    color: '#374151',
    fontSize: '0.95rem',
    outline: 'none'
};

const FormGroup = ({ label, value }: { label: string; value: string }) => (
    <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>{label}</label>
        <input 
            type="text" 
            defaultValue={value} 
            style={inputStyle} 
        />
    </div>
);
