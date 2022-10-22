const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    if (req.body.user.isAdmin === "admin") {
        next()
    } else {
        res.status(403).send({ message: "Require Admin Role!" });
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
};
module.exports = authJwt;
