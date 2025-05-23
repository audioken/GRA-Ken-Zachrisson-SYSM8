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

// Exporterar funktionerna så att de kan användas i andra filer
module.exports = {
  getUsers,
  currentUser,
  registerUser,
  loginUser,
};
