// models/employee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  position: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
}, {
  tableName: 'employees'
});

module.exports = Employee;