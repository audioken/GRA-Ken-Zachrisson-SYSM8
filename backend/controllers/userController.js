const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); // Importerar bcrypt för att hash lösenord
const User = require("../models/userModel"); // Importerar användarmodellen för att interagera med databasen
const jwt = require("jsonwebtoken"); // Importerar jsonwebtoken för att skapa och verifiera JWT-token

//@desc get all users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); // Hämta alla användare från databasen
  res.status(200).json(users); // Skicka tillbaka användarna som JSON
});

//@desc register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body; // Hämta data från req.body

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields"); // Om något fält saknas, skicka ett felmeddelande
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hasha lösenordet med bcrypt
  console.log("Hasshed password: ", hashedPassword); // Logga det hashade lösenordet

  // Skapa user
  const user = await User.create({
    username,
    email,
    password: hashedPassword, // Spara det hashade lösenordet i databasen
  });

  console.log("User: ", user); // Logga användaren

  // Kontrollera om användaren skapades
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data"); // Om användaren inte skapades, skicka ett felmeddelande
  }
});

//@desc update a user
//@route PATCH /api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Hämta användarens ID från URL:en
  const { name, phone, address, postalCode, city } = req.body; // Hämta data från req.body

  // Hitta användaren i databasen
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found"); // Om användaren inte hittas, skicka ett felmeddelande
  }

  // Uppdatera användarens information
  // user.name = name || user.name;
  // user.phone = phone || user.phone;
  // user.address = address || user.address;
  // user.postalCode = postalCode || user.postalCode;
  // user.city = city || user.city;

  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;
  if (postalCode !== undefined) user.postalCode = postalCode;
  if (city !== undefined) user.city = city;

  const updatedUser = await user.save(); // Spara de uppdaterade ändringarna i databasen

  res.status(200).json({
    user: {
      id: updatedUser.id,
      username: updatedUser.username,
      name: updatedUser.name,
      phone: updatedUser.phone,
      address: updatedUser.address,
      postalCode: updatedUser.postalCode,
      city: updatedUser.city,
      favourites: updatedUser.favourites.map((fav) => fav.toString()),
    },
  });
});

//@desc login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body; // Hämta data från req.body

  // Kontrollera så att alla fält är ifyllda
  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields"); // Om något fält saknas, skicka ett felmeddelande
  }

  const user = await User.findOne({ username }); // Hämta användaren från databasen med hjälp av e-postadressen

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Skapa en JWT-token med användarinformationen
    );
    res.status(200).json({
      accessToken,
      user: {
        username: user.username,
        id: user.id,
        name: user.name,
        phone: user.phone,
        address: user.address,
        postalCode: user.postalCode,
        city: user.city,
        favourites: user.favourites.map((fav) => fav.toString()),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials"); // Om användarnamn eller lösenord är felaktiga, skicka ett felmeddelande
  }
});

//@desc get current user
//@route GET /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user); // Skicka tillbaka den aktuella användarens information
});


//@desc add favorite
//@route POST /api/users/favorites/:itemId
//@access Private
const addFavorite = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  const user = await User.findById(userId);
  if (!user.favourites.includes(itemId)) {
    user.favourites.push(itemId);
    await user.save();
  }
  res.status(200).json({
    favourites: user.favourites.map((fav) => fav.toString()),
  });
});


//@desc remove favorite
//@route DELETE /api/users/favorites/:itemId
//@access Private

const removeFavorite = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  const user = await User.findById(userId);
  user.favourites = user.favourites.filter((fav) => fav.toString() !== itemId);
  await user.save();
  res.status(200).json({
    favourites: user.favourites.map((fav) => fav.toString()),
  });
});

// Exporterar funktionerna så att de kan användas i andra filer
module.exports = {
  getUsers,
  currentUser,
  registerUser,
  updateUser,
  loginUser,
  addFavorite,
  removeFavorite,
};
