const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const PORT = process.env.PORT || 5000;
const path = require("path");
const url = process.env.MONGO_URL;

require("dotenv").config();

mongoose
    .connect("mongodb+srv://" + url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch((err) => console.error("connection error", err.stack));

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
    console.log("Dev Mode");

    const corsOptions = {
        credentials: true,
        origin: true,
    };
    app.use(cors(corsOptions));
    app.use(express.static(__dirname + "/public"));
}

if (process.env.NODE_ENV === "production") {
    console.log("Production Mode");
    const buildPath = path.join(__dirname, '..', 'build');
    app.use(express.static(buildPath));
    app.use(express.static('build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });

    app.use(cors());
    app.all("/*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Credentials", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
}

app.use("/api", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);

app.listen(PORT, () => {
    console.log(`Sever is running on the port: `, PORT);
});
