const { Sequelize } = require("sequelize");
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = require("../config/config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres connected");
  } catch (err) {
    console.error("Postgres connection error:", err);
    process.exit(1);
  }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;