import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit register form
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }
    if (!formData.email.includes("@")) {
      return toast.error("Enter valid email");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Registration failed");
      } else {
        toast.success("Registered successfully!");
        setTimeout(() => navigate("/"), 1500); // redirect to login
      }
    } catch (err) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <Toaster />

      <h1 style={styles.title}>Create Account</h1>

      <form style={styles.form} onSubmit={handleRegister}>
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="name"
          style={styles.input}
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
        />

        <label style={styles.label}>Email Address</label>
        <input
          type="email"
          name="email"
          style={styles.input}
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          style={styles.input}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          style={styles.input}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={styles.linkText}>
        Already have an account?{" "}
        <span
          style={styles.link}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

// ⭐ Modern Blue UI Styles
const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px",
    color: "white",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  form: {
    width: "350px",
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    color: "#333",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  linkText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#fdfdfd",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Register;