const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require('express-session')
const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const PORT = process.env.PORT || 5000;
const path = require("path");
const url = process.env.MONGO_URL;

require("dotenv").config();

const buildPath = path.join(__dirname, '..', 'build');

mongoose.connect("mongodb+srv://" + url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connect to db"))
.catch(err => console.error("connection error", err.stack));

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./middleware/auth");

const app = express();
app.use(express.static(buildPath));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

// const whitelist = process.env.WHITELISTED_DOMAINS
//   ? process.env.WHITELISTED_DOMAINS.split(",")
//   : [];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

app.use(cors());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Credentials", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(session({
  secret: "thisisasecret",
  resave: false ,
  saveUninitialized: true ,
}))

app.use(passport.initialize());
app.use(passport.session())    

app.use("/api", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Sever is running on the port`, PORT);
});
