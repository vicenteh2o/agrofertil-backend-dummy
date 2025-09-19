const Safra = require("../domain/safra");

// Create Safra
const createSafra = async (req, res) => {
  const { description } = req.body;
  try {
    if (!description)
      return res.status(400).json({ error: "Description is required" });
    const safra = await Safra.create({ description });
    res.status(201).json({ ...safra.toJSON() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all Safras
const listSafras = async (req, res) => {
  try {
    const data = await Safra.findAll();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Safra
const updateSafra = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const safra = await Safra.findByPk(id);
    if (!safra) return res.status(404).json({ error: "Safra not found" });
    if (description !== undefined) safra.description = description;
    await safra.save();
    res.json({ safra });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Safra
const deleteSafra = async (req, res) => {
  const { id } = req.params;
  try {
    const safra = await Safra.findByPk(id);
    if (!safra) return res.status(404).json({ error: "Safra not found" });
    await safra.destroy();
    res.json({ message: "Safra deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSafra, listSafras, updateSafra, deleteSafra };
