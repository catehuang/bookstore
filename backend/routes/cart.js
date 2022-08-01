const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();
const passport = require("passport");
const { verifyToken } = require("../middleware/auth");

// create a new cart
router.post("/new/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  try {
    const newCart = new Cart({ userId });
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a user cart
router.get("/find/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne({ userId });
    // found cart or null
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update cart using cart _id
router.put("/:id", verifyToken, async (req, res) => {
  const cartId = req.params.id;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      cartId ,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    await Cart.findByIdAndDelete(userId);
    res.status(200).json("Cart has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// find all carts in database
router.get("/", verifyToken, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
