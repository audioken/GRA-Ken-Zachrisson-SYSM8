const express = require("express");
const {
  getUsers,
  currentUser,
  registerUser,
  loginUser,
  addFavorite,
  removeFavorite,
} = require("../controllers/userController"); // Här importerar vi vår användarkontroller för att hantera användarrelaterade funktioner

const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.get("/", getUsers);
router.get("/current", validateToken, currentUser); // Här definierar vi en rutt för att hämta den aktuella användaren
router.post("/register", registerUser); // Här definierar vi en rutt för att registrera en användare
router.post("/login", loginUser); // Här definierar vi en rutt för att logga in en användare)
router.post("/favorites/:itemId", validateToken, addFavorite);
router.delete("/favorites/:itemId", validateToken, removeFavorite);

module.exports = router; // Här exporterar vi app-instansen så att den kan användas i andra filer, t.ex. för tester
