const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const { verifyToken} = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const registeredUser = await User.register({ username, email }, password);
    await registeredUser.save();

    const accessToken = jwt.sign(
      { id: registeredUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.json({
      _id: registeredUser._id,
      username,
      email: registeredUser.email,
      accessToken,
    });
  } catch (err) {
    res.send({ success: false, err });
  }
});

// login
router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username, password });

    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.json({
      _id: foundUser._id,
      username,
      email: foundUser.email,
      accessToken,
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({ err });
  }
});

// logout
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    req.logout;
    res.json({ success: true });
  } catch (err) {
    res.statusCode = 500;
    //res.send(err);
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get the user
router.get("/users/:id", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
