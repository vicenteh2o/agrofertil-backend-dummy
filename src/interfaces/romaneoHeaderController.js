const RomaneoHeader = require("../domain/romaneoHeader");

// Create RomaneoHeader
const createRomaneoHeader = async (req, res) => {
  const { total, deposits, depositors } = req.body;
  try {
    // Validate inputs
    if (typeof total !== "number") {
      return res.status(400).json({ error: "Total must be a number" });
    }
    if (!Array.isArray(deposits)) {
      return res.status(400).json({ error: "Deposits must be an array" });
    }
    if (!Array.isArray(depositors)) {
      return res.status(400).json({ error: "Depositors must be an array" });
    }

    // Validate deposits structure (array of strings)
    for (const deposit of deposits) {
      if (typeof deposit !== "string") {
        return res.status(400).json({
          error: "Each deposit must be a string",
        });
      }
    }

    // Validate depositors structure
    for (const depositor of depositors) {
      if (
        typeof depositor.depositName !== "string" ||
        typeof depositor.name !== "string" ||
        typeof depositor.value !== "number"
      ) {
        return res.status(400).json({
          error:
            "Each depositor must have depositName (string), name (string) and value (number)",
        });
      }
    }

    const romaneoHeader = await RomaneoHeader.create({
      total,
      deposits,
      depositors,
    });
    res.status(201).json({ romaneoHeader });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all RomaneoHeaders
const listRomaneoHeaders = async (req, res) => {
  try {
    const romaneoHeaders = await RomaneoHeader.findAll();
    const data = romaneoHeaders.map(({ id, total, deposits, depositors }) => ({
      id,
      total,
      deposits,
      depositors,
    }));
    res.json({ ...data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update RomaneoHeader
const updateRomaneoHeader = async (req, res) => {
  const { id } = req.params;
  const { total, deposits, depositors } = req.body;
  try {
    const romaneoHeader = await RomaneoHeader.findByPk(id);
    if (!romaneoHeader)
      return res.status(404).json({ error: "RomaneoHeader not found" });

    // Validate inputs if provided
    if (total !== undefined && typeof total !== "number") {
      return res.status(400).json({ error: "Total must be a number" });
    }
    if (deposits !== undefined) {
      if (!Array.isArray(deposits)) {
        return res.status(400).json({ error: "Deposits must be an array" });
      }
      for (const deposit of deposits) {
        if (typeof deposit !== "string") {
          return res.status(400).json({
            error: "Each deposit must be a string",
          });
        }
      }
    }
    if (depositors !== undefined) {
      if (!Array.isArray(depositors)) {
        return res.status(400).json({ error: "Depositors must be an array" });
      }
      for (const depositor of depositors) {
        if (
          typeof depositor.depositName !== "string" ||
          typeof depositor.name !== "string" ||
          typeof depositor.value !== "number"
        ) {
          return res.status(400).json({
            error:
              "Each depositor must have depositName (string), name (string) and value (number)",
          });
        }
      }
    }

    if (total !== undefined) romaneoHeader.total = total;
    if (deposits !== undefined) romaneoHeader.deposits = deposits;
    if (depositors !== undefined) romaneoHeader.depositors = depositors;

    await romaneoHeader.save();
    const {
      id: headerId,
      total: headerTotal,
      deposits: headerDeposits,
      depositors: headerDepositors,
    } = romaneoHeader;
    res.json({
      romaneoHeader: {
        id: headerId,
        total: headerTotal,
        deposits: headerDeposits,
        depositors: headerDepositors,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete RomaneoHeader
const deleteRomaneoHeader = async (req, res) => {
  const { id } = req.params;
  try {
    const romaneoHeader = await RomaneoHeader.findByPk(id);
    if (!romaneoHeader)
      return res.status(404).json({ error: "RomaneoHeader not found" });
    await romaneoHeader.destroy();
    res.json({ message: "RomaneoHeader deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRomaneoHeader,
  listRomaneoHeaders,
  updateRomaneoHeader,
  deleteRomaneoHeader,
};
