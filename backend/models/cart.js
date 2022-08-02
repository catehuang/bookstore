const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        _id: { type: String, required: true },
        name:{type:String, required:true, unique:true},
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
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
