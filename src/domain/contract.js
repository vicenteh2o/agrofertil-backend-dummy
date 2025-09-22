const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const Contract = sequelize.define("Contract", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  toDeliver: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  delivered: {
    type: DataTypes.JSONB,
    allowNull: false,
    // Structure: { withCost, withPrice, liquidated, toBeSettled, total }
  },
});

module.exports = Contract;
