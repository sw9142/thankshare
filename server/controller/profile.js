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
  console.log("Req.file: ", req.file);
  res.json({
    success: true,
    filePath: req.file.path,
    fileName: req.file.filename,
  });
});

router.post("/uploadProfile", (req, res) => {
  console.log("req.body? ", req.body);
console.log("useriD: ", req.body.userId);
 Profile.findOne({ userId: req.body.userId }).then((result) => {
    if (result) {
      console.log("found the profile under the same id")
      Profile.findOneAndUpdate(
          { userId: req.body.userId },
          { $set: { name: req.body.name, thumbnail: req.body.thumbnail } },
          (err, doc) => {
            if (err) return res.json({ updatesuccess: false, err });
           res.json({ updatesuccess: true, doc });
          }
        );
      
    }else{
      console.log("이건 새로운 프로필 만드는거")
      const profile = new Profile(req.body);

      profile.save((err, profile) => {
        if (profile) {
          console.log("succeed in saving profile into DB");
          res.json({ createsuccess: true, profile: profile });
        }
        if (err) {
          console.log("err found!", err);
          res.json({ createsuccess: false, err });
        }
      });
    }
  });
});

router.post("/getThumbnail", (req, res) => {

  Profile.findOne({ userId: req.body.id }).then((result) => {
      if (result) {
        console.log("success in getting profile")
        res.json({ success: true, pic: result.thumbnail});
      }else{
        console.log("unsscess in getting profile")
        res.json({success: false});
      }
    }).catch((err)=>{
      console.log("found err")
      res.json({success: false, err});
    });
});

router.post("/getProfile", (req, res) => {
console.log("[/getProfile] userId:", req.body._id);
  Profile.findOne({ userId: req.body._id }).then((profile) => {
    if (profile) {
 console.log("success in getting profile")
      res.json({ success: true, profile: profile });
    }else{
      console.log("unsscess in getting profile")
      res.json({success: false});
    }
  }).catch((err)=>{
    console.log("found err")
    res.json({success: false, err});
  });
});

module.exports = router;
