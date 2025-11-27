const About = () => {
  const theme = {
    colors: {
      primary: '#15803d',
      primaryLight: '#dcfce7',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      background: '#fefce8',
      surface: '#ffffff',
      border: 'rgba(21, 128, 61, 0.15)',
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      h2: { fontSize: '2.25rem', fontWeight: 800, color: '#15803d', marginBottom: '1.5rem' },
      h4: { fontSize: '1.5rem', fontWeight: 700, color: '#15803d', margin: '2.5rem 0 1.5rem 0' },
      lead: { fontSize: '1.125rem', lineHeight: 1.7, color: '#1f2937', marginBottom: '2rem' },
      listItem: { fontSize: '1.1rem', color: '#374151', marginBottom: '1rem', paddingLeft: '1.75rem', position: 'relative' }
    },
    layout: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem 1rem',
    },
    heroSection: {
      background: 'linear-gradient(135deg, #fefce8 0%, #dcfce7 100%)',
      borderRadius: '24px',
      padding: '3rem 2.5rem',
      marginBottom: '3rem',
      boxShadow: '0 20px 60px rgba(21, 128, 61, 0.15)',
      border: '1px solid rgba(21, 128, 61, 0.1)',
    },
    listItemIcon: {
      position: 'absolute',
      left: 0,
      top: '0.2rem',
      width: '20px',
      height: '20px',
      backgroundColor: '#15803d',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
    }
  };

  return (
    <main style={{ 
      fontFamily: theme.typography.fontFamily, 
      backgroundColor: theme.colors.background, 
      minHeight: '100vh' 
    }}>
      <div style={theme.layout}>
        {/* Hero Section */}
        <section style={theme.heroSection}>
          <h1 style={theme.typography.h2}>About FarmerMart</h1>
          <p style={theme.typography.lead}>
            FarmerMart is a <strong>farmer-first</strong> marketplace, connecting customers directly to 
            farmers with <strong>no middlemen</strong>. Our mission is to empower farmers with 
            <strong>fair prices</strong> while giving buyers fresh and authentic produce straight 
            from the fields.
          </p>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 style={theme.typography.h4}>Why Choose Us?</h2>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            maxWidth: '600px'
          }}>
            <li style={theme.typography.listItem}>
              <span style={theme.listItemIcon}>🌾</span>
              Fresh produce directly from farms
            </li>
            <li style={theme.typography.listItem}>
              <span style={theme.listItemIcon}>⚖️</span>
              No middleman price hikes
            </li>
            <li style={theme.typography.listItem}>
              <span style={theme.listItemIcon}>✅</span>
              Trusted farmer profiles & verified listings
            </li>
            <li style={theme.typography.listItem}>
              <span style={theme.listItemIcon}>🚚</span>
              Secure ordering and fast delivery
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default About;
