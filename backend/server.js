const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/amazon";
const app = express();
const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const PORT = 5000;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require('connect-flash');
const User = require('./models/user');

// In Express >= 4.16, body parser has been re-added under the methods express.json()
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));



mongoose.connect(URL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// middleware to check if the user is already login
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) return res.status(403).json("Please login first");
  next();
};

const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// session must before passport.session
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// app.use("/api/auth", authRoute);
app.use("/api", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/carts", cartRoute);
// app.use("/api/orders", ordersRoute);
// app.use("/api/checkout", stripeRoute);

app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:` + PORT);
});
