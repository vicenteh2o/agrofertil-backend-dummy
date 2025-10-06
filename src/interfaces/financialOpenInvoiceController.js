const FinancialOpenInvoice = require("../domain/financialOpenInvoice");

// Create FinancialOpenInvoice
const createFinancialOpenInvoice = async (req, res) => {
  const { total, expired, toExpire } = req.body;
  try {
    // Validate inputs
    if (typeof total !== "number") {
      return res.status(400).json({ error: "Total must be a number" });
    }
    if (typeof expired !== "number") {
      return res.status(400).json({ error: "Expired must be a number" });
    }
    if (typeof toExpire !== "number") {
      return res.status(400).json({ error: "ToExpire must be a number" });
    }

    const financialOpenInvoice = await FinancialOpenInvoice.create({
      total,
      expired,
      toExpire,
    });
    res.status(201).json({ financialOpenInvoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all FinancialOpenInvoices
const listFinancialOpenInvoices = async (req, res) => {
  try {
    const financialOpenInvoices = await FinancialOpenInvoice.findAll();
    const data = financialOpenInvoices.map(
      ({ id, total, expired, toExpire }) => ({
        id,
        total,
        expired,
        toExpire,
      })
    );
    delete data[0].id;
    res.json({ ...data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update FinancialOpenInvoice
const updateFinancialOpenInvoice = async (req, res) => {
  const { id } = req.params;
  const { total, expired, toExpire } = req.body;
  try {
    const financialOpenInvoice = await FinancialOpenInvoice.findByPk(id);
    if (!financialOpenInvoice)
      return res.status(404).json({ error: "FinancialOpenInvoice not found" });

    // Validate inputs if provided
    if (total !== undefined && typeof total !== "number") {
      return res.status(400).json({ error: "Total must be a number" });
    }
    if (expired !== undefined && typeof expired !== "number") {
      return res.status(400).json({ error: "Expired must be a number" });
    }
    if (toExpire !== undefined && typeof toExpire !== "number") {
      return res.status(400).json({ error: "ToExpire must be a number" });
    }

    if (total !== undefined) financialOpenInvoice.total = total;
    if (expired !== undefined) financialOpenInvoice.expired = expired;
    if (toExpire !== undefined) financialOpenInvoice.toExpire = toExpire;

    await financialOpenInvoice.save();
    const {
      id: invoiceId,
      total: invoiceTotal,
      expired: invoiceExpired,
      toExpire: invoiceToExpire,
    } = financialOpenInvoice;
    res.json({
      financialOpenInvoice: {
        id: invoiceId,
        total: invoiceTotal,
        expired: invoiceExpired,
        toExpire: invoiceToExpire,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete FinancialOpenInvoice
const deleteFinancialOpenInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const financialOpenInvoice = await FinancialOpenInvoice.findByPk(id);
    if (!financialOpenInvoice)
      return res.status(404).json({ error: "FinancialOpenInvoice not found" });
    await financialOpenInvoice.destroy();
    res.json({ message: "FinancialOpenInvoice deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createFinancialOpenInvoice,
  listFinancialOpenInvoices,
  updateFinancialOpenInvoice,
  deleteFinancialOpenInvoice,
};
