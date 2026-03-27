import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReportTable from "./components/ReportTable";
import AddItem from "./components/AddItem";
import SearchBar from "./components/SearchBar";
import { loadData, saveData } from "./utils/localStorage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Invoice from "./components/Invoice";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // 🌙 THEME
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 📦 LOAD DATA
  useEffect(() => {
    const loaded = loadData();

    const safeData = loaded.map((item) => ({
      ...item,
      quantity: item.quantity || 0,
      price: item.price || 0,
    }));

    setTimeout(() => {
      setData(safeData);
      setLoading(false);
    }, 1000);
  }, []);

  // 💾 SAVE DATA
  useEffect(() => {
    saveData(data);
  }, [data]);

  // ➕ ADD ITEM
  const addItem = (item) => {
    if (!item.name || item.price <= 0 || item.quantity <= 0) {
      toast.error("❌ Invalid input!");
      return;
    }

    setLoading(true);

    const newItem = {
      id: Date.now(),
      name: item.name,
      quantity: Number(item.quantity),
      price: Number(item.price),
      date: new Date().toLocaleString(),
    };

    setTimeout(() => {
      setData((prev) => [...prev, newItem]);
      setSelectedInvoice(newItem);
      setLoading(false);
      toast.success("✅ Item added!");
    }, 500);
  };

  // ❌ DELETE ITEM
  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
    toast.info("🗑️ Item deleted");
  };

  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔐 DASHBOARD
  const Dashboard = () => {
    // 🔄 LOADING
    if (loading) {
      return (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      );
    }

    // 📊 SUMMARY
    const totalItems = data.length;
    const totalQuantity = data.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalAmount = data.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    return (
      <div className="container dashboard">
        <h1>📊 Report Generator</h1>

        {/* 📊 SUMMARY CARDS */}
        <div className="summary">
          <div className="card">
            <h3>Total Items</h3>
            <p>{totalItems}</p>
          </div>

          <div className="card">
            <h3>Total Quantity</h3>
            <p>{totalQuantity}</p>
          </div>

          <div className="card">
            <h3>Total Amount</h3>
            <p>₹{totalAmount}</p>
          </div>
        </div>

        {/* 🌙 THEME */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="theme-btn"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("isAuth");
            setIsAuth(false);
            toast.success("Logged out!");
          }}
          className="logout-btn"
        >
          Logout
        </button>

        <SearchBar search={search} setSearch={setSearch} />

        <AddItem addItem={addItem} />

        <ReportTable
          data={filteredData}
          deleteItem={deleteItem}
          setSelectedInvoice={setSelectedInvoice}
        />

        {/* 🧾 INVOICE */}
        {selectedInvoice && (
          <Invoice
            invoice={selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
          />
        )}
      </div>
    );
  };

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>

        {/* 🔔 TOAST */}
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    </Router>
  );
}

export default App;