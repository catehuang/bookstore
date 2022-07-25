const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const session = require('express-session');

// register
router.post("/register", async (req, res) => {
  try {
  const { email, username, password } = req.body;

  const user = new User({
    username,
    email,
  })
  const registeredUser = await User.register(user, password);
  await registeredUser.save();
  req.session.user_id = registeredUser._id;
  res.status(201).json(
    {
    "id" : registeredUser._id, 
    "username" : registeredUser.username,
    "email" : registeredUser.email,
  });
}
  catch (err)
  {
    //console.log(err);
    res.status(500).json({err});
  }
});

// login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), async (req, res) => {
  try {
    //console.log(req.body);
    const { username, password } = req.body;
    const foundUser = await User.findOne({username, password});   
    req.session.user_id = foundUser._id;
    res.status(200).json({
      "id" : foundUser._id, 
      "username" : foundUser.username,
      "email" : foundUser.email,
    });
  }
  catch (err)
  {
    //console.log(err);
    res.status(500).json({err});
  }
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
