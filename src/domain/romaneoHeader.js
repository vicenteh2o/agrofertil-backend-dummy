const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const RomaneoHeader = sequelize.define("RomaneoHeader", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deposits: {
    type: DataTypes.JSONB,
    allowNull: false,
    // Structure: [string, string, ...]
  },
  depositors: {
    type: DataTypes.JSONB,
    allowNull: false,
    // Structure: [{ depositName: string, name: string, value: number }, ...]
  },
});

module.exports = RomaneoHeader;
