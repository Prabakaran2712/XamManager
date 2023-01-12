const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const router = require("./routes/routes");

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use(express.json());
app.use("/api/", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo DB");
  app.listen(process.env.PORT, () => {
    console.log("server listening on port " + process.env.PORT);
  });
});
