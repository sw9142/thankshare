const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  name: {
    type: String,
    require,
  },
  userId: {
    type: String,
    unique: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
