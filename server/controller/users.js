const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const authMiddleware = async (req, res, next) => {
  const token = await req.cookies.w_auth;

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
  const user = new User(req.body);

  user.save((err, user) => {
    if (user) {
      console.log("succeed in saving user into DB");
      res.json({ success: true, newUser: user });
    }
    if (err) {
      console.log("err found!", err);
      res.json({ success: false, err });
    }
  });
});

router.post("/login", (req, res) => {
  const { email } = req.body;
console.log("[/login] email: ", email);
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      console.log("did you find the user?: ", user);
      console.log("process.env.SECRET", process.env.SECRET );
      const Token =  jwt.sign( {_id:user._id},  process.env.SECRET);
       console.log("token? ", Token);
      var oneHour =  moment().add(1, "hour").valueOf();

      User.findOneAndUpdate(
        { _id: user._id },
        { token: Token, tokenExp: oneHour },
        { upsert: true },
        (err, doc) => {
          console.log("doc?: ", doc);
          if (err) return res.json({ loginSuccess: false, err });

          res.cookie("w_authExp", oneHour);
          res.cookie("w_auth", Token);
          return res.status(200).send({
            loginSuccess: true,
          });
        }
      );
    }).catch((err)=>{
   console.log("err? :", err);
      res.json({loginSuccess: false, err})
    });
});

router.get("/logout", authMiddleware, (req, res) => {
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

router.get("/islogin", (req, res) =>  {

  User.findOne({ token: req.cookies.w_auth })
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      }
    })
    .catch((err) => res.json({ success: false, err }));
});

module.exports = router;
