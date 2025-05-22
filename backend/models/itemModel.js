const mongoose = require("mongoose"); // Importerar mongoose för att arbeta med MongoDB

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    image: {
      type: String,
      required: [true, "Please add an image path"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    isMostOrdered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Loggar när objektet skapades eller uppdaterades
  }
);

module.exports = mongoose.model("Item", itemSchema); // Exporterar modellen så att den kan användas i andra filer
