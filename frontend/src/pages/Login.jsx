import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Login Successful!");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);

    } catch (err) {
      toast.error("Network Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>HRMS Login</h2>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <p style={styles.signupText}>
          Don’t have an account? <a href="/register" style={styles.link}>Register</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    background: "linear-gradient(to bottom right, #4f7df5, #62b7ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#2a62ff",
  },
  label: {
    float: "left",
    marginBottom: "5px",
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    backgroundColor: "#2a62ff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  signupText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#2a62ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;