const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController"); // Här importerar vi vår användarkontroller för att hantera användarrelaterade funktioner

const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser); // Här definierar vi en rutt för att registrera en användare

router.post("/login", loginUser); // Här definierar vi en rutt för att logga in en användare)

router.get("/current", validateToken, currentUser); // Här definierar vi en rutt för att hämta den aktuella användaren

module.exports = router; // Här exporterar vi app-instansen så att den kan användas i andra filer, t.ex. för tester
