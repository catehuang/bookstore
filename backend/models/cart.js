const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId:{type:String, required:true},
    products:[
      {
        productId:{
        type:String
        },
        quantity:{
          type:Number,
          default:1
        },
        img:{
          type:String
        },
        price:{
          type:String

        }        
    }
    ],
  }, 
  {timestamps: true}
)

module.exports = mongoose.model("Cart", CartSchema);