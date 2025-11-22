// models/team.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.TEXT }
}, {
  tableName: 'teams'
});

module.exports = Team;