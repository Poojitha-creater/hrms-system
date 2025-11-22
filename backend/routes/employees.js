// routes/employees.js
const express = require('express');
const Employee = require('../models/employee');
const auth = require('../middleware/auth');
const router = express.Router();

// list all
router.get('/', async (req, res) => {
  try {
    const list = await Employee.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// create
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, position, phone } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
    const e = await Employee.create({ name, email, position, phone });
    res.json(e);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const row = await Employee.findByPk(id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    await row.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;