const { GrainContract, ContractStatus } = require("../domain/grainContract");
const { Op } = require("sequelize");

// Create GrainContract
const createGrainContract = async (req, res) => {
  try {
    const contract = await GrainContract.create(req.body);
    res.status(201).json({ contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List GrainContracts with optional filters
const listGrainContracts = async (req, res) => {
  try {
    const { type, contractNumber } = req.query;
    const where = {};
    if (type) where.type = type;
    if (contractNumber) where.contractNumber = contractNumber;
    const contracts = await GrainContract.findAll({ where });
    const data = contracts.map(
      ({
        id,
        contractNumber,
        type,
        contracted,
        status,
        date,
        deposit,
        delivered,
        toDeliver,
        withCost,
        withPrice,
        averagePrice,
        liquidated,
        toBeSettled,
        signed,
      }) => ({
        id,
        contractNumber,
        type,
        contracted,
        status,
        date,
        deposit,
        delivered,
        toDeliver,
        withCost,
        withPrice,
        averagePrice,
        liquidated,
        toBeSettled,
        signed,
      })
    );
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update GrainContract
const updateGrainContract = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await GrainContract.findByPk(id);
    if (!contract)
      return res.status(404).json({ error: "GrainContract not found" });
    await contract.update(req.body);
    res.json({ contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete GrainContract
const deleteGrainContract = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await GrainContract.findByPk(id);
    if (!contract)
      return res.status(404).json({ error: "GrainContract not found" });
    await contract.destroy();
    res.json({ message: "GrainContract deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createGrainContract,
  listGrainContracts,
  updateGrainContract,
  deleteGrainContract,
  ContractStatus,
};
