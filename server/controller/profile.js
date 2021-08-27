const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Profile = require("../models/profile");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage });

router.post("/savingImage", upload.single("file"), (req, res) => {
  res.json({
    success: true,
    filePath: req.file.path,
    fileName: req.file.filename,
  });
});

router.post("/uploadProfile", (req, res) => {
  Profile.findOne({ userId: req.body.userId }).then((result) => {
    if (result) {
      Profile.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { name: req.body.name, thumbnail: req.body.thumbnail } },
        (err, doc) => {
          if (err) return res.json({ updatesuccess: false, err });
          res.json({ updatesuccess: true, doc });
        }
      );
    } else {
      const profile = new Profile(req.body);

      profile.save((err, profile) => {
        if (profile) {
          res.json({ createsuccess: true, profile: profile });
        }
        if (err) {
          res.json({ createsuccess: false, err });
        }
      });
    }
  });
});

router.post("/getThumbnail", (req, res) => {
  Profile.findOne({ userId: req.body.id })
    .then((result) => {
      if (result) {
        res.json({ success: true, pic: result.thumbnail });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => {
      console.log("found err");
      res.json({ success: false, err });
    });
});

router.post("/getProfile", (req, res) => {
  Profile.findOne({ userId: req.body._id })
    .then((profile) => {
      if (profile) {
        res.json({ success: true, profile: profile });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

module.exports = router;
