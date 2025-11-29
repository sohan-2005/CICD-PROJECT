// src/theme/ordersTheme.js

// 🎨 Shared Colors
const colors = {
  primary: "#15803d",
  primaryLight: "#dcfce7",
  success: "#10b981",
  warning: "#f59e0b",
  info: "#3b82f6",
  textPrimary: "#111827",
  textSecondary: "#6b7280",
  background: "#f9fafb",
  surface: "#ffffff",
  border: "#d1d5db",
};

// 🅰 Fonts & Typography
const typography = {
  fontFamily: "'Inter', system-ui, sans-serif",
  h3: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: colors.primary,
    marginBottom: "1.5rem",
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: colors.primary,
    marginBottom: "1rem",
  },
  body: { fontSize: "0.95rem", color: colors.textPrimary },
  small: { fontSize: "0.85rem", color: colors.textSecondary },
};

// 📐 Layout & Container
const layout = {
  maxWidth: "1200px",
  padding: "2rem 1rem",
  minHeight: "100vh",
  margin: "0 auto",
};

// 📋 Table Styles
const table = {
  container: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: colors.surface,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },
  th: {
    textAlign: "left",
    padding: "1rem 1.25rem",
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    fontWeight: 700,
    fontSize: "0.9rem",
    borderBottom: `2px solid ${colors.border}`,
    textTransform: "uppercase",
  },
  td: {
    padding: "1rem 1.25rem",
    borderBottom: `1px solid ${colors.border}`,
    fontSize: "0.95rem",
    color: colors.textPrimary,
  },
  rowHover: {
    transition: "background-color 0.2s ease",
  },
};

// 🟩 Status Badges
const badge = {
  base: {
    padding: "6px 12px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "#fff",
    display: "inline-block",
  },
  warning: { backgroundColor: colors.warning },
  success: { backgroundColor: colors.success },
  info: { backgroundColor: colors.info },
};

// 🎁 Export
const ordersTheme = { colors, typography, layout, table, badge };
export default ordersTheme;
