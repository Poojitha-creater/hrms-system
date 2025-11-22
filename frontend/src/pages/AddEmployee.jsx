import React, { useState } from "react";
import toast from "react-hot-toast";

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }
    if (!formData.email.includes("@")) {
      return toast.error("Enter a valid email");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to add employee");
      } else {
        toast.success("Employee added successfully!");
        setFormData({ name: "", email: "" }); // reset form
      }
    } catch (err) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add New Employee</h1>

      <form style={styles.form} onSubmit={handleAddEmployee}>
        <label style={styles.label}>Full Name</label>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Enter employee name"
          value={formData.name}
          onChange={handleChange}
        />

        <label style={styles.label}>Email Address</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Enter employee email"
          value={formData.email}
          onChange={handleChange}
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

// ⭐ Modern blue UI styles
const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #06b6d4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
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
};

export default AddEmployee;