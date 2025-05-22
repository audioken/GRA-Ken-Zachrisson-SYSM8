const express = require("express");
const { getOrders, postOrder } = require("../controllers/orderController"); // Här importerar vi vår användarkontroller för att hantera användarrelaterade funktioner

const router = express.Router();

router.get("/", getOrders); // Här definierar vi en rutt för att hämta alla ordrar
router.post("/", postOrder); // Här definierar vi en rutt för att registrera en användare

module.exports = router; // Här exporterar vi app-instansen så att den kan användas i andra filer, t.ex. för tester