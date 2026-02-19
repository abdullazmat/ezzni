import { useState } from 'react';
import loginImage from '../assets/login_page.jpg';
import logo from '../assets/Logo.png';

interface LoginProps {
  onLogin: () => void;
  onForgotPassword: () => void;
}

export const Login = ({ onLogin, onForgotPassword }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid Email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Invalid Password';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        onLogin();
      } catch (err: any) {
        setErrors({ ...errors, email: err.message || 'An error occurred' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#fff', color: '#333' }}>
      {/* Left Side - Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4rem', justifyContent: 'center', maxWidth: '600px' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={logo} alt="Hezzni Logo" style={{ height: '48px', width: 'auto' }} />
          <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>ezzni</span>
        </div>
        
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#000' }}>Login</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hezzni.com"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: errors.email ? '1px solid #ef4444' : '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '1rem',
                outline: 'none',
                color: '#333'
              }}
            />
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: errors.password ? '1px solid #ef4444' : '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                fontSize: '1rem',
                outline: 'none',
                color: '#333'
              }}
            />
            {errors.password && <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.password}</span>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: '#333' }} />
              <span style={{ fontSize: '0.9rem' }}>Remember me</span>
            </label>
            <button 
              type="button" 
              onClick={onForgotPassword}
              style={{ background: 'none', border: 'none', color: '#4b5563', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Forget Password
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '1rem',
              borderRadius: '2rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              marginTop: '1rem'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Right Side - Image - Hidden on mobile via CSS class */}
      <div className="login-image-container" style={{ flex: 1, position: 'relative' }}>
        <div 
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            bottom: '1rem',
            left: '1rem',
            borderRadius: '2rem',
            overflow: 'hidden',
            backgroundImage: `url(${loginImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '4rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' }}>
              Drive. Deliver.<br />Dominate.
            </h1>
           <div style={{ fontSize: '4rem', fontWeight: 'bold', position: 'absolute', right: '2rem', bottom: '10rem', transform: 'rotate(-90deg)', transformOrigin: 'bottom right', opacity: 0.2 }}>
              Hezzni
            </div>
            <p style={{ fontSize: '1rem', opacity: 0.9, maxWidth: '80%' }}>
              Take Full Control Of Rides, Deliveries, And Drivers. Monitor Everything In Real Time And Keep Your Operations Moving.
            </p>
          </div>
        </div>
      </div>
       <style>{`
        .login-image-container {
          display: none !important;
        }
        @media (min-width: 768px) {
          .login-image-container {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};
