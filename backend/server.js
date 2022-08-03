const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require('express-session')
const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}
require("./utils/connectdb");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./middleware/auth");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


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


app.listen(process.env.PORT, () => {
  console.log(`Sever started at http://localhost:` + process.env.PORT);
});
