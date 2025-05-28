const express = require("express");
const User = require("../models/userModel");
const {
  getUsers,
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
