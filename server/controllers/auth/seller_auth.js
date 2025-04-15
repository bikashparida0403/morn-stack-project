const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../../models/seller");

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;

// Register Seller
const registerSeller = async (req, res) => {
  const { userName, email, password, phone, address } = req.body;

  try {
    const checkSeller = await Seller.findOne({ email });
    if (checkSeller)
      return res.status(400).json({
        success: false,
        message: "Seller already exists with this email!",
      });

    const hashPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const newSeller = new Seller({ userName, email, password: hashPassword, phone, address });

    await newSeller.save();
    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Login Seller
const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkSeller = await Seller.findOne({ email });
    if (!checkSeller)
      return res.status(404).json({
        success: false,
        message: "Seller doesn't exist! Please register first.",
      });

    const checkPasswordMatch = await bcrypt.compare(password, checkSeller.password);
    if (!checkPasswordMatch)
      return res.status(401).json({
        success: false,
        message: "Incorrect password! Please try again.",
      });

    const token = jwt.sign(
      { id: checkSeller._id, phone: checkSeller.phone, email: checkSeller.email, userName: checkSeller.userName, role: checkSeller.role },
      JWT_SECRET,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, { httpOnly: true, secure: false})
      .json({
        success: true,
        message: "Logged in successfully",
        seller: { email: checkSeller.email,
                  phone: checkSeller.phone, 
                  id: checkSeller._id, 
                  userName: checkSeller.userName, 
                  role: checkSeller.role 
                },
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Logout Seller
const logoutSeller = (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized Seller!" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.Seller = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized Seller!" });
  }
};

module.exports = { registerSeller, loginSeller, logoutSeller, authMiddleware };
