import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all teams
  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:4000/teams");
      const data = await res.json();

      setTeams(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load teams");
      setLoading(false);
    }
  };

  // Add new team
  const handleAddTeam = async (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      return toast.error("Team name is required");
    }

    try {
      const res = await fetch("http://localhost:4000/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: teamName }),
      });

      if (!res.ok) {
        toast.error("Failed to add team");
        return;
      }

      toast.success("Team added successfully!");
      setTeamName("");
      fetchTeams();
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
        Loading teams...
      </h2>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Teams</h1>

      {/* ADD TEAM FORM */}
      <form style={styles.form} onSubmit={handleAddTeam}>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} type="submit">
          Add Team
        </button>
      </form>

      {/* TEAM LIST */}
      <div style={styles.grid}>
        {teams.length === 0 ? (
          <p style={styles.empty}>No teams available</p>
        ) : (
          teams.map((team) => (
            <div key={team.id} style={styles.teamCard}>
              <h3 style={styles.teamName}>{team.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ⭐ Styling
const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    padding: "40px 20px",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "12px",
    width: "250px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  teamCard: {
    background: "white",
    color: "#333",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
  },
  teamName: {
    fontSize: "20px",
    fontWeight: "600",
  },
  empty: {
    fontSize: "18px",
    color: "white",
  },
};

export default Teams;