import React, { useEffect, useState } from 'react';
import API from '../services/api';

const theme = {
  colors: {
    primary: '#15803d',
    primaryLight: '#dcfce7',
    success: '#10b981',
    info: '#3b82f6',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h3: { fontSize: '1.5rem', fontWeight: 700, color: '#15803d', marginBottom: '1rem' },
    cardTitle: { fontSize: '1.25rem', fontWeight: 600, color: '#111827' },
    cardText: { fontSize: '0.9rem', color: '#4b5563', marginTop: '4px' },
    button: {
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 600,
      padding: '6px 14px',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.2s ease',
    },
    alert: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '1rem',
      fontWeight: 600,
    }
  },
  layout: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 1rem 3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(22, 101, 52, 0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flexGrow: 1,
  },
  buttonGroup: {
    marginTop: 'auto',
    display: 'flex',
    gap: '0.75rem',
  }
};

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/api/products/approved').then(res => setProducts(res.data));
  }, []);

  const addToCart = (id, qty) => {
    setCart(prev => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, qty) }));
  };

  const placeOrder = async (p) => {
    const qty = cart[p.id] || 1;
    const order = {
      productName: p.name,
      quantity: qty,
      pricePerKg: p.pricePerKg,
      totalPrice: qty * p.pricePerKg,
      farmerId: p.farmer.id,
      buyerId: JSON.parse(localStorage.getItem('user')).id,
    };
    try {
      await API.post('/api/orders/place', order);
      setMessage(`Ordered ${qty}kg of ${p.name}!`);
      setCart(prev => ({ ...prev, [p.id]: 0 }));
    } catch {
      setMessage('Order failed');
    }
  };

  return (
    <div style={{ fontFamily: theme.typography.fontFamily, maxWidth: theme.layout.maxWidth, margin: theme.layout.margin, padding: theme.layout.padding, backgroundColor: theme.colors.background }}>
      <h3 style={theme.typography.h3}>Available Products</h3>

      {message && <div style={theme.typography.alert}>{message}</div>}

      <div style={theme.grid}>
        {products.map(p => (
          <div key={p.id} style={theme.card}>
            <img src={p.imageUrl} alt={p.name} style={theme.cardImage} />
            <div style={theme.cardBody}>
              <h4 style={theme.typography.cardTitle}>{p.name}</h4>
              <p style={theme.typography.cardText}>
                ₹{p.pricePerKg}/kg | {p.quantity} kg available
              </p>
              <div style={theme.buttonGroup}>
                <button
                  onClick={() => addToCart(p.id, p.quantity)}
                  style={{
                    ...theme.typography.button,
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                    flex: '1',
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#166534'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = theme.colors.primary}
                >
                  Add ({cart[p.id] || 0})
                </button>
                <button
                  onClick={() => placeOrder(p)}
                  disabled={!cart[p.id]}
                  style={{
                    ...theme.typography.button,
                    backgroundColor: theme.colors.success,
                    color: 'white',
                    flex: '1',
                    opacity: cart[p.id] ? 1 : 0.6,
                    cursor: cart[p.id] ? 'pointer' : 'not-allowed',
                  }}
                  onMouseOver={e => {
                    if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#059669';
                  }}
                  onMouseOut={e => {
                    if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = theme.colors.success;
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
