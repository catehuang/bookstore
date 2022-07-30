const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    authStrategy: {
      type: String,
      default: "local",
    },
    // isAdmin: { type: Boolean, default: false },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
