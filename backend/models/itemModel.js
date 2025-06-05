const mongoose = require("mongoose");

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
    isMostOrdered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
