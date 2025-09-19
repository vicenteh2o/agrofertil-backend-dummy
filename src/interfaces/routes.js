const express = require("express");
const {
  register,
  login,
  recoverPassword,
  updateUser,
  getUser,
} = require("./authController");

const {
  createSafra,
  listSafras,
  updateSafra,
  deleteSafra,
} = require("./safraController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Password recovery endpoint
router.post("/recover-password", recoverPassword);

// User update endpoint
router.patch("/user/:id", updateUser);

// Get user data endpoint
router.get("/user/:id", getUser);

// Safra CRUD endpoints
router.post("/safras", createSafra);
router.get("/safras", listSafras);
router.patch("/safras/:id", updateSafra);
router.delete("/safras/:id", deleteSafra);

module.exports = router;
