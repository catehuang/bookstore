const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema(
        {
            userId: { type: String },
            products: [
                {
                    _id: { type: String },
                    name: { type: String },
                    image: { type: String },
                    author: { type: String },
                    categories: { type: Array },
                    featuredCategory: { type: Array },
                    price: { type: Number },
                    quantity: { type: Number },
                },
            ],
            payment_id: { type: String },
            amount: { type: Number },
            created: { type: String },
            address: { type: Object },
            status: { type: String, default: "pending" },
        },
        { timestamps: true }
    )
);

module.exports = Order;
