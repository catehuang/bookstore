const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/books";
const app = express();
//const data = require('./data');
const PORT = 5000;

app.use(cors({ origin: true }));
app.use(express.json());

mongoose.connect(URL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
        console.log("Database connected");
});

app.get("/api/books/:id", (req, res) => {
        const bookId = req.params.id;
        const book = data.books.find(x => x.id === bookId);
        if (book)
                res.send(book);
        else
                res.status(404).send({msg: "Can't find the book"});
});

app.get("/api/books", (req, res) => {
        res.send(data.books);
});

app.listen(PORT, () => {console.log(`Sever started at http://localhost:` + PORT)});