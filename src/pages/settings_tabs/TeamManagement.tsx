import { useState } from 'react';
import { Plus, ArrowUpRight, Search, CheckCircle2, Filter, ChevronDown, Eye, Edit2, Trash2 } from 'lucide-react';

// Specialized Icons
import activeDriversIcon from '../../assets/icons/Active Drivers.png';
import waitingCustomersIcon from '../../assets/icons/Waiting Customers.png';
import completedIcon from '../../assets/icons/completed.png';

export const TeamManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('Total Members');
    
    const [members, setMembers] = useState([
        { id: '1', name: 'Ahmed Hassan', email: 'ahmed@gmail.com', role: 'Super Admin', department: 'Super Admin', status: 'Active', twoFactorAuth: true, lastLogin: '2 hours ago', img: 'https://i.pravatar.cc/150?u=ahmed' },
        { id: '2', name: 'Youssef Alami', email: 'youssef@gmail.com', role: 'Super Admin', department: 'Super Admin', status: 'Pending', twoFactorAuth: false, lastLogin: '5 hours ago', img: 'https://i.pravatar.cc/150?u=hassan' },
        { id: '3', name: 'Sara Nassiri', email: 'sara@gmail.com', role: 'Super Admin', department: 'Super Admin', status: 'Active', twoFactorAuth: true, lastLogin: '1 day ago', img: 'https://i.pravatar.cc/150?u=ahmed2' },
    ]);

    const dynamicStats = [
        { label: 'Total Members', value: members.length.toString().padStart(2, '0'), color: '#ffffff', textColor: '#111827', icon: activeDriversIcon },
        { label: 'Active', value: members.filter(m => m.status === 'Active').length.toString().padStart(2, '0'), color: '#38AC57', textColor: '#ffffff', icon: completedIcon },
        { label: 'Pending', value: members.filter(m => m.status === 'Pending').length.toString().padStart(2, '0'), color: '#ffffff', textColor: '#111827', icon: waitingCustomersIcon },
        { label: '2FA Enabled', value: members.filter(m => m.twoFactorAuth).length.toString(), color: '#ffffff', textColor: '#111827', icon: activeDriversIcon },
    ];

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             member.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (activeFilter === 'Active') return matchesSearch && member.status === 'Active';
        if (activeFilter === 'Pending') return matchesSearch && member.status === 'Pending';
        if (activeFilter === '2FA Enabled') return matchesSearch && member.twoFactorAuth;
        return matchesSearch;
    });

    const [lastAction, setLastAction] = useState<string | null>(null);

    const handleAddMember = () => {
        const name = prompt('Enter Member Name:');
        if (name) {
            const email = prompt('Enter Member Email:');
            const newMember = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                email: email || 'user@ezzni.com',
                role: 'Admin',
                department: 'Operations',
                status: 'Active',
                twoFactorAuth: false,
                lastLogin: 'Just now',
                img: `https://i.pravatar.cc/150?u=${name}`
            };
            setMembers(prev => [...prev, newMember]);
            setLastAction(`Added new member: ${name}`);
            setTimeout(() => setLastAction(null), 3000);
        }
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            setMembers(prev => prev.filter(m => m.id !== id));
            setLastAction(`Deleted member: ${name}`);
            setTimeout(() => setLastAction(null), 3000);
        }
    };

    const handleAction = (action: string, name: string) => {
        setLastAction(`${action} ${name}...`);
        setTimeout(() => setLastAction(null), 3000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {dynamicStats.map((stat, index) => (
                    <div 
                        key={index} 
                        onClick={() => setActiveFilter(stat.label)}
                        style={{ 
                            backgroundColor: activeFilter === stat.label ? (stat.color === '#ffffff' ? '#eef7f0' : stat.color) : (stat.color === '#38AC57' ? '#ffffff' : stat.color), 
                            padding: '1.5rem', 
                            borderRadius: '1.5rem', 
                            border: stat.label === activeFilter ? '2px solid #38AC57' : '1px solid #e5e7eb',
                            boxShadow: activeFilter === stat.label ? '0 10px 15px -3px rgba(56, 172, 87, 0.2)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
                            color: activeFilter === stat.label ? (stat.color === '#ffffff' ? '#111827' : '#ffffff') : (stat.color === '#38AC57' ? '#38AC57' : stat.textColor),
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: activeFilter === stat.label ? 'translateY(-5px)' : 'none'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ 
                                padding: '0.4rem', 
                                borderRadius: '0.5rem' 
                            }}>
                                <img src={stat.icon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{stat.label}</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stat.value}</div>
                        <div style={{ 
                            position: 'absolute', 
                            right: '1.5rem', 
                            bottom: '1.5rem',
                            backgroundColor: (activeFilter === stat.label && stat.color === '#38AC57') ? '#111827' : '#38AC57',
                            color: 'white',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                padding: '0.6rem 1rem 0.6rem 2.5rem', 
                                borderRadius: '2rem', 
                                border: '1px solid #e5e7eb', 
                                width: '300px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }} 
                            onFocus={(e) => e.target.style.borderColor = '#38AC57'}
                            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                        />
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    </div>
                    
                    <button style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0.6rem 1.25rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4b5563', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => handleAction('Filtering by', 'Status')}>
                        Status <ChevronDown size={16} />
                    </button>
                    
                    <button style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0.6rem 1.25rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4b5563', cursor: 'pointer' }} onClick={() => handleAction('Filtering by', 'Category')}>
                        Category <ChevronDown size={16} />
                    </button>
                    
                    <button style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0.6rem 1.25rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#4b5563', cursor: 'pointer' }} onClick={() => handleAction('Opening', 'Advanced Filters')}>
                        <Filter size={16} /> Filters
                    </button>

                    {activeFilter !== 'Total Members' && (
                        <button 
                            onClick={() => setActiveFilter('Total Members')}
                            style={{ backgroundColor: '#f3f4f6', border: 'none', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}
                        >
                            Clear: {activeFilter} ×
                        </button>
                    )}
                </div>

                <button 
                    onClick={handleAddMember}
                    style={{ 
                        backgroundColor: '#38AC57', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.75rem 1.75rem', 
                        borderRadius: '2rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(56, 172, 87, 0.4)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Plus size={20} />
                    Add new Team Member
                </button>
            </div>

            {/* Members Table */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>Team Members List</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>Manage and monitor your platform administrative team</p>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#38AC57', color: 'white' }}>
                                <th style={{ padding: '1rem', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Member</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Department</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>2FA</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Last Login</th>
                                <th style={{ padding: '1rem', borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.length > 0 ? filteredMembers.map((member) => (
                                <tr key={member.id} style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img src={member.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eef7f0' }} />
                                            <div>
                                                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#111827' }}>{member.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>{member.email}</div>
                                                <div style={{ fontSize: '0.65rem', color: '#38AC57', fontWeight: '600' }}>Super Administrator</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: '700' }}>{member.department}</span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            backgroundColor: member.status === 'Active' ? '#eef7f0' : '#fff7ed', 
                                            color: member.status === 'Active' ? '#38AC57' : '#c2410c', 
                                            padding: '0.3rem 0.75rem', 
                                            borderRadius: '0.5rem', 
                                            fontSize: '0.8rem', 
                                            fontWeight: '700' 
                                        }}>{member.status}</span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {member.twoFactorAuth ? <CheckCircle2 size={20} color="#38AC57" fill="#eef7f0" /> : <div style={{ color: '#9ca3af', fontWeight: 'bold' }}>OFF</div>}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ backgroundColor: '#f3f4f6', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'inline-block', fontSize: '0.85rem', fontWeight: '600', color: '#111827' }}>
                                            {member.lastLogin}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button 
                                                onClick={() => handleAction('Viewing details for', member.name)}
                                                style={{ background: 'white', border: '1px solid #e5e7eb', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4b5563', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                                            >
                                                <Eye size={14} /> View
                                            </button>
                                            <button 
                                                onClick={() => handleAction('Editing', member.name)}
                                                style={{ background: 'white', border: '1px solid #e5e7eb', padding: '0.4rem', borderRadius: '0.5rem', color: '#4b5563', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef7f0'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(member.id, member.name)}
                                                style={{ background: 'white', border: '1px solid #fee2e2', padding: '0.4rem', borderRadius: '0.5rem', color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                                        No members found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Notifications Toast */}
                {lastAction && (
                    <div style={{ 
                        position: 'fixed', 
                        bottom: '2rem', 
                        right: '2rem', 
                        backgroundColor: '#111827', 
                        color: 'white', 
                        padding: '1rem 2rem', 
                        borderRadius: '1rem', 
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        animation: 'slideUp 0.3s ease-out',
                        zIndex: 1000
                    }}>
                        <CheckCircle2 size={18} color="#38AC57" />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{lastAction}</span>
                    </div>
                )}
            </div>
            <style>
                {`
                    @keyframes slideUp {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
};



