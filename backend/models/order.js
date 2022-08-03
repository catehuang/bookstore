const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
        price: { type: Number, required: true },
        quantity: { type: Number },
      }
    ],
    payment_id: { type: String, required: true },
    amount: { type: Number, required: true },
    created: { type: String, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema);