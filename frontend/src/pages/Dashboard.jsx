import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>HRMS Dashboard</h1>

        <p style={styles.subtitle}>Welcome to the Admin Panel</p>

        <div style={styles.buttons}>
          <button style={styles.btn} onClick={() => navigate("/employees")}>
            View Employees
          </button>

          <button style={styles.btn} onClick={() => navigate("/add-employee")}>
            Add Employee
          </button>

          <button style={styles.btn} onClick={() => navigate("/teams")}>
            Manage Teams
          </button>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: "white",
  },
  card: {
    width: "420px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#333",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2563eb",
  },
  subtitle: {
    marginTop: "5px",
    fontSize: "16px",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  btn: {
    padding: "12px",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "12px",
    background: "#dc2626",
    color: "white",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Dashboard;