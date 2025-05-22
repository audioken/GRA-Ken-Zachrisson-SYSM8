const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc get all orders
// @route GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}); // Hämta alla ordrar från databasen
  res.status(200).json(orders); // Skicka tillbaka ordrarna som JSON
});

//@desc post an order
//@route POST /api/orders
//@access Public
const postOrder = asyncHandler(async (req, res) => {
  const { items, totalPrice, deliveryInfo, paymentInfo } = req.body;

  if (!items || !totalPrice || !deliveryInfo || !paymentInfo) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Skapa order
  const order = await Order.create({
    items,
    totalPrice,
    deliveryInfo,
    paymentInfo,
  });

  console.log("Order: ", order);

  if (order) {
    res.status(201).json({
      _id: order.id,
      items: order.items,
      totalPrice: order.totalPrice,
      deliveryInfo: order.deliveryInfo,
      paymentInfo: order.paymentInfo,
      createdAt: order.createdAt,
    });
  } else {
    res.status(400);
    throw new Error("Invalid order data");
  }
});

module.exports = {
  getOrders,
  postOrder,
};
