const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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



userSchema.pre("save", function(next){

  const user = this;
  if(user.isModified("password")){
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }

});

userSchema.methods.comparePassword = function (plainpassword, cb) {
  bcrypt.compare(plainpassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


const User = mongoose.model("User", userSchema);

module.exports = User;
