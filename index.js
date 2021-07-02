const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const config = require("./server/config/key.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));


dotenv.config();

app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));




const corsOptions = {
  origin: "https://ibibles.net/",
  credential: true,
};
app.use(cors(corsOptions));




// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes  html or routing and naviagtion
  app.get('*', function (req, res) {
    const fullPath = path.join(__dirname,  '../client', 'build', 'index.html')
    res.sendFile(fullPath)
  })
}








// parse application/json

app.use("/api/bible", require("./server/controller/bible"));
app.use("/api/users", require("./server/controller/users"));
app.use("/api/msg", require("./server/controller/message"));
app.use("/api/profile", require("./server/controller/profile"));

app.get("/", (req, res) => {
  res.send("hello??!");
});

PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {

  if (err) console.log("err", err);
  console.log("Successfully Connected To Port ", PORT);
});
