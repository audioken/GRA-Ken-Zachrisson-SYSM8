const express = require("express");
const { getItems } = require("../controllers/itemController"); // Här importerar vi vår användarkontroller för att hantera användarrelaterade funktioner

const router = express.Router();

router.get("/", getItems); // Här definierar vi en rutt för att registrera en användare

module.exports = router; // Här exporterar vi app-instansen så att den kan användas i andra filer, t.ex. för tester
