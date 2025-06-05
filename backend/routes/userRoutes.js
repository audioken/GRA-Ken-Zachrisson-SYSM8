const express = require("express");
const User = require("../models/userModel");
const {
  getUsers,
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  currentUser,
  registerUser,
  loginUser,
  updateUser,
  updateUsername,
  updateEmail,
  updatePassword,
  addFavorite,
  removeFavorite,
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.get("/", getUsers);
router.get("/payment-methods", validateToken, getPaymentMethods);
router.post("/payment-methods", validateToken, addPaymentMethod);
router.patch(
  "/payment-methods/:id/set-primary",
  validateToken,
  updatePaymentMethod
);
router.delete("/payment-methods/:id", validateToken, removePaymentMethod);
router.get("/current", validateToken, currentUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/me", validateToken, updateUser);
router.patch("/me/password", validateToken, updatePassword);
router.patch("/update-username", validateToken, updateUsername);
router.patch("/update-email", validateToken, updateEmail);
router.post("/favorites/:itemId", validateToken, addFavorite);
router.delete("/favorites/:itemId", validateToken, removeFavorite);

router.get("/check-username/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.json({ available: !user });
});

router.get("/check-email/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json({ available: !user });
});

module.exports = router;
