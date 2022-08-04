const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();
const passport = require("passport");
const { verifyToken } = require("../middleware/auth");

// create a new cart
router.post("/new/:userId", verifyToken, async (req, res) => {
    const newCart = new Cart({ userId: req.body.userId });
    console.log(newCart);
    newCart.save(function(err, result){
      if (err)
      {
        console.log(err);
        res.status(500).json(err);        
      }
      else
      {
        console.log(result);
        res.status(200).json(result);
      }
    });
});

// find a user cart
router.get("/find/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const cart = await Cart.findOne({ userId });
    //console.log(cart);
    // found cart or null
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update cart using cart _id
router.put("/:id", verifyToken, async (req, res) => {
  const cartId = req.params.id;
  //console.log(req.cartId);
 
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      cartId ,
      {
        $set: req.body,
      },
      { new: true }
    );
    //console.log(updatedCart);
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
