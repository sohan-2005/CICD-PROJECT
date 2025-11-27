// src/buyer/BuyerOrders.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import theme from "../theme/ordersTheme";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/api/orders/buyer/${user.id}`).then((res) => setOrders(res.data));
  }, [user.id]);

  const statusColor = (status) => {
    if (status === "PENDING") return theme.badge.warning;
    if (status === "DELIVERED") return theme.badge.success;
    return theme.badge.info;
  };

  return (
    <main
      style={{
        ...theme.layout,
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <h3 style={theme.typography.h3}>My Orders</h3>

      {orders.length === 0 ? (
        <div
          style={{
            background: theme.colors.surface,
            padding: "4rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: "3rem", opacity: 0.5 }}>📦</div>
          <h4 style={theme.typography.h4}>No orders yet</h4>
          <p style={theme.typography.small}>Start shopping to see your orders here</p>
        </div>
      ) : (
        <table style={theme.table.container}>
          <thead>
            <tr>
              <th style={theme.table.th}>Product</th>
              <th style={theme.table.th}>Qty</th>
              <th style={theme.table.th}>Total</th>
              <th style={theme.table.th}>Status</th>
              <th style={theme.table.th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                style={theme.table.rowHover}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={theme.table.td}>{o.productName}</td>
                <td style={theme.table.td}>{o.quantity} kg</td>
                <td style={theme.table.td}>₹{o.totalPrice}</td>
                <td style={theme.table.td}>
                  <span style={{ ...theme.badge.base, ...statusColor(o.status) }}>
                    {o.status}
                  </span>
                </td>
                <td style={theme.table.td}>
                  {new Date(o.orderDate).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default BuyerOrders;
