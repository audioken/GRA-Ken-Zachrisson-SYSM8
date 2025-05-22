require("dotenv").config();
console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const users = [
  {
    username: "user",
    email: "user@user.com",
    password: "password",
    name: "User Userson",
    phone: "0701234567",
    address: "User Street 1",
    postalCode: "12345",
    city: "User City",
  },
  {
    username: "admin",
    email: "admin@admin.com",
    password: "password",
    name: "Admin Adminson",
    phone: "0701234567",
    address: "Admin Street 1",
    postalCode: "12345",
    city: "Admin City",
    isAdmin: true,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);

    await User.deleteMany({});

    // Hasha lösenorden innan insert
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(users);
    console.log("Users seeded!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDB();