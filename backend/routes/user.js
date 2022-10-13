const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth");
const { verifyRegister } = require("../middlewares");
const User = db.user;
const Role = db.role;

router.post("/test", async (req, res) => {
    console.log(req.body);
    const user = User.find({
        username: req.body.username,
    });
    res.status(200).send(user.password);
});

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

            if (userRole) {
                userRoleId = userRole;
            } else {
                console.log("Not found");
            }

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                role: userRoleId,
            });

            user.save((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    //   return;
                }
            });

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                accessToken: token,
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }
);

router.post("/login", async (req, res) => {
    try {
        const user = User.findOne({
            username: req.body.username,
        })
            .populate("role", "__v")
            .exec((err, user) => {

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
                    expiresIn: 86400, // 24 hours
                });

                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: user.role,
                    accessToken: token,
                });
            });
    } catch (err) {
        console.log("Nooooooo");
        res.status(500).send({ message: err });
        return;
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
