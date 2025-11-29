// src/farmer/FarmerOrders.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import theme from "../theme/ordersTheme";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/api/orders/farmer/${user.id}`).then((res) => setOrders(res.data));
  }, [user.id]);

  const acceptOrder = (id) => {
    API.put(`/api/orders/${id}/accept`).then(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "ACCEPTED" } : o))
      );
    });
  };

  const getBadgeStyle = (status) =>
    status === "PENDING" ? theme.badge.warning : theme.badge.success;

  return (
    <main
      style={{
        ...theme.layout,
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <h3 style={theme.typography.h3}>Customer Orders</h3>

      <table style={theme.table.container}>
        <thead>
          <tr>
            <th style={theme.table.th}>Product</th>
            <th style={theme.table.th}>Qty</th>
            <th style={theme.table.th}>Total</th>
            <th style={theme.table.th}>Status</th>
            <th style={theme.table.th}>Action</th>
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
                <span style={{ ...theme.badge.base, ...getBadgeStyle(o.status) }}>
                  {o.status}
                </span>
              </td>

              <td style={theme.table.td}>
                {o.status === "PENDING" && (
                  <button
                    style={{
                      padding: "7px 16px",
                      fontSize: "0.85rem",
                      borderRadius: "8px",
                      background: theme.colors.primary,
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => acceptOrder(o.id)}
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default FarmerOrders;
