const express = require("express");
const {
  registerSeller,
  loginSeller,
  logoutSeller,
  authMiddleware,
} = require("../../controllers/auth/seller_auth");

const router = express.Router();

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.post("/logout", logoutSeller);
router.get("/check-auth", authMiddleware, (req, res) => {
  const seller = req.seller;
  res.status(200).json({
    success: true,
    message: "Authenticated seller!",
    seller, // Changed from `req.user` to `req.Seller`
  });
});

module.exports = router;
