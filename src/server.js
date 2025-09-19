const express = require("express");
const cors = require("cors");
const { connectDB } = require("./infrastructure/database");
const sequelize = require("./infrastructure/database");
const routes = require("./interfaces/routes");
const User = require("./domain/user");
const { PORT } = require("./config/config");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/auth", routes);

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
