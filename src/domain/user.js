const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  ruc: { type: DataTypes.STRING, allowNull: false, unique: true }, // no editable
  email: { type: DataTypes.STRING, allowNull: false, unique: true }, // editable
  phone: { type: DataTypes.STRING, allowNull: true }, // editable
  address: { type: DataTypes.STRING, allowNull: true }, // editable
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;
