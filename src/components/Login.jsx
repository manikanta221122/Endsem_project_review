import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    // 🔐 Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔍 Check user
    const validUser = users.find(
      (user) =>
        user.email === data.email && user.password === data.password
    );

    if (!validUser) {
      alert("Invalid Email or Password");
      return;
    }

    // ✅ Save login session
    localStorage.setItem("isAuth", "true");

    setIsAuth(true);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p className="switch-text" onClick={() => navigate("/signup")}>
          Don't have an account? Signup
        </p>
      </form>
    </div>
  );
};

export default Login;