const mongoose = require("mongoose");

const bibleSchema = mongoose.Schema(
  {
    script: {
      type: String,
      require,
    },
    userId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Bible = mongoose.model("bible", bibleSchema);

module.exports = Bible;
