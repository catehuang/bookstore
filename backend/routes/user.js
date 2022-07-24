const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const session = require('express-session');

// register
router.post("/register", async (req, res) => {
  try {
  const { email, username, password, isAdmin } = req.body;
  const user = new User({
    email, 
    username,
    isAdmin
  })
  const registeredUser = await User.register(user, password);
  await registeredUser.save();
  res.status(201).json(registeredUser);
  }
  catch (err)
  {
    req.flash('error', e.message);
    res.status(500).json(err);
  }
    // if successfully registered
    //req.session.user_id = user._id;
  // res.send(password);
  // try {
  //   const { email, username, password } = req.body;
  //   const user = new User({ email, username });
  //   const registeredUser = await User.register(user, password);
  //   req.login(registeredUser, (err) => {
  //     if (err) 
  //       return next(err);
  //     req.flash("success", "Welcome to BookStore");
  //     res.status(200).json("Login success");
  //   });
  // } catch (err) {
  //   req.flash("error", e.message);
  //   res.status(500).json(err);
  // }
});

// login
router.post('/login', async (req, res) => {
  const { email, username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);

  // if successfully log in
  req.session.user_id = foundUser._id;

})

// secret
router.get('/secret', (req, res) => {
  if (!req.session.user_id)
    res.send(400);
})

// logout
router.post('/logout', (req, res) => {
  // req.session.user_id = null;
  req.session.destroy();
  res.send(400);
})


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
