import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AssignTask() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:4000/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      toast.error("Failed to load employees");
    }
  };

  // Fetch teams
  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:4000/teams");
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      toast.error("Failed to load teams");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchTeams();
  }, []);

  // Assign employee to team
  const handleAssign = async (e) => {
    e.preventDefault();

    if (!employeeId || !teamId) {
      return toast.error("Select both employee and team");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, teamId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Assignment failed");
      } else {
        toast.success("Task assigned successfully!");
        setEmployeeId("");
        setTeamId("");
      }
    } catch (err) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Assign Employee to Team</h1>

      <div style={styles.card}>
        <form onSubmit={handleAssign}>

          {/* Employee Dropdown */}
          <label style={styles.label}>Select Employee</label>
          <select
            style={styles.select}
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">-- Choose Employee --</option>
            {employees.map((emp) => (
              <option value={emp.id} key={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>

          {/* Team Dropdown */}
          <label style={styles.label}>Select Team</label>
          <select
            style={styles.select}
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
          >
            <option value="">-- Choose Team --</option>
            {teams.map((team) => (
              <option value={team.id} key={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <button style={styles.button} disabled={loading}>
            {loading ? "Assigning..." : "Assign"}
          </button>

        </form>
      </div>
    </div>
  );
}

// ⭐ Styling
const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2563eb, #06b6d4)",
    textAlign: "center",
    paddingTop: "50px",
    color: "white",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  card: {
    width: "380px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    color: "#333",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  },
  label: {
    display: "block",
    textAlign: "left",
    marginBottom: "5px",
    marginTop: "15px",
    fontWeight: "600",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "15px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default AssignTask;