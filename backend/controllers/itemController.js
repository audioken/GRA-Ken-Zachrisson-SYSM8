const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");

//@desc get all items
//@route GET /api/items
//@access Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

module.exports = {
  getItems,
};
