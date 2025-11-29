import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const theme = {
  colors: {
    primary: '#15803d',
    success: '#10b981',
    danger: '#ef4444',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    background: '#f9fafb',
    surface: '#ffffff',
    border: '#d1d5db',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h5: { fontSize: '1.5rem', fontWeight: 700, color: '#15803d', marginBottom: '1rem' },
    label: { fontWeight: 600, fontSize: '1rem', marginBottom: '6px', display: 'block' },
    input: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      marginBottom: '1rem',
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box',
      resize: 'vertical',
      minHeight: '80px',
      marginBottom: '1rem',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
    button: {
      backgroundColor: '#10b981',
      color: '#fff',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 700,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    },
    alert: {
      padding: '12px 16px',
      borderRadius: '10px',
      marginBottom: '1rem',
      fontWeight: 600,
      fontSize: '1rem',
    },
    alertError: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      border: '1px solid #f87171',
    },
    alertSuccess: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #34d399',
    },
  },
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem 3rem',
    boxShadow: '0 10px 30px rgba(22, 101, 52, 0.1)',
  }
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '', category: '', quantity: '', pricePerKg: '', description: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('quantity', formData.quantity);
    data.append('pricePerKg', formData.pricePerKg);
    data.append('description', formData.description);
    data.append('farmerId', user.id);
    if (image) data.append('image', image);

    try {
      await API.post('/api/products', data);
      setSuccess('Product added!');
      setTimeout(() => navigate('/farmer/products'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Failed to add product');
    }
  };

  return (
    <main style={{ fontFamily: theme.typography.fontFamily, backgroundColor: theme.colors.background, minHeight: '100vh', padding: '3rem 1rem' }}>
      <section style={theme.container}>
        <h1 style={theme.typography.h5}>Add New Product</h1>
        {error && <div style={{...theme.typography.alert, ...theme.typography.alertError}}>{error}</div>}
        {success && <div style={{...theme.typography.alert, ...theme.typography.alertSuccess}}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <label style={theme.typography.label} htmlFor="name">Name</label>
          <input 
            id="name"
            name="name"
            type="text"
            required
            onChange={handleChange}
            style={theme.typography.input}
            value={formData.name}
          />

          <label style={theme.typography.label} htmlFor="category">Category</label>
          <input 
            id="category"
            name="category"
            type="text"
            required
            onChange={handleChange}
            style={theme.typography.input}
            value={formData.category}
          />

          <label style={theme.typography.label} htmlFor="quantity">Quantity (kg)</label>
          <input 
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            required
            onChange={handleChange}
            style={theme.typography.input}
            value={formData.quantity}
          />

          <label style={theme.typography.label} htmlFor="pricePerKg">Price per kg</label>
          <input 
            id="pricePerKg"
            name="pricePerKg"
            type="number"
            min="0"
            required
            onChange={handleChange}
            style={theme.typography.input}
            value={formData.pricePerKg}
          />

          <label style={theme.typography.label} htmlFor="description">Description</label>
          <textarea 
            id="description"
            name="description"
            rows={3}
            onChange={handleChange}
            style={theme.typography.textarea}
            value={formData.description}
          />

          <label style={theme.typography.label} htmlFor="image">Product Image</label>
          <input 
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={{ marginBottom: '1.5rem' }}
          />

          <button type="submit" style={theme.typography.button} 
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#0f766e'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = theme.colors.success}
          >
            Add Product
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddProduct;
