const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        _id: { type: String },
        name:{type:String},
        image: { type: String},
        author: { type: String },
        categories: { type: Array },
        featuredCategory: { type: Array },
        stars: { type: Number },
        reviews: { type: Array },
        description: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
