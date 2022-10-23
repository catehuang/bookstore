const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth");
const { verifyRegister } = require("../middlewares");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const User = db.user;
const Role = db.role;

router.post(
    "/register",
    [verifyRegister.checkDuplicateUsernameOrEmail],
    async (req, res) => {
        try {
            const userRole = await Role.findOne(
                {
                    name: "user",
                },
                { _id: 1 }
            ).distinct("_id");

            if (!userRole) {
                console.log("Role Id not found");
                res.status(500).send({ message: "Role Id not found"});
                return
            }

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                role: userRole,
            });

            user.save((err, user) => {
                if (err) {
                    console.log(err)
                    res.status(500).send({ message: err });
                }
            });

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                isAdmin: "user",
                accessToken: token,
            });
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: err });
        }
    }
);

router.post("/login", async (req, res) => {
    try {
        User.findOne({ username: req.body.username }).exec(function (err, user) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 * 3,
            });

            Role.findOne({ _id: user.role._id }).exec(function (err, role) {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    isAdmin: role.name,
                    accessToken: token,
                });
            });
        });
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
});


router.post("/logout")
router.get("/users", verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/users/:id", verifyToken, isAdmin, async (req, res) => {
    try {
        Role.findOne({name: req.body.role_name}).exec(function (err, role) {
            if (err) {
                res.status(500).json(err);
                return
              }
              User.findByIdAndUpdate(req.params.id, {
                    role: role._id
                  }).exec(function (err, user) {
                      if (err) {
                        res.status(500).json(err);
                        return
                      }
                      res.status(200).json(user)
                  })
        })
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
