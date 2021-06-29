const mongoose = require("mongoose");

const msgSchema = mongoose.Schema(
  {
    msg: {
      type: String,
      require,
    },
    date: {
      type: Date,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Msg = mongoose.model("Msg", msgSchema);

module.exports = Msg;
