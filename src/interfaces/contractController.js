const Contract = require("../domain/contract");

// Create Contract
const createContract = async (req, res) => {
  const { total, toDeliver, delivered } = req.body;
  try {
    if (
      typeof total !== "number" ||
      typeof toDeliver !== "number" ||
      typeof delivered !== "object"
    ) {
      return res.status(400).json({ error: "Invalid or missing fields" });
    }
    const validKeys = [
      "withCost",
      "withPrice",
      "liquidated",
      "toBeSettled",
      "total",
    ];
    const deliveredKeys = Object.keys(delivered);
    if (
      deliveredKeys.length !== validKeys.length ||
      !validKeys.every((key) => deliveredKeys.includes(key)) ||
      !deliveredKeys.every((key) => validKeys.includes(key))
    ) {
      return res.status(400).json({
        error:
          "Delivered object must have only: withCost, withPrice, liquidated, toBeSettled, total",
      });
    }
    for (const key of validKeys) {
      if (typeof delivered[key] !== "number") {
        return res
          .status(400)
          .json({ error: `Delivered.${key} must be a number` });
      }
    }
    const contract = await Contract.create({ total, toDeliver, delivered });
    res.status(201).json({ contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Contracts (optionally filter by id)
const listContracts = async (req, res) => {
  try {
    const { id } = req.query;
    let contracts;
    if (id) {
      const contract = await Contract.findByPk(id);
      // remove createdAt and updatedAt from response
      delete contract?.dataValues.createdAt;
      delete contract?.dataValues.updatedAt;
      contracts = contract ? contract : null;
    } else {
      contracts = await Contract.findAll();
    }
    res.json({ data: contracts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Contract
const updateContract = async (req, res) => {
  const { id } = req.params;
  const { total, toDeliver, delivered } = req.body;
  try {
    const contract = await Contract.findByPk(id);
    if (!contract) return res.status(404).json({ error: "Contract not found" });
    if (total !== undefined) contract.total = total;
    if (toDeliver !== undefined) contract.toDeliver = toDeliver;
    if (delivered !== undefined) {
      const validKeys = [
        "withCost",
        "withPrice",
        "liquidated",
        "toBeSettled",
        "total",
      ];
      const deliveredKeys = Object.keys(delivered);
      if (
        deliveredKeys.length !== validKeys.length ||
        !validKeys.every((key) => deliveredKeys.includes(key)) ||
        !deliveredKeys.every((key) => validKeys.includes(key))
      ) {
        return res.status(400).json({
          error:
            "Delivered object must have only: withCost, withPrice, liquidated, toBeSettled, total",
        });
      }
      for (const key of validKeys) {
        if (typeof delivered[key] !== "number") {
          return res
            .status(400)
            .json({ error: `Delivered.${key} must be a number` });
        }
      }
      contract.delivered = delivered;
    }
    await contract.save();
    res.json({ contract });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Contract
const deleteContract = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await Contract.findByPk(id);
    if (!contract) return res.status(404).json({ error: "Contract not found" });
    await contract.destroy();
    res.json({ message: "Contract deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createContract,
  listContracts,
  updateContract,
  deleteContract,
};
