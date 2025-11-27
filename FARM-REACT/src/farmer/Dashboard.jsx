import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const theme = {
  colors: {
    primary: '#15803d',
    success: '#10b981',
    textPrimary: '#111827',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h4: { fontSize: '1.75rem', fontWeight: 700, color: '#15803d', marginBottom: '1rem' },
    h6: { fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' },
    h3: { fontSize: '2.5rem', fontWeight: 700, color: '#15803d' },
  },
  layout: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
  },
  grid: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(21, 128, 61, 0.1)',
    flex: '1 1 30%',
    minWidth: '220px',
    padding: '1.5rem 2rem',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  buttonBox: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  button: {
    padding: '12px 30px',
    borderRadius: '14px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease',
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  useEffect(() => {
    API.get(`/api/products/farmer/${user.id}`).then(res => {
      const products = res.data;
      setStats({
        total: products.length,
        pending: products.filter(p => p.status === 'PENDING').length,
        approved: products.filter(p => p.status === 'APPROVED').length
      });
    });
  }, [user.id]);

  return (
    <main style={{ fontFamily: theme.typography.fontFamily, backgroundColor: theme.colors.background, minHeight: '100vh', padding: theme.layout.padding, maxWidth: theme.layout.maxWidth, margin: theme.layout.margin }}>
      <h1 style={theme.typography.h4}>
        Welcome, {user.name}!
      </h1>

      <section style={theme.grid}>
        <div style={theme.card}>
          <h2 style={theme.typography.h6}>Total Products</h2>
          <p style={theme.typography.h3}>{stats.total}</p>
        </div>
        <div style={theme.card}>
          <h2 style={theme.typography.h6}>Pending</h2>
          <p style={theme.typography.h3}>{stats.pending}</p>
        </div>
        <div style={theme.card}>
          <h2 style={theme.typography.h6}>Approved</h2>
          <p style={theme.typography.h3}>{stats.approved}</p>
        </div>
      </section>

      <div style={theme.buttonBox}>
        <a href="/farmer/products/add" style={{ textDecoration: 'none' }}>
          <button
            style={theme.button}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0f766e')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = theme.colors.success)}
          >
            Add Product
          </button>
        </a>
      </div>
    </main>
  );
};

export default FarmerDashboard;
