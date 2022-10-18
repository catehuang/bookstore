const Book = require("../models/book");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authJwt");

router.get("/test", () => {
  res.status(200).json({message: "test"});
})

// Get ALL Books 
router.get("/",  async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the Book 
router.get("/find/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});


//CREATE
// router.post("/", verifyToken, async (req, res) => {
//   const newProduct = new Product(req.body);
//   try {
//     const savedProduct = await newProduct.save();
//     res.status(200).json(savedProduct);
//   } catch (err) {
//     res.status(500).json(err);    
//   }
// });

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //accepts all from body
      },
      { new: true } //return object to updateUser
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted.");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });



module.exports = router;