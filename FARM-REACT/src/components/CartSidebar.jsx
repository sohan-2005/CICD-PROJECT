import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ open, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [deleteHover, setDeleteHover] = useState({});

  const total = cart.reduce((sum, item) => sum + (item.pricePerKg * (item.qty || 1)), 0);

  const theme = {
    colors: {
      primary: '#15803d',
      primaryHover: '#166534',
      primaryLight: '#dcfce7',
      background: '#fefce8',
      surface: '#ffffff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      border: 'rgba(21, 128, 61, 0.15)',
      error: '#dc2626',
      success: '#10b981',
      gold: '#f59e0b',
      goldHover: '#d97706',
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      h6: { fontSize: '1.125rem', fontWeight: 700 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
      caption: { fontSize: '0.75rem', lineHeight: 1.4 },
    },
    spacing: {
      xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem'
    },
    radius: { sm: '8px', lg: '12px' },
    shadows: {
      md: '0 10px 30px rgba(0,0,0,0.12)',
      drawer: '0 0 40px rgba(0,0,0,0.25)'
    }
  };

  if (!open) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: open ? 0 : '-400px',
          width: '380px',
          height: '100vh',
          backgroundColor: theme.colors.surface,
          boxShadow: theme.shadows.drawer,
          zIndex: 9999,
          transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          maxWidth: '90vw'
        }}
      >
        {/* HEADER */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `${theme.spacing.lg} ${theme.spacing.lg} 0`,
          marginBottom: theme.spacing.md
        }}>
          <h6 style={{
            ...theme.typography.h6,
            color: theme.colors.textPrimary,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs
          }}>
            Shopping Cart
            <span style={{
              backgroundColor: theme.colors.error,
              color: theme.colors.surface,
              borderRadius: '999px',
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              minWidth: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cart.length}
            </span>
          </h6>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: theme.spacing.sm,
              borderRadius: theme.radius.sm,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textSecondary,
              transition: 'all 0.2s ease'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <hr style={{
          border: 'none',
          height: '1px',
          backgroundColor: theme.colors.border,
          margin: `${theme.spacing.md} ${theme.spacing.lg} 0`
        }} />

        {cart.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: `${theme.spacing.lg} 0`,
            color: theme.colors.textSecondary,
            fontSize: '1rem'
          }}>
            Your cart is empty
          </div>
        ) : (
          <>
            {cart.map((item) => {
              const itemTotal = item.pricePerKg * (item.qty || 1);
              return (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: theme.spacing.md,
                  marginBottom: theme.spacing.lg,
                  padding: theme.spacing.sm,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.sm,
                  alignItems: 'center'
                }}>
                  <img 
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: theme.radius.sm,
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <h6 style={{
                      ...theme.typography.body2,
                      fontWeight: 600,
                      margin: `0 0 ${theme.spacing.xs} 0`,
                      color: theme.colors.textPrimary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.name}
                    </h6>
                    <p style={{
                      ...theme.typography.caption,
                      color: theme.colors.textSecondary,
                      margin: `0 0 ${theme.spacing.xs} 0`
                    }}>
                      ₹{item.pricePerKg}/kg
                    </p>
                    <p style={{
                      ...theme.typography.body2,
                      color: theme.colors.success,
                      fontWeight: 700,
                      margin: 0
                    }}>
                      ₹{itemTotal.toFixed(2)}
                    </p>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    onMouseEnter={() => setDeleteHover({ [item.id]: true })}
                    onMouseLeave={() => setDeleteHover({ [item.id]: false })}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: theme.spacing.xs,
                      borderRadius: theme.radius.sm,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: deleteHover[item.id] ? theme.colors.error : theme.colors.textSecondary,
                      transition: 'all 0.2s ease',
                      minWidth: '40px',
                      minHeight: '40px'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              );
            })}

            <hr style={{
              border: 'none',
              height: '1px',
              backgroundColor: theme.colors.border,
              margin: `${theme.spacing.lg} 0`
            }} />

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.lg,
              padding: `0 ${theme.spacing.lg}`
            }}>
              <h6 style={{
                ...theme.typography.h6,
                color: theme.colors.textPrimary,
                margin: 0
              }}>
                Total:
              </h6>
              <h6 style={{
                ...theme.typography.h6,
                color: theme.colors.success,
                margin: 0
              }}>
                ₹{total.toFixed(2)}
              </h6>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              style={{
                width: '100%',
                backgroundColor: theme.colors.gold,
                color: theme.colors.textPrimary,
                fontWeight: 700,
                fontSize: '1rem',
                padding: `${theme.spacing.lg} 0`,
                borderRadius: theme.radius.lg,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: theme.shadows.md,
                fontFamily: theme.typography.fontFamily,
                minHeight: '56px'
              }}
            >
              Proceed to Checkout →
            </button>
          </>
        )}
      </div>

      {/* OVERLAY */}
      {open && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9998,
            cursor: 'pointer'
          }}
          onClick={onClose}
        />
      )}
    </>
  );
};

export default CartSidebar;
