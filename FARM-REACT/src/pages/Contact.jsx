import React from 'react';

const theme = {
  colors: {
    primary: '#15803d',
    background: '#f9fafb',
    surface: '#ffffff',
    textPrimary: '#111827',
    textSecondary: '#4b5563',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h2: { fontSize: '2rem', fontWeight: 700, color: '#15803d', marginBottom: '1rem' },
    h5: { fontSize: '1.25rem', fontWeight: 700, color: '#15803d', marginTop: '2rem', marginBottom: '0.5rem' },
    lead: { fontSize: '1.125rem', color: '#374151', marginBottom: '2rem' },
    input: {
      width: '100%',
      padding: '10px 14px',
      fontSize: '1rem',
      borderRadius: '12px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      marginBottom: '1rem',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease',
    },
    textarea: {
      width: '100%',
      padding: '10px 14px',
      fontSize: '1rem',
      borderRadius: '12px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      marginBottom: '1.5rem',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease',
    },
    button: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '12px 24px',
      fontWeight: 700,
      fontSize: '1.125rem',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.3s ease',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
  },
  container: {
    maxWidth: '900px',
    margin: '3rem auto',
    padding: '0 1rem',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 20px 40px rgba(21, 128, 61, 0.1)',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  column: {
    flex: '1 1 45%',
    minWidth: '280px',
  },
  contactInfo: {
    color: '#374151',
    fontSize: '1rem',
    lineHeight: 1.6,
  }
};

const Contact = () => {
  const handleFocus = e => {
    e.target.style.borderColor = theme.colors.primary;
    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}33`;
  };
  const handleBlur = e => {
    e.target.style.borderColor = '#cbd5e1';
    e.target.style.boxShadow = 'none';
  };

  return (
    <main style={{ fontFamily: theme.typography.fontFamily, backgroundColor: theme.colors.background, minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={theme.container}>
        {/* Left Column: Contact Info */}
        <section style={theme.column}>
          <h1 style={theme.typography.h2}>Contact Us</h1>
          <p style={theme.typography.lead}>We would love to hear from you!</p>

          <div>
            <h2 style={theme.typography.h5}>Email</h2>
            <p style={theme.contactInfo}>support@farmermart.com</p>

            <h2 style={theme.typography.h5}>Phone</h2>
            <p style={theme.contactInfo}>+91 98765 43210</p>

            <h2 style={theme.typography.h5}>Address</h2>
            <p style={theme.contactInfo}>FarmerMart Headquarters, Vijayawada, Andhra Pradesh</p>
          </div>
        </section>

        {/* Right Column: Contact Form */}
        <section style={theme.column}>
          <h2 style={theme.typography.h5}>Send Message</h2>
          <form onSubmit={e => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              style={theme.typography.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-label="Your Name"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              style={theme.typography.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-label="Your Email"
            />
            <textarea 
              placeholder="Your Message" 
              required 
              rows={5} 
              style={theme.typography.textarea}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-label="Your Message"
            />
            <button 
              type="submit" 
              style={theme.typography.button}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = theme.typography.button.backgroundColor}
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Contact;
