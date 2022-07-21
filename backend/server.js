const express =require('express');
const cors = require('cors');
const app = express();
const data = require('./data');
const PORT = 5000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/books/:id", (req, res) => {
        const productId = req.params.id;
        const product = data.books.find(x => x.id === productId);
        if (product)
                res.send(product);
        else
                res.status(404).send({msg: "Product not found"});
});

app.get("/api/books", (req, res) => {
        res.send(data.books);
});

app.listen(PORT, () => {console.log(`Sever started at http://localhost:${PORT}`)});