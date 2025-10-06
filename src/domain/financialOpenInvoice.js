const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const FinancialOpenInvoice = sequelize.define("FinancialOpenInvoice", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expired: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  toExpire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = FinancialOpenInvoice;
