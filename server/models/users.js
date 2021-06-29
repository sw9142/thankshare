const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require,
  },
  password: {
    type: String,
    require,
  },
  email: {
    type: String,
    require,
    unique: true,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
