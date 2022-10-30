const Book = require("../models/book");
const express = require("express");
const router = express.Router();
const { isAdmin, verifyToken } = require("../middlewares/authJwt");

router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
        return
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
        return
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/new", verifyToken, isAdmin, async (req, res) => {
    const newBook = new Book(req.body.book);
    try {
        newBook.save(function(err, book) {
            if (err) {
                res.status(500).send({ message: err });
                return
            }
            res.status(200).json(book);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body.book, 
            },
            { new: true } 
        );
        res.status(200).json(updatedBook);
        return
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Book has been deleted.");
        return
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
