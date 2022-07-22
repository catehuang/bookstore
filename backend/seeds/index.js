const mongoose = require("mongoose");
const data = require("./data");
const Book = require("../models/bookModel");
const { collection } = require("../models/bookModel");
const URL = "mongodb://localhost:27017/books";

// useNewUrlParser , useUnifiedTopology , useFindAndModify , and useCreateIndex are no longer supported options.
mongoose.connect(URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
        console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
        console.log("Database connected");
});

const books = data.books;

 const seedDB = async () => {
        await Book.deleteMany({});
        await collection.insertMany(books);
};


seedDB().then(() => {
                mongoose.connection.close();
});
