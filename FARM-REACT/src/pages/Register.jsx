import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const theme = {
    colors: {
      primary: '#15803d',
      success: '#10b981',
      gold: '#febd69',
      danger: '#ef4444',
      textPrimary: '#111827',
      background: 'linear-gradient(135deg, #fefce8 0%, #dcfce7 100%)',
      surface: '#ffffff',
      border: '#d1d5db',
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      h5: { fontSize: '1.75rem', fontWeight: 700, color: '#15803d', marginBottom: '1.5rem', textAlign: 'center' },
      label: { fontWeight: 600, fontSize: '0.95rem', color: '#374151', marginBottom: '0.5rem', display: 'block' },
      input: {
        width: '100%',
        padding: '14px 16px',
        fontSize: '1rem',
        borderRadius: '12px',
        border: '2px solid #e5e7eb',
        outline: 'none',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        marginBottom: '1.25rem',
      },
      textarea: {
        width: '100%',
        padding: '14px 16px',
        fontSize: '1rem',
        borderRadius: '12px',
        border: '2px solid #e5e7eb',
        outline: 'none',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        resize: 'vertical',
        minHeight: '100px',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        marginBottom: '1.25rem',
      },
      select: {
        width: '100%',
        padding: '14px 16px',
        fontSize: '1rem',
        borderRadius: '12px',
        border: '2px solid #e5e7eb',
        outline: 'none',
        backgroundColor: '#fff',
        cursor: 'pointer',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        marginBottom: '1.25rem',
        appearance: 'none',
        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        backgroundSize: '20px',
      },
      button: {
        width: '100%',
        backgroundColor: '#10b981',
        color: '#fff',
        padding: '16px 24px',
        border: 'none',
        borderRadius: '16px',
        fontWeight: 700,
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        marginTop: '1rem',
      },
      alert: {
        padding: '14px 18px',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        borderLeft: '4px solid #ef4444',
        backgroundColor: '#fee2e2',
        color: '#991b1b',
      },
      link: {
        color: '#15803d',
        textDecoration: 'none',
        fontWeight: 600,
      }
    },
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    },
    card: {
      maxWidth: '500px',
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      padding: '2.5rem 2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(21, 128, 61, 0.1)',
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = role === 'farmer' ? '/api/farmers/register' : '/api/buyers/register';

    try {
      const res = await API.post(endpoint, formData);
      login(res.data);
      navigate(role === 'farmer' ? '/farmer/dashboard' : '/shop');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputFocusStyle = {
    borderColor: '#15803d',
    boxShadow: '0 0 0 3px rgba(21, 128, 61, 0.1)',
  };

  return (
    <main style={theme.container}>
      <section style={theme.card}>
        <h1 style={theme.typography.h5}>Register</h1>
        
        {error && <div style={theme.typography.alert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={theme.typography.label}>Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={theme.typography.select}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>

          <label style={theme.typography.label}>Name</label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={theme.typography.label}>Email</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={theme.typography.label}>Password</label>
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={theme.typography.label}>Phone</label>
          <input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />

          <label style={theme.typography.label}>Address</label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            style={theme.typography.textarea}
            onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={e => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...theme.typography.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={e => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#059669';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={e => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#10b981';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
          Already have an account? <Link to="/login" style={theme.typography.link}>Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
