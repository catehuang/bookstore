const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/books";
const app = express();
const booksRoute = require('./routes/book');
const PORT = 5000;

app.use(cors({ origin: true }));
app.use(express.json());

mongoose.connect(URL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
        console.log("Database connected");
});

// app.get("/api/books/:id", (req, res) => {
//         const bookId = req.params.id;
//         const book = data.books.find(x => x.id === bookId);
//         if (book)
//                 res.send(book);
//         else
//                 res.status(404).send({msg: "Can't find the book"});
// });

// app.get("/api/books", (req, res) => {
//         res.send(data.books);
// });


// app.get("/", (req, res) => {
//         res.send("Hello from server");
// });

// app.get("/api/books",  async (req, res) => {
//         try {
//           let books = await Book.find({});
//           res.status(200).json(books);
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       });
      
// app.use("/api/auth", authRoute);
// app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
// app.use("/api/carts", cartsRoute);
// app.use("/api/orders", ordersRoute);
// app.use("/api/checkout", stripeRoute);



app.listen(PORT, () => {console.log(`Sever started at http://localhost:` + PORT)});