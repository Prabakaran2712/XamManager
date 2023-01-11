const schema = require("./courseSchema");
const mongoose = require("mongoose");

const exams = mongoose.model("course", schema);

module.exports = exams;
