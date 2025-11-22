const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Log = sequelize.define("Log", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false },
  details: { type: DataTypes.TEXT }
});

module.exports = Log;