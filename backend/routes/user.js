const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const {
    getToken,
    COOKIE_OPTIONS,
    getRefreshToken,
    verifyUser,
} = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        const user = new User({
            username,
            email
        });
        const registeredUser = await User.register(user, password);
        const token = getToken({ _id: registeredUser._id });
        const refreshToken = getRefreshToken({ _id: registeredUser._id });
        registeredUser.refreshToken.push({ refreshToken });
        await registeredUser.save();

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
        res.json({ success: true, username, token });
    } catch (err) {
        //console.log(err);
        res.send({ success: false, err });
    }
});

// login
router.post(
    "/login",
    passport.authenticate("local"),
    async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const foundUser = await User.findOne({ username, password });
            const token = getToken({ _id: foundUser._id });
            const refreshToken = getRefreshToken({ _id: foundUser._id });
            foundUser.refreshToken.push({ refreshToken });
            await foundUser.save();
            req.session.user_id = foundUser._id;
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.json({ success: true, username, token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    }
);

// refresh token
router.post("/refreshToken", (req, res, next) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    if (refreshToken) {
        try {
            const payload = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );
            const userId = payload._id;
            User.findOne({ _id: userId }).then(
                (user) => {
                    if (user) {
                        // Find the refresh token against the user record in database
                        const tokenIndex = user.refreshToken.findIndex(
                            (item) => item.refreshToken === refreshToken
                        );

                        if (tokenIndex === -1) {
                            res.statusCode = 401;
                            res.send("Unauthorized");
                        } else {
                            const token = getToken({ _id: userId });
                            // If the refresh token exists, then create new one and replace it.
                            const newRefreshToken = getRefreshToken({ _id: userId });
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
                            user.save((err, user) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.send(err);
                                } else {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                                    res.json({ success: true, token });
                                }
                            });
                        }
                    } else {
                        res.statusCode = 401;
                        res.send("Unauthorized");
                    }
                },
                (err) => next(err)
            );
        } catch (err) {
            res.statusCode = 401;
            res.send("Unauthorized");
        }
    } else {
        res.statusCode = 401;
        res.send("Unauthorized");
    }
});

// logout
router.get("/logout", verifyUser, async (req, res) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;

    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username, password });
        const tokenIndex = foundUser.refreshToken.findIndex(item => item.refreshToken === refreshToken
        );
        if (tokenIndex !== -1) {
            foundUser.refreshToken.id(foundUser.refreshToken[tokenIndex]._id).remove()
        }

        foundUser.save((err, foundUser) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            } else {
                res.clearCookie("refreshToken", COOKIE_OPTIONS)
                req.session.destroy();
                res.json({ success: true })
            }
        })
    }
    catch(err)
    {
        res.statusCode = 500
        res.send(err)
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
