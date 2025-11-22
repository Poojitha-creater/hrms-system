const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/employees"));
app.use("/teams", require("./routes/teams"));
app.use("/assign", require("./routes/assign"));

app.get("/", (req, res) => {
  res.send("HRMS Backend Running Successfully");
});

sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.log("DB Error:", err));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});