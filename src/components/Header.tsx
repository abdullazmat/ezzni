import { Bell, LogOut } from 'lucide-react';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Header = ({ onLogout }: { onLogout: () => void }) => {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { name: 'Admin', email: 'admin@hezzni.com' };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const dummyData = [
    { id: 1, name: 'Ahmed Hassan', type: 'Customer', phone: '+212 6 12 34 56', code: 'C-00045', img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Ali Raza', type: 'Driver', phone: '+212 6 12 34 56', code: 'D-00001', img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Ayaan Khan', type: 'Customer', phone: '+212 6 12 34 56', code: 'C-00045', img: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Asad Mahmood', type: 'Customer', phone: '+212 6 12 34 56', code: 'C-00045', img: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Amir Farooq', type: 'Driver', phone: '+212 6 12 34 56', code: 'D-00001', img: 'https://i.pravatar.cc/150?u=5' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
        const filtered = dummyData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(filtered);
    } else {
        setSearchResults([]);
    }
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem',
    }}>
      {/* Search Bar - Taking significant width as per design */}
      <div style={{ flex: 1, paddingRight: '4rem' }}>
         <div style={{ position: 'relative', maxWidth: '600px' }}>
            <input 
                type="text" 
                placeholder="Type here..." 
                value={searchQuery}
                onChange={handleSearch}
                style={{ 
                    width: '100%', 
                    padding: '0.8rem 1rem', 
                    borderRadius: '2rem', 
                    border: '1px solid var(--border-color)', 
                    backgroundColor: 'white',
                    outline: 'none',
                }}
            />
            <button style={{ 
                position: 'absolute', 
                right: '5px', 
                top: '5px', 
                bottom: '5px', 
                backgroundColor: 'var(--primary-color)', 
                color: 'white', 
                padding: '0 1.5rem', 
                borderRadius: '1.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
            }}>
                Search
            </button>

            {/* Search Results Dropdown */}
            {searchQuery && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: 50,
                    padding: '0.5rem',
                    border: '1px solid var(--border-color)'
                }}>
                    {searchResults.length > 0 ? (
                         searchResults.map(result => (
                            <div key={result.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem',
                                cursor: 'pointer',
                                borderRadius: '0.5rem',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            onClick={() => alert(`Selected ${result.name}`)}
                            >
                                <div style={{ position: 'relative' }}>
                                    <img src={result.img} alt={result.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', backgroundColor: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: 'white' }}>✔</div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ fontWeight: 'bold' }}>{result.name}</div>
                                        <span style={{ 
                                            fontSize: '0.75rem', 
                                            color: result.type === 'Driver' ? 'var(--primary-color)' : 'var(--success-color)' 
                                        }}>
                                            {result.type}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        {result.phone} <span style={{ color: '#94a3b8' }}>{result.code}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No results found
                        </div>
                    )}
                </div>
            )}
         </div>
      </div>
      
      {/* Right Side Actions */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
          <Bell size={24} color="var(--primary-color)" fill="var(--primary-color)" />
          <span style={{ 
              position: 'absolute', 
              top: '-5px', 
              right: '-2px', 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: 'red', 
              border: '2px solid white' 
          }}></span>
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{user.name || 'Paityn Calzo'}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>User</div>
            </div>
             <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <LogOut size={16} />
             </button>
        </div>
      </div>
    </header>
  );
};
