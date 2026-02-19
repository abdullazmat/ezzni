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
          <div style={{ height: '200px', backgroundColor: '#22c55e', width: '100%', borderRadius: '1rem' }}></div>
          
          <div style={{ padding: '0 2rem', position: 'relative', marginTop: '-4.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
                    {/* Profile Image with Camera Icon */}
                    <div style={{ position: 'relative' }}>
                        <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                            alt="Profile" 
                            style={{ width: '140px', height: '140px', borderRadius: '50%', border: '4px solid white', objectFit: 'cover' }}
                        />
                        <button style={{ 
                            position: 'absolute', 
                            bottom: '10px', 
                            right: '10px', 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            padding: '0.5rem', 
                            border: '1px solid #e5e7eb', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <Camera size={18} />
                        </button>
                    </div>

                    {/* Name and Status */}
                    <div style={{ marginBottom: '1rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#111827' }}>Paityn Calzo</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#dcfce7', padding: '0.2rem 0.8rem', borderRadius: '1rem', width: 'fit-content' }}>
                            <span style={{ height: '8px', width: '8px', backgroundColor: '#16a34a', borderRadius: '50%' }}></span>
                            <span style={{ color: '#166534', fontSize: '0.9rem', fontWeight: '500' }}>Available ⌄</span>
                        </div>
                    </div>
                </div>

                <button style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '0.6rem 1.5rem', 
                    borderRadius: '2rem', 
                    border: '1px solid #e5e7eb', 
                    backgroundColor: 'white', 
                    fontWeight: '500', 
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#374151',
                    marginBottom: '1rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ backgroundColor: '#22c55e', color: 'white', borderRadius: '50%', padding: '4px', display: 'flex' }}><LogOut size={14} /></div>
                    Log Out
                </button>
              </div>
          </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0 2rem' }} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', padding: '0 2rem', overflowX: 'auto' }}>
          {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                    background: activeTab === tab.id ? '#22c55e' : 'transparent', 
                    color: activeTab === tab.id ? 'white' : '#4b5563', 
                    border: 'none', 
                    padding: '0.7rem 1.5rem', 
                    borderRadius: '2rem', 
                    cursor: 'pointer', 
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    fontSize: '0.9rem'
                }}
              >
                  {tab.label}
              </button>
          ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '0 2rem 2rem 2rem' }}>
          {activeTab === 'edit-profile' && <EditProfileForm />}
          {activeTab === 'change-password' && <ChangePasswordForm />}
          {activeTab === 'login-history' && <LoginHistory />}
          {activeTab === 'language-timezone' && <LanguageTimezone />}
          {activeTab === 'privacy-policy' && <div className="card">Privacy Policy Content Placeholder</div>}
          {activeTab === 'terms-of-service' && <div className="card">Terms of Service Content Placeholder</div>}
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
                        style={{ ...inputStyle, border: '1px solid #22c55e', backgroundColor: 'white' }} 
                    />
                </div>
                
                {/* Location & Timezone Split */}
                <div>
                     <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Location & Time Zone</label>
                     <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="text" defaultValue="Hybrid · San Francisco HQ" style={inputStyle} />
                        <input type="text" defaultValue="Time Zone" style={inputStyle} />
                     </div>
                </div>

                {/* Phone No */}
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Phone No</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb', padding: '0 0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '0.5rem', borderRight: '1px solid #e5e7eb', padding: '0.8rem' }}>
                            <span style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
                            <span style={{ fontSize: '0.9rem' }}>+212 ⌄</span>
                        </div>
                        <input type="text" defaultValue="605884449" style={{ ...inputStyle, border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }} />
                    </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <FormGroup label="On Boarding Date" value="14-02-2026" />
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button type="submit" style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
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
    
    return (
        <form style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>Current Password</h3>
                <div style={{ position: 'relative' }}>
                    <input 
                        type={showCurrent ? "text" : "password"} 
                        placeholder="Enter Your Current Password" 
                        style={{ ...inputStyle, borderRadius: '0.5rem', border: '1px solid #000', backgroundColor: 'white' }} 
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowCurrent(!showCurrent)}
                        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {showCurrent ? <Eye size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>New Password</h3>
                <div style={{ position: 'relative' }}>
                    <input 
                        type={showNew ? "text" : "password"} 
                        placeholder="Enter Your New Password" 
                        style={{ ...inputStyle, borderRadius: '0.5rem', border: '1px solid #000', backgroundColor: 'white' }} 
                    />
                    <button 
                         type="button" 
                         onClick={() => setShowNew(!showNew)}
                         style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {showNew ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>
            </div>

            <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>Confirm Password</h3>
                <div style={{ position: 'relative' }}>
                    <input 
                        type={showConfirm ? "text" : "password"} 
                        placeholder="Confirm Your New Password" 
                        style={{ ...inputStyle, borderRadius: '0.5rem', border: '1px solid #000', backgroundColor: 'white' }} 
                    />
                    <button 
                         type="button" 
                         onClick={() => setShowConfirm(!showConfirm)}
                         style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
                 <button type="submit" style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
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
                        <tr style={{ backgroundColor: '#22c55e', color: 'white', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', fontWeight: '600' }}>ID</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Member</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Role</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Last Login</th>
                            <th style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', fontWeight: '600' }}>Last Logout</th>
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
                                    <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: '600' }}>{row.role}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                     <span style={{ 
                                         backgroundColor: row.status === 'Active' ? '#dcfce7' : '#f3f4f6', 
                                         color: row.status === 'Active' ? '#166534' : '#4b5563', 
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
                            border: `1px solid ${selectedLang === lang.name ? '#22c55e' : '#e5e7eb'}`, 
                            borderRadius: '0.75rem', 
                            cursor: 'pointer',
                            backgroundColor: selectedLang === lang.name ? '#f0fdf4' : 'white',
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
                             {selectedLang === lang.name && <span style={{ marginRight: '1rem', fontSize: '0.8rem', color: '#166534', backgroundColor: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '500' }}>current</span>}
                             <div style={{ 
                                 width: '20px', 
                                 height: '20px', 
                                 borderRadius: '50%', 
                                 border: `2px solid ${selectedLang === lang.name ? '#22c55e' : '#d1d5db'}`,
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center'
                             }}>
                                 {selectedLang === lang.name && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>}
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
                <button style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
                    Save Changes
                </button>
            </div>
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
