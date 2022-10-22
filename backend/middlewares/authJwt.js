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
    // console.log(req.userId)
    verifyToken(req, res, () => {
        User.findOne({ _id: req.userId}).exec(function(err, user) {
            // console.log(user)
            if (err) {
                res.status(500).send({ message: err });
            }         
            Role.findOne({ _id: user.role._id}).exec(function (err, role){
                // console.log(role)
                if (err) {                  
                    res.status(500).send({ message: err });
                }
                if (role.name === "admin") {
                    next()
                } else {
                    res.status(403).send({ message: "Require Admin Role!" });
                }
            })
        })
    })
    
    // if (req.body.user.isAdmin === "admin") {
    //     next()
    // } else {
    //     res.status(403).send({ message: "Require Admin Role!" });
    // }
}

const authJwt = {
    verifyToken,
    isAdmin,
};
module.exports = authJwt;
