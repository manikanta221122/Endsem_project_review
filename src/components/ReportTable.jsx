import React from "react";

function ReportTable({ data, deleteItem, setSelectedInvoice }) {
  return (
    <div>
      <h2>📋 Report Table</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Total (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>

                <td>
                  {/* 🧾 View Invoice */}
                  <button
                    onClick={() => setSelectedInvoice(item)}
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      background: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>

                  {/* ❌ Delete */}
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{
                      padding: "5px 10px",
                      background: "#ff4d4d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;