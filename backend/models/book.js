const mongoose = require("mongoose");

const Book = mongoose.model(
    "Book",
    new mongoose.Schema(
        {
            name: { type: String, required: true, unique: true },
            image: { type: String, required: true },
            author: { type: String, required: true },
            categories: { type: Array },
            featuredCategory: { type: Array },
            stars: { type: Number, required: true },
            reviews: { type: Array },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number },
        },
        { timestamps: true }
    )
);

module.exports = Book;
