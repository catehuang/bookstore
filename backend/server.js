const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const PORT = process.env.PORT || 5000;
const path = require("path");
const url = process.env.MONGO_URL;

require("dotenv").config();

const buildPath = path.join(__dirname, "..", "build");

mongoose
    .connect("mongodb+srv://" + url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch((err) => console.error("connection error", err.stack));

const app = express();
app.use(express.static(buildPath));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);


if (process.env.NODE_ENV !== "production") {
    var corsOptions = {
        credentials: true,
        origin: true
    };
    app.use(cors(corsOptions));
    app.use(express.static(__dirname + "/public"));
}

if (process.env.NODE_ENV === "production") {
    app.use(cors());
    app.use(express.static("build"));

    app.all("/*", function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Credentials", true);
        // res.header("Access-Control-Allow-Credentials", "GET,PUT,POST,DELETE");
        // res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../build", "index.html"));
    });
}



app.listen(PORT, () => {
    console.log(`Sever is running on the port: `, PORT);
});