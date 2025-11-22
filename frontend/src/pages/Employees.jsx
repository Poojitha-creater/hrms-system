import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employees
  const getEmployees = async () => {
    try {
      const res = await fetch("http://localhost:4000/employees");
      const data = await res.json();

      setEmployees(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load employees");
      setLoading(false);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    const res = await fetch(`http://localhost:4000/employees/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Employee deleted");
      getEmployees();
    } else {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#2563eb", fontSize: "20px" }}>
        Loading employees...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee List</h1>

      {employees.length === 0 ? (
        <p style={styles.empty}>No employees found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td style={styles.td}>{emp.id}</td>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    paddingTop: "40px",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    paddingBottom: "50px",
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  tableWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  table: {
    width: "80%",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    color: "#333",
  },
  th: {
    background: "#2563eb",
    color: "white",
    padding: "12px",
    fontSize: "16px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  deleteBtn: {
    background: "#dc2626",
    border: "none",
    padding: "8px 14px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
  empty: {
    color: "white",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default Employees;