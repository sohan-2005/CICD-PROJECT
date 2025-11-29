import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const theme = {
  colors: {
    primary: '#15803d',
    gold: '#f59e0b',
    success: '#10b981',
    danger: '#ef4444',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h5: { fontSize: '1.5rem', fontWeight: 700, color: '#15803d', marginBottom: '1.5rem', textAlign: 'center' },
    label: { fontWeight: 600, fontSize: '0.95rem', color: '#374151', marginBottom: '0.5rem', display: 'block' },
    input: {
      width: '100%',
      padding: '12px 16px',
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
    button: {
      width: '100%',
      backgroundColor: '#febd69',
      color: '#0F1111',
      padding: '16px 24px',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 700,
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
    alert: {
      padding: '14px 18px',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      fontWeight: 600,
      fontSize: '1rem',
      borderLeft: '4px solid',
    },
    alertSuccess: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      borderLeftColor: '#10b981',
    },
    alertError: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      borderLeftColor: '#ef4444',
    },
  },
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 20px 60px rgba(21, 128, 61, 0.12)',
    border: '1px solid rgba(21, 128, 61, 0.1)',
  }
};

const Checkout = () => {
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', pincode: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (cart.length === 0) return;

    const orders = cart.map(item => ({
      productName: item.name,
      quantity: item.qty || 1,
      pricePerKg: item.pricePerKg,
      totalPrice: (item.qty || 1) * item.pricePerKg,
      farmerId: item.farmer.id,
      buyerId: user.id
    }));

    try {
      await Promise.all(orders.map(o => API.post('/api/orders/place', o)));
      localStorage.removeItem('cart');
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/buyer/orders'), 2000);
    } catch {
      setMessage('Order failed');
    }
  };

  const inputFocusStyle = {
    borderColor: '#15803d',
    boxShadow: '0 0 0 3px rgba(21, 128, 61, 0.1)',
  };

  return (
    <main style={{ 
      fontFamily: theme.typography.fontFamily, 
      backgroundColor: theme.colors.background, 
      minHeight: '100vh', 
      padding: '1rem' 
    }}>
      <section style={theme.container}>
        <h1 style={theme.typography.h5}>Checkout</h1>
        
        {message && (
          <div style={{
            ...theme.typography.alert,
            ...(message.includes('success') ? theme.alertSuccess : theme.alertError)
          }}>
            {message}
          </div>
        )}

        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          <label style={theme.typography.label} htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={address.name}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => e.target.style = { ...theme.typography.input, ...inputFocusStyle }}
            onBlur={e => e.target.style = theme.typography.input}
          />

          <label style={theme.typography.label} htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={address.phone}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => e.target.style = { ...theme.typography.input, ...inputFocusStyle }}
            onBlur={e => e.target.style = theme.typography.input}
          />

          <label style={theme.typography.label} htmlFor="street">Street Address</label>
          <input
            id="street"
            name="street"
            type="text"
            required
            value={address.street}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => e.target.style = { ...theme.typography.input, ...inputFocusStyle }}
            onBlur={e => e.target.style = theme.typography.input}
          />

          <label style={theme.typography.label} htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={address.city}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => e.target.style = { ...theme.typography.input, ...inputFocusStyle }}
            onBlur={e => e.target.style = theme.typography.input}
          />

          <label style={theme.typography.label} htmlFor="pincode">PIN Code</label>
          <input
            id="pincode"
            name="pincode"
            type="number"
            required
            value={address.pincode}
            onChange={handleChange}
            style={theme.typography.input}
            onFocus={e => e.target.style = { ...theme.typography.input, ...inputFocusStyle }}
            onBlur={e => e.target.style = theme.typography.input}
          />

          <button
            type="submit"
            style={theme.typography.button}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#f3a847';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(254, 189, 105, 0.4)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = '#febd69';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🛒 Place Order
          </button>
        </form>
      </section>
    </main>
  );
};

export default Checkout;
