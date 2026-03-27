import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    // 🔐 Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ❌ Check if user already exists
    const userExists = users.find((user) => user.email === data.email);

    if (userExists) {
      alert("User already exists");
      return;
    }

    // ✅ Save new user
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login");

    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          onChange={handleChange}
        />

        <button type="submit">Signup</button>

        <p className="switch-text" onClick={() => navigate("/")}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Signup;