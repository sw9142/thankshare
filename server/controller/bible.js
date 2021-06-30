const express = require("express");
const router = express.Router();
const Axios = require("axios");

const Bible = require("../models/bible");

router.post("/get", (req, res) => {
  Axios.get(
    `http://ibibles.net/quote.php?kor-${req.body.book}/${req.body.chapter}:${req.body.versefrom}-${req.body.verseto}`
  ).then((response) => {
    if (response) {
      const responseData = response.data.substring(
        157,
        response.data.length - 16
      );

      res.json({ success: true, book: responseData });
    }
  });
});

router.post("/updateBible", (req, res) => {

  Bible.findOne({ userId: req.body.userId })
    .then((script) => {
      if (script) {
   
        Bible.updateOne(
          { userId: req.body.userId },
          { script: req.body.script }
        )
          .then((doc) => {
            res.json({ success: true, script: doc });
          })
          .catch((err) => res.json({ success: false, err }));
      } else if (!script) {
   
    
        const bible = new Bible({
          script: req.body.script,
          userId: req.body.userId,
        });

        bible.save((err, doc) => {
          if (doc) {
            console.log("succeed in updating script into DB");
            res.json({ success: true, script: doc });
          }
          if (err) {
            console.log("err found!", err);
            res.json({ success: false, err });
          }
        });
      }
    })
    .catch((err) => res.json({ success: false, err }));
});

router.post("/getscript", (req, res) => {
  Bible.findOne({ userId: req.body.userId })
    .then((doc) => {
      if (doc) {
     
        res.json({ success: true, script: doc });
      }
    })
    .catch((err) => res.json({ success: false, err }));
});

module.exports = router;
