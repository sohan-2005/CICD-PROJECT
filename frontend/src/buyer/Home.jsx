import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import API from '../services/api';

const theme = {
  colors: {
    primary: '#15803d',
    primaryHover: '#166534',
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
    h4: { fontSize: '1.875rem', fontWeight: 700, color: '#15803d', marginBottom: '0.5rem' },
    h6: { fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: '0.25rem' },
    body2: { fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' },
    price: { fontSize: '1.25rem', fontWeight: 700, color: '#15803d' },
    caption: { fontSize: '0.75rem', color: '#9ca3af' },
  },
  layout: {
    padding: '1.5rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(21, 128, 61, 0.08)',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: `1px solid ${theme.colors.border}`,
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  chip: {
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.primary,
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  button: {
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: 600,
    padding: '12px 20px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap',
  },
  skeleton: {
    backgroundColor: theme.colors.muted,
    borderRadius: '12px',
    height: '320px',
  },
  noResults: {
    textAlign: 'center',
    padding: '4rem 1rem',
    color: theme.colors.textSecondary,
  }
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const searchParams = new URLSearchParams(useLocation().search);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    API.get('/api/products/approved').then(res => {
      let filtered = res.data;
      if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      }
      setProducts(filtered);
      setLoading(false);
    });
  }, [search]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map(item => 
        item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div style={{ 
      fontFamily: theme.typography.fontFamily, 
      backgroundColor: theme.colors.background, 
      minHeight: '100vh',
      padding: theme.layout.padding 
    }}>
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
        {/* Header */}
        <div style={theme.header}>
          <h4 style={theme.typography.h4}>
            {search ? `Results for "${search}"` : 'Fresh from Farmers'}
          </h4>
          <Link 
            to="/buyer/orders"
            style={{
              ...theme.button,
              backgroundColor: 'transparent',
              color: theme.colors.primary,
              border: `2px solid ${theme.colors.primary}`,
              padding: '10px 20px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            👁️ My Orders
          </Link>
        </div>

        {/* Products Grid */}
        <div style={theme.grid}>
          {loading ? (
            Array(6).fill().map((_, i) => (
              <div key={i} style={theme.skeleton} />
            ))
          ) : products.length === 0 ? (
            <div style={theme.noResults}>
              <h5 style={{ color: theme.colors.textPrimary, marginBottom: '1rem' }}>
                No products found
              </h5>
              <p style={{ fontSize: '1rem', opacity: 0.7 }}>
                Try adjusting your search or check back later for fresh produce!
              </p>
            </div>
          ) : (
            products.map(p => (
              <div 
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
              >
                <img 
                  src={p.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'} 
                  alt={p.name}
                  style={theme.cardImage}
                />
                <div style={{ 
                  padding: '1.25rem', 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}>
                  <h6 style={theme.typography.h6}>{p.name}</h6>
                  <p style={{
                    ...theme.typography.body2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {p.description || 'Fresh organic produce from local farmers'}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    marginBottom: '1rem' 
                  }}>
                    <span style={theme.chip}>
                      {p.category || 'Organic'}
                    </span>
                    <span style={theme.typography.caption}>
                      {p.quantity} kg available
                    </span>
                  </div>
                  <div style={theme.typography.price}>
                    ₹{p.pricePerKg}/kg
                  </div>
                </div>
                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      ...theme.button,
                      width: '100%',
                      backgroundColor: theme.colors.gold,
                      color: theme.colors.textPrimary,
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.backgroundColor = theme.colors.goldHover;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.backgroundColor = theme.colors.gold;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
