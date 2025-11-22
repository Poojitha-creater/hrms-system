// routes/assign.js
const express = require('express');
const Employee = require('../models/employee');
const Team = require('../models/team');
const EmployeeTeam = require('../models/employeeTeam');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { employeeId, teamId } = req.body;
    if (!employeeId || !teamId) return res.status(400).json({ error: 'employeeId and teamId required' });

    const emp = await Employee.findByPk(employeeId);
    const team = await Team.findByPk(teamId);
    if (!emp || !team) return res.status(404).json({ error: 'Employee or Team not found' });

    // create association (if not exists)
    const [link, created] = await EmployeeTeam.findOrCreate({
      where: { employeeId, teamId }
    });
    res.json({ message: created ? 'Assigned' : 'Already assigned', link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;