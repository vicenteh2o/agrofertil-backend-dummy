const RomaneoSummary = require("../domain/romaneoSummary");

// Create RomaneoSummary
const createRomaneoSummary = async (req, res) => {
  const { total, deposits } = req.body;
  try {
    // Validate inputs
    if (typeof total !== "number") {
      return res.status(400).json({ error: "Total must be a number" });
    }
    if (!Array.isArray(deposits)) {
      return res.status(400).json({ error: "Deposits must be an array" });
    }

    // Validate deposits structure
    for (const deposit of deposits) {
      if (
        typeof deposit.name !== "string" ||
        typeof deposit.value !== "number"
      ) {
        return res.status(400).json({
          error: "Each deposit must have name (string) and value (number)",
        });
      }
    }

    const romaneoSummary = await RomaneoSummary.create({ total, deposits });
    res.status(201).json({ romaneoSummary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all RomaneoSummaries
const listRomaneoSummaries = async (req, res) => {
  try {
    const romaneoSummaries = await RomaneoSummary.findAll();
    const data = romaneoSummaries.map(({ id, total, deposits }) => ({
      id,
      total,
      deposits,
    }));
    delete data[0].id;
    res.json({ ...data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update RomaneoSummary
const updateRomaneoSummary = async (req, res) => {
  const { id } = req.params;
  const { total, deposits } = req.body;
  try {
    const romaneoSummary = await RomaneoSummary.findByPk(id);
    if (!romaneoSummary)
      return res.status(404).json({ error: "RomaneoSummary not found" });

    // Validate inputs if provided
    if (total !== undefined && typeof total !== "number") {
      return res.status(400).json({ error: "Total must be a number" });
    }
    if (deposits !== undefined) {
      if (!Array.isArray(deposits)) {
        return res.status(400).json({ error: "Deposits must be an array" });
      }
      for (const deposit of deposits) {
        if (
          typeof deposit.name !== "string" ||
          typeof deposit.value !== "number"
        ) {
          return res.status(400).json({
            error: "Each deposit must have name (string) and value (number)",
          });
        }
      }
    }

    if (total !== undefined) romaneoSummary.total = total;
    if (deposits !== undefined) romaneoSummary.deposits = deposits;

    await romaneoSummary.save();
    const {
      id: summaryId,
      total: summaryTotal,
      deposits: summaryDeposits,
    } = romaneoSummary;
    res.json({
      romaneoSummary: {
        id: summaryId,
        total: summaryTotal,
        deposits: summaryDeposits,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete RomaneoSummary
const deleteRomaneoSummary = async (req, res) => {
  const { id } = req.params;
  try {
    const romaneoSummary = await RomaneoSummary.findByPk(id);
    if (!romaneoSummary)
      return res.status(404).json({ error: "RomaneoSummary not found" });
    await romaneoSummary.destroy();
    res.json({ message: "RomaneoSummary deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRomaneoSummary,
  listRomaneoSummaries,
  updateRomaneoSummary,
  deleteRomaneoSummary,
};
