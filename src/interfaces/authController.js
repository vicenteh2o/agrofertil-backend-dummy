const User = require("../domain/user");
const { generateToken } = require("../infrastructure/jwt");
const { sendRecoveryEmail } = require("../infrastructure/email");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password, ruc, phone, address } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ruc,
      phone,
      address,
    });
    const token = generateToken(user);

    res
      .status(201)
      .json({ user: { id: user.id, name, ruc, email, phone, address }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    // Return all user fields except password
    const { id, name, ruc, email: userEmail, phone, address } = user;
    res.json({
      user: { id, name, ruc, email: userEmail, phone, address },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /user/:id - get user data
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Return all user fields except password
    const { id: userId, name, ruc, email, phone, address } = user;
    res.json({ id: userId, name, ruc, email, phone, address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /user/:id - update user fields (email, phone, address)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, phone, address } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Only update editable fields
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    await user.save();
    // Exclude password from response
    const {
      id: userId,
      name,
      ruc,
      email: userEmail,
      phone: userPhone,
      address: userAddress,
      createdAt,
      updatedAt,
    } = user;
    res.json({
      message: "User updated",
      data: {
        id: userId,
        name,
        ruc,
        email: userEmail,
        phone: userPhone,
        address: userAddress,
        createdAt,
        updatedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In-memory store for recovery codes (for demo; use DB/Redis in production)
const recoveryCodes = {};

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Password recovery requested for:", email);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000);
    recoveryCodes[email] = code;

    await sendRecoveryEmail(email, code);
    res.json({ message: "Recovery code sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  recoverPassword,
};
