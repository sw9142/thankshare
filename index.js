const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const config = require("./server/config/key.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const contentSecurityPolicy = require("helmet-csp");



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

app.use(
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.gstatic.com/*", "data:"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNa7lujVj9_mf.woff2", 
       "https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qPK7lujVj9_mf.woff2","https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNK7lujVj9_mf.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qO67lujVj9_mf.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qN67lujVj9_mf.woff2","https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNq7lujVj9_mf.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwmhdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwkxdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwmxdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlBdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwmBdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwmRdu3cOWxy40.woff2","https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3i54rwlxdu3cOWxw.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwmhdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwkxdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwmxdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlBdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwmBdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwmRdu3cOWxy40.woff2", "https://fonts.gstatic.com/s/sourcesanspro/v14/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdu3cOWxw.woff2","https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gTD_vx3rCubqg.woff2", "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3g3D_vx3rCubqg.woff2", "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gbD_vx3rCubqg.woff2", "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gfD_vx3rCubqg.woff2", "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gnD_vx3rCs.woff2", "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2", "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2", "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2", "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFVp0bf8pkAp6a.woff2", "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFWp0bf8pkAp6a.woff2", "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFW50bf8pkAp6a.woff2", "https://fonts.gstatic.com/s/opensans/v20/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UNirkOX-hpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UNirkOVuhpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UNirkOXuhpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UNirkOUehpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UNirkOXehpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UNirkOXOhpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UNirkOUuhpKKSTjw.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOX-hpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOVuhpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOXuhpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOUehpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOXehpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOXOhpKKSTj5PW.woff2","https://fonts.gstatic.com/s/opensans/v20/mem5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2"],
    },
  })
);


const corsOptions = {
  origin: "https://ibibles.net/",
  credential: true,
};
app.use(cors(corsOptions));




// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static(path.join(__dirname, "/client/build")));

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
