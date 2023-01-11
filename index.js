const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const router = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use("/api/", router);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo DB");
  app.listen(process.env.PORT, () => {
    console.log("server listening on port " + process.env.PORT);
  });
});
