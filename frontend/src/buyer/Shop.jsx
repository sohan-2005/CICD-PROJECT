import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';

const theme = {
  colors: {
    primary: '#15803d',
    primaryLight: '#dcfce7',
    success: '#10b981',
    gold: '#f59e0b',
    goldHover: '#d97706',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#d1d5db',
    muted: '#f3f4f6',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h4: { fontSize: '1.75rem', fontWeight: 700, color: '#15803d', marginBottom: '1rem' },
    h6: { fontSize: '1.125rem', fontWeight: 600, color: '#111827' },
    body2: { fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' },
    price: { fontSize: '1.25rem', fontWeight: 700, color: '#15803d' },
  },
  layout: {
    padding: '2rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(21, 128, 61, 0.08)',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: `1px solid #d1d5db`,
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '16px 16px 0 0',
  },
  cardContent: {
    flexGrow: 1,
    padding: '1rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chip: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  chipsContainer: {
    display: 'flex',
    gap: '8px',
    margin: '0.5rem 0',
  },
  buttonContainer: {
    padding: '0 1.25rem 1.25rem',
  },
  button: {
    width: '100%',
    backgroundColor: '#febd69',
    color: '#0F1111',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '12px 0',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontSize: '1rem',
  },
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const searchParams = new URLSearchParams(useLocation().search);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    API.get('/api/products/approved').then(res => {
      let filtered = res.data;
      if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      setProducts(filtered);
      setLoading(false);
    });
  }, [search]);

  return (
    <main style={{ padding: theme.layout.padding, backgroundColor: theme.colors.background, minHeight: '100vh' }}>
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
        <h4 style={theme.typography.h4}>Shop Fresh Produce</h4>

        <div style={theme.grid}>
          {loading ? (
            Array(8).fill().map((_, i) => (
              <div key={i} style={{ backgroundColor: theme.colors.muted, borderRadius: '16px', height: '300px' }} />
            ))
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center', color: theme.colors.textSecondary, fontSize: '1.25rem', gridColumn: '1 / -1' }}>
              No products found
            </p>
          ) : (
            products.map(p => (
              <article 
                key={p.id} 
                style={theme.card} 
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(21, 128, 61, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(21, 128, 61, 0.08)';
                }}
                tabIndex={0}
              >
                <img
                  src={p.imageUrl || 'https://via.placeholder.com/300'}
                  alt={p.name}
                  style={theme.cardImage}
                />
                <div style={theme.cardContent}>
                  <div>
                    <h6 style={theme.typography.h6} title={p.name}>{p.name}</h6>
                    <p style={{ ...theme.typography.body2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={p.description || 'Fresh organic produce'}>
                      {p.description || 'Fresh organic produce'}
                    </p>

                    <div style={theme.chipsContainer}>
                      <span style={theme.chip}>{p.category}</span>
                      <span style={theme.chip}>{`${p.quantity}kg`}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={theme.typography.price}>₹{p.pricePerKg}/kg</span>
                    <button 
                      onClick={() => addToCart(p)} 
                      style={theme.button}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = theme.colors.goldHover}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = theme.colors.gold}
                      aria-label={`Add ${p.name} to cart`}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;
