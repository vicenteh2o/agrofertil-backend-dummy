const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const RomaneoSummary = sequelize.define("RomaneoSummary", {
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
    // Structure: [{ name: string, value: number }, ...]
  },
});

module.exports = RomaneoSummary;
