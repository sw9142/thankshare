const express = require("express");
const router = express.Router();
const Msg = require("../models/msg");

router.post("/upload", (req, res) => {
  const msg = new Msg(req.body);

  msg.save((err, msg) => {
    if (msg) {
      console.log("succeed in saving messge into DB");
      res.json({ success: true });
    }
    if (err) {
      console.log("err found!", err);
      res.json({ success: false, err });
    }
  });
});

router.post("/update", (req, res) => {
  Msg.findOneAndUpdate(
    { _id: req.body.id },
    { msg: req.body.newMsg },
    (err, doc) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).json({
        success: true,
      });
    }
  );
});

router.get("/getlist", (req, res) => {
  Msg.find()
    .then((list) => {
      console.log(list);
      res.json({ success: true, list: list });
    })
    .catch((err) => console.log("err found: ", err));
});

router.post("/delete", (req, res) => {
  Msg.findOneAndDelete({ _id: req.body.id })
    .then((list) => {
      console.log("success res: ", list);
      res.json({ success: true });
    })
    .catch((err) => {
      console.log("Failed in deleting data: ", err);
    });
});

module.exports = router;
