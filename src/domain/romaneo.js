const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const Romaneo = sequelize.define("Romaneo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deposit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  depository: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detail: {
    type: DataTypes.JSONB,
    allowNull: false,
    // Structure: { licensePlate: string, driver: string, grossWeight: number, tareWeight: number, netWeight: number, liquidWeight: number }
  },
});

module.exports = Romaneo;
