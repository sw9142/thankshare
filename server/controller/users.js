const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const authMiddleware = async (req, res, next) => {
  const token = await req.cookies.w_auth;
  console.log("token: ", token);

  jwt.verify(token, process.env.SECRET, function (err, decode) {
    if (decode) {
      User.find({ _id: decode })
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          res.sendStatus(404).json({ isAuth: false, err });
        });
    }
    if (err) console.log("err in authMiddleware: ", err);
  });
};

router.get("/auth", authMiddleware, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  console.log("req.body.email: ", req.body.email);
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log("user??: ", user);
      if (user) {
        res.json({ success: false, message: "Already have an account" });
      } else {
        const { email, password } = req.body;
        let regEpx_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // retrieved from https://regexr.com/3e48o
        let messageValidation = null;
        let validated = false;

        console.log("pasword: ", password);
        console.log("typeof password: ", typeof password);
        if (typeof email !== "string" || email.length === 0) {
          messageValidation = "Please enter your email correctly";
        } else if (password.length === 0) {
          console.log("password problem");
          messageValidation = "Please enter your password";
        } else if (!regEpx_email.test(email)) {
          messageValidation = "Please enter your email correctly";
        } else {
          validated = true;
        }

        if (validated) {
          const user = new User(req.body);

          user.save((err, user) => {
            if (user) {
              res.json({ success: true, newUser: user });
            }
            if (err) {
              res.json({ success: false, err });
            }
          });
        } else {
          res.json({ success: false, message: messageValidation });
        }
      }
    })
    .catch((err) => {
      console.log("err: no user found");
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .exec()
    .then((user) => {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          const Token = jwt.sign({ _id: user._id }, process.env.SECRET);
          var oneHour = moment().add(1, "hour").valueOf();

          User.findOneAndUpdate(
            { _id: user._id },
            { token: Token, tokenExp: oneHour },
            { upsert: true },
            (err, doc) => {
              if (err) return res.json({ loginSuccess: false, err });

              res.cookie("w_authExp", oneHour);
              res.cookie("w_auth", Token);
              return res.status(200).send({
                loginSuccess: true,
                user: doc,
              });
            }
          );
        } else {
          return res.json({
            loginSuccess: false,
            message: "Incorrect email or password",
            err,
          });
        }
      });
    })
    .catch((err) => {
      res.json({ loginSuccess: false, message: "Account doesn't exist!", err });
    });
});

router.get("/logout", authMiddleware, (req, res) => {
  console.log("logout!");
  User.findOneAndUpdate(
    { _id: req.user[0]._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ logoutsuccess: false, err });

      return res.status(200).json({
        logoutsuccess: true,
      });
    }
  );
});

router.get("/islogin", (req, res) => {
  console.log("is login token: ", req.cookies.w_auth);
  User.findOne({ token: req.cookies.w_auth })
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      }
    })
    .catch((err) => res.json({ success: false, err }));
});

module.exports = router;
