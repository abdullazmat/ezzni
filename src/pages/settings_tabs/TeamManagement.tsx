import { useState } from 'react';
import { Plus, ArrowUpRight, Search, CheckCircle2, Filter, ChevronDown, Eye, Edit2, Trash2 } from 'lucide-react';
import { UserAvatar } from '../../components/UserAvatar';

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('view');
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Admin', department: 'Operations' });


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

    const handleAddClick = () => {
        setFormData({ name: '', email: '', role: 'Admin', department: 'Operations' });
        setModalMode('add');
        setIsModalOpen(true);
    };

    const handleEditClick = (member: any) => {
        setSelectedMember(member);
        setFormData({ name: member.name, email: member.email, role: member.role, department: member.department });
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleViewClick = (member: any) => {
        setSelectedMember(member);
        setModalMode('view');
        setIsModalOpen(true);
    };

    const handleSaveMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (modalMode === 'add') {
            const newMember = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                status: 'Active',
                twoFactorAuth: false,
                lastLogin: 'Just now',
                img: `https://i.pravatar.cc/150?u=${formData.name}`
            };
            setMembers(prev => [...prev, newMember]);
            setLastAction(`Added new member: ${formData.name}`);
        } else if (modalMode === 'edit' && selectedMember) {
            setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...m, ...formData } : m));
            setLastAction(`Updated member: ${formData.name}`);
        }
        setIsModalOpen(false);
        setTimeout(() => setLastAction(null), 3000);
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            setMembers(prev => prev.filter(m => m.id !== id));
            setLastAction(`Deleted member: ${name}`);
            setTimeout(() => setLastAction(null), 3000);
        }
    };


  return (
    <div className="vp-team-container">
      <style>{`
        .vp-team-container {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            animation: fadeIn 0.4s ease-out;
        }

        .vp-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
        }

        .vp-stat-card {
            background: white;
            padding: 2rem;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .vp-stat-card.active {
            background: #38AC57;
            border-color: #38AC57;
            box-shadow: 0 20px 25px -5px rgba(56, 172, 87, 0.2);
            color: white;
        }

        .vp-stat-card:hover:not(.active) {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
            border-color: #38AC57;
        }

        .vp-stat-icon-box {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0fdf4;
            transition: all 0.3s;
        }

        .vp-stat-card.active .vp-stat-icon-box {
            background: rgba(255, 255, 255, 0.2);
        }

        .vp-stat-main .label {
            display: block;
            font-size: 1rem;
            font-weight: 800;
            color: #64748b;
            margin-bottom: 0.25rem;
            transition: all 0.3s;
        }

        .vp-stat-card.active .label {
            color: rgba(255, 255, 255, 0.9);
        }

        .vp-stat-value {
            font-size: 2.5rem;
            font-weight: 900;
            letter-spacing: -0.025em;
        }

        .vp-trend-indicator {
            position: absolute;
            right: 2rem;
            bottom: 2rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f5f9;
            color: #64748b;
            transition: all 0.3s;
        }

        .vp-stat-card.active .vp-trend-indicator {
            background: rgba(0, 0, 0, 0.15);
            color: white;
        }

        .vp-controls-bar {
            display: grid;
            grid-template-columns: 1fr auto auto;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        @media (max-width: 1200px) {
            .vp-controls-bar {
                grid-template-columns: 1fr auto;
            }
            .vp-add-btn {
                grid-row: 2;
                grid-column: span 2;
                justify-content: center;
            }
        }

        .vp-search-box {
            position: relative;
            max-width: 600px;
            width: 100%;
        }

        .vp-search-box input {
            width: 100%;
            padding: 0.875rem 1.5rem 0.875rem 3.5rem;
            border-radius: 100px;
            border: 1px solid #e2e8f0;
            font-size: 0.95rem;
            font-weight: 600;
            outline: none;
            transition: all 0.2s;
        }

        .vp-search-box input:focus {
            border-color: #38AC57;
            box-shadow: 0 0 0 4px rgba(56, 172, 87, 0.1);
        }

        .vp-filter-group {
            display: flex;
            gap: 0.75rem;
        }

        .vp-filter-btn {
            background: white;
            border: 1px solid #e2e8f0;
            padding: 0.75rem 1.5rem;
            border-radius: 100px;
            font-weight: 700;
            font-size: 0.9rem;
            color: #475569;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.625rem;
            transition: all 0.2s;
            white-space: nowrap;
            flex-shrink: 0;
        }

        .vp-filter-btn:hover {
            border-color: #38AC57;
            color: #38AC57;
        }

        .vp-add-btn {
            background: #38AC57;
            color: white;
            border: none;
            padding: 0.875rem 2rem;
            border-radius: 100px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s;
            box-shadow: 0 10px 15px -3px rgba(56, 172, 87, 0.2);
        }

        .vp-add-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(56, 172, 87, 0.3);
        }

        .vp-table-card {
            background: white;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }

        .vp-table-header {
            padding: 2.5rem;
            border-bottom: 1px solid #f1f5f9;
        }

        .vp-table-header h3 {
            font-size: 1.5rem;
            font-weight: 900;
            margin: 0;
            color: #1e293b;
        }

        .vp-table-header p {
            color: #64748b;
            font-size: 1rem;
            margin: 0.5rem 0 0 0;
            font-weight: 500;
        }

        .vp-table-scroll {
            overflow-x: auto;
        }

        .vp-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 1000px;
        }

        .vp-table th {
            background: #f8fafc;
            padding: 1.25rem 2.5rem;
            text-align: left;
            font-size: 0.875rem;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid #e2e8f0;
        }

        .vp-table td {
            padding: 1.5rem 2.5rem;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }

        .vp-member-cell {
            display: flex;
            align-items: center;
            gap: 1.25rem;
        }

        .vp-member-avatar {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #f0fdf4;
        }

        .vp-member-info .name {
            display: block;
            font-weight: 800;
            font-size: 1.05rem;
            color: #1e293b;
        }

        .vp-member-info .email {
            display: block;
            font-size: 0.85rem;
            color: #64748b;
            font-weight: 600;
        }

        .vp-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1.25rem;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 800;
        }

        .vp-badge.dept {
            background: #fef2f2;
            color: #ef4444;
        }

        .vp-badge.status-active {
            background: #f0fdf4;
            color: #38AC57;
        }

        .vp-badge.status-pending {
            background: #fff7ed;
            color: #c2410c;
        }

        .vp-last-login {
            background: #f8fafc;
            padding: 0.5rem 1.25rem;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 700;
            color: #1e293b;
            border: 1px solid #e2e8f0;
            white-space: nowrap;
            display: inline-block;
            width: max-content;
        }

        .vp-action-btn-group {
            display: flex;
            gap: 0.75rem;
        }

        @media (max-width: 768px) {
            .vp-controls-bar {
                display: flex;
                flex-direction: column;
                align-items: stretch;
                gap: 1.25rem;
            }
            .vp-search-box {
                max-width: none;
                width: 100%;
            }
            .vp-filter-group {
                justify-content: flex-start;
                overflow-x: auto;
                padding-bottom: 0.5rem;
                scrollbar-width: none;
            }
            .vp-filter-group::-webkit-scrollbar {
                display: none;
            }
            .vp-add-btn {
                width: 100%;
                justify-content: center;
            }
            .vp-table-header {
                padding: 1.5rem;
                text-align: center;
            }
        }

        .vp-team-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1.5rem;
        }

        .vp-team-modal {
            background: white;
            border-radius: 32px;
            width: 100%;
            max-width: 500px;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease-out;
            overflow: hidden;
        }

        .vp-modal-header {
            padding: 2rem 2.5rem;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .vp-modal-header h3 {
            font-size: 1.5rem;
            font-weight: 900;
            margin: 0;
            color: #1e293b;
        }

        .vp-modal-body {
            padding: 2.5rem;
        }

        .vp-team-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .vp-team-form .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .vp-team-form label {
            font-weight: 800;
            font-size: 0.9rem;
            color: #475569;
        }

        .vp-team-form input, .vp-team-form select {
            padding: 1rem 1.25rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            font-weight: 600;
            font-size: 1rem;
            outline: none;
            background: #f8fafc;
        }

        .vp-team-form input:focus {
             border-color: #38AC57;
             background: white;
        }

        .vp-modal-footer {
            padding: 1.5rem 2.5rem 2.5rem 2.5rem;
            border-top: 1px solid #f1f5f9;
            display: flex;
            gap: 1rem;
        }

        .vp-modal-btn {
            flex: 1;
            padding: 1rem;
            border-radius: 100px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            font-size: 1rem;
        }

        .vp-modal-btn.cancel {
            background: #f1f5f9;
            color: #64748b;
        }

        .vp-modal-btn.save {
            background: #38AC57;
            color: white;
        }

        .vp-view-details {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            text-align: center;
        }
        
        .vp-detail-row {
            width: 100%;
            text-align: left;
        }

        .vp-detail-row label {
            display: block;
            font-size: 0.8rem;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 0.4rem;
        }

        .vp-detail-row .value {
            font-size: 1.1rem;
            font-weight: 700;
            color: #1e293b;
        }

      `}</style>

      {/* Stats Grid */}
      <div className="vp-stats-grid">
        {dynamicStats.map((stat, index) => {
          const isActive = activeFilter === stat.label;
          return (
            <div 
              key={index} 
              className={`vp-stat-card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveFilter(stat.label)}
            >
              <div className="vp-stat-icon-box">
                <img src={stat.icon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              </div>
              
              <div className="vp-stat-main">
                <span className="label">{stat.label}</span>
                <span className="vp-stat-value">{stat.value}</span>
              </div>
              
              <div className="vp-trend-indicator">
                <ArrowUpRight size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="vp-controls-bar">
        <div className="vp-search-box">
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        </div>
        
        <div className="vp-filter-group">
          <button className="vp-filter-btn" onClick={() => { setActiveFilter('Status Filter Active'); setLastAction('Filtering by Status...') }}>
            Status <ChevronDown size={18} />
          </button>
          <button className="vp-filter-btn" onClick={() => { setActiveFilter('Category Filter Active'); setLastAction('Filtering by Category...') }}>
            Category <ChevronDown size={18} />
          </button>
          <button className="vp-filter-btn" onClick={() => { setActiveFilter('Advanced Filters Active'); setLastAction('Opening Filters...') }}>
            <Filter size={18} /> Filters
          </button>
          {activeFilter !== 'Total Members' && (
            <button className="vp-filter-btn" style={{ background: '#f1f5f9', color: '#64748b' }} onClick={() => { setActiveFilter('Total Members'); setLastAction('Filters Cleared') }}>
              Clear: {activeFilter} ×
            </button>
          )}
        </div>

        <button className="vp-add-btn" onClick={handleAddClick}>
          <Plus size={22} />
          Add Team Member
        </button>
      </div>

      {/* Members Table */}
      <div className="vp-table-card">
        <div className="vp-table-header">
          <h3>Team Members List</h3>
          <p>Manage and monitor your platform administrative team</p>
        </div>

        <div className="vp-table-scroll">
          <table className="vp-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Department</th>
                <th>Status</th>
                <th>2FA</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="vp-member-cell">
                      <UserAvatar src={member.img} size={52} showBadge={true} />
                      <div className="vp-member-info">
                        <span className="name">{member.name}</span>
                        <span className="email">{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="vp-badge dept">{member.department}</span>
                  </td>
                  <td>
                    <span className={`vp-badge ${member.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    {member.twoFactorAuth ? (
                      <CheckCircle2 size={24} color="#38AC57" fill="#f0fdf4" />
                    ) : (
                      <span style={{ color: '#94a3b8', fontWeight: '800', fontSize: '0.85rem' }}>DISABLED</span>
                    )}
                  </td>
                  <td>
                    <span className="vp-last-login">{member.lastLogin}</span>
                  </td>
                  <td>
                    <div className="vp-action-btn-group">
                      <button className="vp-filter-btn" onClick={() => handleViewClick(member)}>
                        <Eye size={16} />
                      </button>
                      <button className="vp-filter-btn" onClick={() => handleEditClick(member)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="vp-filter-btn" style={{ borderColor: '#fee2e2', color: '#ef4444' }} onClick={() => handleDelete(member.id, member.name)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '5rem', color: '#64748b', fontWeight: '600' }}>
                    No members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Member Modal */}
      {isModalOpen && (
        <div className="vp-team-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="vp-team-modal" onClick={e => e.stopPropagation()}>
            <div className="vp-modal-header">
              <h3>{modalMode === 'add' ? 'Add Member' : modalMode === 'edit' ? 'Edit Member' : 'Member Profile'}</h3>
            </div>

            <div className="vp-modal-body">
              {modalMode === 'view' && selectedMember ? (
                <div className="vp-view-details">
                   <UserAvatar src={selectedMember.img} size={100} showBadge={true} />
                   <div className="vp-detail-row">
                      <label>Full Name</label>
                      <div className="value">{selectedMember.name}</div>
                   </div>
                   <div className="vp-detail-row">
                      <label>Email Address</label>
                      <div className="value">{selectedMember.email}</div>
                   </div>
                   <div className="vp-detail-row">
                      <label>Department / Role</label>
                      <div className="value">{selectedMember.department}</div>
                   </div>
                </div>
              ) : (
                <form className="vp-team-form" onSubmit={handleSaveMember}>
                   <div className="input-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                      />
                   </div>
                   <div className="input-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                      />
                   </div>
                   <div className="input-group">
                      <label>Department</label>
                      <select 
                        value={formData.department} 
                        onChange={e => setFormData({...formData, department: e.target.value})}
                      >
                         <option value="Super Admin">Super Admin</option>
                         <option value="Admin">Admin</option>
                         <option value="Operations">Operations</option>
                         <option value="Support">Support</option>
                      </select>
                   </div>
                </form>
              )}
            </div>

            <div className="vp-modal-footer">
              <button className="vp-modal-btn cancel" onClick={() => setIsModalOpen(false)}>
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalMode !== 'view' && (
                <button className="vp-modal-btn save" onClick={handleSaveMember}>
                  {modalMode === 'add' ? 'Add Member' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {lastAction && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#111827', color: 'white', padding: '1rem 2rem', borderRadius: '100px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1000, animation: 'slideUp 0.3s ease-out' }}>
          <CheckCircle2 size={20} color="#38AC57" />
          <span style={{ fontWeight: '700' }}>{lastAction}</span>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};





