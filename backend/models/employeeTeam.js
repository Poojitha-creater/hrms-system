// models/employeeTeam.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employee = require('./employee');
const Team = require('./team');

const EmployeeTeam = sequelize.define('EmployeeTeam', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
}, {
  tableName: 'employee_teams'
});

// associations (will create employeeId and teamId foreign keys)
Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: 'employeeId' });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: 'teamId' });

module.exports = EmployeeTeam;