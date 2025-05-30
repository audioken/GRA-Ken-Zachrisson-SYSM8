const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        _id: false, // Hindra Mongoose från att skapa nytt _id för varje item
        name: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
    },
    paymentInfo: {
      method: { type: String, required: true },

      // Swish
      phone: { type: String },

      // Mastercard
      name: { type: String },
      number: { type: String },
      expiry: { type: String },
      cvc: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
