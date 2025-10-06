const Romaneo = require("../domain/romaneo");

// Create Romaneo
const createRomaneo = async (req, res) => {
  const { code, date, deposit, liquidWeight, depository, detail } = req.body;
  try {
    // Validate inputs
    if (typeof code !== "string") {
      return res.status(400).json({ error: "Code must be a string" });
    }
    if (typeof date !== "string") {
      return res.status(400).json({ error: "Date must be a string" });
    }
    if (typeof deposit !== "string") {
      return res.status(400).json({ error: "Deposit must be a string" });
    }

    if (typeof depository !== "string") {
      return res.status(400).json({ error: "Depository must be a string" });
    }
    if (typeof detail !== "object" || detail === null) {
      return res.status(400).json({ error: "Detail must be an object" });
    }

    // Validate detail structure
    const requiredFields = [
      "licensePlate",
      "driver",
      "grossWeight",
      "tareWeight",
      "netWeight",
      "liquidWeight",
    ];
    for (const field of requiredFields) {
      if (!(field in detail)) {
        return res.status(400).json({ error: `Detail.${field} is required` });
      }
    }

    if (
      typeof detail.licensePlate !== "string" ||
      typeof detail.driver !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Detail licensePlate and driver must be strings" });
    }

    if (
      typeof detail.grossWeight !== "number" ||
      typeof detail.tareWeight !== "number" ||
      typeof detail.netWeight !== "number" ||
      typeof detail.liquidWeight !== "number"
    ) {
      return res.status(400).json({ error: "Detail weights must be numbers" });
    }

    const romaneo = await Romaneo.create({
      code,
      date,
      deposit,
      depository,
      detail,
    });
    res.status(201).json({ romaneo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all Romaneos
const listRomaneos = async (req, res) => {
  try {
    const romaneos = await Romaneo.findAll();
    const data = romaneos.map(
      ({ id, code, date, deposit, depository, detail }) => ({
        id,
        code,
        date,
        deposit,
        depository,
        detail,
      })
    );
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Romaneo
const updateRomaneo = async (req, res) => {
  const { id } = req.params;
  const { code, date, deposit, depository, detail } = req.body;
  try {
    const romaneo = await Romaneo.findByPk(id);
    if (!romaneo) return res.status(404).json({ error: "Romaneo not found" });

    // Validate inputs if provided
    if (code !== undefined && typeof code !== "string") {
      return res.status(400).json({ error: "Code must be a string" });
    }
    if (date !== undefined && typeof date !== "string") {
      return res.status(400).json({ error: "Date must be a string" });
    }
    if (deposit !== undefined && typeof deposit !== "string") {
      return res.status(400).json({ error: "Deposit must be a string" });
    }

    if (depository !== undefined && typeof depository !== "string") {
      return res.status(400).json({ error: "Depository must be a string" });
    }
    if (detail !== undefined) {
      if (typeof detail !== "object" || detail === null) {
        return res.status(400).json({ error: "Detail must be an object" });
      }

      // Validate detail structure if provided
      const requiredFields = [
        "licensePlate",
        "driver",
        "grossWeight",
        "tareWeight",
        "netWeight",
        "liquidWeight",
      ];
      for (const field of requiredFields) {
        if (!(field in detail)) {
          return res.status(400).json({ error: `Detail.${field} is required` });
        }
      }

      if (
        typeof detail.licensePlate !== "string" ||
        typeof detail.driver !== "string"
      ) {
        return res
          .status(400)
          .json({ error: "Detail licensePlate and driver must be strings" });
      }

      if (
        typeof detail.grossWeight !== "number" ||
        typeof detail.tareWeight !== "number" ||
        typeof detail.netWeight !== "number" ||
        typeof detail.liquidWeight !== "number"
      ) {
        return res
          .status(400)
          .json({ error: "Detail weights must be numbers" });
      }
    }

    if (code !== undefined) romaneo.code = code;
    if (date !== undefined) romaneo.date = date;
    if (deposit !== undefined) romaneo.deposit = deposit;
    if (depository !== undefined) romaneo.depository = depository;
    if (detail !== undefined) romaneo.detail = detail;

    await romaneo.save();
    const {
      id: romaneoId,
      code: romaneoCode,
      date: romaneoDate,
      deposit: romaneoDeposit,
      depository: romaneoDepository,
      detail: romaneoDetail,
    } = romaneo;
    res.json({
      romaneo: {
        id: romaneoId,
        code: romaneoCode,
        date: romaneoDate,
        deposit: romaneoDeposit,
        depository: romaneoDepository,
        detail: romaneoDetail,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Romaneo
const deleteRomaneo = async (req, res) => {
  const { id } = req.params;
  try {
    const romaneo = await Romaneo.findByPk(id);
    if (!romaneo) return res.status(404).json({ error: "Romaneo not found" });
    await romaneo.destroy();
    res.json({ message: "Romaneo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRomaneo,
  listRomaneos,
  updateRomaneo,
  deleteRomaneo,
};
