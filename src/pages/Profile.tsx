import { useState, useEffect, useRef } from 'react';
import { Camera, LogOut, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import { 
  AdminProfile,
  EmploymentDetails,
  getAdminProfileApi, 
  getEmploymentDetailsApi,
  getPrivacyPolicyApi,
  getTeamMembersApi,
  getTermsOfServiceApi,
  TeamMember,
  updateAdminLanguageApi,
  updateAdminProfileApi,
  updateAdminStatusApi, 
  updateEmploymentDetailsApi
} from '../services/api';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAdminProfileApi();
      if (response.ok) {
        setProfile(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    if (!profile || statusLoading) return;
    const newStatus = profile.status === 'Available' ? 'Inactive' : 'Available';
    setStatusLoading(true);
    try {
      const response = await updateAdminStatusApi(newStatus);
      if (response.ok) {
        setProfile({ ...profile, status: newStatus });
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('role', profile.role);

    try {
      const response = await updateAdminProfileApi(formData);
      if (response.ok) {
        // Refresh profile to get new avatar URL
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update avatar', err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 className="animate-spin" size={48} color="#38AC57" />
      </div>
    );
  }

  const avatarUrl = profile?.avatar 
    ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/avatars/${profile.avatar}`
    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";


  const tabs = [
    { id: 'login-history', label: 'Login History' },
    { id: 'language-timezone', label: 'Language & Timezone' },
    { id: 'change-password', label: 'Change Password' },
    { id: 'edit-profile', label: 'Edit Profile' },
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'terms-of-service', label: 'Terms of Service' },
  ];

  return (
    <div className="profile-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
           .profile-header-content {
             flex-direction: column !important;
             align-items: center !important;
             text-align: center;
           }
           .profile-info-main {
             flex-direction: column !important;
             gap: 1rem !important;
             margin-top: -3rem !important;
           }
           .profile-name-status {
             margin-top: 1rem !important;
           }
           .logout-btn-wrapper {
             margin-top: 1.5rem !important;
             width: 100%;
             display: flex;
             justify-content: center;
           }
           .profile-tabs-wrapper {
             padding: 0 1rem !important;
           }
           .profile-content-wrapper {
             padding: 0 1rem 2rem 1rem !important;
           }
        }
        @media (max-width: 640px) {
           .profile-img {
             width: 120px !important;
             height: 120px !important;
           }
           .profile-name-status h1 {
             font-size: 1.75rem !important;
           }
           .profile-tabs-container {
             border-radius: 1.5rem !important;
           }
           .profile-tabs-container button {
             padding: 0.6rem 1.25rem !important;
             font-size: 0.9rem !important;
           }
           .edit-profile-grid {
             grid-template-columns: 1fr !important;
             gap: 1.25rem !important;
           }
           .location-timezone-flex {
             flex-direction: column !important;
           }
           .location-input-wrapper, .timezone-input-wrapper {
             flex: 1 !important;
             width: 100% !important;
             min-width: 0 !important;
           }
           .profile-header-outer {
             padding: 0 1rem !important;
           }
           .profile-cover {
             height: 150px !important;
           }
        }
      `}} />
      
      {/* Header Profile Section */}
      <div className="card" style={{ padding: 0, overflow: 'visible', position: 'relative', border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}>
          {/* Cover Image */}
          <div className="profile-cover" style={{ height: '200px', backgroundColor: '#38AC57', width: '100%', borderRadius: '1rem' }}></div>
          
          <div className="profile-header-outer" style={{ padding: '0 2rem', position: 'relative' }}>
              <div className="profile-header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-4rem' }}>
                <div className="profile-info-main" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {/* Profile Image with Camera Icon */}
                    <div style={{ position: 'relative' }}>
                        <img 
                            src={avatarUrl} 
                            alt="Profile" 
                            className="profile-img"
                            style={{ width: '160px', height: '160px', borderRadius: '50%', border: '6px solid white', objectFit: 'cover', cursor: 'pointer' }}
                            onClick={handleAvatarClick}
                        />
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange} 
                          style={{ display: 'none' }} 
                          accept="image/*"
                        />
                        <button 
                          onClick={handleAvatarClick}
                          style={{ 
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
                    <div className="profile-name-status" style={{ marginTop: '4rem' }}>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: '#111827' }}>{profile?.name}</h1>
                        <div 
                          onClick={handleStatusToggle}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.6rem', 
                            backgroundColor: profile?.status === 'Available' ? '#eef7f0' : '#fef2f2', 
                            padding: '0.4rem 1rem', 
                            borderRadius: '2rem', 
                            width: 'fit-content',
                            cursor: statusLoading ? 'not-allowed' : 'pointer',
                            border: profile?.status === 'Available' ? '1px solid #eef7f0' : '1px solid #fecaca',
                            margin: '0 auto',
                            opacity: statusLoading ? 0.7 : 1
                        }}>
                            <span style={{ height: '10px', width: '10px', backgroundColor: profile?.status === 'Available' ? '#38AC57' : '#dc2626', borderRadius: '50%' }}></span>
                            <span style={{ color: profile?.status === 'Available' ? '#2d8a46' : '#dc2626', fontSize: '1rem', fontWeight: '700' }}>
                              {profile?.status} {statusLoading ? '...' : '⌄'}
                            </span>
                        </div>
                    </div>
                </div>
 
                <div className="logout-btn-wrapper" style={{ marginTop: '4rem' }}>
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
      <div className="profile-tabs-wrapper" style={{ padding: '0 2rem' }}>
          <div className="profile-tabs-container card" style={{ 
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
      <div className="profile-content-wrapper" style={{ padding: '0 2rem 2rem 2rem' }}>
           {activeTab === 'edit-profile' && <EditProfileForm initialProfile={profile} onUpdate={() => fetchData()} />}
          {activeTab === 'change-password' && <ChangePasswordForm />}
          {activeTab === 'login-history' && <TeamManagement />}
          {activeTab === 'language-timezone' && <LanguageTimezone initialLanguage={profile?.language} onUpdate={fetchData} />}
          {activeTab === 'privacy-policy' && <PolicyContent type="privacy" />}
          {activeTab === 'terms-of-service' && <PolicyContent type="terms" />}
      </div>

    </div>
  );
};

const EditProfileForm = ({ initialProfile, onUpdate }: { initialProfile: AdminProfile | null; onUpdate: () => void }) => {
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [empDetails, setEmpDetails] = useState<EmploymentDetails | null>(null);
    const [empLoading, setEmpLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: initialProfile?.name || '',
        email: initialProfile?.email || '',
        role: initialProfile?.role || 'Admin'
    });

    useEffect(() => {
        fetchEmploymentDetails();
    }, []);

    const fetchEmploymentDetails = async () => {
        setEmpLoading(true);
        try {
            const response = await getEmploymentDetailsApi();
            if (response.ok) {
                setEmpDetails(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch employment details', err);
        } finally {
            setEmpLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Update basic profile
            const profileFormData = new FormData();
            profileFormData.append('name', formData.name);
            profileFormData.append('email', formData.email);
            profileFormData.append('role', formData.role);

            const pResponse = await updateAdminProfileApi(profileFormData);
            
            // Update employment details
            if (empDetails) {
                await updateEmploymentDetailsApi(empDetails);
            }

            if (pResponse.ok) {
                setShowToast(true);
                onUpdate();
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (err) {
            console.error('Failed to update profile', err);
        } finally {
            setLoading(false);
        }
    };

    if (empLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}><Loader2 className="animate-spin" size={32} color="#38AC57" /></div>;
    }

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <div className="edit-profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem' }}>
                <div>
                   <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Full Name</label>
                   <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={inputStyle} 
                   />
                </div>
                <div>
                   <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Department</label>
                   <input 
                      type="text" 
                      value={empDetails?.department || ''} 
                      onChange={(e) => setEmpDetails(empDetails ? {...empDetails, department: e.target.value} : null)}
                      style={inputStyle} 
                   />
                </div>
                <div>
                   <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Direct Manager</label>
                   <input 
                      type="text" 
                      value={empDetails?.manager || ''} 
                      onChange={(e) => setEmpDetails(empDetails ? {...empDetails, manager: e.target.value} : null)}
                      style={inputStyle} 
                   />
                </div>
                <FormGroup label="Employee ID" value={`ID-${initialProfile?.id}`} disabled />
                <div>
                   <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Job Title</label>
                   <input 
                      type="text" 
                      value={empDetails?.jobTitle || ''} 
                      onChange={(e) => setEmpDetails(empDetails ? {...empDetails, jobTitle: e.target.value} : null)}
                      style={inputStyle} 
                   />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#1f2937' }}>Email</label>
                    <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        style={{ ...inputStyle, border: '1px solid #38AC57', backgroundColor: 'white' }} 
                    />
                </div>
                
                {/* Location & Timezone Split */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', color: '#374151' }}>Location & Time Zone</label>
                     <div className="location-timezone-flex" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div className="location-input-wrapper" style={{ flex: '2', minWidth: '200px' }}>
                             <input 
                                type="text" 
                                value={empDetails?.location || ''} 
                                onChange={(e) => setEmpDetails(empDetails ? {...empDetails, location: e.target.value} : null)}
                                style={inputStyle} 
                             />
                        </div>
                        <div className="timezone-input-wrapper" style={{ flex: '1', minWidth: '150px' }}>
                             <TimezoneSelect 
                                value={empDetails?.timezone || ''} 
                                onChange={(val) => setEmpDetails(empDetails ? {...empDetails, timezone: val} : null)} 
                             />
                        </div>
                     </div>
                </div>

                {/* Phone No */}
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>Phone No</label>
                    <PhoneInput 
                        value={empDetails?.phone || ''} 
                        onChange={(val) => setEmpDetails(empDetails ? {...empDetails, phone: val} : null)} 
                    />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>On Boarding Date</label>
                    <input 
                        type="date" 
                        value={empDetails?.onboardingDate ? new Date(empDetails.onboardingDate).toISOString().split('T')[0] : ''} 
                        onChange={(e) => setEmpDetails(empDetails ? {...empDetails, onboardingDate: e.target.value} : null)}
                        style={inputStyle} 
                    />
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button type="submit" disabled={loading} style={{ backgroundColor: '#38AC57', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Updating...' : 'Update Profile'}
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
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorType, setErrorType] = useState<'none' | 'incorrect' | 'mismatch'>('none');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorType('none');
        setErrorMessage('');

        // Client-side validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorMessage('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorType('mismatch');
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage('New password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            const { changePasswordApi } = await import('../services/api');
            const result = await changePasswordApi({
                currentPassword,
                newPassword,
                confirmPassword,
            });

            if (!result.ok) {
                const msg = result.data?.message || 'Failed to change password.';
                // Check if server says current password is wrong
                if (result.status === 401 || msg.toLowerCase().includes('current') || msg.toLowerCase().includes('incorrect')) {
                    setErrorType('incorrect');
                } else {
                    setErrorMessage(msg);
                }
                return;
            }

            // Success
            setShowSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An error occurred. Please try again.';
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
             {errorMessage && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.875rem', fontWeight: '500' }}>
                    {errorMessage}
                </div>
             )}

             <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#111827' }}>Current Password</h3>
                <div style={{ position: 'relative' }}>
                    <input 
                        type={showCurrent ? "text" : "password"} 
                        placeholder="Enter Your Current Password" 
                        value={currentPassword}
                        onChange={(e) => { setCurrentPassword(e.target.value); errorType === 'incorrect' && setErrorType('none'); }}
                        style={{ ...inputStyle, borderRadius: '0.75rem', border: errorType === 'incorrect' ? '1px solid #ef4444' : '1px solid #e5e7eb', backgroundColor: 'white' }} 
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); errorType === 'mismatch' && setErrorType('none'); }}
                        style={{ ...inputStyle, borderRadius: '0.75rem', border: errorType === 'mismatch' ? '1px solid #ef4444' : '1px solid #e5e7eb', backgroundColor: 'white' }} 
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
                 <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{ 
                        backgroundColor: '#38AC57', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.8rem 2rem', 
                        borderRadius: '2rem', 
                        cursor: isLoading ? 'not-allowed' : 'pointer', 
                        fontWeight: '600', 
                        fontSize: '1rem',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'all 0.2s'
                    }}
                >
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </div>

            {/* Success Toast */}
            {showSuccess && (
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
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <div style={{ backgroundColor: 'black', borderRadius: '50%', padding: '2px', display: 'flex' }}>
                         <CheckCircle size={16} color="white" />
                    </div>
                    <span style={{ fontWeight: '500' }}>Password changed successfully</span>
                </div>
            )}
        </form>
    );
}

const TeamManagement = () => {
    const [teamData, setTeamData] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await getTeamMembersApi();
                if (response.ok) {
                    setTeamData(response.data);
                }
            } catch (err) {
                console.error('Failed to fetch team members', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}><Loader2 className="animate-spin" size={32} color="#38AC57" /></div>;

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>Team Management</h3>
                <p style={{ margin: '0.2rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>View and manage your team members</p>
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
                        {teamData.map((row) => (
                            <tr key={row.id} style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                <td style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', fontWeight: '500' }}>#{row.id}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <img 
                                           src={row.avatar ? `${API_URL}/uploads/avatars/${row.avatar}` : `https://i.pravatar.cc/150?u=${row.id}`} 
                                           alt="" 
                                           style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#111827' }}>{row.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{row.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ backgroundColor: '#eef7f0', color: '#2d8a46', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: '600' }}>{row.role}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                     <span style={{ 
                                         backgroundColor: row.status === 'Available' ? '#eef7f0' : '#f3f4f6', 
                                         color: row.status === 'Available' ? '#2d8a46' : '#4b5563', 
                                         padding: '0.3rem 0.8rem', 
                                         borderRadius: '1rem', 
                                         fontSize: '0.8rem', 
                                         fontWeight: '600' 
                                     }}>
                                        {row.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {row.last_login ? (
                                        <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                                            <div>{new Date(row.last_login).toLocaleDateString()}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{new Date(row.last_login).toLocaleTimeString()}</div>
                                        </div>
                                    ) : 'Never'}
                                </td>
                                <td style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                                    {row.last_logout ? (
                                        <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                                            <div>{new Date(row.last_logout).toLocaleDateString()}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{new Date(row.last_logout).toLocaleTimeString()}</div>
                                        </div>
                                    ) : (row.last_login ? 'Active' : 'N/A')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PolicyContent = ({ type }: { type: 'privacy' | 'terms' }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolicy = async () => {
            setLoading(true);
            try {
                const response = type === 'privacy' ? await getPrivacyPolicyApi() : await getTermsOfServiceApi();
                if (response.ok) {
                    setContent((response.data as any).content);
                }
            } catch (err) {
                console.error(`Failed to fetch ${type}`, err);
            } finally {
                setLoading(false);
            }
        };
        fetchPolicy();
    }, [type]);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}><Loader2 className="animate-spin" size={32} color="#38AC57" /></div>;

    return (
        <div className="card" style={{ padding: '2rem', lineHeight: '1.6' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#111827' }}>{type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h2>
            <div style={{ whiteSpace: 'pre-wrap' }}>
                {content || `No ${type} content available.`}
            </div>
        </div>
    );
};

const LanguageTimezone = ({ initialLanguage, onUpdate }: { initialLanguage?: 'EN' | 'AR' | 'FR'; onUpdate: () => void }) => {
    const [selectedLang, setSelectedLang] = useState(initialLanguage || 'EN');
    const [loading, setLoading] = useState(false);
    
    const languages = [
        { code: 'EN', name: 'English', region: 'English (US)' },
        { code: 'AR', name: 'Arabic', region: 'العربية' },
        { code: 'FR', name: 'French', region: 'Français' },
    ];


    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await updateAdminLanguageApi(selectedLang);
            if (response.ok) {
                onUpdate();
            }
        } catch (err) {
            console.error('Failed to update language', err);
        } finally {
            setLoading(false);
        }
    };

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
                            border: `1px solid ${selectedLang === lang.code ? '#38AC57' : '#e5e7eb'}`, 
                            borderRadius: '0.75rem', 
                            cursor: 'pointer',
                            backgroundColor: selectedLang === lang.code ? '#eef7f0' : 'white',
                            transition: 'all 0.2s',
                            boxShadow: selectedLang === lang.code ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
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
                             {selectedLang === lang.code && <span style={{ marginRight: '1rem', fontSize: '0.8rem', color: '#2d8a46', backgroundColor: '#eef7f0', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: '500' }}>current</span>}
                             <div style={{ 
                                 width: '20px', 
                                 height: '20px', 
                                 borderRadius: '50%', 
                                 border: `2px solid ${selectedLang === lang.code ? '#38AC57' : '#d1d5db'}`,
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center'
                             }}>
                                 {selectedLang === lang.code && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38AC57' }}></div>}
                             </div>
                             <input 
                                type="radio" 
                                name="language" 
                                checked={selectedLang === lang.code} 
                                onChange={() => setSelectedLang(lang.code as any)}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </label>
                ))}
            </div>
             <div style={{ marginTop: '2rem' }}>
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  style={{ backgroundColor: '#38AC57', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '2rem', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

const PhoneInput = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
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
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
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

const TimezoneSelect = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
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
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value || 'Select Timezone'}</span>
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
                            onClick={() => { onChange(tz); setShow(false); }}
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

const FormGroup = ({ label, value, disabled }: { label: string; value: string; disabled?: boolean }) => (
    <div>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#374151' }}>{label}</label>
        <input 
            type="text" 
            defaultValue={value} 
            readOnly={disabled}
            style={{ ...inputStyle, opacity: disabled ? 0.7 : 1, cursor: disabled ? 'not-allowed' : 'text' }} 
        />
    </div>
);
