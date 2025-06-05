// require("dotenv").config();
// console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
// const mongoose = require("mongoose");
// const Item = require("../models/itemModel");

// const items = [
//   {
//     image: "/images/food/burger.jpg",
//     name: "Delicous Burger",
//     category: "food",
//     price: 9.99,
//     description: "Classic cheeseburger with cheddar and pickles.",
//     quantity: 0,
//     isMostOrdered: true,
//   },
//   {
//     image: "/images/food/baguette.jpg",
//     name: "Tasty Baguette",
//     category: "food",
//     price: 6.99,
//     description: "Freshly baked baguette with chicken filling.",
//     quantity: 0,
//     isMostOrdered: true,
//   },
//   {
//     image: "/images/food/pancakes.jpg",
//     name: "Pancakes",
//     category: "desserts",
//     price: 8.99,
//     description: "Fluffy pancakes with salted caramel sauce and berries.",
//     quantity: 0,
//     isMostOrdered: true,
//   },
//   {
//     image: "/images/food/mocha-cake.jpg",
//     name: "Mocha Cake",
//     category: "desserts",
//     price: 7.99,
//     description: "Rich mocha cake with chocolate ganache.",
//     quantity: 0,
//     isMostOrdered: true,
//   },
//   {
//     image: "/images/drinks/coca-cola.jpg",
//     name: "Coca-Cola",
//     category: "drinks",
//     price: 2.99,
//     description: "Classic Coca-Cola soft drink.",
//     quantity: 0,
//     isMostOrdered: false,
//   },
//   {
//     image: "/images/drinks/fanta.jpg",
//     name: "Fanta",
//     category: "drinks",
//     price: 2.99,
//     description: "Refreshing Fanta soft drink.",
//     quantity: 0,
//     isMostOrdered: false,
//   },
//   {
//     image: "/images/drinks/sprite.jpg",
//     name: "Sprite",
//     category: "drinks",
//     price: 2.99,
//     description: "Crisp Sprite soft drink.",
//     quantity: 0,
//     isMostOrdered: false,
//   },
//   {
//     image: "/images/drinks/ramlosa-citrus.jpg",
//     name: "Ramlösa Citrus",
//     category: "drinks",
//     price: 1.99,
//     description: "Sparkling mineral water with citrus flavor.",
//     quantity: 0,
//     isMostOrdered: false,
//   },
//   {
//     image: "/images/drinks/ramlosa-granat.jpg",
//     name: "Ramlösa Pomegranate",
//     category: "drinks",
//     price: 1.99,
//     description: "Sparkling mineral water with pomegranate flavor.",
//     quantity: 0,
//     isMostOrdered: false,
//   },
// ];

// const seedDB = async () => {
//   await mongoose.connect(process.env.CONNECTION_STRING);
//   await Item.deleteMany({});
//   await Item.insertMany(items);
//   console.log("Items seeded!");
//   mongoose.disconnect();
// };

// seedDB();

require("dotenv").config();
console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
const mongoose = require("mongoose");
const Item = require("../models/itemModel");

const items = [
  // Food
  {
    image: "/images/food/burger.jpg",
    name: "Delicious Burger",
    category: "food",
    price: 9.99,
    description:
      "Classic cheeseburger with melted cheddar, pickles, fresh lettuce and tomato on a toasted bun.",
    quantity: 0,
    isMostOrdered: true,
  },
  {
    image: "/images/food/baguette.jpg",
    name: "Tasty Baguette",
    category: "food",
    price: 6.99,
    description:
      "Freshly baked baguette filled with seasoned chicken, crisp lettuce and a creamy dressing.",
    quantity: 0,
    isMostOrdered: true,
  },
  {
    image: "/images/food/schrimp-soup.jpg",
    name: "Shrimp Soup",
    category: "food",
    price: 7.5,
    description: "Warm, flavorful soup with tender shrimp and aromatic herbs.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/food/greek-sallad.jpg",
    name: "Greek Salad",
    category: "food",
    price: 5.99,
    description:
      "Fresh salad with tomatoes, cucumbers, olives, feta cheese, and a zesty dressing.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/food/beef-vegetables.jpg",
    name: "Beef Vegetables",
    category: "food",
    price: 10.99,
    description:
      "Tender beef strips sautéed with fresh seasonal vegetables in a light sauce.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/food/sallad.jpg",
    name: "Fresh Salad",
    category: "food",
    price: 4.99,
    description:
      "Crisp mixed greens with a variety of fresh veggies and a tangy vinaigrette.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/food/halloumi-plate.jpg",
    name: "Halloumi Plate",
    category: "food",
    price: 8.5,
    description:
      "Grilled halloumi cheese served with fresh vegetables and a drizzle of olive oil.",
    quantity: 0,
    isMostOrdered: false,
  },

  // Desserts
  {
    image: "/images/food/pancakes.jpg",
    name: "Fluffy Pancakes",
    category: "desserts",
    price: 8.99,
    description:
      "Light and fluffy pancakes topped with salted caramel sauce and fresh berries.",
    quantity: 0,
    isMostOrdered: true,
  },
  {
    image: "/images/food/mocha-cake.jpg",
    name: "Mocha Cake",
    category: "desserts",
    price: 7.99,
    description:
      "Rich mocha cake layered with smooth chocolate ganache and espresso cream.",
    quantity: 0,
    isMostOrdered: true,
  },
  {
    image: "/images/food/chocolate-cake-ice-cream.jpg",
    name: "Choco Cake",
    category: "desserts",
    price: 9.5,
    description:
      "Decadent chocolate cake served with creamy vanilla ice cream.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/food/ice-cream-surprise.jpg",
    name: "Ice Cream",
    category: "desserts",
    price: 5.99,
    description: "Assorted ice cream flavors with a surprise topping.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/food/mint-ice-cream.jpg",
    name: "Mint Ice Cream",
    category: "desserts",
    price: 5.99,
    description: "Refreshing mint-flavored ice cream with chocolate chips.",
    quantity: 0,
    isMostOrdered: false,
  },

  // Drinks
  {
    image: "/images/drinks/coca-cola.jpg",
    name: "Coca-Cola",
    category: "drinks",
    price: 2.99,
    description:
      "Classic Coca-Cola soft drink with its iconic refreshing taste.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/fanta.jpg",
    name: "Fanta",
    category: "drinks",
    price: 2.99,
    description: "Sweet and tangy orange-flavored Fanta soft drink.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/sprite.jpg",
    name: "Sprite",
    category: "drinks",
    price: 2.99,
    description: "Crisp and refreshing lemon-lime Sprite soft drink.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/ramlosa-citrus.jpg",
    name: "Ramlösa Citrus",
    category: "drinks",
    price: 1.99,
    description: "Sparkling mineral water with a bright citrus flavor.",
    quantity: 0,
    isMostOrdered: false,
  },
  {
    image: "/images/drinks/ramlosa-granat.jpg",
    name: "Ramlösa Pomegranate",
    category: "drinks",
    price: 1.99,
    description: "Sparkling mineral water infused with pomegranate flavor.",
    quantity: 0,
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

