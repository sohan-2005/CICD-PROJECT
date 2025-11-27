import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const theme = {
  colors: {
    primary: '#15803d',
    success: '#10b981',
    warning: '#f59e0b',
    textPrimary: '#111827',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h3: { fontSize: '1.5rem', fontWeight: 700, color: '#15803d', marginBottom: '1rem' },
    body: { fontSize: '1rem', color: '#111827' },
  },
  layout: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  button: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 12px 25px rgba(21, 128, 61, 0.12)',
    overflow: 'hidden',
  },
  th: {
    textAlign: 'left',
    padding: '1rem 1.5rem',
    borderBottom: '2px solid #d1d5db',
    color: '#15803d',
    fontWeight: 700,
    fontSize: '0.9rem',
    textTransform: 'uppercase',
  },
  td: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#374151',
    verticalAlign: 'middle',
  },
  image: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  badge: {
    padding: '6px 14px',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#fff',
  },
  badgeSuccess: {
    backgroundColor: '#10b981',
  },
  badgeWarning: {
    backgroundColor: '#f59e0b',
  }
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get(`/api/products/farmer/${user.id}`).then(res => setProducts(res.data));
  }, [user.id]);

  return (
    <main style={{ ...theme.layout, fontFamily: theme.typography.fontFamily, backgroundColor: theme.colors.background, minHeight: '100vh' }}>
      <header style={theme.header}>
        <h1 style={theme.typography.h3}>My Products</h1>
        <Link to="/farmer/products/add" style={theme.button}>
          Add Product
        </Link>
      </header>

      <table style={theme.table}>
        <thead>
          <tr>
            <th style={theme.th}>Image</th>
            <th style={theme.th}>Name</th>
            <th style={theme.th}>Qty</th>
            <th style={theme.th}>Price/kg</th>
            <th style={theme.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td style={theme.td}>
                <img src={p.imageUrl} alt={p.name} style={theme.image} />
              </td>
              <td style={theme.td}>{p.name}</td>
              <td style={theme.td}>{p.quantity}</td>
              <td style={theme.td}>₹{p.pricePerKg}</td>
              <td style={theme.td}>
                <span style={{
                  ...theme.badge,
                  ...(p.status === 'APPROVED' ? theme.badgeSuccess : theme.badgeWarning)
                }}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ProductList;
