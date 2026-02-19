import { useState } from 'react';
import logo from '../assets/Logo.png';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export const ForgotPassword = ({ onBackToLogin }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Simulate API call
    setError('');
    setIsSubmitted(true);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', color: '#333' }}>
      
      {/* Centered Card Content */}
      <div style={{ width: '100%', maxWidth: '500px', padding: '2rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="Hezzni Logo" style={{ height: '40px', width: 'auto' }} />
          <span style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>ezzni</span>
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', color: '#000' }}>Forgot Password?</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Enter your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hezzni.com"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: error ? '1px solid #ef4444' : '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '1rem',
                outline: 'none',
                color: '#333'
              }}
            />
            {error && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{error}</span>}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '1rem',
              borderRadius: '2rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Send Reset Link
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={onBackToLogin}
            style={{ background: 'none', border: 'none', color: '#10b981', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Back to Login
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {isSubmitted && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#f3f4f6',
          padding: '1rem 2rem',
          borderRadius: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '50%', 
            border: '2px solid #000', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 'bold' 
          }}>
            i
          </div>
          <span>Reset link sent to your email</span>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
