const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.book = require("./book")
db.cart = require("./cart")
db.order = require("./order")
db.ROLES = ["user", "admin", "sysadmin"];

module.exports = db;