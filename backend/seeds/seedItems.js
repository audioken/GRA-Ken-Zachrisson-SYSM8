require("dotenv").config();
console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
const mongoose = require("mongoose");
const Item = require("../models/itemModel");

const items = [
  {
    image: "/images/food/burger.jpg",
    name: "Delicous Burger",
    category: "food",
    price: 9.99,
    description: "Classic cheeseburger with cheddar and pickles.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: true,
  },
  {
    image: "/images/food/baguette.jpg",
    name: "Tasty Baguette",
    category: "food",
    price: 6.99,
    description: "Freshly baked baguette with chicken filling.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: true,
  },
  {
    image: "/images/food/pancakes.jpg",
    name: "Pancakes",
    category: "desserts",
    price: 8.99,
    description: "Fluffy pancakes with salted caramel sauce and berries.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: true,
  },
  {
    image: "/images/food/mocha-cake.jpg",
    name: "Mocha Cake",
    category: "desserts",
    price: 7.99,
    description: "Rich mocha cake with chocolate ganache.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: true,
  },
  {
    image: "/images/drinks/coca-cola.jpg",
    name: "Coca-Cola",
    category: "drinks",
    price: 2.99,
    description: "Classic Coca-Cola soft drink.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/fanta.jpg",
    name: "Fanta",
    category: "drinks",
    price: 2.99,
    description: "Refreshing Fanta soft drink.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/sprite.jpg",
    name: "Sprite",
    category: "drinks",
    price: 2.99,
    description: "Crisp Sprite soft drink.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/ramlosa-citrus.jpg",
    name: "Ramlösa Citrus",
    category: "drinks",
    price: 1.99,
    description: "Sparkling mineral water with citrus flavor.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/ramlosa-granat.jpg",
    name: "Ramlösa Pomegranate",
    category: "drinks",
    price: 1.99,
    description: "Sparkling mineral water with pomegranate flavor.",
    quantity: 0,
    isFavourite: false,
    isMostOrdered: false,
  },
];

const seedDB = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING);
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log("Items seeded!");
  mongoose.disconnect();
};

seedDB();
