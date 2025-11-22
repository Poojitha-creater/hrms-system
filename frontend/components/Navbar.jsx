import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
      <Link to="/employees" style={{ marginRight: "15px" }}>Employees</Link>
      <Link to="/add-employee" style={{ marginRight: "15px" }}>Add Employee</Link>
      <Link to="/teams" style={{ marginRight: "15px" }}>Teams</Link>
      <Link to="/assign" style={{ marginRight: "15px" }}>Assign Task</Link>
    </div>
  );
}

export default Navbar;