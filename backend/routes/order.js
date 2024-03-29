const express = require("express");
const Order = require("../models/order");
const router = express.Router();
const { verifyToken } = require("../middlewares/authJwt");

//CREATE
router.post("/", verifyToken, async (req, res) => {
        console.log(req.body);
        const newOrder = new Order(req.body);
        try {
                const savedOrder = await newOrder.save();
                res.status(200).json(savedOrder);
        } catch (err) {
                console.log("could't create order ==============");
                console.log(err);
                res.status(500).json(err);
        }
});

//GET USER Orders
router.get("/find/:userId", verifyToken, async (req, res) => {
        const userId = req.params.userId 

        try {
                const orders = await Order.find({ userId });
                res.status(200).json(orders);
        } catch (err) {
                console.log(err);
                res.status(500).json(err);
        }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
        try {
                const updatedOrder = await Order.findByIdAndUpdate(
                        req.params.id,
                        {
                                $set: req.body, //accepts all from body
                        },
                        { new: true } //return object to updateUser
                );
                res.status(200).json(updatedOrder);
        } catch (err) {
                console.log(err);
                res.status(500).json(err);
        }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
        try {
                await Order.findByIdAndDelete(req.params.id);
                res.status(200).json("Order has been deleted.");
        } catch (error) {
                console.log(err);
                res.status(500).json(error);
        }
});

module.exports = router;