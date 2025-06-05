const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); 
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc get all users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); 
  res.status(200).json(users); 
});

//@desc get payment methods
//@route GET /api/users/payment-methods
//@access Private
const getPaymentMethods = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user.paymentMethods || []);
});

//@desc add a payment method
//@route POST /api/users/payment-methods
//@access Private
const addPaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { name, number, expiry, cvc, isPrimary } = req.body;
  if (!name || !number || !expiry || !cvc) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Om isPrimary är true, nollställ alla andra korts isPrimary
  if (isPrimary) {
    user.paymentMethods.forEach((pm) => (pm.isPrimary = false));
  }

  const newPayment = {
    name: name,
    number: number,
    expiry: expiry,
    cvc: cvc,
    isPrimary: !!isPrimary,
  };

  user.paymentMethods.push(newPayment);
  await user.save();

  res.status(201).json({
    user: {
      ...user.toObject(),
      paymentMethods: user.paymentMethods,
    },
  });
});

// @desc update primary payment method
// @route PATCH /api/users/payment-methods/:id/set-primary
// @access Private
const updatePaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const { id } = req.params;
  const { isPrimary } = req.body;
  if (isPrimary === undefined) {
    res.status(400);
    throw new Error("isPrimary field is required");
  }
  const paymentMethod = user.paymentMethods.find(
    (pm) => pm._id.toString() === id
  );
  if (!paymentMethod) {
    res.status(404);
    throw new Error("Payment method not found");
  }
  // Om isPrimary är true, nollställ alla andra korts isPrimary
  if (isPrimary) {
    user.paymentMethods.forEach((pm) => (pm.isPrimary = false));
  }
  paymentMethod.isPrimary = isPrimary;
  await user.save();
  res.status(200).json({
    paymentMethods: user.paymentMethods,
  });
});

//@desc remove a payment method
//@route DELETE /api/users/payment-methods/:id
//@access Private
const removePaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const { id } = req.params;
  const before = user.paymentMethods.length;
  user.paymentMethods = user.paymentMethods.filter(
    (pm) => pm._id.toString() !== id
  );
  if (user.paymentMethods.length === before) {
    res.status(404);
    throw new Error("Payment method not found");
  }
  await user.save();
  res.status(200).json({
    paymentMethods: user.paymentMethods,
  });
});

//@desc register a user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hasha lösenordet med bcrypt

  // Skapa user
  const user = await User.create({
    username,
    email,
    password: hashedPassword, // Spara det hashade lösenordet i databasen
  });

  // Kontrollera om användaren skapades
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data"); 
  }
});

//@desc update a user
//@route PATCH /api/users/me
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id; 
  const { name, phone, address, postalCode, city } = req.body;

  // Hitta användaren i databasen
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Uppdatera användarens information
  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;
  if (postalCode !== undefined) user.postalCode = postalCode;
  if (city !== undefined) user.city = city;

  const updatedUser = await user.save();

  res.status(200).json({
    user: {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      name: updatedUser.name,
      phone: updatedUser.phone,
      address: updatedUser.address,
      postalCode: updatedUser.postalCode,
      city: updatedUser.city,
      favourites: updatedUser.favourites.map((fav) => fav.toString()),
    },
  });
});

//@desc update username
//@route PATCH /api/users/update-username
//@access Private
const updateUsername = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { username } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("Username is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Tillåt att spara samma username som man redan har
  if (username !== user.username) {
    const exists = await User.findOne({ username });
    if (exists) {
      res.status(400);
      throw new Error("Username already taken");
    }
    user.username = username;
    await user.save();
  }

  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      postalCode: user.postalCode,
      city: user.city,
      favourites: user.favourites.map((fav) => fav.toString()),
    },
  });
});

//@desc update email
//@route PATCH /api/users/update-email
//@access Private
const updateEmail = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Tillåt att spara samma email som man redan har
  if (email !== user.email) {
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error("Email already registered");
    }
    user.email = email;
    await user.save();
  }

  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      postalCode: user.postalCode,
      city: user.city,
      favourites: user.favourites.map((fav) => fav.toString()),
    },
  });
});

//@desc update password
//@route PATCH /api/users/me/password
//@access Private
const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Both current and new password are required");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Kontrollera nuvarande lösenord
  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  // Uppdatera till nytt lösenord
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password updated" });
});

//@desc login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields"); 
  }

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { 
          username: user.username,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
        name: user.name,
        phone: user.phone,
        address: user.address,
        postalCode: user.postalCode,
        city: user.city,
        favourites: user.favourites.map((fav) => fav.toString()),
        paymentMethods: user.paymentMethods,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc get current user
//@route GET /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
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

module.exports = {
  getUsers,
  getPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  currentUser,
  registerUser,
  updateUser,
  updateUsername,
  updateEmail,
  updatePassword,
  loginUser,
  addFavorite,
  removeFavorite,
};
