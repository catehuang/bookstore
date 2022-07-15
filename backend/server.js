const express =require('express');
const cors = require('cors');
const app = express();
const data = require('./data');

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/books", (req, res) => {
        res.send(data.books);
});

app.listen(5000, () => {console.log("Sever started at http://localhost:5000")});