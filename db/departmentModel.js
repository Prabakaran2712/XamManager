const schema = require("./departmentSchema");
const mongoose = require("mongoose");

const exams = mongoose.model("department", schema);

module.exports = exams;
