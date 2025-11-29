import React from "react";

const Footer = () => {
  const theme = {
    colors: {
      primary: '#15803d',
      primaryHover: '#166534',
      background: '#fefce8',
      surface: '#ffffff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      footerBg: '#1e293b', // Dark slate for footer
      footerText: '#f1f5f9', // Light text
      border: 'rgba(21, 128, 61, 0.15)',
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      body: { fontSize: '1rem', lineHeight: 1.6 },
      strong: { fontWeight: 700, color: '#10b981' }, // Green accent
    },
    spacing: {
      sm: '1rem', lg: '2rem', xl: '3rem'
    },
    radius: { sm: '8px' },
  };

  return (
    <footer style={{
      backgroundColor: theme.colors.footerBg,
      color: theme.colors.footerText,
      padding: `${theme.spacing.lg} ${theme.spacing.sm}`,
      marginTop: 'auto',
      borderTop: `1px solid ${theme.colors.border}`,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily,
      }}>
        <p style={{
          ...theme.typography.body,
          margin: 0,
          fontSize: '0.95rem',
          opacity: 0.9,
        }}>
          © 2025{' '}
          <strong style={{
            ...theme.typography.strong,
            fontSize: '1.05rem',
          }}>
            FarmerMart
          </strong>{' '}
          | Fresh from Farm to You
        </p>
      </div>
    </footer>
  );
};

export default Footer;
