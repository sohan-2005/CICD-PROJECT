import React, { useEffect, useState } from 'react';
import API from '../services/api';

const theme = {
  colors: {
    primary: '#15803d',
    primaryLight: '#dcfce7',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h2: { fontSize: '1.75rem', fontWeight: 700, color: '#15803d', marginBottom: '1rem' },
    tabTitle: { fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', padding: '12px 24px', color: '#4b5563' },
    tabTitleActive: { color: '#15803d', borderBottom: '3px solid #15803d' },
    tableHeader: { textAlign: 'left', color: '#374151', borderBottom: `2px solid #d1d5db`, padding: '12px' },
    tableCell: { padding: '12px', borderBottom: `1px solid #e5e7eb`, color: '#374151' },
    badge: { padding: '4px 8px', borderRadius: '12px', fontWeight: 600, fontSize: '0.875rem', color: '#fff' },
    button: {
      padding: '5px 12px',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
      marginRight: '8px',
      transition: 'background-color 0.2s ease',
    },
  },
  layout: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 1rem 3rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(22, 101, 52, 0.08)',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    color: '#111827',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
};

const AdminDashboard = () => {
  const [tab, setTab] = useState('products');
  const [farmers, setFarmers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/api/admin/farmers').then(res => setFarmers(res.data));
    API.get('/api/admin/buyers').then(res => setBuyers(res.data));
    API.get('/api/admin/products/pending').then(res => setPendingProducts(res.data));
    API.get('/api/admin/orders').then(res => setOrders(res.data));
  }, []);

  const approve = (id) => {
    API.put(`/api/admin/products/${id}/approve`).then(() => {
      setPendingProducts(prev => prev.filter(p => p.id !== id));
    });
  };

  const reject = (id) => {
    API.put(`/api/admin/products/${id}/reject`).then(() => {
      setPendingProducts(prev => prev.filter(p => p.id !== id));
    });
  };

  const badgeStyle = (status) => {
    let bgColor = status === 'PENDING' ? theme.colors.warning : theme.colors.success;
    return {
      ...theme.typography.badge,
      backgroundColor: bgColor,
    };
  };

  return (
    <div style={{ fontFamily: theme.typography.fontFamily, maxWidth: theme.layout.maxWidth, margin: theme.layout.margin, padding: theme.layout.padding, backgroundColor: theme.colors.background }}>
      <h2 style={theme.typography.h2}>Admin Panel</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `2px solid ${theme.colors.border}`, marginBottom: '1.5rem' }}>
        {['products', 'farmers', 'buyers', 'orders'].map((t) => {
          const labels = {
            products: 'Pending Products',
            farmers: 'Farmers',
            buyers: 'Buyers',
            orders: 'All Orders',
          };
          return (
            <div
              key={t}
              onClick={() => setTab(t)}
              style={{
                ...theme.typography.tabTitle,
                ...(tab === t ? theme.typography.tabTitleActive : {}),
              }}
            >
              {labels[t]}
            </div>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === 'products' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: theme.colors.surface, borderRadius: '12px', boxShadow: theme.card.boxShadow }}>
          <thead>
            <tr>
              <th style={theme.typography.tableHeader}>Name</th>
              <th style={theme.typography.tableHeader}>Farmer</th>
              <th style={theme.typography.tableHeader}>Price/kg</th>
              <th style={theme.typography.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                <td style={theme.typography.tableCell}>{p.name}</td>
                <td style={theme.typography.tableCell}>{p.farmer.name}</td>
                <td style={theme.typography.tableCell}>₹{p.pricePerKg}</td>
                <td style={theme.typography.tableCell}>
                  <button 
                    onClick={() => approve(p.id)} 
                    style={{ 
                      ...theme.typography.button, 
                      backgroundColor: theme.colors.success,
                      color: 'white',
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#059669'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = theme.colors.success}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => reject(p.id)} 
                    style={{ 
                      ...theme.typography.button, 
                      backgroundColor: theme.colors.danger, 
                      color: 'white' 
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = theme.colors.danger}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'farmers' && (
        <div style={theme.grid}>
          {farmers.map(f => (
            <div key={f.id} style={theme.card}>
              <h3 style={{ margin: '0 0 0.5rem', color: theme.colors.primary }}>{f.name}</h3>
              <p style={{ margin: 0, color: theme.colors.textSecondary }}>
                Email: {f.email}<br />Phone: {f.phone}
              </p>
            </div>
          ))}
        </div>
      )}

      {tab === 'buyers' && (
        <div style={theme.grid}>
          {buyers.map(b => (
            <div key={b.id} style={theme.card}>
              <h3 style={{ margin: '0 0 0.5rem', color: theme.colors.primary }}>{b.name}</h3>
              <p style={{ margin: 0, color: theme.colors.textSecondary }}>
                Email: {b.email}<br />Phone: {b.phone}
              </p>
            </div>
          ))}
        </div>
      )}

      {tab === 'orders' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: theme.colors.surface, borderRadius: '12px', boxShadow: theme.card.boxShadow }}>
          <thead>
            <tr>
              <th style={theme.typography.tableHeader}>Product</th>
              <th style={theme.typography.tableHeader}>Buyer</th>
              <th style={theme.typography.tableHeader}>Farmer</th>
              <th style={theme.typography.tableHeader}>Total</th>
              <th style={theme.typography.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                <td style={theme.typography.tableCell}>{o.productName}</td>
                <td style={theme.typography.tableCell}>{o.buyerId}</td>
                <td style={theme.typography.tableCell}>{o.farmerId}</td>
                <td style={theme.typography.tableCell}>₹{o.totalPrice}</td>
                <td style={{...theme.typography.tableCell}}>
                  <span style={badgeStyle(o.status)}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
