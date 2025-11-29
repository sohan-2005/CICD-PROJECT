import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [heroHover, setHeroHover] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);

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
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      h1: { fontSize: '2.75rem', fontWeight: 800, lineHeight: 1.2 },
      h2: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.3 },
      h3: { fontSize: '1.875rem', fontWeight: 700 },
      h4: { fontSize: '1.25rem', fontWeight: 600 },
      lead: { fontSize: '1.125rem', lineHeight: 1.6 },
      body: { fontSize: '1rem', lineHeight: 1.6 },
    },
    spacing: {
      xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem'
    },
    radius: { sm: '8px', lg: '16px' },
    shadows: {
      md: '0 10px 30px rgba(0,0,0,0.12)',
      card: '0 8px 25px rgba(21,128,61,0.15)'
    }
  };

  return (
    <div style={{
      fontFamily: theme.typography.fontFamily,
      backgroundColor: theme.colors.background,
      color: theme.colors.textPrimary,
      margin: 0,
      padding: 0,
      minHeight: '100vh'
    }}>
      
      {/* HERO SECTION */}
      <section style={{
        backgroundColor: theme.colors.primaryLight,
        padding: `${theme.spacing.xl} ${theme.spacing.sm}`,
        textAlign: 'center',
        marginBottom: theme.spacing.xl
      }}>
        <div style={{ 
          maxWidth: '640px', 
          margin: '0 auto' 
        }}>
          <h1 style={{
            ...theme.typography.h1,
            color: theme.colors.primary,
            marginBottom: theme.spacing.md,
            letterSpacing: '-0.025em'
          }}>
            Fresh Produce Directly From Farmers
          </h1>
          <p style={{
            ...theme.typography.lead,
            color: theme.colors.textSecondary,
            margin: `0 auto ${theme.spacing.lg} auto`,
            maxWidth: '520px'
          }}>
            Cut out middlemen. Support farmers. Get the freshest food delivered to your home.
          </p>
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              backgroundColor: heroHover ? theme.colors.primaryHover : theme.colors.primary,
              color: theme.colors.surface,
              fontWeight: 600,
              fontSize: '1.1rem',
              textDecoration: 'none',
              borderRadius: theme.radius.lg,
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: theme.shadows.md,
              minHeight: '52px',
              border: 'none'
            }}
            onMouseEnter={() => setHeroHover(true)}
            onMouseLeave={() => setHeroHover(false)}
          >
            Go to Shop →
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        maxWidth: '1200px',
        margin: `0 auto ${theme.spacing.xl} auto`,
        padding: `0 ${theme.spacing.sm}`
      }}>
        <h2 style={{
          ...theme.typography.h2,
          textAlign: 'center',
          color: theme.colors.primary,
          marginBottom: theme.spacing.xl,
          letterSpacing: '-0.02em'
        }}>
          Why FarmerMart?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing.lg,
          justifyItems: 'center'
        }}>
          <div style={{
            backgroundColor: theme.colors.surface,
            padding: `${theme.spacing.lg}`,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadows.card,
            border: `1px solid ${theme.colors.border}`,
            maxWidth: '320px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <h4 style={{
              ...theme.typography.h4,
              color: theme.colors.primary,
              marginBottom: theme.spacing.sm
            }}>
              💰 Fair Prices
            </h4>
            <p style={theme.typography.body}>
              Farmers earn more, customers pay less.
            </p>
          </div>
          
          <div style={{
            backgroundColor: theme.colors.surface,
            padding: `${theme.spacing.lg}`,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadows.card,
            border: `1px solid ${theme.colors.border}`,
            maxWidth: '320px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <h4 style={{
              ...theme.typography.h4,
              color: theme.colors.primary,
              marginBottom: theme.spacing.sm
            }}>
              🌾 Fresh & Organic
            </h4>
            <p style={theme.typography.body}>
              Straight from the fields to your doorstep.
            </p>
          </div>
          
          <div style={{
            backgroundColor: theme.colors.surface,
            padding: `${theme.spacing.lg}`,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadows.card,
            border: `1px solid ${theme.colors.border}`,
            maxWidth: '320px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <h4 style={{
              ...theme.typography.h4,
              color: theme.colors.primary,
              marginBottom: theme.spacing.sm
            }}>
              🔒 Secure Orders
            </h4>
            <p style={theme.typography.body}>
              Safe and reliable buying experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.surface,
        textAlign: 'center',
        padding: `${theme.spacing.xl} ${theme.spacing.sm}`
      }}>
        <h3 style={{
          ...theme.typography.h3,
          marginBottom: theme.spacing.md
        }}>
          Are you a Farmer?
        </h3>
        <p style={{
          ...theme.typography.lead,
          marginBottom: theme.spacing.xl,
          opacity: 0.95
        }}>
          Join us and sell your crops directly to customers.
        </p>
        <Link
          to="/register"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            backgroundColor: ctaHover ? '#ffffff' : theme.colors.primaryLight,
            color: ctaHover ? theme.colors.primary : theme.colors.primary,
            fontWeight: 600,
            fontSize: '1.1rem',
            textDecoration: 'none',
            borderRadius: theme.radius.lg,
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: theme.shadows.md,
            border: '2px solid transparent',
            minHeight: '52px'
          }}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
        >
          Register Now →
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
