import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const FarmerNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);

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
      brand: { fontSize: '1.5rem', fontWeight: 800 },
      nav: { fontSize: '1rem', fontWeight: 500 },
    },
    spacing: {
      sm: '1rem', md: '1.5rem', lg: '2rem'
    },
    radius: { sm: '8px' },
    shadows: {
      sm: '0 2px 10px rgba(0,0,0,0.08)',
      md: '0 10px 30px rgba(0,0,0,0.12)'
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { to: "/farmer/products", label: "My Products" },
    { to: "/farmer/orders", label: "Orders" }
  ];

  return (
    <nav 
      ref={navRef}
      style={{
        backgroundColor: theme.colors.primary,
        boxShadow: theme.shadows.sm,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: `1px solid ${theme.colors.border}`
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0.75rem ${theme.spacing.md}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* BRAND */}
        <Link 
          to="/farmer/dashboard"
          style={{
            ...theme.typography.brand,
            color: theme.colors.surface,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.75rem',
            letterSpacing: '-0.025em'
          }}
        >
          FarmerMart
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer',
            '@media (max-width: 991px)': {
              display: 'block'
            }
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={theme.colors.surface} 
            strokeWidth="2"
            style={{ display: 'block' }}
          >
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          {isOpen && (
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke={theme.colors.surface} 
              strokeWidth="2"
              style={{ display: 'block', position: 'absolute' }}
            >
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          )}
        </button>

        {/* NAV ITEMS */}
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: theme.spacing.md,
          alignItems: 'center'
        }}>
          {navItems.map((item) => (
            <li key={item.to} style={{ margin: 0 }}>
              <Link
                to={item.to}
                onMouseEnter={() => setHoveredLink(item.to)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  ...theme.typography.nav,
                  color: theme.colors.surface,
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: theme.radius.sm,
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  fontWeight: 500,
                  ...(hoveredLink === item.to && {
                    backgroundColor: theme.colors.primaryHover,
                  })
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          style={{
            padding: '0.625rem 1.5rem',
            backgroundColor: theme.colors.surface,
            color: theme.colors.primary,
            textDecoration: 'none',
            border: 'none',
            borderRadius: theme.radius.sm,
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.25s ease',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: theme.typography.fontFamily,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Logout ({user?.name || 'User'})
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{
          backgroundColor: theme.colors.primaryLight,
          borderTop: `1px solid ${theme.colors.border}`,
          padding: `${theme.spacing.md} 0`
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: `0 ${theme.spacing.md}`
          }}>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    style={{
                      ...theme.typography.nav,
                      color: theme.colors.primary,
                      textDecoration: 'none',
                      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                      display: 'block',
                      borderRadius: theme.radius.sm,
                      transition: 'all 0.2s ease',
                      fontWeight: 500
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.primary,
                    textDecoration: 'none',
                    border: 'none',
                    borderRadius: theme.radius.sm,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: theme.typography.fontFamily
                  }}
                >
                  Logout ({user?.name || 'User'})
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default FarmerNavbar;
