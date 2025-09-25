const express = require("express");
const router = express.Router();

const {
  createGrainContract,
  listGrainContracts,
  updateGrainContract,
  deleteGrainContract,
} = require("./grainContractController");

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

const {
  createContract,
  listContracts,
  updateContract,
  deleteContract,
} = require("./contractController");

const {
  createRomaneoSummary,
  listRomaneoSummaries,
  updateRomaneoSummary,
  deleteRomaneoSummary,
} = require("./romaneoSummaryController");

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

// Contract CRUD endpoints
router.post("/contracts", createContract);
router.get("/contracts", listContracts); // filter by id with ?id=...
router.patch("/contracts/:id", updateContract);
router.delete("/contracts/:id", deleteContract);

// GrainContract CRUD endpoints
router.post("/grain-contracts", createGrainContract);
router.get("/grain-contracts", listGrainContracts); // filter by ?type=...&contractNumber=...
router.patch("/grain-contracts/:id", updateGrainContract);
router.delete("/grain-contracts/:id", deleteGrainContract);

// RomaneoSummary CRUD endpoints
router.post("/romaneo-summaries", createRomaneoSummary);
router.get("/romaneo-summaries", listRomaneoSummaries);
router.patch("/romaneo-summaries/:id", updateRomaneoSummary);
router.delete("/romaneo-summaries/:id", deleteRomaneoSummary);

module.exports = router;
