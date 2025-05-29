const express = require("express");
const User = require("../models/userModel");
const {
  getUsers,
  getPaymentMethods,
  addPaymentMethod,
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
} = require("../controllers/userController"); // Här importerar vi vår användarkontroller för att hantera användarrelaterade funktioner

const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.get("/", getUsers);
router.get("/payment-methods", validateToken, getPaymentMethods); // Här definierar vi en rutt för att hämta betalningsmetoder
router.post("/payment-methods", validateToken, addPaymentMethod); // Här definierar vi en rutt för att lägga till en betalningsmetod
router.delete("/payment-methods/:id", validateToken, removePaymentMethod); // Här definierar vi en rutt för att ta bort en betalningsmetod
router.get("/current", validateToken, currentUser); // Här definierar vi en rutt för att hämta den aktuella användaren
router.post("/register", registerUser); // Här definierar vi en rutt för att registrera en användare
router.post("/login", loginUser); // Här definierar vi en rutt för att logga in en användare)
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

module.exports = router; // Här exporterar vi app-instansen så att den kan användas i andra filer, t.ex. för tester
