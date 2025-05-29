const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email already exists"],
      match: [
        /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    name: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    postalCode: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        default: [],
      },
    ],
    paymentMethods: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // <-- Lägg till denna rad
        name: String,
        number: String,
        expiry: String,
        cvc: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true, // Loggar när användaren skapades eller uppdaterades
  }
);

module.exports = mongoose.model("User", userSchema); // Exporterar modellen så att den kan användas i andra filer
