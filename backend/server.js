const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require('express-session')
const bookRoute = require("./routes/book");
const userRoute = require("./routes/user");
//const cartRoute = require("./routes/cart");

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

app.use(cors(corsOptions));

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const URL = "mongodb://localhost:27017/amazon";
// const app = express();

// //const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const flash = require('connect-flash');
// const User = require('./models/user');
// const cookieParser = require("cookie-parser")
// const JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt

// // In Express >= 4.16, body parser has been re-added under the methods express.json()
// app.use(express.json());
// app.use(cors({ origin: true, credentials: true }));

// mongoose.connect(URL,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   });

// const db = mongoose.connection;

// app.use(cookieParser(thisshouldbeabettersecret));

// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", () => {
//   console.log("Database connected");
// });

// // app.use(
// //   session({
// //     secret: "keyboard cat",
// //     resave: false,
// //     saveUninitialized: true,
// //     cookie: { secure: true },
// //   })
// // );

// // middleware to check if the user is already login
// const requireLogin = (req, res, next) => {
//   if (!req.session.user_id) return res.status(403).json("Please login first");
//   next();
// };

// const sessionConfig = {
//   secret: "thisshouldbeabettersecret!",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     expires: Date.now() + 1000 * 60 * 60 * 24,
//     maxAge: 1000 * 60 * 60 * 24,
//   },
// };

// // session must before passport.session
// // app.use(session(sessionConfig));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey ="jdhdhd-kjfjdhrhrerj-uurhr-jjge";

// // app.use((req, res, next) => {
// //   console.log(req.session);
// //   res.locals.currentUser = req.user;
// //   res.locals.success = req.flash("success");
// //   res.locals.error = req.flash("error");
// //   next();
// // });

// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     // Check against the DB only if necessary.
//     // This can be avoided if you don't want to fetch user details in each request.
//     User.findOne({ _id: jwt_payload._id }, function (err, user) {
//       if (err) {
//         return done(err, false)
//       }
//       if (user) {
//         return done(null, user)
//       } else {
//         return done(null, false)
//         // or you could create a new account
//       }
//     })
//   })
// )

// app.use("/api/auth", authRoute);

//app.use("/api/carts", cartRoute);
// app.use("/api/orders", ordersRoute);
// app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT, () => {
  console.log(`Sever started at http://localhost:` + process.env.PORT);
});
