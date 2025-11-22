// models/index.js — central model loader and exports
// This file should not create an Express app or start the server.
// It loads model definitions and associations, then exports them along with `sequelize`.

const sequelize = require('../config/db');

const Employee = require('./employee');
const Team = require('./team');
const User = require('./user');
const EmployeeTeam = require('./employeeTeam');
const Log = require('./log');

// Export sequelize and all models for use elsewhere (e.g. the server entrypoint)
module.exports = {
  sequelize,
  Employee,
  Team,
  User,
  EmployeeTeam,
  Log,
};