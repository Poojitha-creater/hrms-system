// routes/teams.js
const express = require('express');
const Team = require('../models/team');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const list = await Team.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const t = await Team.create({ name, description });
    res.json(t);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;