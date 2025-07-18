import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
      } else {
        toast.success("Login successful!", {
          onClose: () => navigate("/dashboard"),
          autoClose: 2000,
        });
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login to ChatGPT</h2>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Continue</button>

        <p>
          Don’t have an account?{" "}
          <span className="link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </form>

      {/* Toast notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Login;
