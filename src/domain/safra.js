const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const Safra = sequelize.define("Safra", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Safra;
