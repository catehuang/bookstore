const User = require("../models/userModel");
const router = require("express").Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }
   catch (err) 
   {
    res.status(500).json(err);
  }
})


module.exports = router;