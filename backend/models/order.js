const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {type: String},
        name: {type:String, required:true, unique:true},
        image: {type:String, required:true},
        author: {type:String, required:true},
        categories: {type:Array},
        featuredCategory: {type:Array},
        price:{type:Number, required:true},
        quantity:{type:Number}
      }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema);