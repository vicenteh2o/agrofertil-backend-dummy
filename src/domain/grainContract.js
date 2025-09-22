const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/database");

const ContractStatus = {
  A_ENTREGAR: "A entregar",
  ENTREGUE: "Entregue",
};

const GrainContract = sequelize.define("GrainContract", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contractNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contracted: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: Object.values(ContractStatus),
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
  delivered: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  toDeliver: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  withCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  withPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  averagePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  liquidated: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  toBeSettled: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  signed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = { GrainContract, ContractStatus };
